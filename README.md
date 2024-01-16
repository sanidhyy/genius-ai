<a name="readme-top"></a>

# Genius - A Modern Next.js 14 SaaS AI Platform.

![Genius - A Modern Next.js 14 SaaS AI Platform.](/.github/images/img_main.png "Genius - A Modern Next.js 14 SaaS AI Platform.")

[![Ask Me Anything!](https://flat.badgen.net/static/Ask%20me/anything?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy "Ask Me Anything!")
[![GitHub license](https://flat.badgen.net/github/license/sanidhyy/genius-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/genius-ai/blob/main/LICENSE "GitHub license")
[![Maintenance](https://flat.badgen.net/static/Maintained/yes?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/genius-ai/commits/main "Maintenance")
[![GitHub branches](https://flat.badgen.net/github/branches/sanidhyy/genius-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/genius-ai/branches "GitHub branches")
[![Github commits](https://flat.badgen.net/github/commits/sanidhyy/genius-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/genius-ai/commits "Github commits")
[![GitHub issues](https://flat.badgen.net/github/issues/sanidhyy/genius-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/genius-ai/issues "GitHub issues")
[![GitHub pull requests](https://flat.badgen.net/github/prs/sanidhyy/genius-ai?icon=github&color=black&scale=1.01)](https://github.com/sanidhyy/genius-ai/pulls "GitHub pull requests")
[![Netlify Status](https://api.netlify.com/api/v1/badges/b63626db-a322-49c1-b8d7-60ab157e7da6/deploy-status)](https://ai-genius.netlify.app/ "Netlify Status")

<!-- Table of Contents -->
<details>

<summary>

# :notebook_with_decorative_cover: Table of Contents

</summary>

- [Folder Structure](#bangbang-folder-structure)
- [Getting Started](#toolbox-getting-started)
- [Screenshots](#camera-screenshots)
- [Tech Stack](#gear-tech-stack)
- [Stats](#wrench-stats)
- [Contribute](#raised_hands-contribute)
- [Acknowledgements](#gem-acknowledgements)
- [Buy Me a Coffee](#coffee-buy-me-a-coffee)
- [Follow Me](#rocket-follow-me)
- [Learn More](#books-learn-more)
- [Deploy on Vercel](#page_with_curl-deploy-on-vercel)
- [Give A Star](#star-give-a-star)
- [Star History](#star2-star-history)
- [Give A Star](#star-give-a-star)

</details>

## :bangbang: Folder Structure

Here is the folder structure of this app.

```bash
genius-ai/
  |- app/
    |-- (auth)/
        |--- (routes)/
            |---- sign-in/[[...sign-in]]/
            |---- sign-up/[[...sign-up]]/
        |--- layout.tsx
    |-- (dashboard)/
        |--- (routes)/
            |---- code/
            |---- conversation/
            |---- dashboard/
            |---- image/
            |---- music/
            |---- settings/
            |---- video/
        |--- layout.tsx
    |-- (landing)/
        |--- layout.tsx
        |--- page.tsx
    |-- api/
        |--- code/
        |--- conversation/
        |--- image/
        |--- music/
        |--- stripe/
        |--- video/
        |--- webhook/
    |-- apple-icon.png
    |-- favicon.ico
    |-- globals.css
    |-- icon1.png
    |-- icon2.png
    |-- layout.tsx
  |- components/
    |-- ui/
    |-- bot-avatar.tsx
    |-- crisp-chat.tsx
    |-- empty.tsx
    |-- free-counter.tsx
    |-- heading.tsx
    |-- landing-content.tsx
    |-- landing-footer.tsx
    |-- landing-hero.tsx
    |-- landing-navbar.tsx
    |-- loader.tsx
    |-- mobile-sidebar.tsx
    |-- navbar.tsx
    |-- pro-modal.tsx
    |-- sidebar.tsx
    |-- subscription-button.tsx
    |-- user-avatar.tsx
  |- config/
    |-- index.ts
  |- constants/
    |-- index.ts
  |- hooks/
    |-- use-pro-modal.tsx
  |- lib/
    |-- api-limit.ts
    |-- db.ts
    |-- stripe.ts
    |-- subscription.ts
    |-- utils.ts
  |- prisma/
    |-- schema.prisma
  |- providers/
    |-- crisp-provider.tsx
    |-- modal-provider.tsx
    |-- toaster-provider.tsx
  |- public/
    |-- testimonials/
    |-- empty.png
    |-- logo.png
  |- schemas/
    |-- index.ts
  |- .env
  |- .env.example
  |- .eslintrc.json
  |- .gitignore
  |- components.json
  |- environment.d.ts
  |- next.config.js
  |- package-lock.json
  |- package.json
  |- postcss.config.js
  |- tailwind.config.ts
  |- tsconfig.json
```

<br />

## :toolbox: Getting Started

1. Make sure **Git** and **NodeJS** is installed.
2. Clone this repository to your local computer.
3. Create `.env` file in **root** directory.
4. Contents of `.env`:

```env
# .env

# disable next.js telemetry
NEXT_TELEMETRY_DISABLED=1

# clerk auth keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# clerk redirect uri
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# openai api key
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# replicate api token
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# aiven database url
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/genius-ai?ssl-mode=REQUIRED"

# stripe api/webhook secret key
STRIPE_API_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# app base url
NEXT_PUBLIC_APP_URL=http://localhost:3000

# crisp website id
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
```

### 5. Clerk Authentication Keys

- Visit the Clerk dashboard: [https://clerk.dev](https://clerk.dev)
- Log in to your Clerk account or sign up if you don't have one.
- Go to the "Projects" section and select your project.
- Navigate to the "API Keys" tab.
- Copy the "Publishable Key" and replace `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in the `.env.local` file with the copied key.
- Copy the "Secret Key" and replace `CLERK_SECRET_KEY` in the `.env.local` file with the copied key.

### 6. OpenAI API Key

Visit [OpenAI](https://platform.openai.com/signup/) and sign up for an account. Once registered, you can find your API key in the API section of your account settings. Copy the key and set it as the `OPENAI_API_KEY` in your project's environment.

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 7. Replicate API Token

Sign up or log in to [Replicate](https://replicate.ai/). Once logged in, navigate to your account settings, and you'll find your API token. Copy the token and set it as the `REPLICATE_API_TOKEN` in your project's environment.

```env
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 8. Aiven Database URL

If you don't have an Aiven account, sign up [here](https://aiven.io/). After creating an account, set up a MySQL database. In the Aiven dashboard, find your database connection details and construct the `DATABASE_URL` in the following format:

```env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/genius-ai?ssl-mode=REQUIRED"
```

### 9. Stripe API and Webhook Keys

For Stripe, sign up or log in to your [Stripe Dashboard](https://dashboard.stripe.com/register). Once logged in, go to Developers > API keys to find your API secret key and webhook secret. Set them as `STRIPE_API_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in your project's environment.

```env
STRIPE_API_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 10. App Base URL

Set the base URL of your application as `NEXT_PUBLIC_APP_URL` in your project's environment.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 11. Crisp Website ID

Sign up on [Crisp](https://crisp.chat/en/) and create a website. Once created, find your website ID in the Crisp dashboard and set it as `NEXT_PUBLIC_CRISP_WEBSITE_ID` in your project's environment.

```env
NEXT_PUBLIC_CRISP_WEBSITE_ID=xxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx
```

12. Open terminal in root directory. Run `npm install --legacy-peer-deps` or `yarn install --legacy-peer-deps`.

13. Now app is fully configured 👍 and you can start using this app using either one of `npm run dev` or `yarn dev`.

**NOTE:** Please make sure to keep your API keys and configuration values secure and do not expose them publicly.

## :camera: Screenshots:

![Modern UI/UX](/.github/images/img1.png "Modern UI/UX")

![Conversation Page](/.github/images/img2.png "Conversation Page")

![Image Generation](/.github/images/img3.png "Image Generation")

![Code Generation](/.github/images/img4.png "Code Generation")

## :gear: Tech Stack

[![React JS](https://skillicons.dev/icons?i=react "React JS")](https://react.dev/ "React JS") [![Next JS](https://skillicons.dev/icons?i=next "Next JS")](https://nextjs.org/ "Next JS") [![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript") [![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS") [![Netlify](https://skillicons.dev/icons?i=netlify "Netlify")](https://netlify.app/ "Netlify") [![Prisma](https://skillicons.dev/icons?i=prisma "Prisma")](https://prisma.io/ "Prisma") [![MySQL](https://skillicons.dev/icons?i=mysql "MySQL")](https://mysql.com/ "MySQL")

## :wrench: Stats

[![Stats for Genius](/.github/images/stats.svg "Stats for Genius")](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fai-genius.netlify.app%2F "Stats for Genius")

## :raised_hands: Contribute

You might encounter some bugs while using this app. You are more than welcome to contribute. Just submit changes via pull request and I will review them before merging. Make sure you follow community guidelines.

## :gem: Acknowledgements

Useful resources and dependencies that are used in Genius.

- [@clerk/nextjs](https://www.npmjs.com/package/@clerk/nextjs): ^4.29.3
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): ^3.3.4
- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^5.8.0
- [@radix-ui/react-avatar](https://www.npmjs.com/package/@radix-ui/react-avatar): ^1.0.4
- [@radix-ui/react-dialog](https://www.npmjs.com/package/@radix-ui/react-dialog): ^1.0.5
- [@radix-ui/react-label](https://www.npmjs.com/package/@radix-ui/react-label): ^2.0.2
- [@radix-ui/react-progress](https://www.npmjs.com/package/@radix-ui/react-progress): ^1.0.3
- [@radix-ui/react-select](https://www.npmjs.com/package/@radix-ui/react-select): ^2.0.0
- [@radix-ui/react-slot](https://www.npmjs.com/package/@radix-ui/react-slot): ^1.0.2
- [axios](https://www.npmjs.com/package/axios): ^1.6.5
- [class-variance-authority](https://www.npmjs.com/package/class-variance-authority): ^0.7.0
- [clsx](https://www.npmjs.com/package/clsx): ^2.1.0
- [crisp-sdk-web](https://www.npmjs.com/package/crisp-sdk-web): ^1.0.21
- [lucide-react](https://www.npmjs.com/package/lucide-react): ^0.309.0
- [next](https://www.npmjs.com/package/next): 14.0.4
- [openai](https://www.npmjs.com/package/openai): ^3.3.0
- [react](https://www.npmjs.com/package/react): ^18
- [react-dom](https://www.npmjs.com/package/react-dom): ^18
- [react-hook-form](https://www.npmjs.com/package/react-hook-form): ^7.49.3
- [react-markdown](https://www.npmjs.com/package/react-markdown): ^9.0.1
- [replicate](https://www.npmjs.com/package/replicate): ^0.25.2
- [sonner](https://www.npmjs.com/package/sonner): ^1.3.1
- [stripe](https://www.npmjs.com/package/stripe): ^14.12.0
- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge): ^2.2.0
- [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate): ^1.0.7
- [typewriter-effect](https://www.npmjs.com/package/typewriter-effect): ^2.21.0
- [zod](https://www.npmjs.com/package/zod): ^3.22.4
- [zustand](https://www.npmjs.com/package/zustand): ^4.4.7
- [@types/node](https://www.npmjs.com/package/@types/node): ^20
- [@types/react](https://www.npmjs.com/package/@types/react): ^18
- [@types/react-dom](https://www.npmjs.com/package/@types/react-dom): ^18
- [autoprefixer](https://www.npmjs.com/package/autoprefixer): ^10.0.1
- [eslint](https://www.npmjs.com/package/eslint): ^8
- [eslint-config-next](https://www.npmjs.com/package/eslint-config-next): 14.0.4
- [postcss](https://www.npmjs.com/package/postcss): ^8
- [prisma](https://www.npmjs.com/package/prisma): ^5.8.0
- [tailwindcss](https://www.npmjs.com/package/tailwindcss): ^3.3.0
- [typescript](https://www.npmjs.com/package/typescript): ^5

## :coffee: Buy Me a Coffee

[<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" width="200" />](https://www.buymeacoffee.com/sanidhy "Buy me a Coffee")

## :rocket: Follow Me

[![Follow Me](https://img.shields.io/github/followers/sanidhyy?style=social&label=Follow&maxAge=2592000)](https://github.com/sanidhyy "Follow Me")
[![Tweet about this project](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2FTechnicalShubam)](https://twitter.com/intent/tweet?text=Check+out+this+amazing+app:&url=https%3A%2F%2Fgithub.com%2Fsanidhyy%2Fgenius-ai "Tweet about this project")
[![Subscribe to my YouTube Channel](https://img.shields.io/youtube/channel/subscribers/UCNAz_hUVBG2ZUN8TVm0bmYw)](https://www.youtube.com/@OPGAMER./?sub_confirmation=1 "Subscribe to my YouTube Channel")

## :books: Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## :page_with_curl: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## :star: Give A Star

You can also give this repository a star to show more people and they can use this repository.

## :star2: Star History

<a href="https://star-history.com/#sanidhyy/genius-ai&Timeline">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=sanidhyy/genius-ai&type=Timeline&theme=dark" />
  <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=sanidhyy/genius-ai&type=Timeline" />
  <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=sanidhyy/genius-ai&type=Timeline" />
</picture>
</a>

<br />
<p align="right">(<a href="#readme-top">back to top</a>)</p>
