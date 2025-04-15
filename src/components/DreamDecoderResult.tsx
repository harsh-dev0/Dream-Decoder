import Link from "next/link"

interface Decoded {
  decoded: string | null
}

export default function DreamDecoderResult({ decoded }: Decoded) {
  if (!decoded) {
    return (
      <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg">
        <div className="animate-pulse">
          <div className="p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-6 w-3/4 bg-gray-600 rounded text-center"></div>
              <div className="h-5 w-1/2 bg-gray-600 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-600 rounded mt-1"></div>
            </div>

            {/* First paragraph */}
            <div className="flex items-start space-x-2 mt-3">
              <div className="h-4 w-4 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-1.5 w-full">
                <div className="h-4 bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-600 rounded w-4/5"></div>
              </div>
            </div>

            {/* Second paragraph */}
            <div className="flex items-start space-x-2 mt-3">
              <div className="h-4 w-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-1.5 w-full">
                <div className="h-4 bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-600 rounded w-11/12"></div>
              </div>
            </div>

            {/* Third paragraph */}
            <div className="flex items-start space-x-2 mt-3">
              <div className="h-4 w-4 bg-yellow-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-1.5 w-full">
                <div className="h-4 bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>

            {/* Final verdict */}
            <div className="flex items-start space-x-2 mt-4 pt-2 border-t border-gray-700">
              <div className="h-4 w-4 bg-pink-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-1.5 w-full">
                <div className="h-4 bg-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gray-600 rounded w-11/12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (decoded.startsWith("Error:")) {
    return (
      <div className="w-full flex items-center justify-center p-4">
        <div className="p-4 bg-red-900 text-white rounded-lg w-full">
          <h2 className="text-xl font-bold text-center">⚠️ Error</h2>
          <p className="text-base text-center mt-3">
            {decoded.replace("Error:", "").trim()}
          </p>
          <p className="text-xs text-gray-300 text-center mt-2">
            Please try again or drop a DM to{" "}
            <Link
              href={"https://x.com/itshp7"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 underline"
            >
              me
            </Link>{" "}
            if the issue persists.
          </p>
        </div>
      </div>
    )
  }

  const dreamMeterMatch = decoded.match(/🎯 Dream Meter: (\d+)%/)
  const dreamMeter = dreamMeterMatch
    ? dreamMeterMatch[0]
    : "🎯 Dream Meter: 50%"

  const dreamQuoteMatch = decoded.match(/"([^"]+)"/)
  const dreamQuote = dreamQuoteMatch
    ? dreamQuoteMatch[0]
    : '"You\'ve got dreams, but reality has other plans."'

  const deluluSection = decoded.includes("🟢 Delulu or Doing Fine?")
    ? decoded.split("🟢 Delulu or Doing Fine?")[1].split("🔴")[0]
    : "- You're making progress, but are you really on the right track?"

  let caughtSection = "- Let's be honest about where you're falling short."

  if (decoded.includes("🔴 Caught in 4K:")) {
    const parts = decoded.split("🔴 Caught in 4K:")
    if (parts.length > 1) {
      const secondPart = parts[1]
      if (secondPart.includes("⏳")) {
        caughtSection = secondPart.split("⏳")[0]
      } else {
        caughtSection = secondPart
      }
    }
  } else if (decoded.includes("🔴 Caught in4K:")) {
    const parts = decoded.split("🔴 Caught in4K:")
    if (parts.length > 1) {
      const secondPart = parts[1]
      if (secondPart.includes("⏳")) {
        caughtSection = secondPart.split("⏳")[0]
      } else {
        caughtSection = secondPart
      }
    }
  }

  const timeSection = decoded.includes("⏳ Time to Touch Grass")
    ? decoded.split("⏳ Time to Touch Grass")[1].split("🧠")[0]
    : "- Maybe it's time to reconsider your approach."

  const finalVerdict = decoded.includes("🧠 Final Verdict")
    ? decoded.split("🧠 Final Verdict")[1]
    : '"Dreams are nice, but waking up to reality is where the magic happens."'

  return (
    <div className="mt-4 p-4 bg-gray-900 text-white rounded-lg">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {/* Header with fire emojis and title */}
        <div className="bg-gray-700 p-3 text-center">
          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
            <span className="text-orange-500">🔥</span>
            Dream Roast Report
            <span className="text-orange-500">🔥</span>
          </h2>
        </div>

        {/* Dream Meter and Quote */}
        <div className="p-3 text-center border-b border-gray-700">
          <div className="font-semibold text-base mb-1">{dreamMeter}</div>
          <p className="italic text-sm text-gray-300">{dreamQuote}</p>
        </div>

        {/* Content sections */}
        <div className="p-3 space-y-4">
          {/* Delulu section */}
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">
                Delulu or Doing Fine?
              </div>
              <p className="text-sm text-gray-300 mt-0.5">
                {deluluSection}
              </p>
            </div>
          </div>

          {/* Caught in 4K section */}
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">Caught in 4K:</div>
              <p className="text-sm text-gray-300 mt-0.5">
                {caughtSection}
              </p>
            </div>
          </div>

          {/* Time to Touch Grass section */}
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 bg-yellow-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">
                Time to Touch Grass:
              </div>
              <p className="text-sm text-gray-300 mt-0.5">{timeSection}</p>
            </div>
          </div>
        </div>

        {/* Final verdict */}
        <div className="p-3 bg-gray-700 mt-1">
          <div className="flex items-start gap-2">
            <div className="h-4 w-4 bg-pink-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <div className="font-medium text-sm">Final Verdict:</div>
              <p className="italic text-sm text-gray-300 mt-0.5">
                {finalVerdict}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
