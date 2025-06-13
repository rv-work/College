import React from "react";
import Section from "./Section";

interface UnitData {
  name: string;
  topics: string[];
  youtube: string[];
  notes: string[];
  ppt: string[];
  important: string[];
}

interface ContentProps {
  unit: UnitData; 
}

const Content: React.FC<ContentProps> = ({ unit }) => {
  return (
    <div className="flex flex-col p-6 bg-[#1f2937] text-white border-t border-blue-900/20">
      <div className="mb-6">
        <h4 className="font-bold text-lg mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Topics</h4>
        <div className="flex flex-wrap gap-2">
          {unit.topics.length > 0 ? (
            unit.topics.map((topic, index) => (
              <span 
                key={index} 
                className="bg-amber-100 text-amber-900 px-3 py-1 rounded-lg text-sm font-medium"
              >
                {topic}
              </span>
            ))
          ) : (
            <p className="text-gray-400 italic">No topics available</p>
          )}
        </div>
      </div>

      <Section
        title="YouTube Playlist"
        items={unit.youtube}
        buttonClass="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        icon={
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
          </svg>
        }
      />

      <Section
        title="Notes"
        items={unit.notes}
        buttonClass="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        icon={
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
      />

      <Section
        title="PPT"
        items={unit.ppt}
        buttonClass="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
        icon={
          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        }
      />

      <div className="mt-6">
        <h4 className="font-bold text-lg mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-500">Important Topics</h4>
        <div className="flex flex-wrap gap-2">
          {unit.important.length > 0 ? (
            unit.important.map((item, index) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-sm"
              >
                {item}
              </span>
            ))
          ) : (
            <p className="text-gray-400 italic">No important topics available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;