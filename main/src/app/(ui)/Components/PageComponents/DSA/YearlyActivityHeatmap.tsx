import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface Question {
  id: string;
  quesNo: number;
  title: string;
  description: string;
  constraint: string;
  tags: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  topicName?: string;
  completed?: boolean;
  completedAt?: string | null;
  markedForRevision?: boolean;
}

interface Day {
  date: Date;
  count: number;
  questions: Question[];
}

const YearlyActivityHeatmap = ({ questions }: { questions: Question[] }) => {
  const [heatmapData, setHeatmapData] = useState<Day[][]>([]);
  const [yearTotal, setYearTotal] = useState(0);
  const [maxCount, setMaxCount] = useState(0);
  const [tooltipData, setTooltipData] = useState<{show: boolean, x: number, y: number, day: Day | null}>({
    show: false,
    x: 0,
    y: 0,
    day: null
  });

  // Example questions if none provided for demo purposes
  const demoQuestions = React.useMemo(() => {
    const result = [];
    const today = new Date();
    
    // Generate some random completed questions over the past year
    for (let i = 0; i < 200; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 365);
      const date = new Date();
      date.setDate(today.getDate() - randomDaysAgo);
      
      result.push({
        id: `q${i}`,
        quesNo: i,
        title: `Question ${i}`,
        description: "Example question",
        constraint: "",
        tags: ["Array", "String"],
        leetcode: "https://leetcode.com/problems/example/",
        points: 10,
        difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
        completed: true,
        completedAt: date.toISOString(),
        markedForRevision: Math.random() > 0.7
      });
    }
    
    return result;
  }, []);

  // Use the provided questions or fall back to demo questions
  const questionData = questions && questions.length > 0 ? questions : demoQuestions;

  useEffect(() => {
    // Filter questions with completedAt dates only
    const completedQuestions = questionData.filter(q => q.completed && q.completedAt);
    
    // Create a date range for the last year (53 weeks to show full weeks)
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setDate(today.getDate() - 371); // Go back a bit more than a year for full weeks
    
    // Get day of week (0 = Sunday, 6 = Saturday)
    const startDayOfWeek = oneYearAgo.getDay();
    
    // Calculate real start date (previous Sunday)
    const startDate = new Date(oneYearAgo);
    startDate.setDate(oneYearAgo.getDate() - startDayOfWeek);
    
    // Create a map to hold question counts by date
    const dateCountMap = new Map();
    const questionsMap = new Map();
    
    // Initialize the map with empty counts for all dates
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dateCountMap.set(dateStr, 0);
      questionsMap.set(dateStr, []);
    }
    
    // Count completed questions by date
    let total = 0;
    let maxDay = 0;
    
    completedQuestions.forEach(question => {
      if (!question.completedAt) return;
      
      const dateStr = new Date(question.completedAt).toISOString().split('T')[0];
      if (dateCountMap.has(dateStr)) {
        dateCountMap.set(dateStr, dateCountMap.get(dateStr) + 1);
        questionsMap.get(dateStr).push(question);
        total++;
        maxDay = Math.max(maxDay, dateCountMap.get(dateStr));
      }
    });
    
    // Generate the calendar grid data (7 rows for days of week)
    const calendar: Day[][] = Array(7).fill(null).map(() => []);
    
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split('T')[0];
      const count = dateCountMap.get(dateStr) || 0;
      
      // Add day to the correct day of week row
      calendar[dayOfWeek].push({
        date: new Date(d),
        count,
        questions: questionsMap.get(dateStr) || []
      });
    }
    
    setHeatmapData(calendar);
    setYearTotal(total);
    setMaxCount(maxDay);
  }, [questionData]);

  // Calculate the intensity for the heat map cell color
  const getIntensityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    
    const intensity = Math.min(1, count / Math.max(1, maxCount));
    
    if (intensity < 0.25) return 'bg-green-100';
    if (intensity < 0.5) return 'bg-green-300';
    if (intensity < 0.75) return 'bg-green-500';
    return 'bg-green-700';
  };

 

  const handleDayMouseEnter = (day: Day, e: React.MouseEvent) => {
    setTooltipData({
      show: true,
      x: e.clientX,
      y: e.clientY,
      day
    });
  };

  const handleDayMouseLeave = () => {
    setTooltipData({
      ...tooltipData,
      show: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

 

  return (
    <div className="bg-gray-700 rounded-lg shadow-md p-4 w-full">
      <div className="flex items-center mb-4">
        <Calendar className="mr-2 text-white" size={20} />
        <h2 className="text-lg font-semibold text-white">
          {yearTotal} Problems Solved in the Last Year
        </h2>
      </div>

      <div className="relative overflow-x-auto">
        


          {/* Heatmap grid */}
          <div className="flex ml-4 flex-col gap-1">
            {heatmapData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2">
                {row.map((day, colIndex) => (
                  <div
                    key={colIndex}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(day.count)} cursor-pointer transform transition-transform hover:scale-150`}
                    title={`${formatDate(day.date)}: ${day.count} problems`}
                    onMouseEnter={(e) => handleDayMouseEnter(day, e)}
                    onMouseLeave={handleDayMouseLeave}
                  />
                ))}
              </div>
            ))}
          </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-2 text-xs text-white">
          <span className="mr-1">Less</span>
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-100 rounded-sm ml-1"></div>
          <div className="w-3 h-3 bg-green-300 rounded-sm ml-1"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm ml-1"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm ml-1"></div>
          <span className="ml-1">More</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipData.show && tooltipData.day && (
        <div 
          className="absolute bg-gray-800 text-white p-2 rounded shadow-lg z-10 text-xs"
          style={{ 
            top: `${tooltipData.y + 10}px`, 
            left: `${tooltipData.x + 10}px`,
            maxWidth: '250px'
          }}
        >
          <div className="font-semibold">{formatDate(tooltipData.day.date)}</div>
          <div className="mb-1">{tooltipData.day.count} problems solved</div>
          {tooltipData.day.count > 0 && (
            <div className="max-h-32 overflow-y-auto">
              {tooltipData.day.questions.map((q, i) => (
                <div key={i} className="flex items-center mt-1 text-xs">
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                    q.difficulty === 'Easy' ? 'bg-green-400' : 
                    q.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></span>
                  <span className="truncate">{q.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YearlyActivityHeatmap;