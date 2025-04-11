"use client"

import { useSession, signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function DreamDecoderForm() {
  const { data: session } = useSession()
  const [routine, setRoutine] = useState("")
  const [decoded, setDecoded] = useState("")

  const handleDecode = () => {
    // dummy decode, later replace with actual logic
    setDecoded(
      "🧠 Your routine reveals you're secretly a night owl genius."
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-background border">
      {/* 1. Twitter Authorization */}
      <div className="mb-6">
        <label className="block text-xl font-semibold mb-2">
          1. Authorize with Twitter
        </label>
        {!session ? (
          <Button onClick={() => signIn("twitter")}>
            Authorize Twitter
          </Button>
        ) : (
          <p className="text-green-500">
            ✅ Authorized as @{session.user?.name}
          </p>
        )}
      </div>

      {/* 2. Enter Daily Routine */}
      <div className="mb-6">
        <label className="block text-xl font-semibold mb-2">
          2. Manually enter your daily routine
        </label>
        <Textarea
          rows={4}
          placeholder="Wake up, scroll Twitter, drink coffee, daydream..."
          value={routine}
          onChange={(e) => setRoutine(e.target.value)}
        />
      </div>

      {/* 3. Decode Your Dream */}
      <div className="mb-6">
        <label className="block text-xl font-semibold mb-2">
          3. Decode your dream
        </label>
        <Button onClick={handleDecode} disabled={!routine}>
          Decode My Dream ✨
        </Button>

        {decoded && (
          <div className="mt-4 p-4 border rounded-xl bg-muted">
            <p>{decoded}</p>
          </div>
        )}
      </div>
    </div>
  )
}
