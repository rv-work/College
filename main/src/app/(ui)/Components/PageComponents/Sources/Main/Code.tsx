import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Code = () => {
  const [activeTab, setActiveTab] = useState('tutorials');

  // Sample code snippets for display
  const codeSnippets = [
    {
      id: 1,
      language: 'JavaScript',
      title: 'Async/Await Example',
      code: `async function fetchUserData() {
  try {
    // Simulating API call
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}`
    },
    {
      id: 2,
      language: 'Python',
      title: 'Simple ML Model',
      code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load data
X = np.random.rand(100, 1) * 10
y = 2 * X + 1 + np.random.randn(100, 1)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)
print(f"Model score: {model.score(X_test, y_test):.2f}")`
    },
    {
      id: 3,
      language: 'React',
      title: 'Custom Hook',
      code: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided default
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}`
    }
  ];

  // Learning resources
  const resources = [
    {
      title: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      description: "Free coding tutorials and certification"
    },
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org/",
      description: "Comprehensive web development documentation"
    },
    {
      title: "LeetCode",
      url: "https://leetcode.com/",
      description: "Practice coding problems for interviews"
    },
    {
      title: "GitHub",
      url: "https://github.com/",
      description: "Collaborate on code and host projects"
    }
  ];

  // Coding tips
  const codingTips = [
    "Write clean, readable code with consistent formatting",
    "Comment your code, but make sure the code itself is clear",
    "Test early and test often",
    "Learn keyboard shortcuts for your IDE",
    "Use version control for all projects",
    "Break down complex problems into smaller manageable parts"
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6 text-white'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-6xl mx-auto'
      >
        {/* Header */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
            Code Explorer
          </h1>
          <p className='text-blue-300 text-lg max-w-2xl mx-auto'>
            Discover coding examples, resources, and tips to enhance your programming journey
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-8 overflow-x-auto'>
          <div className='flex space-x-1 bg-gray-800 p-1 rounded-lg'>
            {['tutorials', 'resources', 'snippets'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='bg-gray-800 bg-opacity-50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 shadow-lg'
        >
          {/* Tutorials Tab */}
          {activeTab === 'tutorials' && (
            <div>
              <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Programming Tutorials
              </h2>
              
              <div className='grid md:grid-cols-2 gap-6'>
                {/* Tutorial Card 1 */}
                <div className='bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105'>
                  <div className='h-3 bg-gradient-to-r from-blue-500 to-purple-600'></div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold mb-3 text-blue-300'>Web Development Fundamentals</h3>
                    <p className='text-gray-300 mb-4'>Learn the core technologies that power the modern web: HTML, CSS, and JavaScript.</p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      <span className='px-2 py-1 bg-blue-900 rounded-md text-xs font-medium'>HTML</span>
                      <span className='px-2 py-1 bg-blue-900 rounded-md text-xs font-medium'>CSS</span>
                      <span className='px-2 py-1 bg-blue-900 rounded-md text-xs font-medium'>JavaScript</span>
                    </div>
                    <button className='mt-2 flex items-center text-blue-400 hover:text-blue-300 transition-colors'>
                      <span>Start Learning</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Tutorial Card 2 */}
                <div className='bg-gray-900 rounded-lg overflow-hidden shadow-md transition-transform hover:transform hover:scale-105'>
                  <div className='h-3 bg-gradient-to-r from-green-500 to-teal-600'></div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold mb-3 text-green-300'>Data Structures & Algorithms</h3>
                    <p className='text-gray-300 mb-4'>Master the fundamental concepts that are essential for efficient problem-solving and interviews.</p>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      <span className='px-2 py-1 bg-green-900 rounded-md text-xs font-medium'>Arrays</span>
                      <span className='px-2 py-1 bg-green-900 rounded-md text-xs font-medium'>Linked Lists</span>
                      <span className='px-2 py-1 bg-green-900 rounded-md text-xs font-medium'>Trees</span>
                      <span className='px-2 py-1 bg-green-900 rounded-md text-xs font-medium'>Graphs</span>
                    </div>
                    <button className='mt-2 flex items-center text-green-400 hover:text-green-300 transition-colors'>
                      <span>Start Learning</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro Tips Section */}
              <div className='mt-8 bg-indigo-900 bg-opacity-30 border border-indigo-800 rounded-lg p-5'>
                <h3 className='flex items-center text-xl font-bold mb-4 text-indigo-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Pro Coding Tips
                </h3>
                <ul className='grid md:grid-cols-2 gap-3'>
                  {codingTips.map((tip, index) => (
                    <li key={index} className='flex items-start'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className='text-gray-300'>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Learning Resources
              </h2>
              
              <div className='grid md:grid-cols-2 gap-6'>
                {resources.map((resource, index) => (
                  <div 
                    key={index} 
                    className='bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-green-800 transition-all duration-300'
                  >
                    <h3 className='text-xl font-bold text-green-400 mb-2'>{resource.title}</h3>
                    <p className='text-gray-300 mb-4'>{resource.description}</p>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className='inline-flex items-center px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md text-white transition-colors'
                    >
                      <span>Visit Site</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>

              {/* Newsletter Section */}
              <div className='mt-8 bg-purple-900 bg-opacity-30 rounded-lg p-6 border border-purple-800'>
                <div className='flex flex-col md:flex-row md:items-center justify-between'>
                  <div className='mb-4 md:mb-0'>
                    <h3 className='text-xl font-bold text-purple-300 mb-2'>Stay Updated</h3>
                    <p className='text-gray-300'>Get weekly coding tips, tutorials and resources delivered to your inbox.</p>
                  </div>
                  <div className='flex'>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className='px-4 py-2 bg-gray-900 border border-purple-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500'
                    />
                    <button className='px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-r-md text-white transition-colors'>
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code Snippets Tab */}
          {activeTab === 'snippets' && (
            <div>
              <h2 className='text-2xl font-bold mb-6 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Code Snippets
              </h2>
              
              <div className='space-y-6'>
                {codeSnippets.map((snippet) => (
                  <div 
                    key={snippet.id} 
                    className='bg-gray-900 rounded-lg overflow-hidden border border-gray-800'
                  >
                    <div className='flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700'>
                      <div className='flex items-center'>
                        <span className='text-orange-400 font-medium'>{snippet.language}</span>
                        <span className='mx-2 text-gray-500'>•</span>
                        <span className='text-gray-300'>{snippet.title}</span>
                      </div>
                      <button className='text-gray-400 hover:text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className='p-4 font-mono text-sm overflow-x-auto whitespace-pre text-gray-300'>
                      {snippet.code}
                    </div>
                  </div>
                ))}
              </div>

              {/* Request Section */}
              <div className='mt-8 text-center'>
              <p className="text-gray-400 mb-3">Don&apos;t see what you&apos;re looking for?</p>

                <button className='px-6 py-2 bg-orange-700 hover:bg-orange-600 rounded-md text-white transition-colors'>
                  Request Snippet
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className='mt-10 text-center text-blue-300 text-sm'>
          <p>© 2025 Code Explorer | Made with 💻 for developers</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Code