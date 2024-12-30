# Project Overview
Use this guide to build a web app that allows users to learn about Geoff Vrijmoet's web development services, and see examples of what he can build for their business.

# About Geoff Vrijmoet's Web Development Services
Geoff Vrijmoet is a web developer who specializes in building custom websites and web applications. He specializes in building dashboards for businesses to help them manage their data and operations, as well as integrate with other services like Square, Shopify, Stripe, and more, to automate their business processes. 

# Feature Requirements
- The home page of the web app should do most of the work of the website. It should introduce Geoff, his services, and examples of what he can build for businesses. It should also have a form that allows users to contact Geoff to discuss their project.
- The web app should be very dynamic, but also use a clean and straightforward design that doesn't get in the way of the content.
- The web app should have lightning-fast performance.
- The entire app should be extremely mobile-friendly.
- We will use Next.js, Shadcn, Lucid, Clerk, MongoDB, and Tailwind CSS to build the app.
- We will deploy the app using Vercel.
- The app will be hosted at https://dev.geoffvrijmoet.com.

# Relevant Docs
This is the reference documentation for Clerk: https://clerk.com/docs/references/nextjs/

# Current File Structure
DEV-GEOFFVRIJMOET-COM
├── app
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── guidelines
│   └── feature-doc-guideline.md
├── lib
│   └── utils.ts
├── node_modules
├── .cursorrules
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go in /app.