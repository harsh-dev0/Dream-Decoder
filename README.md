# Dream Decoder 🧠✨

**Dream Decoder** is a playful, interactive web app built with **Next.js**, **NextAuth**, and **TailwindCSS**, designed to decode your dreams based on your daily routine and Twitter activity.

## 🌟 Features

- 🔐 OAuth login with Twitter via `next-auth`
- ✍️ Manual input of daily routine
- 🧠 Fun dream "decoding" logic (extendable with AI/LLMs)
- 🍪 Session stored securely (optional local storage fallback)
- 🎨 Clean Gen-Z friendly UI using Tailwind and ShadCN components

## 📦 Tech Stack

- **Next.js App Router**
- **NextAuth.js** (Twitter Provider)
- **TailwindCSS + ShadCN/UI**
- **Typescript**
- Optional: Animate with Framer Motion

## 🚀 Running Locally

```bash
git clone https://github.com/yourname/dream-decoder.git
cd dream-decoder
pnpm install
pnpm dev
```

## 🛠️ Setup

1. Add `.env.local`:

```env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
TWITTER_CLIENT_ID=your_id
TWITTER_CLIENT_SECRET=your_secret
```

2. Optional: Extend `types/next-auth.d.ts` for session typing

## ✅ To-Do

- [x] Twitter OAuth
- [x] Manual routine entry
- [x] Dream decoding dummy logic
- [ ] Add AI integration (OpenAI or similar)
- [ ] Mobile-first polishing & animations
- [ ] Deploy on Vercel 🚀

## 📸 Screenshots

_(Will Add later after first deployment)_

---

Built by [me](https://twitter.com/itshp7) with love💜

☕ [Support the grind](https://www.buymeacoffee.com/itshp7)
If you like what I’m building, consider supporting — it keeps the caffeine flowing!

---

## 📓 Journal Summary (April 11)

- Integrated **NextAuth.js** with Twitter OAuth
- Debugged common issues (callback URLs, session handling, typing)
- Set up `accessToken` in session using callbacks & extended session type
- Created `ThemeProvider` for dark/light toggle
- Designed `DreamDecoderForm` component with 3 inputs:
  1. Twitter Auth
  2. Daily Routine
  3. Dream Decoding Output
- Improved understanding of OAuth2, JWT, and SSR auth flows

---

## 📓 Journal Summary (April 12)

- 🧠 Integrated an **LLM-based dream decoder** (mock setup for now, replacing dummy logic)
- 🎨 Made significant **UI improvements** for better UX and responsiveness
- 🔁 Fixed **Twitter login** issues — now smooth login/logout experience using `next-auth`
- 🔍 Explored and experimented with **Puppeteer** to fetch user Twitter activity (will finalize tomorrow)
- 🛠️ Setup groundwork to analyze real Twitter data and combine it with daily routine for smarter dream decoding

---
