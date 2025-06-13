"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiCalendar, FiBookOpen, FiCode, FiHelpCircle,
  FiSearch, FiDownload, FiChevronDown, FiChevronUp, FiRefreshCw, 
  FiBarChart2, FiCheckCircle, FiClock, FiAward, 
   FiEye, FiCheck, FiGrid,
  FiPlus
} from 'react-icons/fi';

import { Clock, Calendar, Code, GraduationCap } from 'lucide-react';
import Image from 'next/image';
// import QuizPerformance from './Quiz';

interface User {
  name: string;
  admissionNumber: string;
  email: string;
  mobile?: string;
  joinedAt: string;
  eventsJoinedCount: number;
  contributionsCount: number;
}

interface Event {
  id: string;
  title: string;
  category: string;
  domain?: string;
  startTime: string;
  organizer?: { name: string };
  isApproved: boolean;
  isDone: boolean;
  attendeesCount: number;
}

interface Class {
  id: string;
  title: string;
  roomId: string;
  startTime: string;
  instructor?: { name: string };
  isStarted: boolean;
  isDone: boolean;
  studentsCount: number;
}

interface Contribution {
  id: string;
  title: string;
  type: string;
  contributor: { name: string; admissionNumber: string };
  createdAt: string;
  isApproved: boolean;
  viewsCount: number;
}

interface IncomingQuestion {
  id: string;
  title: string;
  quesNo: number;
  difficulty: string;
  points: number;
  solvedByCount: number;
  tags: string[];
  level: string;
}

interface Question {
  id: string;
  title: string;
  tags: string[];
  answersCount: number;
  views: number;
  isSolved: boolean;
  isReported?: boolean;
}

interface Quize {
    id: string,
    score: number,
    maxScore: number,
    timeTaken: string,
    topic: string,
    user: { name: string, admissionNumber: string},
    createdAt: Date
}

interface DashboardData {
  users: User[];
  events: Event[];
  classes: Class[];
  contributions: Contribution[];
  questions: IncomingQuestion[];
  quizes : Quize[]
}

interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

interface SolvedByDetails {
   name: string,
   year: number,
   branch: string,
   profilePicture: string,
   solvedAt: Date
}

const Admin: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [solvedByList , setSolvedByList] = useState<SolvedByDetails[] | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch admin data');
        }
        
        setData(result.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('Error fetching admin data:', err);
        } else {
          setError('An unknown error occurred.');
          console.error('Unknown error:', err);
        }
      }
       finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDashboardStats = () => {
    if (!data) return {};
    
    return {
      totalUsers: data.users.length,
      totalEvents: data.events.length,
      totalClasses: data.classes.length,
      totalQuestions: data.questions.length,
      totalContributions: data.contributions.length,
      activeEvents: data.events.filter(e => !e.isDone && e.isApproved).length,
      activeClasses: data.classes.filter(c => c.isStarted && !c.isDone).length,
      pendingEvents: data.events.filter(e => !e.isApproved).length,
      topCategories: getTopCategories(),
      recentUsers: data.users.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()).slice(0, 5),
      topContributors: getTopContributors().slice(0, 5),
    };
  };


  const transformQuestions = (incomingQuestions: IncomingQuestion[]): Question[] => {
    return incomingQuestions.map(q => ({
      id: q.id,
      title: q.title,
      tags: q.tags || [],
      answersCount: q.solvedByCount || 0,
      views: 0, 
      isSolved: q.solvedByCount > 0, 
      isReported: false 
    }));
  };

  const getTopCategories = () => {
    if (!data?.events) return [];
    
    const categories: Record<string, number> = {};
    data.events.forEach(event => {
      if (event.category) {
        categories[event.category] = (categories[event.category] || 0) + 1;
      }
    });
    
    return Object.entries(categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const getTopContributors = () => {
    if (!data?.users) return [];
    
    return data.users
      .map(user => ({
        name: user.name,
        admissionNumber: user.admissionNumber,
        contributionsCount: user.contributionsCount,
      }))
      .sort((a, b) => b.contributionsCount - a.contributionsCount);
  };

  const getFilteredUsers = () => {
    if (!data?.users) return [];
    
    return data.users
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key as keyof User];
          const bValue = b[sortConfig.key as keyof User];
          
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
  };

  const getFilteredClasses = () => {
    if (!data?.classes) return [];
    
    return data.classes
      .filter(classItem => 
        classItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (classItem.instructor?.name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      )
      .sort((a, b) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key as keyof Class];
          const bValue = b[sortConfig.key as keyof Class];
          
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if ((aValue ?? '') > (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
  };

  // Similar type annotations can be added for other filtering functions like `getFilteredEvents`, `getFilteredClasses`, etc.

  const getFilteredQuestions = () => {
    if (!data?.questions) return [];
    
    // Transform the incoming data first
    const transformedQuestions = transformQuestions(data.questions);
    
    return transformedQuestions
      .filter(question => 
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) 
      )
      .sort((a, b) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key as keyof Question];
          const bValue = b[sortConfig.key as keyof Question];
          
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if ((aValue ?? '') > (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
  };

  const handleViewSolversList = async (id : string) => {
     const res = await axios.post("/api/dsa/fetchList" , {id});
     if(res.data){
       setSolvedByList(res.data.users)
     }
  }

  const formatTime = (date: Date | null | undefined): string => {
  const validDate = new Date(date ?? '');

  if (isNaN(validDate.getTime())) {
    return '--:--'; 
  }

  return validDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatTimeTaken = (seconds : string) => {
    if (seconds === "0") return "Not attempted";
    
    const sec = parseInt(seconds);
    if (sec < 60) return `${sec} sec`;
    
    const min = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${min}m ${remainingSec}s`;
  };




  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 bg-opacity-70 rounded-lg p-8 backdrop-blur-lg shadow-xl border border-blue-900 text-center max-w-md">
          <div className="flex justify-center mb-6">
            <FiRefreshCw className="animate-spin text-blue-400 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Admin Dashboard</h2>
          <p className="text-blue-300">Fetching the latest data from the server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 bg-opacity-70 rounded-lg p-8 backdrop-blur-lg shadow-xl border border-red-900 text-center max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-red-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = getDashboardStats();

  function getFilteredEvents() {
    if (!data?.events) return [];
    
    return data.events
      .filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.organizer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      )
      .sort((a, b) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key as keyof Event];
          const bValue = b[sortConfig.key as keyof Event];
          
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
  }

  function getFilteredContributions() {
    if (!data?.contributions) return [];
  
    return data.contributions
      .filter(contribution => {
        const title = contribution.title ?? '';
        const type = contribution.type ?? '';
        const contributorName = contribution.contributor?.name ?? '';
  
        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contributorName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key as keyof Contribution];
          const bValue = b[sortConfig.key as keyof Contribution];
  
          if ((aValue ?? '') < (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if ((aValue ?? '') > (bValue ?? '')) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
  }
  

  return (
    <div className=" bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="flex">
        <div className="w-1/4 h-screen bg-gray-900 bg-opacity-90 p-5">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-blue-400 text-sm">Management Dashboard</p>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiBarChart2 className="mr-3" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiUsers className="mr-3" />
              Users
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'events' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiCalendar className="mr-3" />
              Events
            </button>
            <button 
              onClick={() => setActiveTab('classes')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'classes' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiBookOpen className="mr-3" />
              Classes
            </button>
            <button 
              onClick={() => setActiveTab('contributions')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'contributions' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiCode className="mr-3" />
              Contributions
            </button>
            <button 
              onClick={() => setActiveTab('questions')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'questions' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiHelpCircle className="mr-3" />
              Questions
            </button>
            <button 
              onClick={() => setActiveTab('quizes')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'quizes' ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FiHelpCircle className="mr-3" />
              Quizess
            </button>
          </nav>
          
          <div className="absolute w-[20%] pt-0 left-0 bottom-0 right-0 px-5">
            <div className="bg-blue-900 bg-opacity-40 p-4 rounded-lg border border-blue-800">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                  <span className="text-xs font-bold">A</span>
                </div>
                <div>
                  <p className="text-white font-medium">Admin User</p>
                  <p className="text-xs text-blue-300">Super Admin</p>
                </div>
              </div>
              <button className=" w-full text-center text-sm bg-blue-800 hover:bg-blue-700 text-white py-1.5 rounded transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className=" p-8 w-full h-screen overflow-y-auto">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h2>
                <p className="text-blue-300">Platform statistics and recent activity</p>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-300">Total Users</h3>
                    <div className="bg-blue-500 bg-opacity-30 h-10 w-10 flex items-center justify-center rounded-lg">
                      <FiUsers className="text-blue-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-sm text-blue-400 mt-1">Registered members</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-300">Events</h3>
                    <div className="bg-purple-500 bg-opacity-30 h-10 w-10 flex items-center justify-center rounded-lg">
                      <FiCalendar className="text-purple-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.totalEvents}</p>
                  <p className="text-sm text-purple-400 mt-1">{stats.activeEvents} active, {stats.pendingEvents} pending</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-300">Classes</h3>
                    <div className="bg-green-500 bg-opacity-30 h-10 w-10 flex items-center justify-center rounded-lg">
                      <FiBookOpen className="text-green-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.totalClasses}</p>
                  <p className="text-sm text-green-400 mt-1">{stats.activeClasses} active classes</p>
                </div>
                
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:transform hover:scale-105 transition-all">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-300">Contributions</h3>
                    <div className="bg-amber-500 bg-opacity-30 h-10 w-10 flex items-center justify-center rounded-lg">
                      <FiCode className="text-amber-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stats.totalContributions}</p>
                  <p className="text-sm text-amber-400 mt-1">Learning resources</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Users */}
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm col-span-1">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FiUsers className="mr-2 text-blue-400" />
                    Recently Joined Users
                  </h3>
                  <div className="space-y-4">
                    {stats.recentUsers?.map((user) => (
                      <div key={user.admissionNumber} className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                          <span className="font-medium text-white">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{formatDate(user.joinedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Top Categories */}
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm col-span-1">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FiBarChart2 className="mr-2 text-purple-400" />
                    Top Event Categories
                  </h3>
                  {stats.topCategories?.map((category) => (
                    <div key={category.name} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{category.name}</span>
                        <span className="text-purple-400">{category.count} events</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2" 
                          style={{ width: `${(category.count / Math.max(...stats.topCategories.map(c => c.count))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Top Contributors */}
                <div className="bg-gray-800 bg-opacity-60 border border-gray-700 rounded-xl p-6 backdrop-blur-sm col-span-1">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FiAward className="mr-2 text-amber-400" />
                    Top Contributors
                  </h3>
                  <div className="space-y-4">
                    {stats.topContributors?.map((user, index) => (
                      <div key={user.admissionNumber} className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-amber-900 text-amber-300 flex items-center justify-center mr-3 font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.admissionNumber}</p>
                        </div>
                        <div className="bg-amber-900 bg-opacity-30 px-3 py-1 rounded text-amber-300 font-medium">
                          {user.contributionsCount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Users Management</h2>
                  <p className="text-blue-300">Manage registered users and their activities</p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <FiDownload className="mr-2" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-gray-300 text-left">
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('name')}>
                          <div className="flex items-center">
                            Name
                            {sortConfig.key === 'name' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('admissionNumber')}>
                          <div className="flex items-center">
                            Admission Number
                            {sortConfig.key === 'admissionNumber' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Email</th>
                        <th className="px-6 py-4 font-medium">Mobile</th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('eventsJoinedCount')}>
                          <div className="flex items-center">
                            Events
                            {sortConfig.key === 'eventsJoinedCount' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('contributionsCount')}>
                          <div className="flex items-center">
                            Contributions
                            {sortConfig.key === 'contributionsCount' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredUsers().map((user) => (
                        <tr 
                          key={user.admissionNumber} 
                          className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                                <span className="font-medium text-white">{user.name.charAt(0)}</span>
                              </div>
                              <span className="font-medium text-white">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{user.admissionNumber}</td>
                          <td className="px-6 py-4 text-gray-300">{user.email}</td>
                          <td className="px-6 py-4 text-gray-300">{user.mobile || "N/A"}</td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-900 bg-opacity-40 text-blue-400 text-sm px-2 py-1 rounded">
                              {user.eventsJoinedCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-amber-900 bg-opacity-40 text-amber-400 text-sm px-2 py-1 rounded">
                              {user.contributionsCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                View
                              </button>
                              <button className="text-red-400 hover:text-red-300">
                                Suspend
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {getFilteredUsers().length === 0 && (
                    <div className="py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      <p className="text-gray-400">No users found matching your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Events Management</h2>
                  <p className="text-blue-300">Manage scheduled events and activities</p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <FiPlus className="mr-2" />
                    New Event
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-gray-300 text-left">
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('title')}>
                          <div className="flex items-center">
                            Title
                            {sortConfig.key === 'title' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('category')}>
                          <div className="flex items-center">
                            Category
                            {sortConfig.key === 'category' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('startTime')}>
                          <div className="flex items-center">
                            Date
                            {sortConfig.key === 'startTime' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Organizer</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Attendees</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredEvents().map((event) => (
                        <tr 
                          key={event.id} 
                          className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-white">{event.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-purple-900 bg-opacity-40 text-purple-400 text-sm px-2 py-1 rounded">
                              {event.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{formatDate(event.startTime)}</td>
                          <td className="px-6 py-4 text-gray-300">{event.organizer?.name}</td>
                          <td className="px-6 py-4">
                            {event.isApproved ? (
                              event.isDone ? (
                                <span className="bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                  <FiCheck className="mr-1" />
                                  Completed
                                </span>
                              ) : (
                                <span className="bg-green-900 bg-opacity-40 text-green-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                  <FiCheckCircle className="mr-1" />
                                  Approved
                                </span>
                              )
                            ) : (
                              <span className="bg-amber-900 bg-opacity-40 text-amber-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiClock className="mr-1" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-900 bg-opacity-40 text-blue-400 text-sm px-2 py-1 rounded">
                              {event.attendeesCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => setExpandedRow(expandedRow === event.id ? null : event.id)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                {expandedRow === event.id ? 'Hide' : 'View'}
                              </button>
                              {!event.isApproved && (
                                <button className="text-green-400 hover:text-green-300">
                                  Approve
                                </button>
                              )}
                              <button className="text-red-400 hover:text-red-300">
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {getFilteredEvents().length === 0 && (
                    <div className="py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-400">No events found matching your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Classes Management</h2>
                  <p className="text-blue-300">Monitor and manage learning sessions</p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      placeholder="Search classes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <FiPlus className="mr-2" />
                    New Class
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-gray-300 text-left">
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('title')}>
                          <div className="flex items-center">
                            Title
                            {sortConfig.key === 'title' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Room ID</th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('startTime')}>
                          <div className="flex items-center">
                            Date
                            {sortConfig.key === 'startTime' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Instructor</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Students</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredClasses().map((classItem) => (
                        <tr 
                          key={classItem.id} 
                          className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-white">{classItem.title}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{classItem.roomId}</td>
                          <td className="px-6 py-4 text-gray-300">{formatDate(classItem.startTime)}</td>
                          <td className="px-6 py-4 text-gray-300">{classItem.instructor?.name}</td>
                          <td className="px-6 py-4">
                            {classItem.isDone ? (
                              <span className="bg-gray-700 text-gray-300 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiCheck className="mr-1" />
                                Completed
                              </span>
                            ) : classItem.isStarted ? (
                              <span className="bg-green-900 bg-opacity-40 text-green-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiBarChart2 className="mr-1" />
                                In Progress
                              </span>
                            ) : (
                              <span className="bg-blue-900 bg-opacity-40 text-blue-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiClock className="mr-1" />
                                Scheduled
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-purple-900 bg-opacity-40 text-purple-400 text-sm px-2 py-1 rounded">
                              {classItem.studentsCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                View
                              </button>
                              {!classItem.isStarted && !classItem.isDone && (
                                <button className="text-red-400 hover:text-red-300">
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {getFilteredClasses().length === 0 && (
                    <div className="py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <p className="text-gray-400">No classes found matching your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Contributions Tab */}
          {activeTab === 'contributions' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Contributions Management</h2>
                  <p className="text-blue-300">Monitor and review user contributions</p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      placeholder="Search contributions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <FiDownload className="mr-2" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-gray-300 text-left">
                        <th className="px-6 py-4 font-medium">Title</th>
                        <th className="px-6 py-4 font-medium">Type</th>
                        <th className="px-6 py-4 font-medium">Contributor</th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('createdAt')}>
                          <div className="flex items-center">
                            Date
                            {sortConfig.key === 'createdAt' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Views</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredContributions().map((contribution) => (
                        <tr 
                          key={contribution.id} 
                          className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-white">{contribution.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-amber-900 bg-opacity-40 text-amber-400 text-sm px-2 py-1 rounded">
                              {contribution.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-300">{contribution.contributor.name}</td>
                          <td className="px-6 py-4 text-gray-300">{formatDate(contribution.createdAt)}</td>
                          <td className="px-6 py-4">
                            {contribution.isApproved ? (
                              <span className="bg-green-900 bg-opacity-40 text-green-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiCheckCircle className="mr-1" />
                                Approved
                              </span>
                            ) : (
                              <span className="bg-amber-900 bg-opacity-40 text-amber-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiClock className="mr-1" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-900 bg-opacity-40 text-blue-400 text-sm px-2 py-1 rounded flex items-center">
                              <FiEye className="mr-1" />
                              {contribution.viewsCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                View
                              </button>
                              {!contribution.isApproved && (
                                <button className="text-green-400 hover:text-green-300">
                                  Approve
                                </button>
                              )}
                              <button className="text-red-400 hover:text-red-300">
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {getFilteredContributions().length === 0 && (
                    <div className="py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                      <p className="text-gray-400">No contributions found matching your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quizes' && (
            //  <QuizPerformance quizData={data?.quizes} />
             <div className="w-full">
                 <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                   <div>
                     <h2 className="text-3xl font-bold text-white mb-2">Quizzes Management</h2>
                     <p className="text-blue-300">Monitor user quiz attempts and performance</p>
                   </div>
                   <div className="mt-4 md:mt-0 flex">
                     <div className="relative mr-2">
                       <input
                         type="text"
                         placeholder="Search quizzes..."
                         className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                       />
                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <FiSearch className="text-gray-400" />
                       </div>
                     </div>
                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                       <FiGrid className="mr-2" />
                       Categories
                     </button>
                   </div>
                 </div>
             
                 <div className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                   <div className="overflow-x-auto">
                     <table className="w-full">
                       <thead>
                         <tr className="bg-gray-900 text-gray-300 text-left">
                           <th className="px-6 py-4 font-medium">Topic</th>
                           <th className="px-6 py-4 font-medium">Date</th>
                           <th className="px-6 py-4 font-medium">Time</th>
                           <th className="px-6 py-4 font-medium">Score</th>
                           <th className="px-6 py-4 font-medium">Time Taken</th>
                           <th className="px-6 py-4 font-medium">User</th>
                         </tr>
                       </thead>
                       <tbody>
                         {data?.quizes.map((quiz: Quize) => (
                           <tr
                             key={quiz.id}
                             className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                           >
                             <td className="px-6 py-4 font-medium text-white">{quiz.topic}</td>
                             <td className="px-6 py-4 text-gray-300">{formatDate(quiz.createdAt.toString())}</td>
                             <td className="px-6 py-4 text-gray-300">{formatTime(quiz.createdAt)}</td>
                             <td className="px-6 py-4">
                               <div className="flex items-center">
                                 <span className={quiz.score > 0 ? "text-green-400" : "text-red-400"}>
                                   {quiz.score}
                                 </span>
                                 <span className="text-gray-400 ml-1">/ {quiz.maxScore}</span>
                               </div>
                             </td>
                             <td className="px-6 py-4 text-gray-300">{formatTimeTaken(quiz.timeTaken)}</td>
                             <td className="px-6 py-4 text-white">{quiz.user.name}</td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
             
                     {data?.quizes.length === 0 && (
                       <div className="py-12 text-center">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         <p className="text-gray-400">No quizzes found matching your search criteria</p>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
          )}
          
          {activeTab === 'questions' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Questions Management</h2>
                  <p className="text-blue-300">Monitor and moderate user questions</p>
                </div>
                <div className="mt-4 md:mt-0 flex">
                  <div className="relative mr-2">
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiSearch className="text-gray-400" />
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                    <FiGrid className="mr-2" />
                    Categories
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 bg-opacity-70 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-gray-300 text-left">
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('title')}>
                          <div className="flex items-center">
                            Title
                            {sortConfig.key === 'title' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Tags</th>
                        <th className="px-6 py-4 font-medium">Solved By</th>
                        <th className="px-6 py-4 font-medium">Answers</th>
                        <th className="px-6 py-4 font-medium cursor-pointer" onClick={() => requestSort('views')}>
                          <div className="flex items-center">
                            Views
                            {sortConfig.key === 'views' && (
                              sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredQuestions().map((question) => (
                        <tr 
                          key={question.id} 
                          className="border-t border-gray-700 hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium text-white">{question.title}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {question.tags.map((tag, idx) => (
                                <span key={idx} className="bg-blue-900 bg-opacity-40 text-blue-400 text-xs px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td
                          onClick={() => handleViewSolversList(question.id)}
                          className="px-6 cursor-pointer py-4 text-blue-300">View List</td>
                          <td className="px-6 py-4">
                            <span className="bg-green-900 bg-opacity-40 text-green-400 text-sm px-2 py-1 rounded">
                              {question.answersCount}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-900 bg-opacity-40 text-blue-400 text-sm px-2 py-1 rounded flex items-center w-min">
                              <FiEye className="mr-1" />
                              {question.views}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {question.isSolved ? (
                              <span className="bg-green-900 bg-opacity-40 text-green-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiCheckCircle className="mr-1" />
                                Solved
                              </span>
                            ) : (
                              <span className="bg-amber-900 bg-opacity-40 text-amber-400 text-sm px-2 py-1 rounded flex items-center w-min whitespace-nowrap">
                                <FiHelpCircle className="mr-1" />
                                Open
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="text-blue-400 hover:text-blue-300">
                                View
                              </button>
                              {question.isReported && (
                                <button className="text-red-400 hover:text-red-300">
                                  Review
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {getFilteredQuestions().length === 0 && (
                    <div className="py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-400">No questions found matching your search criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {solvedByList && (
            <div className='inset-0 z-50 fixed left-1/4  top-52 w-2/3 h-screen overflow-y-auto'>
              <div 
               className="absolute inset-0" 
              onClick={() => setSolvedByList(null)}
              ></div>
             <div className="bg-gray-900  rounded-lg shadow-lg p-4 text-gray-100">
              <div  className='flex justify-between'>
                 <h3 className="text-xl font-semibold mb-4 text-blue-400">Solved By</h3>
                <button className=' cursor-pointer z-50 font-bold text-2xl text-blue-500' onClick={() => setSolvedByList(null)} > X </button>
              </div>
             
              
              {solvedByList.length === 0 ? (
                <p className="text-gray-400 italic">No One had solved yet.</p>
              ) : (
                <div className="space-y-4">
                  {solvedByList.map((solver, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-3 flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <Image 
                          src={solver.profilePicture} 
                          alt={solver.name} 
                          className="w-12 h-12 rounded-full border-2 border-blue-500"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-lg text-white">{solver.name}</h4>
                          <div className="flex items-center text-blue-400 text-sm">
                            <Clock size={14} className="mr-1" />
                            <span>{formatTime(solver.solvedAt)}</span>
                          </div>
                        </div>
                        
                        <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-gray-300">
                            <GraduationCap size={14} className="mr-1 text-blue-400" />
                            <span>Year {solver.year}</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Code size={14} className="mr-1 text-blue-400" />
                            <span>{solver.branch}</span>
                          </div>
                          <div className="flex items-center text-gray-300 col-span-2">
                            <Calendar size={14} className="mr-1 text-blue-400" />
                            <span>{formatDate(solver.solvedAt.toString())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
             </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;