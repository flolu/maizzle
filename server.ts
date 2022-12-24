const Maizzle = require('@maizzle/framework')
import Mailjet from 'node-mailjet'
import * as fs from 'fs/promises'
import Mustache from 'mustache'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

async function renderEmail(templateName: string) {
  const templatesDir = path.join(__dirname, 'src', 'templates')
  const templatePath = path.join(templatesDir, templateName)
  const rawTemplate = (await fs.readFile(templatePath)).toString()

  const {html} = await Maizzle.render(rawTemplate, {
    tailwind: {
      config: require('./tailwind.config.js'),
    },
    maizzle: require('./config.production.js'),
  })

  return html
}

async function customizeEmail(name: string, url: string) {
  const html = await renderEmail('transactional.html')

  const view = {name, title: `Test mail to ${name}`, url}
  const customized = Mustache.render(html, view)

  return customized
}

async function sendEmail(html: string, to: string, subject: string) {
  const mailjet = new Mailjet({
    apiKey: process.env.MAILJET_PUBLIC_KEY,
    apiSecret: process.env.MAILJET_PRIVATE_KEY,
  })

  await mailjet.post('send', {version: 'v3.1'}).request({
    Messages: [
      {
        From: {Email: process.env.FROM_EMAIL, Name: 'Maizzle'},
        To: [{Email: to}],
        Subject: subject,
        TextPart: html,
        HTMLPart: html,
      },
    ],
  })
}

async function main() {
  dotenv.config()

  const app = express()
  app.get('/', async (req, res) => {
    const {name, url} = req.query
    const html = await customizeEmail(name as string, url as string)

    res.type('html')
    res.send(html)
  })

  app.get('/send/:email', async (req, res) => {
    const {name, url} = req.query
    const html = await customizeEmail(name as string, url as string)

    const {email} = req.params
    await sendEmail(html, email, 'Maizzle Test Email')

    res.send(`Successfully sent email to ${email}`)
  })

  app.listen(8080, () => console.log('http://localhost:8080?name=Flo&url=https://youtube.com/@flolu'))
}

main()
