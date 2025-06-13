import Link from "next/link";
import React from "react";

interface SectionProps {
  title: string;
  items: string[];
  buttonClass: string;
  icon?: React.ReactNode;
}



const Section: React.FC<SectionProps> = ({ title, items, buttonClass , icon }) => (
  <div className="my-6">
    <h4 className="font-bold text-lg mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
      {title}
    </h4>
    <div className="flex flex-wrap gap-3">
      {items.length > 0 ? (
        items.map((item, index) => {
          return (
            <Link
              key={index}
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium flex items-center ${buttonClass}`}
            >
              {icon}
              
              {item}
            </Link>
          );
        })
      ) : (
        <p className="text-gray-400 italic">No {title} available</p>
      )}
    </div>
  </div>
);

export default Section;
