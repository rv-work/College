import React, { useState } from 'react';
import axios from 'axios';

interface AIProps {
  darkMode: boolean;
  code: string;
}

const AI: React.FC<AIProps> = ({ code, darkMode }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  console.log("key , " , process.env.AI)

  const handleAI = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCNcXgShNujmEQZdFAJsfnSf2pnc3a7vpE`,
        {
          contents: [
            {
              parts: [
                {
                  text: `${code} \nPlease provide concise feedback and suggest specific improvements for this code.`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setFeedback(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('AI feedback error:', error);
      setError('Failed to get AI feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 font-sans">
      <button
        onClick={handleAI}
        disabled={loading}
        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm 
          ${darkMode 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
          } 
          ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md hover:-translate-y-0.5'}`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 mr-2 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            Analyzing...
          </div>
        ) : (
          'Get AI Recommendation'
        )}
      </button>
      
      {error && (
        <div className="mt-2 text-red-500">
          {error}
        </div>
      )}
      
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg max-h-80 overflow-y-auto ${
          darkMode ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-slate-50 text-slate-800 border border-slate-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-slate-800'
          }`}>
            AI Feedback
          </h3>
          <div className="space-y-2">
            {feedback.split('\n').map((line, i) => (
              <p key={i} className={`leading-relaxed ${line.trim() === '' ? 'h-2' : ''}`}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AI;