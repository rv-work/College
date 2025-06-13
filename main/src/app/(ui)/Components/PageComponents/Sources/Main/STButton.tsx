import React from "react";

interface STButtonProps {
  st: string; // st = source link
}



const STButton: React.FC<STButtonProps> = ({ st }) => {
  const handleClick = () => {
    window.open(st, "_blank");
  };

  
  if(st ==="Soon"){
    return (
      <button
        disabled
        className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-800 transition-all duration-300 cursor-not-allowed"
      >
       {st}
      </button>
    );
  
  }
 

  return (
    <button 
    onClick={handleClick}
    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-md transition-all flex items-center">

    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>

    PDF
  </button>
  )
};

export default STButton;
