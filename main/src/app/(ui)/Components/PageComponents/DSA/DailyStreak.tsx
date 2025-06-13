import React, { useState, useEffect } from "react";
import { format, startOfWeek, addDays, isToday, parseISO, isSameDay } from "date-fns";

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

interface ActivityDay {
  day: string;
  count: number;
  intensity: number;
  isToday: boolean;
}

const DailyStreak = ({ questions }: { questions: Question[] }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [weeklyActivity, setWeeklyActivity] = useState<ActivityDay[]>([]);

  useEffect(() => {
    calculateStreakData();
    generateWeeklyActivity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const calculateStreakData = () => {
    if (!questions || questions.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    const completionDates = questions
      .filter(q => q.completed && q.completedAt)
      .map(q => q.completedAt ? parseISO(q.completedAt) : new Date())
      .sort((a, b) => a.getTime() - b.getTime());

    if (completionDates.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    let current = 0;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const hasTodayActivity = completionDates.some(date => isSameDay(date, today));
    const hasYesterdayActivity = completionDates.some(date => isSameDay(date, yesterday));

    if (hasTodayActivity) {
      current = 1;
      const checkDate = yesterday;
      
      while (true) {
        const hasActivity = completionDates.some(date => isSameDay(date, checkDate));
        if (!hasActivity) break;
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    } else if (hasYesterdayActivity) {
      current = 1;
      const checkDate = new Date(yesterday);
      checkDate.setDate(checkDate.getDate() - 1);
      
      while (true) {
        const hasActivity = completionDates.some(date => isSameDay(date, checkDate));
        if (!hasActivity) break;
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    let longest = 0;
    let currentLongest = 0;
    
    const dateMap = new Map<string, boolean>();
    completionDates.forEach(date => {
      const dateString = format(date, "yyyy-MM-dd");
      dateMap.set(dateString, true);
    });
    
    const earliest = completionDates[0];
    const latest = completionDates[completionDates.length - 1];
    
    const currentDate = new Date(earliest);
    while (currentDate <= latest) {
      const dateString = format(currentDate, "yyyy-MM-dd");
      
      if (dateMap.has(dateString)) {
        currentLongest++;
        longest = Math.max(longest, currentLongest);
      } else {
        currentLongest = 0;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setCurrentStreak(current);
    setLongestStreak(longest);
  };

  const generateWeeklyActivity = () => {
    if (!questions || questions.length === 0) {
      setWeeklyActivity([]);
      return;
    }

    const startDay = startOfWeek(new Date());
    
    const activity: ActivityDay[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(startDay, i);
      const dayStr = format(day, "EEE");
      
      const completedCount = questions.filter(q => 
        q.completed && 
        q.completedAt && 
        isSameDay(parseISO(q.completedAt), day)
      ).length;
      
      let intensity = 0;
      if (completedCount > 0) {
        intensity = completedCount > 5 ? 4 : Math.ceil(completedCount / 2);
      }
      
      activity.push({
        day: dayStr,
        count: completedCount,
        intensity,
        isToday: isToday(day)
      });
    }
    
    setWeeklyActivity(activity);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 rounded-xl p-6 border border-gray-700 shadow-lg">
      <h3 className="text-lg font-medium text-white mb-4">Consistency Streak</h3>
      
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Current Streak</p>
          <p className="text-3xl font-bold text-white">
            {currentStreak} <span className="text-orange-400 text-xl">🔥</span>
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">Longest Streak</p>
          <p className="text-3xl font-bold text-white">
            {longestStreak} <span className="text-orange-400 text-xl">🔥</span>
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-400 text-sm mb-2">This Week`s Activity</p>
        <div className="flex justify-between">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-md flex items-center justify-center ${
                  day.isToday ? 'border border-blue-400' : ''
                }`}
                style={{
                  backgroundColor: day.intensity === 0 
                    ? '#374151' 
                    : day.intensity === 1 
                      ? '#166534' 
                      : day.intensity === 2 
                        ? '#15803d' 
                        : day.intensity === 3 
                          ? '#16a34a' 
                          : '#22c55e'
                }}
              >
                {day.count > 0 && <span className="text-xs text-white">{day.count}</span>}
              </div>
              <span className="text-xs text-gray-400 mt-1">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyStreak;