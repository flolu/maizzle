<div align="center">
  <h1>Rendering Emails with Maizzle</h1>
  <p>Example for rendering beautiful emails with dynamic content using TailwindCSS</p>
  <!-- <a href="https://youtu.be/1WUoITRINf0">
    <img width="320px" height="180px" src="https://img.youtube.com/vi/1WUoITRINf0/mqdefault.jpg" style="border-radius: 1rem;" />
    <p>Watch the YouTube Tutorial</p>
  </a> -->
</div>

# Features

- Build beautiful emails using TailwindCSS
- Add dynamic content to emails
- Render and send emails from Node.js

# Tech Stack

- [Maizzle](https://maizzle.com)
  - [TailwindCSS](https://tailwindcss.com)
  - [PostHTML](https://posthtml.org)
- [Node.js](https://nodejs.org)
- [TypeScript](https://www.typescriptlang.org)

# Usage

**Recommended OS**: Linux

**Requirements**: Node.js

**Setup**

- `npm install` (Install NPM dependencies)
- Set `MAILJET_PUBLIC_KEY` and `MAILJET_PRIVATE_KEY` in [`.env`](`.env`) ([Mailjet](https://www.mailjet.com))

**Commands**

- `npm run dev` (Start local development)
- `npx ts-node-dev server.ts` (Start mail rendering server, http://localhost:8080)
  - Render and show email example: http://localhost:8080?name=Flo
  - Render and send email example: http://localhost:8080/send/flo@drakery.com?name=Flo

# Codebase

- [`src`](src) (Maizzle email templates)
- [`server.ts`](server.ts) (Node.js server to render and send the emails)
