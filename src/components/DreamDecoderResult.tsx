interface Decoded {
  decoded: string | null
}

export default function DreamDecoderResult({ decoded }: Decoded) {
  if (!decoded) {
    return (
      <div className="mt-4 space-y-6 p-6 bg-gray-900 text-white rounded-lg">
        <div className="animate-pulse">
          {/* Report Card */}
          <div className="p-5 bg-gray-800 rounded-lg space-y-4">
            {/* Header with meter */}
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
              <div className="h-6 bg-gray-600 rounded w-3/4"></div>
            </div>

            {/* First paragraph */}
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-4/5"></div>
              </div>
            </div>

            {/* Second paragraph */}
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-11/12"></div>
                <div className="h-5 bg-gray-600 rounded w-4/5"></div>
              </div>
            </div>

            {/* Third paragraph */}
            <div className="flex items-start space-x-2">
              <div className="h-5 w-5 bg-yellow-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>

            {/* Final verdict */}
            <div className="flex items-start space-x-2 pt-2">
              <div className="h-5 w-5 bg-pink-600 rounded-full mt-1 flex-shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-600 rounded w-full"></div>
                <div className="h-5 bg-gray-600 rounded w-11/12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Parse the decoded text to extract sections
  const title = "🔥 Dream Roast Report 🔥"

  // Fixed the regex matches to handle null cases
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

  const caughtSection = decoded.includes("🔴 Caught in4K:")
    ? decoded.split("🔴 Caught in 4K:")[1].split("⏳")[0]
    : "- Let's be honest about where you're falling short."

  const timeSection = decoded.includes("⏳ Time to Touch Grass")
    ? decoded.split("⏳ Time to Touch Grass")[1].split("🧠")[0]
    : "- Maybe it's time to reconsider your approach."

  const finalVerdict = decoded.includes("🧠 Final Verdict")
    ? decoded.split("🧠 Final Verdict")[1]
    : '"Dreams are nice, but waking up to reality is where the magic happens."'

  return (
    <div className="mt-4 space-y-6 p-6 bg-gray-900 text-white rounded-lg">
      <div>
        {/* Report Card */}
        <div className="p-5 bg-gray-800 rounded-lg space-y-4">
          {/* Header with meter */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg font-semibold">{dreamMeter}</span>
            </div>
            <p className="italic text-gray-300 mt-2">{dreamQuote}</p>
          </div>

          {/* First section */}
          <div className="flex items-start space-x-2">
            <div className="h-5 w-5 bg-green-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <span className="font-semibold">Delulu or Doing Fine?</span>
              <p>{deluluSection}</p>
            </div>
          </div>

          {/* Second section */}
          <div className="flex items-start space-x-2 mt-4">
            <div className="h-5 w-5 bg-red-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <span className="font-semibold">Caught in4K:</span>
              <p>{caughtSection}</p>
            </div>
          </div>

          {/* Third section */}
          <div className="flex items-start space-x-2 mt-4">
            <div className="h-5 w-5 bg-yellow-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <span className="font-semibold">Time to Touch Grass:</span>
              <p>{timeSection}</p>
            </div>
          </div>

          {/* Final verdict */}
          <div className="flex items-start space-x-2 mt-6 pt-4 border-t border-gray-700">
            <div className="h-5 w-5 bg-pink-600 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <span className="font-semibold">Final Verdict:</span>
              <p className="italic">{finalVerdict}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
