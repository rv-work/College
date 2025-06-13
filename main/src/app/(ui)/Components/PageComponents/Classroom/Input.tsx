import React from 'react';

interface InputProps {
  setInput: (input: string) => void;
}

const Input: React.FC<InputProps> = ({ setInput }) => {
  return (
    <div className=''>
      <textarea
        id="input"
        name="input"
        placeholder="Type your input here..."
        className=" w-full h-full p-2  bg-gray-800 text-white rounded-md focus:outline-none  resize-none"
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Input;
