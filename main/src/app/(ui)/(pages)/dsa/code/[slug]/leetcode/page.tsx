"use client"


import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import Tesseract from "tesseract.js";

const LeetcodeUploaderPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
   const { slug } = useParams();
  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsUploaded(false);
    } else {
      alert('Please select a valid image file (JPEG or PNG)');
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const { data: { text } } = await Tesseract.recognize(selectedFile, "eng");
    const cleanedCode = text
    .replace(/[^\x00-\x7F]/g, "") 
    .replace(/\s+/g, " ")         
    .trim();

    const title = localStorage.getItem("quesTitle") ?? "";
    console.log("title......" , title)
    if(title === ""){
      return console.log("title not found")
    }


    const isSolved = cleanedCode.includes("Solved");
    const isAccepted = cleanedCode.includes("Accepted");
    const matchesTitle = cleanedCode.includes(title.trim());



    if (isSolved && isAccepted && matchesTitle) {
      console.log("✅ User has solved this question correctly!");
    } else {
       return console.log("❌ Not verified.");
    }
    
    try {
      const res = await axios.post("/api/dsa/solved", { slug });
    
      if (res.data.success) {
        toast.success("Solution Accepted !!!");
      } else {
        toast.error("Could not mark as solved. Please try again.");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
      console.error("Error submitting solution:", error);
    }
    
  };

  return (
    <div className="max-w-6xl mx-auto p-6  min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold text-white mb-6">LeetCode Solution Uploader</h1>
      
      <div className="mb-8 p-4 bg-[#111827] rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-200 mb-2">Instructions</h2>
        <p className="text-gray-300">
          Upload your LeetCode solution screenshot in the format shown below. Make sure your screenshot includes both the problem description and your code solution.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-[#111827] p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Upload Your Solution ..png/jpg/jpeg</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Select screenshot:</label>
            <input 
              type="file" 
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="w-full p-2 bg-[#00040e] border border-gray-700 rounded-md text-gray-300"
            />
          </div>
          
          <button 
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-md ${
              !selectedFile 
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Upload Solution
          </button>
          
          {isUploaded && (
            <div className="mt-4 p-3 bg-green-900 text-green-300 rounded-md border border-green-700">
              Solution uploaded successfully!
            </div>
          )}
          
          {previewUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-300 mb-2">Preview:</h3>
              <div className="border border-gray-700 rounded-md p-2">
                <Image 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-w-full h-auto"
                  width={800} 
                  height={600} 
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Example Section */}
        <div className="bg-[#111827] p-6 rounded-lg shadow-md border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Example Format</h2>
          <p className="text-gray-400 mb-4">Your screenshot should look similar to this example:</p>
          
          <div className="border border-gray-700 rounded-md p-2">
          <Image 
            src="/leetcode.png"  
            alt="Example LeetCode Solution Screenshot" 
            className="w-full h-auto"
            width={800} 
            height={600} 
          />
            <p className="text-sm text-gray-500 mt-2 italic">
              Example: The Two Sum problem with solution code
            </p>
          </div>
          
          <div className="mt-6 p-4 bg-[#00040e] border border-gray-700 rounded-md">
            <h3 className="text-md font-medium text-gray-200 mb-2">Make sure your screenshot includes:</h3>
            <ul className="list-disc pl-5 text-gray-400 space-y-1">
              <li>The problem description</li>
              <li>Your solution code</li>
              <li>Test cases or examples (if available)</li>
              <li>The problem difficulty level</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeUploaderPage;