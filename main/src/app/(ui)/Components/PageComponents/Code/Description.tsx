import React from 'react'

interface Question {
  quesNo: number;
  title: string;
  description: string;
  constraint: string;
  tags: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  cases: {
    caseNumber: number;
    input: string[];
    output: string;
    explanation?: string;
  }[];
  templateCode: {
    Python: string;
    Java: string;
    Cpp: string;
  };
  wrapperCode: {
    Python: string;
    Java: string;
    Cpp: string;
  };
}




const Description = ({darkMode , question} : {darkMode : boolean , question : Question}) => {
  return (
       <div className='flex flex-col'>
                <div className="mb-4">
                  <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <p className="whitespace-pre-wrap">{question.description}</p>
                  </div>
                </div>
                <h3 className="font-bold mb-2">Constraints:</h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                  <ul className="list-disc list-inside space-y-1">
                    {question.constraint.split('\n').map((line, idx) => (
                      <li key={idx} className="text-sm">{line.trim()}</li>
                    ))}
                  </ul>
                </div>
              </div>
  )
}

export default Description
