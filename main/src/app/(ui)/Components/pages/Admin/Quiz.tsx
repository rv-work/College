import { useState } from "react";
import { Search, ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface Quize {
  id: string;
  score: number;
  maxScore: number;
  timeTaken: string;
  topic: string;
  user: { name: string; admissionNumber: string };
  createdAt: string; // changed from Date to string for consistency with API
}

export default function QuizPerformance({ quizData }: { quizData: Quize[] }) {
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  if (!quizData) return null;

  const sortedData = [...quizData]
    .filter((quiz) => {
      return (
        quiz.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(quiz.createdAt).toLocaleDateString().includes(searchTerm) ||
        quiz.score.toString().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      let comparison = 0;

      if (sortField === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === "score") {
        comparison = a.score - b.score;
      } else if (sortField === "timeTaken") {
        comparison = parseInt(a.timeTaken) - parseInt(b.timeTaken);
      } else if (sortField === "topic") {
        comparison = a.topic.localeCompare(b.topic);
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const formatTime = (seconds: string) => {
    if (seconds === "0") return "N/A";
    const mins = Math.floor(parseInt(seconds) / 60);
    const secs = parseInt(seconds) % 60;
    return `${mins}m ${secs}s`;
  };

  const totalQuizzes = quizData.length;
  const completedQuizzes = quizData.filter((quiz) => parseInt(quiz.timeTaken) > 0).length;
  const totalScore = quizData.reduce((sum, quiz) => sum + quiz.score, 0);
  const totalPossibleScore = quizData.reduce((sum, quiz) => sum + quiz.maxScore, 0);
  const averagePerformance = totalPossibleScore > 0 ? Math.round((totalScore / totalPossibleScore) * 100) : 0;

  return (
    <div className="bg-navy-800 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Quiz Performance</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-navy-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Total Quizzes</p>
          <p className="text-2xl font-bold">{totalQuizzes}</p>
        </div>
        <div className="bg-navy-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-2xl font-bold">{completedQuizzes}</p>
        </div>
        <div className="bg-navy-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Score</p>
          <p className="text-2xl font-bold">
            {totalScore} / {totalPossibleScore}
          </p>
        </div>
        <div className="bg-navy-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Average</p>
          <p className="text-2xl font-bold">{averagePerformance}%</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-navy-700 text-white pl-10 pr-4 py-2 rounded-lg w-full"
          placeholder="Search by topic, date, or score..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Quiz Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2 text-left">
                <button className="flex items-center text-gray-400 hover:text-white" onClick={() => handleSort("createdAt")}>
                  Date
                  {sortField === "createdAt" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </button>
              </th>
              <th className="pb-2 text-left">
                <button className="flex items-center text-gray-400 hover:text-white" onClick={() => handleSort("topic")}>
                  Topic
                  {sortField === "topic" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </button>
              </th>
              <th className="pb-2 text-left">
                <button className="flex items-center text-gray-400 hover:text-white" onClick={() => handleSort("score")}>
                  Score
                  {sortField === "score" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </button>
              </th>
              <th className="pb-2 text-left">
                <button className="flex items-center text-gray-400 hover:text-white" onClick={() => handleSort("timeTaken")}>
                  Time
                  {sortField === "timeTaken" &&
                    (sortDirection === "asc" ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </button>
              </th>
              <th className="pb-2 text-right">Performance</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((quiz) => {
              const scorePercentage = quiz.maxScore > 0 ? (quiz.score / quiz.maxScore) * 100 : 0;
              let performanceBg = "bg-red-500";
              if (scorePercentage >= 80) performanceBg = "bg-green-500";
              else if (scorePercentage >= 60) performanceBg = "bg-yellow-500";
              else if (scorePercentage >= 40) performanceBg = "bg-orange-500";

              return (
                <tr key={quiz.id} className="border-b border-gray-800 hover:bg-navy-700">
                  <td className="py-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">{quiz.topic}</td>
                  <td className="py-3">
                    {quiz.score} / {quiz.maxScore}
                  </td>
                  <td className="py-3">{formatTime(quiz.timeTaken)}</td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center">
                      <span className="mr-2">{Math.round(scorePercentage)}%</span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className={`${performanceBg} h-2 rounded-full`}
                          style={{ width: `${scorePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-400">No quiz data found matching your search.</div>
      )}
    </div>
  );
}
