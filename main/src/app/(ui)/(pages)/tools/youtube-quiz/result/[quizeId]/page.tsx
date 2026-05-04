"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  questions: Question[];
  userAnswers: (string | null)[];
  timeSpent: number;
  totalTime: number;
}

const ResultPage = () => {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
    setLoading(false);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getStatistics = () => {
    if (!result) return { correct: 0, incorrect: 0, skipped: 0, score: 0 };
    
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    
    result.userAnswers.forEach((answer, index) => {
      if (answer === null) {
        skipped++;
      } else if (answer === result.questions[index].correctAnswer) {
        correct++;
      } else {
        incorrect++;
      }
    });
    
    const score = Math.round((correct / result.questions.length) * 100);
    
    return { correct, incorrect, skipped, score };
  };

  const handleRetakeQuiz = () => {
    router.push('/test-yourself');
  };

  const goToNextQuestion = () => {
    if (result && currentQuestionIndex < result.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#030711] to-[#0f172a] text-white">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-xl">Loading results...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#030711] to-[#0f172a] text-white p-4">
        <div className="w-full max-w-4xl p-8 rounded-2xl bg-[#111827]/90 backdrop-blur-sm shadow-2xl border border-blue-500/20">
          <h1 className="text-3xl font-bold text-center mb-6 text-red-400">No Quiz Results Found</h1>
          <p className="text-center mb-8">You haven&apos;t completed a quiz yet or the results were lost.</p>
          <div className="flex justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95"
            >
              Take a Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStatistics();
  const currentQuestion = result.questions[currentQuestionIndex];
  const userAnswer = result.userAnswers[currentQuestionIndex];
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  const isSkipped = userAnswer === null;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center  text-white p-4">
      <div className="w-full p-4 rounded-2xl bg-[#111827]/90 backdrop-blur-sm shadow-2xl border border-blue-500/20 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Quiz Results
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Results Summary */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Score Summary Card */}
            <div className="p-6 bg-gradient-to-b flex-col flex justify-between from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-blue-500/30 h-full">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-blue-300 m-2">Your Score</h2>
                <div className="flex m-4 items-baseline">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {stats.score}%
                  </span>
                  <span className="text-xl text-gray-400 ml-2">
                    ({stats.correct}/{result.questions.length})
                  </span>
                </div>
                <p className="text-gray-400 mt-2 text-center">
                  {stats.score === 100 ? '🎉 Perfect Score!' : 
                   stats.score >= 80 ? '👏 Excellent!' : 
                   stats.score >= 60 ? '👍 Good job!' : 
                   stats.score >= 40 ? '💪 Keep practicing!' : '📚 More study needed'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 text-center">
                  <p className="text-sm text-gray-400">Time Taken</p>
                  <p className="text-xl font-bold text-blue-300">{formatTime(result.timeSpent)}</p>
                  <p className="text-xs text-gray-500">of {formatTime(result.totalTime)}</p>
                </div>
                
                <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700 text-center">
                  <p className="text-sm text-gray-400">Questions</p>
                  <p className="text-xl font-bold text-blue-300">{result.questions.length}</p>
                </div>
                
                <div className="p-4 bg-green-900/20 rounded-xl border border-green-700/50 text-center">
                  <p className="text-sm text-gray-400">Correct</p>
                  <p className="text-xl font-bold text-green-400">{stats.correct}</p>
                </div>
                
                <div className="p-4 bg-red-900/20 rounded-xl border border-red-700/50 text-center">
                  <p className="text-sm text-gray-400">Incorrect</p>
                  <p className="text-xl font-bold text-red-400">{stats.incorrect}</p>
                </div>
                
                {stats.skipped > 0 && (
                  <div className="col-span-2 p-4 bg-yellow-900/20 rounded-xl border border-yellow-700/50 text-center">
                    <p className="text-sm text-gray-400">Skipped</p>
                    <p className="text-xl font-bold text-yellow-400">{stats.skipped}</p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleRetakeQuiz}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-lg font-bold transition-all shadow-lg transform hover:scale-105 active:scale-95"
                >
                  Take Another Quiz
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Question Details */}
          <div className="w-full lg:w-1/2">
            <div className={`p-6 rounded-xl border flex flex-col ${
              isSkipped 
                ? 'border-yellow-700/50 bg-yellow-900/10' 
                : isCorrect 
                  ? 'border-green-700/50 bg-green-900/10' 
                  : 'border-red-700/50 bg-red-900/10'
            }`}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">Question {currentQuestionIndex + 1} of {result.questions.length}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isSkipped 
                    ? 'bg-yellow-900/30 text-yellow-400' 
                    : isCorrect 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-red-900/30 text-red-400'
                }`}>
                  {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-xl mb-6">{currentQuestion.question}</p>
                
                <div className="space-y-4 mb-6">
                  {currentQuestion.options.map((option, oIndex) => {
                    const isUserSelection = userAnswer === option;
                    const isCorrectAnswer = option === currentQuestion.correctAnswer;
                    
                    return (
                      <div 
                        key={oIndex} 
                        className={`p-4 rounded-lg flex items-center border ${
                          isCorrectAnswer 
                            ? 'border-green-500/50 bg-green-900/20' 
                            : isUserSelection && !isCorrectAnswer 
                              ? 'border-red-500/50 bg-red-900/20' 
                              : 'border-gray-700 bg-gray-800/50'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 mr-3 text-sm font-medium">
                          {String.fromCharCode(65 + oIndex)}
                        </div>
                        
                        <span className="flex-grow">{option}</span>
                        
                        {isCorrectAnswer && (
                          <span className="ml-2 text-green-400 text-xl">✓</span>
                        )}
                        
                        {isUserSelection && !isCorrectAnswer && (
                          <span className="ml-2 text-red-400 text-xl">✗</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {!isCorrect && (
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                    <p className="text-sm font-medium text-blue-300">Correct Answer: {currentQuestion.correctAnswer}</p>
                  </div>
                )}
              </div>
              
              {/* Navigation Buttons */}
              <div className="pt-6 mt-auto flex justify-between">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-700 hover:bg-blue-600 transform hover:scale-105 active:scale-95'
                  }`}
                >
                  ← Previous
                </button>
                <button
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === result.questions.length - 1}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    currentQuestionIndex === result.questions.length - 1
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-700 hover:bg-blue-600 transform hover:scale-105 active:scale-95'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Question Navigator at the bottom */}
        <div className="bg-gray-800/80 rounded-2xl p-6 border border-gray-700 mt-6">
          <h3 className="text-xl font-bold text-blue-300 mb-4">Question Navigator</h3>
          <div className="grid grid-cols-10 md:grid-cols-10 gap-4">
            {result.questions.map((_, index) => {
              const answer = result.userAnswers[index];
              const isCorrectAnswer = answer === result.questions[index].correctAnswer;
              const isSkippedAnswer = answer === null;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-full aspect-square rounded-lg flex items-center justify-center text-lg font-medium transition-all ${
                    currentQuestionIndex === index 
                      ? 'ring-2 ring-blue-400 transform scale-110 z-10' 
                      : ''
                  } ${
                    isSkippedAnswer
                      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/50'
                      : isCorrectAnswer
                        ? 'bg-green-900/30 text-green-400 border border-green-700/50'
                        : 'bg-red-900/30 text-red-400 border border-red-700/50'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;