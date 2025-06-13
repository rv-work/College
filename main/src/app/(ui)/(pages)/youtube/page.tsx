'use client';

import { useState } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import {
  FileText,
  FileSearch,
  BookOpenCheck,
  Video,
} from 'lucide-react';
import toast from 'react-hot-toast';

type Tool = {
  label: string;
  value: 'pdf' | 'test-quiz' | 'pdf-summary' | 'video-summary';
  icon: React.ReactNode;
};

const tools: Tool[] = [
  {
    label: 'PDF Extractor',
    value: 'pdf',
    icon: <FileText className="w-5 h-5 mr-2" />,
  },
  {
    label: 'Quiz Generator',
    value: 'test-quiz',
    icon: <BookOpenCheck className="w-5 h-5 mr-2" />,
  },
  {
    label: 'PDF Summarizer',
    value: 'pdf-summary',
    icon: <FileSearch className="w-5 h-5 mr-2" />,
  },
  {
    label: 'Video Summarizer',
    value: 'video-summary',
    icon: <Video className="w-5 h-5 mr-2" />,
  },
];

export default function ToolSwitcher() {
  const [view, setView] = useState<Tool['value'] | ''>('');
  const router = useRouter();

const handleViewChange = (newView: Tool['value']) => {
  setView(newView);

  if (newView === 'pdf-summary' || newView === 'video-summary') {
    toast.error('This feature is not available yet.');
    return;
  }

  router.push(`/youtube/${newView}`);
};


  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-950 via-black to-gray-900 text-white p-6">
      <div className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-lg">
          100xCode Tools
        </h1>
        <p className="mt-4 text-lg text-blue-200">
          Choose your tool to get started
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 bg-black/40 p-6 rounded-2xl border border-blue-600/30 shadow-lg backdrop-blur-md">
        {tools.map((tool) => (
          <ToolButton
            key={tool.value}
            label={tool.label}
            icon={tool.icon}
            active={view === tool.value}
            onClick={() => handleViewChange(tool.value)}
          />
        ))}
      </div>
    </div>
  );
}

function ToolButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-xl font-semibold text-base md:text-lg transition-all duration-300 border ${
        active
          ? 'bg-blue-700 text-white shadow-xl border-blue-500'
          : 'bg-gradient-to-br from-blue-900 via-blue-800 to-gray-800 text-blue-300 hover:scale-105 hover:shadow-lg border-blue-600/30'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
