import { useState, useEffect } from 'react';
import _ from 'lodash';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';



interface Quiz {
  id : string;
  maxScore : number,
  score : number, 
  timeTaken : string,
  topic : string
  createdAt : string
}

// // Sample quiz data - replace with your actual API call
// const fetchQuizData = () => {
//   // This would be your API call to get real-time data
//   // For production, replace with actual fetch:
//   // return fetch('/api/quizzes')
//   //   .then(response => response.json())
//   //   .catch(error => {
//   //     console.error('Error fetching quiz data:', error);
//   //     return [];
//   //   });
  
//   // For testing, add some randomness to simulate real-time changes
//   const baseData = [
//     {id: 'cm9zm7a4n0000u80wybx1lj7f', topic: 'Arrays', maxScore: 20, score: 0, timeTaken: '0', createdAt: '2025-04-27T12:17:38.564Z'},
//     {id: 'prototype_id', topic: 'Arrays', maxScore: 20, score: 10, timeTaken: '134', createdAt: '2025-03-15T09:22:11.564Z'},
//     {id: 'cm9znf54m0002u80w8ryakpmr', topic: 'Arrays', maxScore: 10, score: 0, timeTaken: '0', createdAt: '2025-02-14T14:33:22.564Z'},
//     {id: 'cm9zwzgf80000u824n02kubho', topic: 'Arrays', maxScore: 10, score: 10, timeTaken: '17', createdAt: '2025-01-02T10:45:38.564Z'},
//     {id: 'cma0u0n5s0000u8gwrjupepq5', topic: 'Arrays', maxScore: 20, score: 10, timeTaken: '352', createdAt: '2024-12-10T22:17:38.564Z'},
//     {id: 'cma0ue502000lu8gwzaeq37qz', topic: 'Arrays', maxScore: 10, score: 10, timeTaken: '375', createdAt: '2024-11-05T11:17:38.564Z'},
//     {id: 'cma42yx5y0003u8zcxu1k3sfz', topic: 'Arrays', maxScore: 20, score: 10, timeTaken: '29', createdAt: '2024-10-22T08:17:38.564Z'},
//     {id: 'test_id1', topic: 'Strings', maxScore: 15, score: 12, timeTaken: '120', createdAt: '2025-04-15T14:22:38.564Z'},
//     {id: 'test_id2', topic: 'Strings', maxScore: 15, score: 9, timeTaken: '180', createdAt: '2025-03-08T16:45:38.564Z'},
//     {id: 'test_id3', topic: 'Linked Lists', maxScore: 20, score: 15, timeTaken: '210', createdAt: '2025-02-22T09:17:38.564Z'},
//     {id: 'test_id4', topic: 'Trees', maxScore: 25, score: 20, timeTaken: '220', createdAt: '2025-01-18T13:17:38.564Z'},
//     {id: 'test_id5', topic: 'Graphs', maxScore: 30, score: 22, timeTaken: '300', createdAt: '2024-12-05T17:17:38.564Z'},
//     {id: 'test_id6', topic: 'Dynamic Programming', maxScore: 30, score: 25, timeTaken: '350', createdAt: '2024-11-20T15:17:38.564Z'},
//   ];
  
//   // Simulate real-time updates by potentially adding a new quiz
//   if (Math.random() > 0.7) {
//     const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Recursion'];
//     const randomTopic = topics[Math.floor(Math.random() * topics.length)];
//     const maxScore = [10, 15, 20, 25, 30][Math.floor(Math.random() * 5)];
//     const score = Math.floor(Math.random() * (maxScore + 1));
//     const timeTaken = Math.floor(Math.random() * 400).toString();
    
//     const now = new Date();
//     now.setMinutes(now.getMinutes() - Math.floor(Math.random() * 60));
    
//     baseData.push({
//       id: 'dynamic_' + Date.now().toString(),
//       topic: randomTopic,
//       maxScore,
//       score,
//       timeTaken,
//       createdAt: now.toISOString()
//     });
//   }
  
//   return baseData;
// };

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const Quiz = ({quizDetails} : {quizDetails: Quiz[]}) => {

  const [activeTab, setActiveTab] = useState('monthly');
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchAndUpdateData = () => {
    setLoading(true);
    const data = quizDetails;
    setQuizData(data);
    
    const uniqueTopics = _.uniq(data.map(quiz => quiz.topic));
    setTopics(uniqueTopics);
    
    setLastUpdated(new Date());
    setLoading(false);
  };

 

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchAndUpdateData();
      }, 30000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh]);

  const processMonthlyData = () => {
    const now = new Date();
    const months: Date[] = [];
    for (let i = 0; i < 6; i++) {
      const month = new Date(now);
      month.setMonth(now.getMonth() - i);
      months.unshift(month);
    }

    const monthLabels = months.map(date => {
      return date.toLocaleString('default', { month: 'short', year: '2-digit' });
    });

    const monthlyData = monthLabels.map((monthLabel, index) => {
      const month = months[index];
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const monthQuizzes = quizData.filter(quiz => {
        const quizDate = new Date(quiz.createdAt);
        return quizDate >= monthStart && quizDate <= monthEnd;
      });

      const totalQuizzes = monthQuizzes.length;
      const totalScore = monthQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
      const totalMaxScore = monthQuizzes.reduce((sum, quiz) => sum + quiz.maxScore, 0);
      const avgScore = totalQuizzes > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
      
      const highestScorePercentage = monthQuizzes.length > 0 
        ? Math.round(Math.max(...monthQuizzes.map(quiz => (quiz.score / quiz.maxScore) * 100))) 
        : 0;

      const quizzesByTopic: { [key: string]: number } = {};
      topics.forEach(topic => {
        quizzesByTopic[topic] = monthQuizzes.filter(quiz => quiz.topic === topic).length;
      });

      return {
        month: monthLabel,
        totalQuizzes,
        avgScore,
        highestScore: highestScorePercentage,
        ...quizzesByTopic
      };
    });

    return monthlyData;
  };

  const processTopicData = () => {
    const quizzesByTopic = _.groupBy(quizData, 'topic');
    
    return Object.keys(quizzesByTopic).map(topic => {
      const topicQuizzes = quizzesByTopic[topic];
      const totalQuizzes = topicQuizzes.length;
      const totalScore = topicQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
      const totalMaxScore = topicQuizzes.reduce((sum, quiz) => sum + quiz.maxScore, 0);
      const avgScore = totalQuizzes > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
      
      const highestScorePercentage = topicQuizzes.length > 0 
        ? Math.round(Math.max(...topicQuizzes.map(quiz => (quiz.score / quiz.maxScore) * 100))) 
        : 0;
        
      return {
        topic,
        totalQuizzes,
        avgScore,
        highestScore: highestScorePercentage
      };
    });
  };

  const monthlyData = processMonthlyData();
  const topicData = processTopicData();

  const totalAttempts = quizData.length;
  
  const overallScore = quizData.length > 0 
    ? Math.round((quizData.reduce((sum, quiz) => sum + quiz.score, 0) / 
       quizData.reduce((sum, quiz) => sum + quiz.maxScore, 0)) * 100) 
    : 0;
  
  const topicDistribution = topics.map(topic => {
    const count = quizData.filter(quiz => quiz.topic === topic).length;
    return {
      name: topic,
      value: count
    };
  });

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading quiz analytics...</div>;
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Quiz Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Total Attempts</h3>
          <p className="text-2xl font-bold text-white">{totalAttempts}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Average Score</h3>
          <p className="text-2xl font-bold text-white">{overallScore}%</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm">Active Topics</h3>
          <p className="text-2xl font-bold text-white">{topics.length}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-3 md:space-y-0">
        <div className="flex">
          <button 
            className={`px-4 py-2 mr-2 rounded-lg ${activeTab === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Progress
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeTab === 'topics' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('topics')}
          >
            Topic Breakdown
          </button>
        </div>
        
        <div className="flex ml-auto items-center">
          <div className="text-xs text-gray-400 mr-4">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button 
            onClick={fetchAndUpdateData}
            className="mr-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Now'}
          </button>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={autoRefresh} 
                onChange={() => setAutoRefresh(!autoRefresh)}
              />
              <div className={`block w-10 h-6 rounded-full ${autoRefresh ? 'bg-green-400' : 'bg-gray-600'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${autoRefresh ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <div className="ml-2 text-xs text-gray-400">Auto-refresh</div>
          </label>
        </div>
      </div>
      
      {activeTab === 'monthly' && (
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Quiz Attempts</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Legend />
                  <Bar dataKey="totalQuizzes" name="Total Attempts" fill="#0088FE" />
                  {topics.map((topic, index) => (
                    <Bar 
                      key={topic}
                      dataKey={topic} 
                      name={topic} 
                      stackId="a" 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Score Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" domain={[0, 100]} label={{ value: 'Score %', angle: -90, position: 'insideLeft', fill: '#ccc' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" name="Average Score %" stroke="#00C49F" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="highestScore" name="Highest Score %" stroke="#FFBB28" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Topic Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {topicDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} quizzes`, name]}
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Performance by Topic</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  layout="vertical"
                  data={topicData}
                >
                  <CartesianGrid stroke="#444" />
                  <XAxis type="number" domain={[0, 100]} stroke="#ccc" />
                  <YAxis dataKey="topic" type="category" stroke="#ccc" width={100} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="avgScore" name="Average Score %" fill="#00C49F" barSize={20} />
                  <Bar dataKey="highestScore" name="Highest Score %" fill="#FFBB28" barSize={20} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;