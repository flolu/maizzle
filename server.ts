import express from 'express'
import path from 'path'
import * as fs from 'fs/promises'
const Maizzle = require('@maizzle/framework')

async function renderEmail(template: string) {
  const {html} = await Maizzle.render(template, {
    tailwind: {
      config: require('./tailwind.config.js'),
    },
    maizzle: require('./config.js'),
  })

  return html
}

const app = express()

const templatesDir = path.join(__dirname, 'src', 'templates')

app.get('/', async (req, res) => {
  const templatePath = path.join(templatesDir, 'transactional.html')
  const rawTemplate = (await fs.readFile(templatePath)).toString()

  const html = await renderEmail(rawTemplate)

  res.type('html')
  res.send(html)
})

app.listen(3000)
