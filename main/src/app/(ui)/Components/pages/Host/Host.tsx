"use client";

import { useState } from "react";
import ClassEvent from "../../PageComponents/Host/ClassEvent";
import CollegeEvent from "../../PageComponents/Host/CollegeEvent";

const Host: React.FC = () => {
  const [isClass, setIsClass] = useState(true);
  

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">
      <h1 className="text-4xl text-center font-extrabold mb-8 tracking-wide">
        Host Your Event or Class
      </h1>

      <div className="toggle-section mb-8 text-center">
        <button
          className={`px-6 py-2 mx-2 text-lg font-semibold rounded-lg shadow-lg transition-transform transform ${
            isClass
              ? "bg-teal-500 scale-105"
              : "bg-gray-700 hover:scale-105 hover:bg-teal-500"
          }`}
          onClick={() => setIsClass(true)}
        >
          Host a Class
        </button>

        <button
          className={`px-6 py-2 mx-2 text-lg font-semibold rounded-lg shadow-lg transition-transform transform ${
            !isClass
              ? "bg-yellow-500 scale-105"
              : "bg-gray-700 hover:scale-105 hover:bg-yellow-500"
          }`}
          onClick={() => setIsClass(false)}
        >
          Host an Event
        </button>
      </div>

      {isClass ? <ClassEvent /> : <CollegeEvent />}
    </div>
  );
};

export default Host;
