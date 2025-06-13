"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import Questions from "../../Components/PageComponents/DSA/Questions";
import Error from "../../Components/PageComponents/DSA/Error";
import Loading from "../../Components/PageComponents/DSA/Loading";
import DailyStreak from "../../Components/PageComponents/DSA/DailyStreak";
import YearlyActivityHeatmap from "../../Components/PageComponents/DSA/YearlyActivityHeatmap";
import Weekly from "../../Components/PageComponents/DSA/Weekly";

interface Question {
  id: string;
  quesNo: number;
  title: string;
  description: string;
  slug : string
  constraint: string;
  tags: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  topicName?: string;
  completed?: boolean; 
  completedAt?: string | null;
  markedForRevision ?: boolean;
}

interface Sheet {
  topic: string;
  level: {
    name: string;
    questions: Question[];
  }[];
}

const DSASheet = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sheet, setSheet] = useState<Sheet[]>([]);

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/dsa/fetch");
        if (res.data?.sheet) {
          setSheet(res.data.sheet);
          console.log("sheet : " , res.data.sheet)
        } else {
          setError("No sheet data found.");
        }
      } catch (err: unknown) {
        const error = err as Error;
         console.error("Error fetching sheets:", error.message);
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  const topics = ["All", ...new Set(sheet.map((sheetTopic) => sheetTopic.topic)) , "Stack" , "Queue" , "Linked List" , "Tree" , "Graph" , "Hashing" , "Recursion" , "DP"];

  const allQuestions: Question[] = sheet.flatMap((sheetTopic) =>
    sheetTopic.level.flatMap((level) =>
      level.questions.map((q) => ({
        ...q,
        topicName: sheetTopic.topic,
        difficulty: level.name,
        completed: q.completed ?? false,
      }))
    )
  );

  const filteredQuestions = allQuestions.filter((q) => {
    const topicMatch = selectedTopic === "All" || q.topicName === selectedTopic;
    const difficultyMatch = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return topicMatch && difficultyMatch;
  });

  const difficultyChartColors = {
    Easy: "#4ade80",
    Medium: "#facc15",
    Hard: "#ef4444",
  };

  const totalQuestions = allQuestions.length;
  const completedQuestions = allQuestions.filter((q) => q.completed).length;
  const completionRate = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  const difficultyDistribution = [
    { name: "Easy", value: allQuestions.filter((q) => q.difficulty === "Easy").length },
    { name: "Medium", value: allQuestions.filter((q) => q.difficulty === "Medium").length },
    { name: "Hard", value: allQuestions.filter((q) => q.difficulty === "Hard").length },
  ];

  const topicDistribution = topics
    .filter((t) => t !== "All")
    .map((topic) => {
      const questions = allQuestions.filter((q) => q.topicName === topic);
      const completed = questions.filter((q) => q.completed).length;
      return {
        name: topic,
        Total: questions.length,
        Completed: completed,
      };
    });

   
    
   
    

  const pointsDistribution = [
    {
      name: "Easy",
      points: allQuestions
        .filter((q) => q.difficulty === "Easy" && q.completed)
        .reduce((sum, q) => sum + q.points, 0),
    },
    {
      name: "Medium",
      points: allQuestions
        .filter((q) => q.difficulty === "Medium" && q.completed)
        .reduce((sum, q) => sum + q.points, 0),
    },
    {
      name: "Hard",
      points: allQuestions
        .filter((q) => q.difficulty === "Hard" && q.completed)
        .reduce((sum, q) => sum + q.points, 0),
    },
  ];

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="bg-gradient-to-b from-[#030711] to-[#111827] min-h-screen p-6 text-gray-100">
      <div className="max-w-screen-xl mx-auto">
       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Problems" value={totalQuestions} badge="Problems" color="blue" />
          <StatCard title="Completed" value={completedQuestions} badge="Solved" color="green" />
          <div className="bg-gray-800 bg-opacity-70 rounded-xl p-4 border border-gray-700 shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Completion Rate</h3>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-white">{completionRate}%</div>
              <div className="w-full ml-4">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <StatCard
            title="Total Points"
            value={allQuestions.filter((q) => q.completed).reduce((sum, q) => sum + q.points, 0)}
            badge="Points"
            color="purple"
          />
        </div>

        <div className="mb-8">
         <DailyStreak questions={allQuestions} />
        </div>

        <div className="mb-8">
          <YearlyActivityHeatmap questions={allQuestions} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartCard title="Problem Difficulty">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {difficultyDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={Object.values(difficultyChartColors)[index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Topic Progress">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" fontSize={4} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937" }} />
                <Legend />
                <Bar dataKey="Total" fill="#60a5fa" />
                <Bar dataKey="Completed" fill="#4ade80" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Progress">
          <Weekly questions={allQuestions}  />
          </ChartCard>
        </div>

        <ChartCard title="Points by Difficulty">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pointsDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937" }} />
              <Bar dataKey="points" radius={[8, 8, 0, 0]}>
                {pointsDistribution.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={Object.values(difficultyChartColors)[index % 3]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="flex flex-wrap gap-4 mb-8 mt-16">
          <FilterDropdown
            label="Topic"
            value={selectedTopic}
            onChange={setSelectedTopic}
            options={topics}
          />
          <FilterDropdown
            label="Difficulty"
            value={selectedDifficulty}
            onChange={setSelectedDifficulty}
            options={["All", "Easy", "Medium", "Hard"]}
          />
        </div>

        <Questions filteredQuestions={filteredQuestions} />
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  badge,
  color,
}: {
  title: string;
  value: number;
  badge: string;
  color: string;
}) => (
  <div className="bg-gray-800 bg-opacity-70 rounded-xl p-4 border border-gray-700 shadow-lg">
    <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
    <div className="flex items-center">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div
        className={`ml-auto bg-${color}-500 bg-opacity-20 text-${color}-300 px-2 py-1 rounded-md text-xs`}
      >
        {badge}
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 bg-opacity-70 rounded-xl p-10 border border-gray-700 shadow-lg h-80">
    <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
    {children}
  </div>
);

const FilterDropdown = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) => (
  <div className="flex-1 min-w-[200px]">
    <label className="block text-sm font-medium mb-2 text-gray-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default DSASheet;
