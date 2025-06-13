import React, { useState, useEffect } from 'react';

interface WelcomeProps {
  setSearch: (value: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ setSearch }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-[#030711]">
      <div className={`transform transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 mb-4 text-center">
          Explore the World of
        </h1>
        <h2 className="text-3xl font-bold text-blue-300 mb-12 text-center">
          Knowledge Hub
        </h2>
      </div>
      
      <div className={`flex flex-wrap gap-8 justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <button
          onClick={() => setSearch('Academics')}
          className="bg-[#111827] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:bg-indigo-900 hover:scale-105 transform transition-all duration-300 font-bold text-lg border-l-4 border-indigo-500"
        >
          Academics
        </button>
        <button
          onClick={() => setSearch('Coding')}
          className="bg-[#111827] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-emerald-500/30 hover:bg-emerald-900 hover:scale-105 transform transition-all duration-300 font-bold text-lg border-l-4 border-emerald-500"
        >
          Coding
        </button>
      </div>
      
      <div className={`mt-16 text-blue-300 text-center max-w-md transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <p className="text-sm">Select a category to begin your journey</p>
        <div className="mt-6 flex justify-center">
          <div className="animate-bounce bg-[#111827] p-2 w-10 h-10 ring-1 ring-blue-500 shadow-lg rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-blue-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;