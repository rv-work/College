"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Play, Check, RefreshCw, Sun, Moon, Tag, Award, AlertTriangle } from 'lucide-react';
import Tabs from '@/app/(ui)/Components/PageComponents/Code/Tabs';
import Description from '@/app/(ui)/Components/PageComponents/Code/Description';
import Examples from '@/app/(ui)/Components/PageComponents/Code/Examples';
import Output from '@/app/(ui)/Components/PageComponents/Code/Output';
import toast from 'react-hot-toast';
import AI from '@/app/(ui)/Components/PageComponents/Code/AI';

interface Question {
  quesNo: number;
  title: string;
  description: string;
  constraint: string;
  tags: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  cases: {
    caseNumber: number;
    input: string[];
    output: string;
    explanation?: string;
  }[];
  templateCode: {
    Python: string;
    Java: string;
    Cpp: string;
  };
  wrapperCode: {
    Python: string;
    Java: string;
    Cpp: string;
  };
}

const Page = () => {
  const { slug } = useParams();
  const router = useRouter();

  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("Java");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [outPutMsg, setOutPutMsg] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);



  useEffect(() => {
    if (question && question.templateCode) {
      setCode(question.templateCode[selectedLanguage as keyof typeof question.templateCode]);
    }
  }, [question, selectedLanguage]);



  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/dsa/fetchQuestion", { slug });
      if (res.data) {
        setQuestion(res.data.question);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    setActiveTab("output");
    setOutput(null)
    console.log("Run code", { code, language: selectedLanguage });

    setOutPutMsg("Running your code...");

    try {
      const res = await axios.post("/api/dsa/run", {
        code,
        language: selectedLanguage,
        wrapCode: question?.wrapperCode[selectedLanguage as "Java" | "Cpp" | "Python"],
        testCases: question?.cases,
      });

      setOutput(res.data.results);
    } catch (err) {
      console.error("Error while running code:", err);
      setOutPutMsg("Something went wrong while running the code.");
    }
  };


  const handleSubmit = async () => {
    setActiveTab("output")
    setOutput(null)
    console.log("Submit code", { code, language: selectedLanguage });
    setOutPutMsg("Submitting your solution...");
    try {
      const res = await axios.post("/api/dsa/submit", {
        code,
        language: selectedLanguage,
        wrapCode: question?.wrapperCode[selectedLanguage as "Java" | "Cpp" | "Python"],
        testCases: question?.cases,
      });
      console.log(res.data)
      if (res.data?.success) {
        localStorage.setItem("quesTitle", question?.title ?? "");
        toast.success("Congratulations  !! You Cracked It ..Moving To Last Step")
        router.push(`/dsa/code/${slug}/leetcode`)
      } else {
        toast.error("Something went Wrong...Check Solution !!!")
        setOutPutMsg("Try Again...Check Your Solution");
      }
    } catch (err) {
      console.error("Error while running code:", err);
      setOutPutMsg("Something went wrong while running the code.");
    }

  };

  const handleReset = () => {
    setActiveTab("description")
    if (question && question.templateCode) {
      setCode(question.templateCode[selectedLanguage as keyof typeof question.templateCode]);
    }
    setOutPutMsg("");
  };


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 rounded-lg">
          <AlertTriangle size={48} className="mx-auto mb-4 text-yellow-500" />
          <h2 className="text-xl font-bold mb-2">Question Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400">The question you are looking for does not exist could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>

      <div className="flex flex-1 overflow-hidden">
        <div className={`w-1/2 overflow-y-auto border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>

          <div className="p-4">
            <div className="flex border-b mb-4 pb-2">
              <Tabs setActiveTab={setActiveTab} activeTab={activeTab} val={"description"} />
              <Tabs setActiveTab={setActiveTab} activeTab={activeTab} val={"examples"} />
              <Tabs setActiveTab={setActiveTab} activeTab={activeTab} val={"output"} />
              <Tabs setActiveTab={setActiveTab} activeTab={activeTab} val={"AI"} />
            </div>

            <div className="flex justify-between items-center py-4 my-2">
              <div>
                <h1 className="text-xl font-bold mb-4">
                  {question.quesNo}. {question.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag, index) => (
                    <span key={index} className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-1">
                <span className={`flex items-center ${getDifficultyColor(question.difficulty)}`}>
                  <Award size={16} className="mr-1" />
                  {question.difficulty}
                </span>
                <span className="flex items-center text-blue-500">
                  <Tag size={16} className="mr-1" />
                  {question.points} points
                </span>
              </div>
            </div>

            {activeTab === "description" && (
              <Description question={question} darkMode={darkMode} />
            )}

            {activeTab === "examples" && (
              <Examples darkMode={darkMode} question={question} />
            )}

            {activeTab === "output" && (
              <Output darkMode={darkMode} outPutMsg={outPutMsg} output={output} />
            )}

            {activeTab === "AI" && (
              <AI darkMode={darkMode} code={code} />
            )}

          </div>
        </div>



        <div className="w-1/2 flex flex-col">
          <div className={`flex justify-between items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className='flex gap-2'>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`p-2 rounded-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border`}
              >
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Cpp">C++</option>
              </select>
              <div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-400 hover:bg-gray-300'}`}
                >
                  <span title={darkMode ? "Light mode" : "Dark mode"}>
                    {darkMode ? <Sun /> : <Moon />}
                  </span>

                </button>
              </div>

            </div>

            <div className="flex space-x-2">

              <button
                onClick={handleRun}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              >
                <Play size={16} className="mr-2" />
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                <Check size={16} className="mr-2" />
                Submit
              </button>
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
              >
                <RefreshCw size={16} className="mr-2" />
                Reset
              </button>
            </div>
          </div>



          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-2">
              <div className="h-screen font-mono text-sm overflow-hidden">
                <Editor
                  height="90%"
                  value={code}
                  defaultLanguage='java'
                  language={selectedLanguage.toLowerCase()}
                  onChange={(value) => setCode(value || '')}
                  theme={darkMode ? 'vs-dark' : 'light'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    automaticLayout: true,
                    wordWrap: 'on',
                    readOnly: false,
                    lineNumbers: 'on',
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;