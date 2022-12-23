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

**Commands**

- `npm run dev` (Start local development)
- `npx ts-node server.ts` (Start mail rendering server, http://localhost:3000)

# Codebase

- [`src`](src) (Maizzle email templates)
- [`server.ts`](server.ts) (Node.js server to render and send the emails)
