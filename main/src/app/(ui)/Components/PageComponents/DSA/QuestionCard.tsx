import React from 'react';
import { CheckCircle, Circle , Bookmark , BookmarkCheck } from "lucide-react";

type Question = {
  id :string;
  quesNo: number;
  title: string;
  description: string;
  constraint: string;
  tags: string[];
  leetcode: string;
  points: number;
  difficulty: string;
  completed?: boolean; 
  markedForRevision ?: boolean;
  topicName?: string;
};

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-500',
  Medium: 'bg-yellow-500',
  Hard: 'bg-red-500',
};

type QuestionCardProps = {
  question: Question;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-900/20 hover:shadow-xl flex flex-col">
      <div className={`h-2 ${difficultyColors[question.difficulty as Difficulty]}`} />

      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{question.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              question.difficulty === 'Easy'
                ? 'bg-green-500/20 text-green-300'
                : question.difficulty === 'Medium'
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-red-500/20 text-red-300'
            }`}
          >
            {question.difficulty}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded-full">
              #{question.quesNo}
            </span>
            <span className="text-xs px-2 py-1 bg-indigo-900/30 text-indigo-300 rounded-full">
              {question.points} pts
            </span>
          </div>
          <div className='flex'>
            {question.markedForRevision ? (
              <BookmarkCheck className="w-5 h-5 mr-2 text-green-400" />
            ) : (
              <Bookmark className="w-5 h-5 mr-2 text-gray-400" />
            )}

            {question.completed ? (
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 mr-2 text-gray-400" />
            )}
            {question.leetcode ? (
              <a
                href={question.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                LeetCode →
              </a>
            ) : (
              <span className="text-sm text-gray-500 italic">No link</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
