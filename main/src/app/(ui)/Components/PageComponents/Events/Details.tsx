import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface EventData {
  title: string;
  description: string;
  detail: string;
  startTime: string;
  status: string;
  owner: {
    admissionNumber: string;
    name: string;
  };
  banner?: string;
}

interface Props {
  event: EventData;
  onClose: () => void; 
}

const Details: React.FC<Props> = ({ event, onClose }) => {

  if (!event) {
    return (
      <div className="bg-[#1f2937] p-6 rounded-lg shadow-lg text-center">
        <p className="text-red-500 text-lg font-semibold">Event not found.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#1f2937] p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center gap-4">
        <h2 className="text-2xl text-blue-700 font-semibold mb-4 break-words min-w-0">
          {event.title}
        </h2>
        <button onClick={onClose} className="text-white text-xl hover:text-gray-400">
          <AiOutlineClose />
        </button>
       
      </div>
      <p className="text-lg text-blue-400 font-medium mb-4 break-words min-w-0">
            Host: <span className="text-white">{event.owner.name}</span>
          </p>
      <p className="text-lg text-white mb-4 break-words">{event.description}</p>
      <p className="text-sm text-gray-400 break-words">{event.detail}</p>
    </div>
  );
  
  
};

export default Details;
