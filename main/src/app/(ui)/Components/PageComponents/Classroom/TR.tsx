import React from 'react';
import Input from './Input';
import Output from './Output';

interface TRProps {
  loading: boolean;
  output: string;
  setInput: (input: string) => void;
  show : boolean;
  setShow : (show : boolean) => void;
}

const TR: React.FC<TRProps> = ({ loading, output, setInput ,show  , setShow}) => {

  return (
    <div className="flex flex-col h-full pl-4 bg-gray-800 rounded-md shadow-md overflow-y-auto">
      <div className="w-full flex items-center gap-4 mb-2 text-xl relative">
        <button
          onClick={() => setShow(false)}
          className={`${!show ? ' text-blue-600' : 'opacity-70'}`}
          aria-pressed={!show}
        >
          Input
        </button>

        <div className="h-6 w-[1px] bg-gray-400 "></div> 

        <button
          onClick={() => setShow(true)}
          className={`${show ? ' text-blue-600' : 'opacity-70'}`}
          aria-pressed={show}
        >
          Output
        </button>
      </div>

      <div className="w-full h-[1px] bg-gray-400 mb-2"></div>

      <div >
        {!show ? (
          <Input setInput={setInput} />
        ) : (
          <Output loading={loading} output={output} />
        )}
      </div>
    </div>
  );
};

export default TR;
