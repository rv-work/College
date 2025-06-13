"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import axios from 'axios';
import toast from 'react-hot-toast';

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

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimit, setTimeLimit] = useState<number>(10);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [step, setStep] = useState<'url' | 'options' | 'quiz'>('url');
  const [startTime, setStartTime] = useState<number>(0);
  const [quizeId , setQuizeId] = useState<string>("")

  const fetchTranscript = async (): Promise<void> => {
    if (!youtubeUrl) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch transcript');
      }

      if (data.success) {
        setTranscript(data.transcript);
        setStep('options');
      } else {
        setError('Captions not available for this video');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Error fetching transcript: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateQuestions = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      const prompt = `Based on the following transcript of A Youtube Lecture, create a quiz with ${questionCount} multiple-choice questions in English. Each question should have 4 options and one correct answer. Format the response as a JSON object with an array of question objects. Each question object should have "question", "options" (array of 4 strings), and "correctAnswer" (string matching one of the options) properties and make sure to identify the context & content/topic of the video and provide quiz accordingly good level hard questions recognize the topic and ask arround that  .
      
      Transcript: ${transcript.substring(0, 5000)}`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCNcXgShNujmEQZdFAJsfnSf2pnc3a7vpE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      let parsedQuestions: Question[] = [];

      try {
        const textContent = data.candidates[0].content.parts[0].text;
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);

        const res = await axios.post("/api/quize", { topic: "Arrays", maxScore: questionCount })
        if (res.data.success) {
          toast.success("Quize Generated Successfully")
          setQuizeId(res.data.quizeId)
        } else {
          toast.success("Quize Generation Failed !!")
          return
        }
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const parsed = JSON.parse(jsonStr);
          parsedQuestions = parsed.questions || [];

        } else {
          throw new Error('Could not parse JSON from response');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (parseErr: any) {
        throw new Error('Failed to parse questions: ' + parseErr.message);
      }

      if (parsedQuestions.length === 0) {
        throw new Error('No questions were generated');
      }

      setUserAnswers(new Array(parsedQuestions.length).fill(null));
      setQuestions(parsedQuestions);
      setTimeRemaining(timeLimit * 60);
      setQuizStarted(true);
      setStep('quiz');
      setStartTime(Date.now());
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError('Error generating quiz: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (quizStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizStarted, timeRemaining]);

  const handleSelectOption = (option: string): void => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = option;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = (): void => {
    if (currentQuestion === questions.length - 1) {
      submitQuiz();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSkipQuestion = (): void => {
    if (currentQuestion === questions.length - 1) {
      submitQuiz();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const submitQuiz = async () => {
    const timeSpent = timeLimit * 60 - timeRemaining;

    const quizResult: QuizResult = {
      questions: questions,
      userAnswers: userAnswers,
      timeSpent: timeSpent,
      totalTime: timeLimit * 60
    };

    localStorage.setItem('quizResult', JSON.stringify(quizResult));
    localStorage.setItem('quizStart', startTime.toString());
    const res = await axios.put("/api/quize" , {timeSpent  , quizeId})
    if(res.data.success){
      router.push(`/youtube/test-quiz/result/${quizeId}`);
    } else {
      toast.error("Something is Wrong !!!")
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <button
      className='absolute top-30 left-4 bg-blue-500/20 hover:bg-blue-500/30 text-white rounded-lg p-2 transition-all duration-300'
      onClick={() => window.history.back()}
      >Back</button>
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#030711] to-[#0f172a] text-white p-4">
      
      <div className="w-full max-w-[35%] p-8 rounded-2xl bg-[#111827]/90 backdrop-blur-sm shadow-2xl border border-blue-500/20 animate-fadeIn">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          YouTube Video Quiz Generator
        </h1>

        {step === 'url' && (
          <div className="space-y-6 ">
            <div className="mb-6 transform transition-all">
              <label htmlFor="topic" className="block text-lg font-medium mb-3 text-blue-300">
                Enter Topic : 
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter Topic Name"
                className="w-full px-5 py-3 rounded-lg bg-black border border-blue-500/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-lg"
              />

              <label htmlFor="youtube-url" className="block text-lg font-medium mt-4 mb-3 text-blue-300">
                Enter YouTube Video URL : 
              </label>
              <input
                type="text"
                id="youtube-url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-5 py-3 rounded-lg bg-black border border-blue-500/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-lg"
              />

              <button
                onClick={fetchTranscript}
                disabled={loading}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-bold transition-all shadow-lg disabled:opacity-50 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  'Continue'
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-200 animate-pulse">
                {error}
              </div>
            )}
          </div>
        )}

        {step === 'options' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gray-800/80 border border-gray-700 mb-6 shadow-lg">
              <h3 className="font-medium mb-2 text-blue-300">Video Content Preview:</h3>
              <p className="text-gray-300 text-sm italic">{transcript.substring(0, 200)}...</p>
            </div>

            <h3 className="text-xl font-medium text-center mb-4 text-blue-300">Select Quiz Length</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { questions: 10, minutes: 10 },
                { questions: 20, minutes: 20 },
                { questions: 30, minutes: 30 }
              ].map((option) => (
                <div
                  key={option.questions}
                  className={`p-5 border rounded-xl cursor-pointer transition-all transform hover:scale-105 ${questionCount === option.questions
                      ? 'border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20'
                      : 'border-gray-700 hover:border-blue-500/50 bg-gray-800/50'
                    }`}
                  onClick={() => { setQuestionCount(option.questions); setTimeLimit(option.minutes); }}
                >
                  <h3 className="font-bold text-center text-xl">{option.questions} Questions</h3>
                  <p className="text-gray-400 text-center">{option.minutes} Minutes</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('url')}
                className="px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all shadow-md transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </button>

              <button
                onClick={generateQuestions}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg font-bold transition-all shadow-lg disabled:opacity-50 transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Quiz'
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-900/50 border border-red-700 text-red-200 animate-pulse">
                {error}
              </div>
            )}
          </div>
        )}

        {step === 'quiz' && questions.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6 p-3 bg-gray-800/80 rounded-lg border border-gray-700">
              <div className="text-sm font-medium px-3 py-1 bg-gray-700 rounded-full">
                Question {currentQuestion + 1}/{questions.length}
              </div>

              <div className="px-4 py-1 bg-blue-900/50 border border-blue-700 rounded-full text-sm font-medium">
                Time: {formatTime(timeRemaining)}
              </div>
            </div>

            <div className="animate-fadeIn">
              <div className="mb-8">
                <div className="bg-blue-900/20 border border-blue-800 p-5 rounded-xl mb-6 shadow-lg">
                  <h3 className="text-xl font-medium mb-2">{questions[currentQuestion].question}</h3>
                </div>

                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      className={`p-5 border rounded-xl cursor-pointer transition-all transform hover:scale-101 hover:-translate-y-1 ${userAnswers[currentQuestion] === option
                          ? 'border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20'
                          : 'border-gray-700 hover:border-blue-500/50 bg-gray-800/50'
                        }`}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 mr-4 text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-lg">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-700">
                <button
                  onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
                  disabled={currentQuestion === 0}
                  className="px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all shadow-md disabled:opacity-50 transform hover:scale-105 active:scale-95"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                  </span>
                </button>

                <button
                  onClick={handleSkipQuestion}
                  className="px-5 py-3 bg-gradient-to-r from-yellow-600 to-amber-700 hover:from-yellow-500 hover:to-amber-600 rounded-lg font-medium transition-all shadow-md transform hover:scale-105 active:scale-95"
                >
                  {currentQuestion === questions.length - 1 ? 'Skip & Submit Quiz' : 'Skip'}
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={userAnswers[currentQuestion] === null}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 rounded-lg font-bold transition-all shadow-md disabled:opacity-50 transform hover:scale-105 active:scale-95"
                >
                  {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-gray-400 text-sm">
        <p>Enter a YouTube URL to generate quiz questions based on the video content.</p>
      </div>
    </div>
    </div>
  );
};

export default QuizPage;