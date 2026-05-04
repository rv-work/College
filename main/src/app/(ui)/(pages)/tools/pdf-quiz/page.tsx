"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizData {
  title: string;
  estimatedMinutes: number;
  questions: Question[];
}

const Page = () => {
  const router = useRouter();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"upload" | "options" | "quiz">("upload");

  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const processPdf = async () => {
    if (!pdfFile) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await fetch("/api/rag/process", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setPdfText(data.text);
      setStep("options");
    } catch (error) {
      console.log(error);
      alert("Failed to process PDF");
    } finally {
      setLoading(false);
    }
  };

  const generateQuiz = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/rag/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: pdfText,
          questionCount,
          difficulty,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setQuizData(data.data);
      setUserAnswers(new Array(data.data.questions.length).fill(null));
      setTimeRemaining(data.data.estimatedMinutes * 60);
      setStep("quiz");
    } catch (error) {
      console.log(error);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === "quiz" && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, timeRemaining]);

  const handleSelectOption = (option: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;
    setUserAnswers(updatedAnswers);
  };

  const submitQuiz = () => {
    if (!quizData) return;

    const result = {
      questions: quizData.questions,
      userAnswers,
      totalQuestions: quizData.questions.length,
      totalTime: quizData.estimatedMinutes * 60,
      timeSpent: quizData.estimatedMinutes * 60 - timeRemaining,
    };

    localStorage.setItem("pdfQuizResult", JSON.stringify(result));
    router.push("/tools/pdf-quiz/result");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ── UPLOAD STEP ──────────────────────────────────────────────────────────────
  if (step === "upload") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#030711] to-[#0f172a] text-white p-4">
        <div className="w-full max-w-4xl p-8 rounded-2xl bg-[#111827]/90 backdrop-blur-sm shadow-2xl border border-blue-500/20 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            PDF Quiz Generator
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Upload a PDF and we&apos;ll generate a quiz from its content.
          </p>

          <div className="border-2 border-dashed border-blue-500/30 rounded-2xl p-10 text-center hover:border-blue-500/60 transition-colors">
            <div className="mb-4 text-4xl">📄</div>
            <label className="cursor-pointer">
              <span className="block text-gray-300 mb-3">
                {pdfFile ? pdfFile.name : "Click to select a PDF file"}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) setPdfFile(e.target.files[0]);
                }}
                className="hidden"
              />
              {!pdfFile && (
                <span className="inline-block px-4 py-2 bg-blue-600/30 border border-blue-500/40 rounded-lg text-blue-300 text-sm">
                  Browse Files
                </span>
              )}
            </label>
            {pdfFile && (
              <p className="mt-3 text-green-400 text-sm">✓ {pdfFile.name} selected</p>
            )}
          </div>

          <button
            onClick={processPdf}
            disabled={!pdfFile || loading}
            className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>
                Processing PDF...
              </span>
            ) : (
              "Continue →"
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── OPTIONS STEP ─────────────────────────────────────────────────────────────
  if (step === "options") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#030711] to-[#0f172a] text-white p-4">
        <div className="w-full max-w-4xl p-8 rounded-2xl bg-[#111827]/90 backdrop-blur-sm shadow-2xl border border-blue-500/20 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Configure Your Quiz
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Customize the difficulty and number of questions.
          </p>

          {/* Difficulty */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-300 mb-4">Difficulty</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Easy", emoji: "😊", color: "green" },
                { label: "Medium", emoji: "🤔", color: "yellow" },
                { label: "Hard", emoji: "🔥", color: "red" },
              ].map(({ label, emoji }) => (
                <button
                  key={label}
                  onClick={() => setDifficulty(label)}
                  className={`p-4 rounded-xl border font-bold transition-all transform hover:scale-105 active:scale-95 ${difficulty === label
                    ? "bg-blue-600/30 border-blue-500 text-blue-300"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                >
                  <div className="text-2xl mb-1">{emoji}</div>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-blue-300 mb-4">Number of Questions</h2>
            <div className="grid grid-cols-3 gap-4">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`p-4 rounded-xl border font-bold transition-all transform hover:scale-105 active:scale-95 ${questionCount === count
                    ? "bg-blue-600/30 border-blue-500 text-blue-300"
                    : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500"
                    }`}
                >
                  <div className="text-2xl font-bold mb-1">{count}</div>
                  <div className="text-sm text-gray-400">Questions</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>
                Generating Quiz...
              </span>
            ) : (
              "Generate Quiz 🚀"
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ STEP ────────────────────────────────────────────────────────────────
  if (step === "quiz" && quizData) {
    const answeredCount = userAnswers.filter((a) => a !== null).length;
    const progressPercent = Math.round((answeredCount / quizData.questions.length) * 100);
    const isLastQuestion = currentQuestion === quizData.questions.length - 1;

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#030711] to-[#0f172a] text-white p-4">
        <div className="w-full max-w-4xl p-4 rounded-2xl bg-[#111827]/90 backdrop-blur-sm shadow-2xl border border-blue-500/20 animate-fadeIn">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {quizData.title || "PDF Quiz"}
          </h1>

          {/* Progress + Timer row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Progress bar card */}
            <div className="flex-1 p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-blue-500/30">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{answeredCount}/{quizData.questions.length} answered</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Timer card */}
            <div className="p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border border-blue-500/30 flex items-center justify-center gap-3">
              <span className="text-gray-400 text-sm">Time Left</span>
              <span className={`text-2xl font-bold font-mono ${timeRemaining < 60 ? "text-red-400" : "text-blue-300"}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Question panel */}
            <div className="w-full lg:w-3/5">
              <div className={`p-6 rounded-xl border flex flex-col border-blue-500/30 bg-blue-900/10`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-bold">
                    Question {currentQuestion + 1} of {quizData.questions.length}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${userAnswers[currentQuestion] !== null
                    ? "bg-blue-900/30 text-blue-400"
                    : "bg-gray-700/50 text-gray-400"
                    }`}>
                    {userAnswers[currentQuestion] !== null ? "Answered" : "Not Answered"}
                  </div>
                </div>

                <p className="text-xl mb-6">{quizData.questions[currentQuestion].question}</p>

                <div className="space-y-4 mb-6">
                  {quizData.questions[currentQuestion].options.map((option, oIndex) => {
                    const isSelected = userAnswers[currentQuestion] === option;
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full p-4 rounded-lg flex items-center border text-left transition-all transform hover:scale-[1.01] active:scale-[0.99] ${isSelected
                          ? "border-blue-500/70 bg-blue-900/30"
                          : "border-gray-700 bg-gray-800/50 hover:border-gray-500"
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium ${isSelected ? "bg-blue-600" : "bg-gray-700"
                          }`}>
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        <span className="flex-grow">{option}</span>
                        {isSelected && <span className="ml-2 text-blue-400 text-xl">✓</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation */}
                <div className="pt-6 mt-auto flex justify-between">
                  <button
                    onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-3 rounded-lg font-bold transition-all ${currentQuestion === 0
                      ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                      : "bg-blue-700 hover:bg-blue-600 transform hover:scale-105 active:scale-95"
                      }`}
                  >
                    ← Previous
                  </button>

                  {isLastQuestion ? (
                    <button
                      onClick={submitQuiz}
                      className="px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 active:scale-95"
                    >
                      Submit Quiz ✓
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestion((prev) => prev + 1)}
                      className="px-6 py-3 rounded-lg font-bold bg-blue-700 hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Question navigator */}
            <div className="w-full lg:w-2/5">
              <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700 h-full">
                <h3 className="text-xl font-bold text-blue-300 mb-4">Question Navigator</h3>
                <div className="grid grid-cols-5 gap-3">
                  {quizData.questions.map((_, index) => {
                    const isAnswered = userAnswers[index] !== null;
                    const isCurrent = index === currentQuestion;

                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${isCurrent ? "ring-2 ring-blue-400 transform scale-110 z-10" : ""
                          } ${isAnswered
                            ? "bg-blue-900/30 text-blue-400 border border-blue-700/50"
                            : "bg-gray-700/50 text-gray-400 border border-gray-600/50"
                          }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-4 h-4 rounded bg-blue-900/30 border border-blue-700/50"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-4 h-4 rounded bg-gray-700/50 border border-gray-600/50"></div>
                    <span>Not Answered</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-800/80 rounded-xl border border-gray-700 text-center">
                  <p className="text-sm text-gray-400">Answered</p>
                  <p className="text-xl font-bold text-blue-300">{answeredCount}/{quizData.questions.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Page;