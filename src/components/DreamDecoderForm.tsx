"use client"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FaSpinner } from "react-icons/fa"
import DreamDecoderResult from "./DreamDecoderResult"

export default function DreamDecoderForm() {
  const [, startTransition] = useTransition()
  const [routine, setRoutine] = useState("")
  const [decoded, setDecoded] = useState("")
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [Dream, setDream] = useState("")

  const handleDecode = async () => {
    setLoading(true)
    startTransition(async () => {
      try {
        const res = await fetch(
          "https://dream-decodebackend-production.up.railway.app/api/dream-roast",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              dream: Dream,
              routine,
            }),
          }
        )

        const data = await res.json()

        if (res.ok) {
          setDecoded(data)
        } else {
          setDecoded("Error: " + data.error)
        }
      } catch (err) {
        setDecoded("Something went wrong.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    })
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-lg bg-background border">
      {/* 1. Enter Daily Username */}
      <div className="mb-6">
        <label className="block text-xl font-semibold mb-2">
          1. Enter Your username
        </label>
        <Textarea
          rows={4}
          placeholder="Your Username without any @ example: itshp7"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading} // Disable when loading
        />
      </div>
      <div className="mb-6">
        <label className="block text-xl text-center font-semibold mb-2">
          Or
        </label>
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
          disabled={loading} // Disable when loading
        />
      </div>

      <div className="mb-6">
        <label className="block text-xl font-semibold mb-2">
          3. Your end Goal or dream
        </label>
        <Textarea
          rows={4}
          required
          placeholder="Astronaut..."
          value={Dream}
          onChange={(e) => setDream(e.target.value)}
          disabled={loading} // Disable when loading
        />
      </div>

      {/* 3. Decode Your Dream */}
      <div className="mb-6">
        <label className="block text-xl font-semibold mb-2">
          4. Decode your dream
        </label>
        <Button
          onClick={handleDecode}
          disabled={loading || (!Dream && !username)}
        >
          {loading ? (
            <>
              Decoding...{" "}
              <FaSpinner className="animate-spin inline-block ml-2" />
            </>
          ) : (
            "Decode My Dream ✨"
          )}
        </Button>

        {/* Show shimmer effect while loading or the result when done */}
        {loading ? (
          <DreamDecoderResult decoded={null} />
        ) : (
          decoded && <DreamDecoderResult decoded={decoded} />
        )}
      </div>
    </div>
  )
}
