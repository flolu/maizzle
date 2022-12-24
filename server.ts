import express from 'express'
import path from 'path'
import * as fs from 'fs/promises'
const Maizzle = require('@maizzle/framework')
import Mustache from 'mustache'
import dotenv from 'dotenv'
import Mailjet from 'node-mailjet'

async function renderEmail(template: string) {
  const {html} = await Maizzle.render(template, {
    tailwind: {
      config: require('./tailwind.config.js'),
    },
    maizzle: require('./config.production.js'),
  })

  return html
}

dotenv.config()

const app = express()
const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_PUBLIC_KEY,
  apiSecret: process.env.MAILJET_PRIVATE_KEY,
})

const templatesDir = path.join(__dirname, 'src', 'templates')

app.get('/', async (req, res) => {
  const templatePath = path.join(templatesDir, 'transactional.html')
  const rawTemplate = (await fs.readFile(templatePath)).toString()
  const templated = Mustache.render(rawTemplate, {name: req.query.name})

  const html = await renderEmail(templated)

  res.type('html')
  res.send(html)
})

app.get('/send/:email', async (req, res) => {
  const templatePath = path.join(templatesDir, 'transactional.html')
  const rawTemplate = (await fs.readFile(templatePath)).toString()
  const templated = Mustache.render(rawTemplate, {name: req.query.name})

  const html = await renderEmail(templated)

  await mailjet.post('send', {version: 'v3.1'}).request({
    Messages: [
      {
        From: {Email: process.env.FROM_EMAIL, Name: 'Maizzle'},
        To: [{Email: req.params.email}],
        Subject: 'Maizzle Test Email',
        TextPart: html,
        HTMLPart: html,
      },
    ],
  })

  res.send(`Successfully sent email to ${req.params.email}`)
})

app.listen(3000)
