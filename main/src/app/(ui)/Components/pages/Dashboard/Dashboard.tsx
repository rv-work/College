"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaSpinner,
  FaEye,
  FaGraduationCap,
  FaCode,
  FaStar,
  FaUsers,
  FaChartPie,
  FaChartLine,
  FaChartBar,
  FaTrophy,
  FaMedal,
  FaFileAlt, FaBookOpen, FaLaptopCode, FaFilePowerpoint, FaStickyNote
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,

  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid
} from "recharts";
import Image from "next/image";
import QuizComponent from "../../PageComponents/Profile/Quiz";

interface UserDetails {
  name: string;
  email: string;
  year: string;
  branch: string;
  username: string;
  contributions: Contribution[];
}

interface Contribution {
  id: string;
  contributorId: string;
  createdAt: string;
  aktu: string[];
  st: string[];
  youtube: string[];
  ppt: string[];
  notes: string[];
}

interface Quiz {
  id : string;
  maxScore : number,
  score : number, 
  timeTaken : string,
  topic : string
  createdAt : string
}

interface Classroom {
  title: string;
  date: string;
}

interface Event {
  title: string;
  date?: string;
  participants?: number;
  banner: string;
  category: string;
  description: string;
  domain: string
}

interface DashboardData {
  userDetails: UserDetails;
  classroomStats: { hosted: number; joined: number };
  eventStats: { participated: number; hosted: number };
  quizes : number
}


interface CategoryItem {
  name: string;
  value: number;
}

interface MonthlyContribution {
  month: string;
  AKTU: number;
  ST: number;
  Youtube: number;
  Notes: number;
  PPT: number;
  [key: string]: string | number; // For flexibility
}

interface EngagementItem {
  name: string;
  hosted: number,
  participated: number
}

interface EventDetails {
  hosted: Event[];
  participated: Event[];
}

interface ActivityDataItem {
  month: string;
  hostedClassrooms: number;
  joinedClassrooms: number;
  hostedEvents: number;
  participatedEvents: number;
}


// const activityData = [
//   { month: 'Jan', classrooms: 4, events: 2 },
//   { month: 'Feb', classrooms: 3, events: 5},
//   { month: 'Mar', classrooms: 7, events: 3 },
//   { month: 'Apr', classrooms: 5, events: 6},
//   { month: 'May', classrooms: 8, events: 4},
//   { month: 'Jun', classrooms: 6, events: 7}
// ]; 




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', "#82ca9d", "#FFBB28", "#FF8042"];

const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.replace("#", ""), 16);
  const r = (num >> 16) + Math.round((255 - (num >> 16)) * (percent / 100));
  const g = ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * (percent / 100));
  const b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * (percent / 100));
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const Dashboard: React.FC = () => {

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [classroomLoading, setClassroomLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);


  const [engagementData, setEngagementData] = useState<EngagementItem[]>([]);

  const [categoryDistribution, setCategoryDistribution] = useState<CategoryItem[]>([]);
  const [contributionData, setContributionData] = useState<MonthlyContribution[]>([]);

  const [activityData, setActivityData] = useState<ActivityDataItem[]>([]);

  const [classroomDetails, setClassroomDetails] = useState<{
    hosted: Classroom[];
    joined: Classroom[]
  } | null>(null);

  const [eventDetails, setEventDetails] = useState<{
    participated: Event[];
    hosted: Event[]
  } | null>(null);

  const [quizDetails, setQuizDetails] = useState<
   Quiz[]
  >([]);

  const [activeClassTab, setActiveClassTab] = useState<'hosted' | 'joined'>('hosted');
  const [activeEventTab, setActiveEventTab] = useState<'hosted' | 'participated'>('hosted');
  const [activeStatTab, setActiveStatTab] = useState<'activity' | 'engagement' | 'performance'>('activity');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get<DashboardData>("/api/profile/dashboard");
        setDashboardData(res.data);

        // Process data for charts after fetching
        if (res.data?.userDetails?.contributions) {
          processContributionData(res.data.userDetails.contributions);
        }

        console.log("data.......", res.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const processContributionData = (contributions: Contribution[]): void => {
    const currentDate = new Date();

    let totalAktu = 0, totalSt = 0, totalYoutube = 0, totalNotes = 0, totalPpt = 0;

    const monthlyData: Record<string, MonthlyContribution> = {};
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const monthYear = `${monthName}-${date.getFullYear()}`;
      monthlyData[monthYear] = {
        month: monthName,
        AKTU: 0,
        ST: 0,
        Youtube: 0,
        Notes: 0,
        PPT: 0
      };
    }

    contributions.forEach(contrib => {
      if (contrib.aktu?.length) totalAktu += contrib.aktu.length;
      if (contrib.st?.length) totalSt += contrib.st.length;
      if (contrib.youtube?.length) totalYoutube += contrib.youtube.length;
      if (contrib.notes?.length) totalNotes += contrib.notes.length;
      if (contrib.ppt?.length) totalPpt += contrib.ppt.length;


      if (contrib.aktu?.length) {
        contrib.aktu.forEach(timestamp => {
          const date = new Date(timestamp);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          if (monthlyData[monthYear]) {
            monthlyData[monthYear].AKTU += 1;
          }
        });
      }

      if (contrib.st?.length) {
        contrib.st.forEach(timestamp => {
          const date = new Date(timestamp);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          if (monthlyData[monthYear]) {
            monthlyData[monthYear].ST += 1;
          }
        });
      }

      if (contrib.youtube?.length) {
        contrib.youtube.forEach(timestamp => {
          const date = new Date(timestamp);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          if (monthlyData[monthYear]) {
            monthlyData[monthYear].Youtube += 1;
          }
        });
      }

      if (contrib.notes?.length) {
        contrib.notes.forEach(timestamp => {
          const date = new Date(timestamp);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          if (monthlyData[monthYear]) {
            monthlyData[monthYear].Notes += 1;
          }
        });
      }

      if (contrib.ppt?.length) {
        contrib.ppt.forEach(timestamp => {
          const date = new Date(timestamp);
          const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
          if (monthlyData[monthYear]) {
            monthlyData[monthYear].PPT += 1;
          }
        });
      }
    });

    const categoryDistribution: CategoryItem[] = [
      { name: 'AKTU', value: totalAktu },
      { name: 'ST', value: totalSt },
      { name: 'Youtube', value: totalYoutube },
      { name: 'Notes', value: totalNotes },
      { name: 'PPT', value: totalPpt },
    ];

    const contributionData: MonthlyContribution[] = Object.values(monthlyData).reverse();

    setCategoryDistribution(categoryDistribution);
    setContributionData(contributionData);
  };

  const loadClassroomDetails = async () => {
    if (classroomDetails) return;
    setClassroomLoading(true);
    try {
      const res = await axios.get("/api/profile/class");
      setClassroomDetails(res.data);

      console.log("class data ..", res.data)
    } catch (error) {
      console.error("Error loading classroom details", error);
    } finally {
      setClassroomLoading(false);
    }
  };

  
  const loadQuizDetails = async () => {
    if (quizDetails.length > 0) return;
    setQuizLoading(true);
    try {
      const res = await axios.get("/api/profile/quiz");
      setQuizDetails(res.data.quizes);

      console.log("quiz data ..", res.data)
    } catch (error) {
      console.error("Error loading quiz details", error);
    } finally {
      setQuizLoading(false);
    }
  };

  const loadEventDetails = async () => {
    if (eventDetails) return;
    setEventLoading(true);
    try {
      const res = await axios.get<EventDetails>("/api/profile/event");
      setEventDetails(res.data);
      console.log("event data : ", res.data);

      if (res.data) {
        processEventEngagementData(res.data);
      }

    } catch (error) {
      console.error("Error loading event details", error);
    } finally {
      setEventLoading(false);
    }
  };

  

  const processActivityTimelineData = (): void => {
    console.log("inside the function");
    const currentDate = new Date();
  
    const monthlyData: Record<string, ActivityDataItem> = {};
  
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const monthKey = `${year}-${date.getMonth() + 1}`;
  
      monthlyData[monthKey] = {
        month: monthName,
        hostedClassrooms: 0,
        joinedClassrooms: 0,
        hostedEvents: 0,
        participatedEvents: 0
      };
    }
  
    if (classroomDetails) {
      // Process hosted classrooms
      if (classroomDetails.hosted) {
        classroomDetails.hosted.forEach(classroom => {
          if (classroom.date) {
            const date = new Date(classroom.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
            if (monthlyData[monthKey]) {
              monthlyData[monthKey].hostedClassrooms += 1;
            }
          }
        });
      }
  
      // Process joined classrooms
      if (classroomDetails.joined) {
        classroomDetails.joined.forEach(classroom => {
          if (classroom.date) {
            const date = new Date(classroom.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
            if (monthlyData[monthKey]) {
              monthlyData[monthKey].joinedClassrooms += 1;
            }
          }
        });
      }
    }
  
    if (eventDetails) {
      // Process hosted events
      if (eventDetails.hosted) {
        eventDetails.hosted.forEach(event => {
          if (event.date) {
            const date = new Date(event.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
            if (monthlyData[monthKey]) {
              monthlyData[monthKey].hostedEvents += 1;
            }
          }
        });
      }
  
      // Process participated events
      if (eventDetails.participated) {
        eventDetails.participated.forEach(event => {
          if (event.date) {
            const date = new Date(event.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
            if (monthlyData[monthKey]) {
              monthlyData[monthKey].participatedEvents += 1;
            }
          }
        });
      }
    }
  
    const sortedMonths = Object.keys(monthlyData)
      .sort()
      .map(key => monthlyData[key]);
  
    setActivityData(sortedMonths);
  };

  const processEventEngagementData = (data: EventDetails): void => {
    const hostedCategoryMap: Record<string, number> = {};
    const participatedCategoryMap: Record<string, number> = {};

    (data.hosted || []).forEach(event => {
      const category = event.domain

      if (hostedCategoryMap[category]) {
        hostedCategoryMap[category] += 1;
      } else {
        hostedCategoryMap[category] = 1;
      }
    });

    (data.participated || []).forEach(event => {
      const category = event.domain

      if (participatedCategoryMap[category]) {
        participatedCategoryMap[category] += 1;
      } else {
        participatedCategoryMap[category] = 1;
      }
    });

    const allCategories = new Set([
      ...Object.keys(hostedCategoryMap),
      ...Object.keys(participatedCategoryMap)
    ]);

    const processedData = Array.from(allCategories).map(category => ({
      name: category,
      hosted: hostedCategoryMap[category] || 0,
      participated: participatedCategoryMap[category] || 0
    }));

    processedData.sort((a, b) =>
      (b.hosted + b.participated) - (a.hosted + a.participated)
    );

    setEngagementData(processedData);
  };

  useEffect(() => {
    if (classroomDetails && eventDetails) {
      processActivityTimelineData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomDetails, eventDetails]);
  
  const fetchDataAndStartInterval = async () => {
    await loadClassroomDetails();
    await loadEventDetails();
    await loadQuizDetails()
  };
  
  useEffect(() => {
    fetchDataAndStartInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("perfo.............", activityData)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };


  let youtubeLength = null;
  let stLength = null;
  let aktuLength = null;
  let notesLength = null;
  let pptLength = null;
  let totalLength = null;
  const contribution = dashboardData?.userDetails.contributions[0];
  youtubeLength = contribution?.youtube.length;
  stLength = contribution?.st.length;
  aktuLength = contribution?.aktu.length;
  notesLength = contribution?.notes.length;
  pptLength = contribution?.ppt.length;
  if (youtubeLength && stLength && aktuLength && notesLength && pptLength) {
    totalLength = youtubeLength + stLength + aktuLength + notesLength + pptLength
  }



  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-40 w-full">
      <div className="relative">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full opacity-75"></div>
      </div>
    </div>
  );

  const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: number; color: string }) => (
    <div className={`bg-opacity-20 rounded-xl p-4 flex items-center ${color} transition-all duration-300 hover:scale-105 shadow-lg`}>
      <div className={`p-3 rounded-full mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-300">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  const ChartCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-gray-700 border-opacity-30">
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-bold flex items-center gap-2">
          {icon}
          {title}
        </h3>
      </div>
      <div className="p-4 h-64">
        {children}
      </div>
    </div>
  );

  interface CustomTooltipProps {
    active?: boolean;
    payload?: { color: string; name: string; value: number }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e293b] p-2 border border-gray-700 rounded shadow-lg">
          <p className="font-medium text-sm">{`${label}`}</p>
          {payload.map((entry: { color: string; name: string; value: number }, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-xs">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };


  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-blue-900 p-8 text-center">
        <div className="mb-6">
          <svg className="animate-spin h-16 w-16 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Loading Your Content</h3>
        <p className="text-blue-300 max-w-md text-lg">
          Please wait while we retrieve your materials...
        </p>
      </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-4 md:p-8 text-white">
      <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] rounded-3xl shadow-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center md:items-center gap-6 border border-gray-700 border-opacity-30 backdrop-blur-sm">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse"></div>
          <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl md:text-4xl font-bold shadow-xl border-2 border-white border-opacity-20">
            {dashboardData?.userDetails.name
              ? getInitials(dashboardData.userDetails.name)
              : ''}
          </div>
        </div>
        <div className="text-center md:text-left ">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {dashboardData?.userDetails.name}
          </h1>
          <h1 className="text-lg md:text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {dashboardData?.userDetails.username}
          </h1>
          <p className="text-gray-300 mb-2">{dashboardData?.userDetails.email}</p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="px-3 py-1 bg-blue-900 bg-opacity-40 rounded-full text-sm flex items-center">
              <FaGraduationCap className="mr-1 text-blue-400" />
              {dashboardData?.userDetails.year}
            </span>
            <span className="px-3 py-1 bg-purple-900 bg-opacity-40 rounded-full text-sm flex items-center">
              <FaCode className="mr-1 text-purple-400" />
              {dashboardData?.userDetails.branch}
            </span>
          </div>
        </div>
        <div className="md:ml-auto grid grid-cols-4 gap-3">


          <StatCard
            icon={<FaLaptopCode className="text-yellow-300" />}
            title="Youtube Contributions"
            value={youtubeLength || 0}
            color="bg-[#FFBB28]"
          />
          <StatCard
            icon={<FaBookOpen className="text-green-300" />}
            title="ST Contributions"
            value={stLength || 0}
            color="bg-[#00C49F]"
          />
          <StatCard
            icon={<FaFileAlt className="text-blue-300" />}
            title="AKTU Contributions"
            value={aktuLength || 0}
            color="bg-[#0088FE]"
          />
          <StatCard
            icon={<FaFilePowerpoint className="text-purple-300" />}
            title="PPT Contributions"
            value={pptLength || 0}
            color="bg-[#8884d8]"
          />
          <StatCard
            icon={<FaStickyNote className="text-orange-300" />}
            title="Notes"
            value={notesLength || 0}
            color="bg-[#FF8042]"
          />
          <StatCard
            icon={<FaChartPie className="text-purple-300" />}
            title="Total Contributions"
            value={totalLength || 0}
            color="bg-purple-900"
          />
          <StatCard
            icon={<FaChalkboardTeacher className="text-blue-300" />}
            title="Classes Hosted"
            value={dashboardData?.classroomStats.hosted || 0}
            color="bg-blue-900"
          />
          <StatCard
            icon={<FaUsers className="text-green-300" />}
            title="Classes Joined"
            value={dashboardData?.classroomStats.joined || 0}
            color="bg-green-900"
          />
          <StatCard
            icon={<FaCalendarAlt className="text-yellow-300" />}
            title="Events Hosted"
            value={dashboardData?.eventStats.hosted || 0}
            color="bg-yellow-900"
          />
          <StatCard
            icon={<FaStar className="text-pink-300" />}
            title="Events Attended"
            value={dashboardData?.eventStats.participated || 0}
            color="bg-pink-900"
          />
          <StatCard
            icon={<FaStar className="text-teal-300" />}
            title="Quizes Attended"
            value={dashboardData?.quizes|| 0}
            color="bg-teal-900"
          />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mb-8">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="p-2 bg-purple-900 bg-opacity-50 rounded-lg">
              <FaChartLine className="text-purple-400" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Analytics & Insights
            </span>
          </h2>
        </div>

        {/* Chart Tabs */}
        <div className="flex space-x-4 border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveStatTab('activity')}
            className={`pb-2 px-4 font-medium transition-all duration-300 ${activeStatTab === 'activity'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-purple-300'
              }`}
          >
            ContriButions Overview
          </button>
          <button
            onClick={() => setActiveStatTab('engagement')}
            className={`pb-2 px-4 font-medium transition-all duration-300 ${activeStatTab === 'engagement'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-purple-300'
              }`}
          >
            Engagement Stats
          </button>
          <button
            onClick={() => setActiveStatTab('performance')}
            className={`pb-2 px-4 font-medium transition-all duration-300 ${activeStatTab === 'performance'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-purple-300'
              }`}
          >
            Engagement Analysis
          </button>
        </div>

        {activeStatTab === 'activity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard title="Monthly ContriButions" icon={<FaChartLine className="text-teal-400" />}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={contributionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="AKTU"
                    stroke="#0088FE" // Blue
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="ST"
                    stroke="#00C49F" // Green
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Youtube"
                    stroke="#FFBB28" // Orange
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Notes"
                    stroke="#FF8042" // Coral
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="PPT"
                    stroke="#A28BEF" // Purple
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />


                </LineChart>
              </ResponsiveContainer>
            </ChartCard>


            <ChartCard title="Category ContriButions" icon={<FaChartPie className="text-yellow-400" />}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* Engagement Stats */}
        {activeStatTab === 'engagement' && (
          <div className="grid grid-cols-1 gap-6">
            <ChartCard title="Engagement by Category" icon={<FaChartBar className="text-green-400" />}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={engagementData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="hosted" name="Hosted" fill="#fff">
                    {engagementData.map((entry, index) => (
                      <Cell
                        key={`cell-hosted-${index}`}
                        fill={lightenColor(COLORS[index % COLORS.length], 25)}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="participated" name="Participated" fill="#000">
                    {engagementData.map((entry, index) => (
                      <Cell
                        key={`cell-participated-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}

        {/* Performance Analysis */}
        {activeStatTab === 'performance' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
            <ChartCard title="Activity Timeline" icon={<FaChartLine className="text-blue-400" />}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={activityData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorHostedClassrooms" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorJoinedClassrooms" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4834d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4834d4" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorHostedEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorParticipatedEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2ecc71" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="hostedClassrooms"
                    name="Hosted Classrooms"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorHostedClassrooms)"
                  />
                  <Area
                    type="monotone"
                    dataKey="joinedClassrooms"
                    name="Joined Classrooms"
                    stroke="#4834d4"
                    fillOpacity={1}
                    fill="url(#colorJoinedClassrooms)"
                  />
                  <Area
                    type="monotone"
                    dataKey="hostedEvents"
                    name="Hosted Events"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorHostedEvents)"
                  />
                  <Area
                    type="monotone"
                    dataKey="participatedEvents"
                    name="Participated Events"
                    stroke="#2ecc71"
                    fillOpacity={1}
                    fill="url(#colorParticipatedEvents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
            </div>


            <div className="bg-[#1e293b] rounded-xl p-4 mb-4 border border-gray-700 border-opacity-30 shadow-lg">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                Top Achievements
              </h3>
              <div className="space-y-3 p-4">
                <div className="flex items-center gap-3 p-2 bg-yellow-900 bg-opacity-20 rounded-lg">
                  <FaMedal className="text-yellow-400" />
                  <div>
                    <p className="font-medium">Top Contributor</p>
                    <p className="text-xs text-gray-400">Hosted 8 classes in May</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-900 bg-opacity-20 rounded-lg">
                  <FaMedal className="text-blue-400" />
                  <div>
                    <p className="font-medium">Most Active</p>
                    <p className="text-xs text-gray-400">7 events participated in June</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-purple-900 bg-opacity-20 rounded-lg">
                  <FaMedal className="text-purple-400" />
                  <div>
                    <p className="font-medium">Perfect Attendance</p>
                    <p className="text-xs text-gray-400">100% session completion</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )}
      </div>

      {quizLoading ? (
            <LoadingSpinner />
          ) : quizDetails ? (
            <div className="my-4 space-y-6 text-white ">
            <QuizComponent quizDetails={quizDetails} />
            </div>
          ) : (
            <button
              onClick={loadQuizDetails}
              className="w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:opacity-90 transition duration-300 transform hover:scale-[1.02]
              shadow-lg shadow-amber-900/20"
            >
              <FaEye className="mr-2" /> View Quiz Details
            </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
        {/* CLASSROOM SECTION */}
        <div className="bg-gradient-to-br from-[#1e293b] to-[#2d3748] rounded-3xl h-[100vh] overflow-y-auto p-6 shadow-2xl border border-gray-700 border-opacity-30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-teal-900 bg-opacity-50 rounded-lg">
                <FaChalkboardTeacher className="text-teal-400" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                Classrooms
              </span>
            </h2>
          </div>

          {classroomLoading ? (
            <LoadingSpinner />
          ) : classroomDetails ? (
            <div className="mt-4 space-y-6">
              <div className="flex space-x-4 border-b border-gray-700">
                <button
                  onClick={() => setActiveClassTab('hosted')}
                  className={`pb-2 px-4 font-medium transition-all duration-300 ${activeClassTab === 'hosted'
                      ? 'text-teal-400 border-b-2 border-teal-400'
                      : 'text-gray-400 hover:text-teal-300'
                    }`}
                >
                  Hosted ({classroomDetails.hosted.length})
                </button>
                <button
                  onClick={() => setActiveClassTab('joined')}
                  className={`pb-2 px-4 font-medium transition-all duration-300 ${activeClassTab === 'joined'
                      ? 'text-teal-400 border-b-2 border-teal-400'
                      : 'text-gray-400 hover:text-teal-300'
                    }`}
                >
                  Joined ({classroomDetails.joined.length})
                </button>
              </div>

              {/* Content based on active tab */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {(activeClassTab === 'hosted' ? classroomDetails.hosted : classroomDetails.joined).map((classroom, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2d3748] rounded-xl overflow-hidden shadow-lg hover:shadow-teal-900/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700 border-opacity-30"
                  >
                    <div className="h-36 bg-gradient-to-r from-teal-900 to-blue-900 relative overflow-hidden">
                      <Image 
                      width={100}
                      height={100}
                      src="/class.jpg" alt="class-banner" className="w-full h-full object-cover mix-blend-overlay opacity-70" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2d3748] to-transparent"></div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="font-bold text-lg text-white">{classroom.title}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <FaCalendarAlt className="mr-2 text-teal-400" />
                        {formatDate(classroom.date)}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-xs px-3 py-1 bg-teal-900 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors duration-300 text-teal-300 flex items-center">
                          <FaEye className="mr-1" /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {(activeClassTab === 'hosted' ? classroomDetails.hosted : classroomDetails.joined).length === 0 && (
                <div className="text-center py-12 bg-[#2d3748] bg-opacity-50 rounded-xl">
                  <FaChalkboardTeacher className="text-4xl mx-auto mb-3 text-gray-500" />
                  <p className="text-gray-400">No {activeClassTab} classrooms found</p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={loadClassroomDetails}
              className="w-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-xl hover:opacity-90 transition duration-300 transform hover:scale-[1.02]
              shadow-lg shadow-teal-900/20"
            >
              <FaEye className="mr-2" /> View Classroom Details
            </button>
          )}
        </div>
        <div className="bg-gradient-to-br from-[#1e293b] to-[#2d3748] rounded-3xl h-[100vh] overflow-y-auto p-6 shadow-2xl border border-gray-700 border-opacity-30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-amber-900 bg-opacity-50 rounded-lg">
                <FaCalendarAlt className="text-amber-400" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Events
              </span>
            </h2>
          </div>

          {eventLoading ? (
            <LoadingSpinner />
          ) : eventDetails ? (
            <div className="mt-4 space-y-6 ">
              {/* Tabs */}
              <div className="flex space-x-4 border-b border-gray-700">
                <button
                  onClick={() => setActiveEventTab('hosted')}
                  className={`pb-2 px-4 font-medium transition-all duration-300 ${activeEventTab === 'hosted'
                      ? 'text-amber-400 border-b-2 border-amber-400'
                      : 'text-gray-400 hover:text-amber-300'
                    }`}
                >
                  Hosted ({eventDetails.hosted.length})
                </button>
                <button
                  onClick={() => setActiveEventTab('participated')}
                  className={`pb-2 px-4 font-medium transition-all duration-300 ${activeEventTab === 'participated'
                      ? 'text-amber-400 border-b-2 border-amber-400'
                      : 'text-gray-400 hover:text-amber-300'
                    }`}
                >
                  Participated ({eventDetails.participated.length})
                </button>
              </div>

              {/* Content based on active tab */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                {(activeEventTab === 'hosted' ? eventDetails.hosted : eventDetails.participated).map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-[#2d3748] rounded-xl overflow-hidden shadow-lg hover:shadow-amber-900/20 transition-all duration-300 hover:translate-y-[-5px] border border-gray-700 border-opacity-30"
                  >
                    <div className="h-36 relative overflow-hidden">
                      <Image
                      width={100}
                      height={100}
                      src={event.banner} alt="event-banner" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2d3748] to-transparent"></div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-amber-900 bg-opacity-70 text-amber-300 text-xs px-2 py-1 rounded-full">
                          {event.category || "Event"}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <p className="font-bold text-lg text-white">{event.title}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-400">
                          <FaCalendarAlt className="mr-2 text-amber-400" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <FaUsers className="mr-2 text-amber-400" />
                          {event.participants || 0} Participants
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-xs px-3 py-1 bg-amber-900 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors duration-300 text-amber-300 flex items-center">
                          <FaEye className="mr-1" /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {(activeEventTab === 'hosted' ? eventDetails.hosted : eventDetails.participated).length === 0 && (
                <div className="text-center py-12 bg-[#2d3748] bg-opacity-50 rounded-xl">
                  <FaCalendarAlt className="text-4xl mx-auto mb-3 text-gray-500" />
                  <p className="text-gray-400">No {activeEventTab} events found</p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={loadEventDetails}
              className="w-full flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:opacity-90 transition duration-300 transform hover:scale-[1.02]
              shadow-lg shadow-amber-900/20"
            >
              <FaEye className="mr-2" /> View Event Details
            </button>
          )}
        </div>
      </div>
      
          
    </div>
  );
};

export default Dashboard;

