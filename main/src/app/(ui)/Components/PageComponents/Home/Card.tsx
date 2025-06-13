import React, { useState} from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  content: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, content, image = "/im.jpg" }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  // const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-[80vh] flex items-center justify-between bg-gray-900 text-white rounded-xl overflow-hidden shadow-2xl group transition-all duration-500 border border-transparent hover:border-blue-500"
      onMouseMove={handleMouseMove}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
      
      <div className="relative w-1/2 h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={1920}
          height={1520}
          className="w-full h-full object-cover  transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/20 to-black/70"></div>
      </div>

      {/* Content section */}
      <div className="relative z-10 w-1/2 flex flex-col justify-center p-8">
        <div className="overflow-hidden mb-4">
          <h2 className="text-3xl font-bold transform transition-transform duration-500 group-hover:-translate-y-1 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">{title}</h2>
        </div>
        
        <div className="overflow-hidden">
          <p className="text-gray-300 text-lg transform transition-all duration-500 group-hover:-translate-y-1 delay-75">{content}</p>
        </div>
        
        <div className="mt-6 overflow-hidden">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transform transition-all duration-500 group-hover:-translate-y-1 delay-100 flex items-center">
            Learn More
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Interactive glow effect */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 50%)`,
        }}
      ></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default Card;