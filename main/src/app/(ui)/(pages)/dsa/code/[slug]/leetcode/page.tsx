"use client"

import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import Tesseract from "tesseract.js";

const LeetcodeUploaderPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { slug } = useParams();
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dsa');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsUploaded(false);
    } else {
      toast.error('Please select a valid image file (JPEG, PNG, or JPG)');
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsLoading(true);

    try {
      // OCR Processing
      toast.loading('Processing image...', { id: 'processing' });
      const { data: { text } } = await Tesseract.recognize(selectedFile, "eng");

      const cleanedCode = text
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      const title = localStorage.getItem("quesTitle") ?? "";
      console.log("title......", title);

      if (title === "") {
        toast.dismiss('processing');
        toast.error("Question title not found");
        setIsLoading(false);
        return;
      }

      // Verification
      toast.loading('Verifying solution...', { id: 'processing' });
      const isSolved = cleanedCode.includes("Solved");
      const isAccepted = cleanedCode.includes("Accepted");
      const matchesTitle = cleanedCode.includes(title.trim());

      if (isSolved && isAccepted && matchesTitle) {
        console.log("✅ User has solved this question correctly!");
      } else {
        toast.dismiss('processing');
        toast.error("❌ Solution not verified. Please ensure your screenshot shows 'Solved' and 'Accepted' status.");
        setIsLoading(false);
        return;
      }

      // Submit to API
      toast.loading('Submitting solution...', { id: 'processing' });
      const res = await axios.post("/api/dsa/solved", { slug });

      if (res.data.success) {
        toast.dismiss('processing');
        toast.success("🎉 Solution Accepted!");
        setIsUploaded(true);
      } else {
        toast.dismiss('processing');
        toast.error("Could not mark as solved. Please try again.");
      }
    } catch (error) {
      toast.dismiss('processing');
      toast.error("Server error. Please try again later.");
      console.error("Error submitting solution:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      {/* Header Section with Back Button */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={handleGoBack}
          className="flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm group"
        >
          <svg
            className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to DSA Problems
        </button>

        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            LeetCode Solution Uploader
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload your LeetCode solution screenshot to verify and submit your completed problem
          </p>
        </div>

        {/* Spacer div to balance the layout */}
        <div className="w-[180px]"></div>
      </div>

      {/* Instructions Card */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/30 backdrop-blur-sm">
        <div className="flex items-center mb-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
          <h2 className="text-xl font-semibold text-blue-300">Instructions</h2>
        </div>
        <p className="text-gray-300 leading-relaxed">
          Upload your LeetCode solution screenshot that includes the problem title, your accepted solution,
          and the &quot;Solved&quot; status. The image will be processed using OCR to verify your completion.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <h2 className="text-2xl font-semibold text-white">Upload Your Solution</h2>
          </div>

          {/* File Input */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-3 font-medium">
              Select Screenshot (PNG, JPG, JPEG)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleFileChange}
                className="w-full p-4 bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-xl text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors duration-200"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${!selectedFile || isLoading
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Processing...
              </div>
            ) : (
              <>
                <span className="mr-2">🚀</span>
                Upload & Verify Solution
              </>
            )}
          </button>

          {/* Success Message */}
          {isUploaded && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 text-green-300 rounded-xl border border-green-500/30 backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎉</span>
                <div>
                  <p className="font-semibold">Solution Verified Successfully!</p>
                  <p className="text-sm text-green-400">Your solution has been marked as completed.</p>
                </div>
              </div>
            </div>
          )}

          {/* Preview Section */}
          {previewUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-300 mb-4 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                Preview
              </h3>
              <div className="border-2 border-gray-600/50 rounded-xl p-3 bg-gray-800/30">
                <Image
                  src={previewUrl}
                  alt="Solution Preview"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  width={800}
                  height={600}
                />
              </div>
            </div>
          )}
        </div>

        {/* Example Section */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-8 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
            <h2 className="text-2xl font-semibold text-white">Example Format</h2>
          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">
            Your screenshot should match this format to ensure successful verification:
          </p>

          <div className="border-2 border-purple-500/30 rounded-xl p-3 bg-purple-900/10 mb-6">
            <Image
              src="/leetcode.png"
              alt="Example LeetCode Solution Screenshot"
              className="w-full h-auto rounded-lg shadow-lg"
              width={800}
              height={600}
            />
            <p className="text-sm text-gray-500 mt-3 italic text-center">
              Example: Complete LeetCode solution with acceptance status
            </p>
          </div>

          {/* Requirements Checklist */}
          <div className="p-6 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/30 rounded-xl">
            <h3 className="text-lg font-medium text-indigo-300 mb-4 flex items-center">
              <span className="mr-2">📋</span>
              Required Elements
            </h3>
            <div className="space-y-3">
              {[
                'Problem title and description',
                'Your complete solution code',
                '"Accepted" and "Solved" status visible',
                'Clear, readable screenshot quality'
              ].map((item, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeUploaderPage;
