import React, { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react';


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


interface ExampleProps {
  question: Question;
  darkMode: boolean;

}



const Examples: React.FC<ExampleProps> = ({ question, darkMode }) => {

  const [expandedCase, setExpandedCase] = useState<number | null>(1);
  const toggleCase = (caseNumber: number) => {
    setExpandedCase(expandedCase === caseNumber ? null : caseNumber);
  };



  return (
    <div>
      {question.cases.map((testCase) => (
        <div key={testCase.caseNumber} className={`mb-4 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div
            className={`flex justify-between items-center p-3 cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={() => toggleCase(testCase.caseNumber)}
          >
            <span className="font-medium">Example {testCase.caseNumber}</span>
            {expandedCase === testCase.caseNumber ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>

          {expandedCase === testCase.caseNumber && (
            <div className="p-4">
              <div className="mb-3">
                <h4 className="font-medium mb-1">Input:</h4>
                {testCase.input.map((inp, i) => (
                  <pre
                    key={i}
                    className={` p-2  ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                  >
                    {i % 2 === 0 ? (
                      <span className={`font-semibold ${!darkMode ? 'text-blue-600' : 'text-blue-400'}`}>{inp}:</span>
                    ) : (
                      <span className={` ${!darkMode ? 'text-black' : 'text-gray-300'}`}>{inp}</span>
                    )}
                  </pre>
                ))}

              </div>
              <div className="mb-3">
                <h4 className="font-medium mb-1">Output:</h4>
                <pre className={`p-2 rounded ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>{testCase.output}</pre>
              </div>
              {testCase.explanation && (
                <div>
                  <h4 className="font-medium mb-1">Explanation:</h4>
                  <p>{testCase.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Examples
