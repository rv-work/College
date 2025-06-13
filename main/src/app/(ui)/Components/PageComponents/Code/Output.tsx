import React from 'react';
import { Clock } from 'lucide-react';

interface TestResult {
  input: {
    'nums ': string;
    'target ': string;
  };
  output: string;
  result: {
    stdout: string | null;
    time: string;
    memory: number;
    stderr: null | string;
    token: string;
    compile_output: null | string;
    message: null | string;
    status: {
      id : number;
      description : string
    }
  };
}

interface OutputProps {
  darkMode: boolean;
  output: null | TestResult[];
  outPutMsg: string;
}

const Output: React.FC<OutputProps> = ({ darkMode, output, outPutMsg }) => {

  const getActualOutput = (actual: string | null) => {
    return actual === null ? "No output" : actual;
  };

  const renderTestResults = () => {
    if (Array.isArray(output)) {
      return (

        <div className="space-y-4">
          <h4 className="font-medium">Test Results:</h4>
          {output.map((testCase, index) => (
            <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-2`}>
              <p className="mb-1"><span className="font-medium">Test {index + 1}:</span></p>
              <p className="mb-1"><span className="font-medium">Input:</span> nums = {testCase.input['nums ']}, target = {testCase.input['target ']}</p>
              <p className="mb-1"><span className="font-medium">Expected:</span> {testCase.output}</p>
              <p className="mb-1"><span className="font-medium">Your Output:</span> {getActualOutput(testCase.result.stdout)}</p>
              <p className={`font-medium ${testCase.result.status.description === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                {testCase.result.status.description === 'Accepted' ? 'Passed' : 'Failed'}
              </p>
              <div className="text-xs mt-2 flex items-center">
                <Clock size={12} className="mr-1" />
                <span>Time: {testCase.result.time}ms | Memory: {(testCase.result.memory / 1024).toFixed(2)} MB</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return <pre className="whitespace-pre-wrap overflow-y-auto max-h-36">{outPutMsg || "Run your code to see the output here..."}</pre>;
  };

  return (
    <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-2`}>
      <div className={`p-3 rounded-lg font-mono text-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-2xl text-blue-600">Output</h3>
          <div className="flex items-center text-xs">
            <Clock size={12} className="mr-1" />
            <span>Execution Summary</span>
          </div>
        </div>
        {renderTestResults()}
      </div>
    </div>
  );
};

export default Output;