import React from "react";
import { BOILERPLATE_CODE } from "./BoilerCodes";

interface TCProps {
  roomId: string;
  setOutput: (output: string) => void;
  setLoading: (loading: boolean) => void;
  setCode: (code: string) => void;
  code: string;
  language : string
  setLanguage : (language: string) => void;
  input : string;
  setShow : (show : boolean) => void
}

const TC: React.FC<TCProps> = ({ roomId, setOutput, setLoading, setCode, code , language , setLanguage , input , setShow }) => {

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(BOILERPLATE_CODE[selectedLanguage] || "");
    
  };

  console.log("input  : " , input)

  const handleRunCode = async () => {
    setLoading(true);
    setShow(true)
    try {
      const response = await fetch("/api/class/code/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      if(data.success)
      setOutput(data.output || "No output.");
    } catch (error) {
      setOutput("Error connecting to the server.");
      console.error("Error got : "  , error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <label htmlFor="language" className="mr-2 text-lg font-medium">
          Select Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 bg-gray-800 text-white rounded-md shadow-md"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>
        <p className="font-medium text-xl p-2">
          Class Id : <span className="text-blue-500">{roomId}</span>
        </p>
      </div>

      <button
        onClick={handleRunCode}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition duration-300"
      >
        Run
      </button>
    </div>
  );
};

export default TC;
