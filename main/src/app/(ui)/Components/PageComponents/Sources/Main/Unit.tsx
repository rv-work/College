import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Content from './Content';
import { motion, AnimatePresence } from 'framer-motion';

interface UnitData {
  name: string;
  topics: string[];
  youtube: string[];
  notes: string[];
  ppt: string[];
  important: string[];
}

interface UnitProps {
  units: UnitData[]; 
}

const Unit: React.FC<UnitProps> = ({ units }) => {
  const [expandUnit, setExpandUnit] = useState<string | null>(null);

  const handleUnitClick = (unit: string) => {
    setExpandUnit(expandUnit === unit ? null : unit);
  };

  return (
    <div className="flex flex-col gap-6">
      {units.map((unit, index) => (
        <div 
          key={index} 
          className="w-full bg-[#111827] rounded-xl shadow-lg border border-blue-900/20 text-white overflow-hidden hover:shadow-blue-500/5 transition-all duration-300"
        >
          <button
            className="w-full flex justify-between items-center p-6 cursor-pointer hover:bg-blue-900/10 transition-colors duration-300"
            onClick={() => handleUnitClick(unit.name)}
          >
            <h3 className="text-lg font-semibold text-blue-100">{unit.name}</h3>
            <div className="flex items-center">
              <span className="mr-2 text-xs font-medium bg-blue-900/50 px-3 py-1 rounded-full">
                {unit.topics.length} Topics
              </span>
              <div className={`transform transition-transform duration-300 ${expandUnit === unit.name ? 'rotate-180' : ''}`}>
                <FaChevronDown className="text-blue-400" />
              </div>
            </div>
          </button>
          
          <AnimatePresence>
            {expandUnit === unit.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Content unit={unit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Unit;