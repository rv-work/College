import React from 'react'

const Error = ({error} : {error : string}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#030711] to-[#111827] text-white">
    <div className="text-center bg-gray-800 p-8 rounded-xl shadow-lg max-w-md">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-medium text-red-400 mb-2">Error Loading Data</h3>
      <p className="text-gray-400 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
  )
}

export default Error
