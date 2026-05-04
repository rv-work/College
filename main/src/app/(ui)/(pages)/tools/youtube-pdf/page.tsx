"use client";

import React, { useState } from 'react';
import { ExternalLink, Youtube, Clock, ArrowRight, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';

const YouTubeVideoProcessor: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [gapSeconds, setGapSeconds] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string>(''); // NEW STATE

  const isValidYouTubeUrl = (url: string): boolean => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return pattern.test(url);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isValidYouTubeUrl(videoUrl)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setError('');
    setIsLoading(true);
    setSuccess(false);
    setPdfUrl('');

    try {
      const res = await fetch("http://localhost:5000/process_video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_url: videoUrl,
          gap_seconds: gapSeconds,
        }),
      });

      const data = await res.json();

      if (data.pdf_url) {
        console.log("got the pdf...........", data.pdf_url);
        setPdfUrl(data.pdf_url); // ✅ Store URL
        setSuccess(true);
        window.open(data.pdf_url); // Open once automatically (optional)
      } else {
        setError('Processing failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error("error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-6">
      <button
      className='absolute top-30 left-4 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg p-2 transition-all duration-300'
      onClick={() => window.history.back()}
      >Back</button>
      <div className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          YouTube Frame Extractor
        </h1>
        <p className="text-lg text-blue-200">
          Convert YouTube videos to PDF frames with customizable intervals
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900/80 to-blue-900/40 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-blue-500/20">
        {/* Card Header */}
        <div className="bg-blue-800/30 p-4 flex items-center gap-3 border-b border-blue-500/30">
          <Youtube className="text-red-500" size={24} />
          <h2 className="text-xl font-semibold">Video Processing Tool</h2>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* YouTube URL Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-blue-300 font-medium">
              <Youtube size={18} />
              YouTube URL
            </label>
            <div className="relative">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full bg-blue-950/50 border border-blue-500/30 rounded-lg p-3 pl-4 pr-10 text-white placeholder-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <ExternalLink className="absolute right-3 top-3 text-blue-400/60" size={18} />
            </div>
          </div>

          {/* Gap Seconds Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-blue-300 font-medium">
              <Clock size={18} />
              Frame Interval (seconds)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={gapSeconds}
                onChange={(e) => setGapSeconds(parseInt(e.target.value))}
                className="w-full bg-blue-950/50 border border-blue-500/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
            <p className="text-xs text-blue-400/80">Capture frames every {gapSeconds} seconds</p>
          </div>

          {/* Submit/Download Button */}
          {success && pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg font-medium text-lg transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-lg hover:shadow-green-500/30"
            >
              Download PDF
              <ArrowRight size={18} />
            </a>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading || !videoUrl}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg font-medium text-lg transition-all duration-300 
                ${isLoading || !videoUrl
                  ? 'bg-blue-700/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg hover:shadow-blue-500/30'}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  Generate PDF
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          )}

          {/* Status Messages */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-500/30 p-3 rounded-lg animate-fadeIn">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-400 bg-green-900/20 border border-green-500/30 p-3 rounded-lg animate-fadeIn">
              <Check size={18} />
              PDF generated successfully!
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-950/50 border-t border-blue-500/30">
          <div className="flex items-start gap-2">
            <FileText size={16} className="mt-1 flex-shrink-0 text-blue-400" />
            <p className="text-sm text-blue-300">
              The generated PDF will open in a new tab. It contains frames captured from the YouTube video at your specified interval.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-blue-400/60 text-sm">
        © 2025 100xCode • Your Complete Coding Education Platform
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}} />
    </div>
  );
};

export default YouTubeVideoProcessor;
