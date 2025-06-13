import React, { useState, useEffect } from "react";
import Input from "./Input";
import Link from "next/link";
import { schemaF } from "../../../pages/Contribute/schemaF";
import { useSource } from "@/app/Context/SourceContext";

interface SidebarProps {
  search: string | null;
  setSearch: (search: string) => void;
  setContent: (content: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ search, setSearch, setContent }) => {
  const [year, setYear] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [branchOptions, setBranchOptions] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setSource } = useSource();

  useEffect(() => {
    setBranchOptions(Object.keys(schemaF));
  }, []);

  useEffect(() => {
    if (branch) {
      setYearOptions(Object.keys(schemaF[branch] || {}));
      setYear("");
      setSubject("");
      setSubjectOptions([]);
    }
  }, [branch]);

  useEffect(() => {
    if (branch && year) {
      setSubjectOptions(schemaF[branch]?.[year] || []);
      setSubject("");
    }
  }, [branch, year]);

  const handleGoTo = (): void => {
    setSearch(search === "Academics" ? "Coding" : "Academics");
    setContent(false);
  };

  const handleContent = async (): Promise<void> => {
    setIsLoading(true);
    setContent(true);

    const requestData = { year, branch, subject };

    try {
      const response = await fetch("/api/source/getContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const res = await response.json();

      if (!res.success) {
        throw new Error("Failed to fetch data");
      }
      setSource(res.result);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/4 flex flex-col gap-6">
      <div className="w-full bg-[#111827] h-[70vh] text-white rounded-xl shadow-lg border border-blue-900/20 backdrop-blur">
        <div className="flex flex-col justify-between h-full">
          <div className="pt-2 p-6 flex flex-col">
            <div className="flex flex-col items-center justify-center mb-2 gap-2">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 text-center">
              {search || "Select Category"}
            </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
            </div>
            
           
            
            {search === "Academics" && (
              <div className="space-y-5 transition-all duration-500 ease-in-out">
                <Input title="Select Branch:" options={branchOptions} onChange={(e) => setBranch(e.target.value)} />
                
                {branch && (
                  <div className="animate-fadeIn">
                    <Input title="Select Year:" options={yearOptions} onChange={(e) => setYear(e.target.value)} />
                  </div>
                )}
                
                {year && (
                  <div className="animate-fadeIn">
                    <Input title="Select Subject:" options={subjectOptions} onChange={(e) => setSubject(e.target.value)} />
                  </div>
                )}
              </div>
            )}
            
            <button
              className={`w-full mt-4 py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 shadow-md flex items-center justify-center ${
                !branch || !year || !subject || isLoading
                  ? "bg-gray-600 cursor-not-allowed opacity-70"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-emerald-500/20 hover:scale-102"
              }`}
              onClick={handleContent}
              disabled={!branch || !year || !subject || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <>
                  <span className="mr-2">Get Content</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="p-4 border-t border-blue-900/30">
            <button
              className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-300 shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-500/20"
              onClick={handleGoTo}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                {search === "Academics" ? "Go To Coding" : "Go To Academics"}
              </div>
            </button>
          </div>
        </div>
      </div>

      <Link
        href="/sources/contribute"
        className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 hover:shadow-green-500/20 text-white p-4 text-center rounded-lg font-medium transition-all duration-300 shadow-md flex items-center justify-center group"
      >
        <span className="mr-2">Make a Contribution</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </Link>
    </div>
  );
};

export default Sidebar;