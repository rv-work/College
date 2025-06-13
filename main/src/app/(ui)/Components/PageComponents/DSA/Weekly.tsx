import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Question {
  id: string;
  completed?: boolean;
  completedAt?: string | null;
  points?: number;
}

const Weekly = ({ questions = [] }: { questions: Question[] }) => {
  const [chartData, setChartData] = useState<{ name: string; completed: number; daily: number[]; points?: number; total: number; totalPoints?: number; weekNumber?: number; sun?: number; mon?: number; tue?: number; wed?: number; thu?: number; fri?: number; sat?: number; }[]>([]);
  
  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };
  
  useEffect(() => {
    if (!questions.length) {
      const emptyData = [
        { name: 'Week 0', completed: 0, daily: [0, 0, 0, 0, 0, 0, 0], total: 0, totalPoints: 0, weekNumber: 0, points: 0, sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
        { name: 'Week 1', completed: 0, daily: [0, 0, 0, 0, 0, 0, 0], total: 0, totalPoints: 0, weekNumber: 1, points: 0, sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
        { name: 'Week 2', completed: 0, daily: [0, 0, 0, 0, 0, 0, 0], total: 0, totalPoints: 0, weekNumber: 2, points: 0, sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
        { name: 'Week 3', completed: 0, daily: [0, 0, 0, 0, 0, 0, 0], total: 0, totalPoints: 0, weekNumber: 3, points: 0, sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 },
        { name: 'Week 4', completed: 0, daily: [0, 0, 0, 0, 0, 0, 0], total: 0, totalPoints: 0, weekNumber: 4, points: 0, sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 }
      ];
      setChartData(emptyData);
      return;
    }
    
    const today = new Date();
    const currentWeekNumber = getWeekNumber(today);
    
    const data = Array(5).fill(0).map((_, i) => ({
      name: `Week ${i}`,
      weekNumber: currentWeekNumber - 4 + i,
      completed: 0,
      points: 0,
      daily: [0, 0, 0, 0, 0, 0, 0],
      sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, total: 0,
      totalPoints: 0
    }));
    
    const completedQuestions = questions.filter(q => q.completed && q.completedAt);
    
    completedQuestions.forEach(question => {
      if (!question.completedAt) return;
      
      const completionDate = new Date(question.completedAt);
      const weekNum = getWeekNumber(completionDate);
      const weekIndex = data.findIndex(w => w.weekNumber === weekNum);
      
      if (weekIndex >= 0) {
        data[weekIndex].completed++;
        
        if (question.points) {
          data[weekIndex].points += question.points;
        }
        
        const dayOfWeek = completionDate.getDay();
        data[weekIndex].daily[dayOfWeek]++;
        
        const dayNames: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        data[weekIndex][dayNames[dayOfWeek] as keyof typeof data[0]]++;
      }
    });
    
    let runningTotal = 0;
    let runningPoints = 0;
    data.forEach(week => {
      runningTotal += week.completed;
      runningPoints += week.points;
      week.total = runningTotal;
      week.totalPoints = runningPoints;
    });
    
    setChartData(data);
  }, [questions]);
  
  interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: { completed: number; total: number; points: number; daily: number[] } }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const weekData = payload[0].payload;
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      return (
        <div className="bg-gray-800 p-3 border border-gray-700 rounded shadow-lg">
          <p className="font-bold text-sm mb-1">{label}</p>
          <p className="text-blue-300 text-xs">Week completed: {weekData.completed}</p>
          <p className="text-green-300 text-xs">Total completed: {weekData.total}</p>
          {weekData.points > 0 && (
            <p className="text-purple-300 text-xs">Points: {weekData.points}</p>
          )}
          <div className="mt-1 pt-1 border-t border-gray-700">
            <p className="font-medium text-xs mb-1">Daily breakdown:</p>
            <div className="grid grid-cols-7 gap-1 text-center">
              {dayNames.map((day, i) => (
                <div key={day} className="text-xs">
                  <div className="text-gray-400">{day}</div>
                  <div className="font-medium">{weekData.daily[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#888' }} 
            axisLine={{ stroke: '#666' }}
          />
          <YAxis 
            tick={{ fill: '#888' }} 
            axisLine={{ stroke: '#666' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="total" 
            name="Total Completed" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ r: 3, fill: '#10B981', stroke: '#065F46', strokeWidth: 1 }}
            activeDot={{ r: 5, fill: '#10B981', stroke: '#ECFDF5', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="completed" 
            name="Weekly Completed" 
            stroke="#60a5fa" 
            strokeWidth={2}
            dot={{ r: 3, fill: '#60a5fa', stroke: '#1E40AF', strokeWidth: 1 }}
            activeDot={{ r: 5, fill: '#60a5fa', stroke: '#EFF6FF', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="points"
            name="Points"
            stroke="#A855F7"
            strokeWidth={2}
            dot={{ r: 3, fill: '#A855F7', stroke: '#6B21A8', strokeWidth: 1 }}
            activeDot={{ r: 5, fill: '#A855F7', stroke: '#F3E8FF', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Weekly;