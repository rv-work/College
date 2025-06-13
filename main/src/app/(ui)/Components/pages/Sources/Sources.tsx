"use client";

import React, { useState } from 'react';
import Sidebar from '../../PageComponents/Sources/Sidebar/Sidebar';
import Welcome from '../../PageComponents/Sources/Welcome';
import Academic from '../../PageComponents/Sources/Main/Academic'; 
import Code from '../../PageComponents/Sources/Main/Code';

const Sources = () => {
  const [search, setSearch] = useState<string | null>("");
  const [content , setContent] = useState<boolean | null>(false);

  return (
    <>
      {search === '' ? (
        <Welcome setSearch={setSearch} />
      ) : (
        <div className="p-6">
          <div className="flex h-full">
            <Sidebar search={search} setSearch={setSearch} setContent={setContent} />
            <div className="w-3/4 ml-8 overflow-y-auto scrollbar-none max-h-[82vh]">
              {content === false ? (
                <div className="flex flex-col items-center justify-center bg-[#111827] rounded-xl shadow-xl border border-blue-900/20 h-full p-8 text-center">
                  <div className="mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                    Select Your Sources
                  </h2>
                  <p className="text-blue-300 max-w-md">
                    Use the sidebar to select what sources you are looking for.
                    Once you&apos;ve made your selection, the content will appear here.
                  </p>
                </div>
              ) : (
                search === "Coding" ? (
                  <Code />
                ) : (
                  <Academic />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sources;
