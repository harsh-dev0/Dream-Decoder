import Groq from "groq-sdk"
import { NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"
interface Tweet {
  text: string
}

const getTweets = async (username: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    userDataDir: "./tmp/twitter-user-data",
    args: ["--no-sandbox"],
  })
  const page = await browser.newPage()

  try {
    await page.goto("https://twitter.com/login", {
      waitUntil: "networkidle2",
    })

    // Check if already logged in
    const isLoggedIn = await page
      .evaluate(
        () =>
          !!document.querySelector(
            '[data-testid="SideNav_AccountSwitcher_Button"]'
          )
      )
      .catch(() => false)

    if (!isLoggedIn) {
      await page.waitForSelector('input[name="text"]')
      await page.type(
        'input[name="text"]',
        process.env.TWITTER_USERNAME!,
        {
          delay: 50,
        }
      )
      await page.keyboard.press("Enter")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const passwordInput = await page
        .waitForSelector('input[name="password"]', { timeout: 5000 })
        .catch(() => null)

      if (!passwordInput) {
        await page.waitForSelector('input[name="text"]')
        await page.type(
          'input[name="text"]',
          process.env.TWITTER_USERNAME!,
          {
            delay: 50,
          }
        )
        await page.keyboard.press("Enter")
      }

      await page.waitForSelector('input[name="password"]')
      await page.type(
        'input[name="password"]',
        process.env.TWITTER_PASSWORD!,
        {
          delay: 50,
        }
      )
      await page.keyboard.press("Enter")

      await page.waitForNavigation({ waitUntil: "networkidle2" })
    }

    // Navigate to user's profile
    await page.goto(`https://twitter.com/${username}`, {
      waitUntil: "domcontentloaded",
    })
    await page.waitForSelector("article")

    const tweets = await page.evaluate(() => {
      const tweetEls = document.querySelectorAll("article")
      return Array.from(tweetEls)
        .slice(0, 500)
        .map((el) => {
          const text = el.innerText
          return { text }
        })
    })

    const bio = await page.evaluate(() => {
      const bioEl = document.querySelector(
        'div[data-testid="UserDescription"]'
      )
      return bioEl ? bioEl.textContent : "No bio found"
    })

    return { tweets, bio }
  } catch (err) {
    console.error("❌ Twitter scraping error:", err)
    return { tweets: [], bio: "Error fetching bio" }
  } finally {
    await browser.close()
  }
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { username = null, dream, routine = null } = await req.json()

    if (!username && !routine) {
      return NextResponse.json(
        {
          error:
            "Missing username or routine, please provide at least one.",
        },
        { status: 400 }
      )
    }

    if (!dream) {
      return NextResponse.json({ error: "Missing dream" }, { status: 400 })
    }

    let userContext = ""
    let bio = ""
    let tweets: Tweet[] = []

    if (username) {
      const { bio: scrapedBio, tweets: scrapedTweets } = await getTweets(
        username
      )
      bio = scrapedBio!
      tweets = scrapedTweets

      userContext = `
User Bio: ${bio}
Recent Tweets:
${tweets.map((t: Tweet) => `- ${t.text}`).join("\n")}
`
    }

    if (routine) {
      userContext += `
User Routine: ${routine}
`
    }

    const prompt = `
You are a sarcastic but insightful dream analyst AI who roasts users based on their current lifestyle and ambitions. Be brutally honest, hilarious, and slightly motivational.

Your tone = sharp, witty, and Gen-Z friendly. Think of it like a mix between a therapist, a Twitter shitposter, and a life coach who's had too much caffeine.

Analyze their dream along with their provided context and roast them with charm.

Give output in this format (no intro, just output):

---

🔥 Dream Roast Report 🔥

🎯 Dream Meter: XX%  
(A roasted one-liner about how close they are. Be funny.)

🟢 Delulu or Doing Fine?
- <funny analysis of what they're doing right – playful praise>

🔴 Caught in 4K:
- <what they're doing wrong, in a very sarcastic tone – roast with love>

⏳ Time to Touch Grass (aka your dreams):
<snarky prediction of how long they'll take to reach their goals>

🧠 Final Verdict (aka one-liner roast):
<end it with a mic-drop punchline>

---

User Dream: ${dream}
${userContext}
`

    const chatResponse = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 1,
    })

    const roast =
      chatResponse.choices[0]?.message?.content ||
      "Something went wrong generating the roast"

    return NextResponse.json(roast)
  } catch (err) {
    console.error("Error in Dream Roast API:", err)
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: (err as Error).message || String(err),
      },
      { status: 500 }
    )
  }
}
