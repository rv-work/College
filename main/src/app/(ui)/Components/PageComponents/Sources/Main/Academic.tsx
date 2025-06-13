"use client";
import React, { useState } from "react";
import Unit from "./Unit";
import PYQSection from "./PYQSection";
import STButton from "./STButton";
import { useSource } from "@/app/Context/SourceContext";
import toast from "react-hot-toast";

interface Paper {
  name: string;
  file: string;
}

interface ST {
  year: number;
  semester: "Odd" | "Even";
  papers: Paper[];
}

const Academic = () => {
  const [expandSection, setExpandSection] = useState<string | null>("");
  const { source } = useSource();

  const handleSectionClick = (section: string) => {
    setExpandSection(expandSection === section ? null : section);
  };

  if (!source || source.length === 0 || !source[0].years) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-blue-900 p-8 text-center">
        <div className="mb-6">
          <svg className="animate-spin h-16 w-16 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Loading Your Content</h3>
        <p className="text-blue-300 max-w-md text-lg">
          Please wait while we retrieve your academic materials...
        </p>
      </div>
    );
  }

  const yearData = source[0].years[0];
  const subjectData = yearData.subjects[0];
  const sortedUnits = [...subjectData.units].sort((a, b) =>
    a.name.includes("Unit -1") ? -1 : b.name.includes("Unit -1") ? 1 : 0
  );

  const previousSTs = ((subjectData.sts || []) as ST[]).map((st) => ({
    ...st,
    semester: st.semester === "Odd" || st.semester === "Even" ? st.semester : "Odd",
  }));

  const aktuPapers = subjectData.aktus || [];

  const groupedData = previousSTs.reduce((acc, st: ST) => {
    if (!acc[st.year]) {
      acc[st.year] = { odd: [], even: [] };
    }
    if (st.semester === "Odd") {
      acc[st.year].odd = st.papers;
    } else {
      acc[st.year].even = st.papers;
    }
    return acc;
  }, {} as Record<number, { odd: Paper[]; even: Paper[] }>);

  return (
    <div className="overflow-y-auto flex flex-col gap-6 py-6 px-4 md:px-8 bg-gradient-to-b from-gray-900 to-blue-900 min-h-screen">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Academic Resources</h1>
        <p className="text-blue-300">Access all your academic materials in one place</p>
      </div>

      {/* Units Section */}
      <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Course Units
        </h2>
        <Unit units={sortedUnits} />
      </div>

      {/* Previous STs Section */}
      <PYQSection
        title="Previous Sessional Tests"
        expandSection={expandSection}
        handleSectionClick={handleSectionClick}
        content={
          <div className="space-y-8">
            {Object.entries(groupedData).length > 0 ? (
              Object.entries(groupedData)
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([year, { odd, even }]) => (
                  <div key={year} className="bg-gray-800 bg-opacity-40 rounded-lg p-4 border border-gray-700">
                    <div className="font-bold text-xl mb-4 text-blue-300">{year}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4">
                        <h2 className="text-white font-bold text-lg mb-3 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Odd Semester
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                          {odd.length > 0 ? (
                            odd.map((st, i) => (
                              <div key={i} className="text-center bg-blue-900 bg-opacity-40 rounded-lg p-3 transition-all hover:bg-blue-800 hover:scale-105">
                                <p className="text-white font-medium mb-2">{st.name}</p>
                                <STButton st={st.file} />
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 italic">No Papers Available</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-900 bg-opacity-60 rounded-lg p-4">
                        <h2 className="text-white font-bold text-lg mb-3 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Even Semester
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                          {even.length > 0 ? (
                            even.map((st, i) => (
                              <div key={i} className="text-center bg-blue-900 bg-opacity-40 rounded-lg p-3 transition-all hover:bg-blue-800 hover:scale-105">
                                <p className="text-white font-medium mb-2">{st.name}</p>
                                <STButton st={st.file} />
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-400 italic">No Papers Available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white text-lg">No Previous Sessional Tests Available</p>
                <p className="text-blue-300 text-sm mt-2">Check back later for updates</p>
              </div>
            )}
          </div>
        }
      />

      {/* AKTU Previous Years Papers Section */}
      <PYQSection
        title="AKTU Previous Years Papers"
        expandSection={expandSection}
        handleSectionClick={handleSectionClick}
        content={
          <div className="py-4">
            {aktuPapers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {aktuPapers.map((paper, index) => (
                  <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-all hover:shadow-lg hover:scale-105 flex flex-col items-center">
                    <div className="font-bold text-xl mb-3 text-blue-300">{paper.year}</div>

                    <button
                    onClick={() => {
                      if (paper.file !== "Soon") {
                        window.open(paper.file, "_blank");
                      } else {
                        toast.error("File Does Not Exist")
                      }
                    }}
                    className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-md transition-all flex items-center `}>

                      {paper.file!=="Soon" ? (
                         <>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                       </svg>
 
                       Download PDF
                       </>

                      ) : (
                        "Soon"
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 01-2-2 2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2h9z" />
                </svg>
                <p className="text-white text-xl">No AKTU Papers Available</p>
                <p className="text-blue-300 mt-2">We&apos;ll update this section once papers are available</p>
              </div>
            )}
          </div>
        }
      />

      {/* Footer */}
      <div className="mt-8 text-center text-gray-400 text-md p-4">
        <p>Last updated: April 2025</p>
      </div>
    </div>
  );
};

export default Academic;
