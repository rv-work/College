import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface PYQSectionProps {
  title: string;
  expandSection: string | null;
  handleSectionClick: (section: string) => void;
  content: React.ReactNode; 
}

const PYQSection: React.FC<PYQSectionProps> = ({
  title,
  expandSection,
  handleSectionClick,
  content,
}) => {
  return (
    <div className="w-full bg-[#111827] rounded text-white">
      <div
        className="flex justify-between p-6 cursor-pointer"
        onClick={() => handleSectionClick(title)}
      >
        <div>{title}</div>
        <div>{expandSection === title ? <FaChevronUp /> : <FaChevronDown />}</div>
      </div>
      {expandSection === title && <div className="p-4 bg-[#1f2937]">{content}</div>}
    </div>
  );
};

export default PYQSection;
