import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-blue-900 p-8 text-center">
    <div className="mb-6">
      <svg className="animate-spin h-16 w-16 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">Loading Your Content</h3>
    <p className="text-blue-300 max-w-md text-lg">
      Please wait while we retrieve DSA materials...
    </p>
  </div>
  )
}

export default Loading
