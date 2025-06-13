import React from 'react'

interface InputProps {
  loading : boolean,
  output : string
}

const Output : React.FC<InputProps> = ({loading , output}) => {
  return (
    <div>
       <div className='p-2'>
        {!loading && !output && <p className='text-gray-500'>...Run Code To Get Output</p> }
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
              <span>Executing code...</span>
            </div>
          ) : (
            <pre className="text-sm whitespace-pre-wrap">{output}</pre>
          )}
        </div>
    </div>
  )
}

export default Output
