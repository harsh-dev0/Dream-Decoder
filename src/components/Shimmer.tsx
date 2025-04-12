export default function Shimmer() {
  return (
    <div className="mt-4 space-y-6 p-6 bg-gray-900 text-white rounded-lg">
      <div className="animate-pulse">
        {/*<div className="h-8 bg-gray-700 rounded w-2/3 mb-4"></div>

        
        <div className="h-12 bg-gray-700 rounded-lg w-64 mb-8"></div> */}

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
