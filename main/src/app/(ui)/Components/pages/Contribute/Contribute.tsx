"use client";

import React, { useState } from "react";
import { FiBook, FiYoutube, FiFile, FiFileText, FiCalendar, FiBookmark } from "react-icons/fi";
import { schemaF } from './schemaF';
import toast from "react-hot-toast";

const Contribute: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [year, setYear] = useState<string>("1st");
  const [branch, setBranch] = useState<string>("CSE/IT");
  const [subject, setSubject] = useState<string>("");
  const [type, setType] = useState<string>("");
  
  const [resourceType, setResourceType] = useState<string>("YouTubeLink");
  const [stType, setStType] = useState<string>("");
  const [stNumber, setStNumber] = useState<string>("");
  const [examYear, setExamYear] = useState<number | "">("");
  const [unitNo, setUnitNo] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append("category", category);
    formData.append("year", year);
    formData.append("branch", branch);
    formData.append("subject", subject);
    formData.append("type", type);

    formData.append("resourceType", resourceType); 
    formData.append("unitNo", unitNo?.toString() || "");
    formData.append("stType", stType);
    formData.append("stNumber", stNumber);
    formData.append("examYear", examYear?.toString() || "");
  
    const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]:not([hidden])');
    const linkInput = document.querySelector<HTMLInputElement>('input[type="url"]');
  
    if (resourceType === "YouTubeLink" && linkInput?.value) {
      formData.append("resourceLink", linkInput.value);
    } else if (fileInput?.files?.length) {
      formData.append("resourceFile", fileInput.files[0]);
    }
  
    try {
      const res = await fetch("/api/source/contribute", {
        method: "POST",
        body: formData,
      });
  
      if (res?.ok) {
        toast.success("Contribution submitted successfully!")
      } else {
        const data = await res?.json();
        toast.error("❌ Failed to submit: " + (data.message || res?.statusText))
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00040E] to-[#111827] flex flex-col items-center py-10 px-5 text-gray-100">
      <h1 className="text-3xl font-extrabold text-white mb-6 flex items-center">
        <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Your Contribution Matters!</span>
        <span className="ml-2 animate-pulse">🚀</span>
      </h1>
      
      <div className="w-full max-w-xl bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-lg p-8 border border-gray-800">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className=" text-gray-200 font-semibold mb-2 flex items-center">
              <FiBook className="inline-block mr-2 text-indigo-400" /> 
              <span>Select a category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
            >
              <option value="">Select a category</option>
              <option value="Academics">Academics</option>
              <option value="Coding" disabled>
                Coding (Coming Soon)
              </option>
            </select>
          </div>

          {category === "Academics" && (
            <>
              {/* Year and Branch */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className=" text-gray-200 font-semibold mb-2 flex items-center">
                    <FiCalendar className="inline-block mr-2 text-indigo-400" />
                    <span>Select Year</span>
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                  >
                    <option value={1}>1st</option>
                    <option value={2}>2nd</option>
                    <option value={3}>3rd</option>
                    <option value={4}>4th</option>
                  </select>
                </div>
                <div>
                  <label className=" text-gray-200 font-semibold mb-2 flex items-center">
                    <FiBookmark className="inline-block mr-2 text-indigo-400" />
                    <span>Branch</span>
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                  >
                    <option value="CSE">CSE/IT</option>
                    <option value="ECE">ECE</option>
                    <option value="ME">ME</option>
                    <option value="EE">EE</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className=" text-gray-200 font-semibold mb-2 flex items-center">
                  <FiBookmark className="inline-block mr-2 text-indigo-400" />
                  <span>Subject</span>
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                >
                  <option value="">Select Subject</option>
                  {schemaF[branch]?.[year]?.map((sub: string) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contribution Type */}
              <div>
                <label className=" text-gray-200 font-semibold mb-2 flex items-center">
                  <FiFile className="inline-block mr-2 text-indigo-400" />
                  <span>What do you want to contribute?</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                >
                  <option value="">Select an option</option>
                  <option value="Unit">Unit Resources</option>
                  <option value="ST">ST Papers</option>
                  <option value="AKTU">AKTU PYQ</option>
                </select>
              </div>

              {/* Unit Resources */}
              {type === "Unit" && (
                <div className="space-y-4 rounded-lg p-4 bg-gray-800 bg-opacity-50">
                  <div>
                    <label className=" text-gray-200 font-semibold mb-2 flex items-center">
                      <FiBookmark className="inline-block mr-2 text-indigo-400" />
                      <span>Select Unit</span>
                    </label>
                    <select
                      value={unitNo || ""}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                      onChange={(e) => setUnitNo(Number(e.target.value))}
                    >
                      <option value="">Select Unit</option>
                      <option value={1}>Unit - 1</option>
                      <option value={2}>Unit - 2</option>
                      <option value={3}>Unit - 3</option>
                      <option value={4}>Unit - 4</option>
                      <option value={5}>Unit - 5</option>
                    </select>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-full md:w-1/3">
                      <label className=" text-gray-200 font-semibold mb-2 flex items-center">
                        <FiFile className="inline-block mr-2 text-indigo-400" />
                        <span>Resource Type</span>
                      </label>
                      <select
                        value={resourceType}
                        onChange={(e) => setResourceType(e.target.value)}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                      >
                        <option value="YouTubeLink">YouTube Link</option>
                        <option value="NotesPDF">Notes PDF</option>
                        <option value="PPT">PPT</option>
                      </select>
                    </div>
                  
                    {resourceType === "YouTubeLink" && (
                      <div className="w-full md:w-2/3">
                       <label className=" text-gray-200 font-medium mb-2 flex items-center">
                          <FiYoutube className="inline-block mr-2 text-red-500" />
                          <span>YouTube Link</span>
                        </label>
                        <input
                          type="url"
                          placeholder="Enter YouTube Link"
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                        />
                      </div>
                    )}
                  
                    {resourceType === "NotesPDF" && (
                      <div className="w-full md:w-2/3">
                       <label className=" text-gray-200 font-medium mb-2 flex items-center">
                          <FiFileText className="inline-block mr-2 text-indigo-400" />
                          <span>Upload Notes PDF</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                          />
                        </div>
                      </div>
                    )}
                  
                    {resourceType === "PPT" && (
                      <div className="w-full md:w-2/3">
                       <label className=" text-gray-200 font-medium mb-2 flex items-center">
                          <FiFileText className="inline-block mr-2 text-indigo-400" />
                          <span>Upload PPT</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ST Papers */}
              {type === "ST" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg p-4 bg-gray-800 bg-opacity-50">
                  <div>
                   <label className=" text-gray-200 font-medium mb-2 flex items-center">
                      <FiCalendar className="inline-block mr-2 text-indigo-400" />
                      <span>Year</span>
                    </label>
                    <input
                      type="number"
                      value={examYear}
                      onChange={(e) => setExamYear(parseInt(e.target.value) || "")}
                      placeholder="Enter Year"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                   <label className=" text-gray-200 font-medium mb-2 flex items-center">
                      <FiCalendar className="inline-block mr-2 text-indigo-400" />
                      <span>Semester</span>
                    </label>
                    <select
                      value={stType}
                      onChange={(e) => setStType(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                    >
                      <option value="">Select Semester</option>
                      <option value="Odd">Odd</option>
                      <option value="Even">Even</option>
                    </select>
                  </div>
                  <div>
                   <label className=" text-gray-200 font-medium mb-2 flex items-center">
                      <FiBookmark className="inline-block mr-2 text-indigo-400" />
                      <span>ST Number</span>
                    </label>
                    <select
                      value={stNumber}
                      onChange={(e) => setStNumber(e.target.value)}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                    >
                      <option value="">Select ST Number</option>
                      <option value="ST1">ST-1</option>
                      <option value="ST2">ST-2</option>
                      <option value="ST3">ST-3</option>
                    </select>
                  </div>
                  <div>
                   <label className=" text-gray-200 font-medium mb-2 flex items-center">
                      <FiFileText className="inline-block mr-2 text-indigo-400" />
                      <span>Upload ST Paper</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* AKTU PYQs */}
              {type === "AKTU" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg p-4 bg-gray-800 bg-opacity-50">
                  <div>
                   <label className=" text-gray-200 font-medium mb-2 flex items-center">
                      <FiCalendar className="inline-block mr-2 text-indigo-400" />
                      <span>Year</span>
                    </label>
                    <input
                      type="number"
                      value={examYear}
                      onChange={(e) => setExamYear(parseInt(e.target.value) || "")}
                      placeholder="Enter Year"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                   <label className=" text-gray-200 font-medium mb-2 flex items-center">
                      <FiFileText className="inline-block mr-2 text-indigo-400" />
                      <span>Upload PDF</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:ring focus:ring-indigo-500 focus:outline-none text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-3 rounded-md font-bold hover:from-indigo-700 hover:to-blue-800 focus:ring focus:ring-indigo-300 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Submit Contribution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contribute;