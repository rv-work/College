import Link from "next/link";
import React from "react";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";

interface EventData {
  id: string;
  title: string;
  description: string;
  detail: string;
  startTime: string;
  status: string;
  owner: {
    admissionNumber: string;
    name: string;
  };
  roomId?: string;
  type? : string
  banner: string;
  domain?: string;
  helpEmail?: string;
  isApproved: boolean;
  isDone: boolean;
  location?: string;
  organizedBy?: string;
  ownerId: string;
  photos?: string[];
  priceSolo?: number;
  priceTeam?: number;
  sponsors?: string[];
  team?: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  tags?: string[];
}

type EventCardProps = {
  event: EventData;
  btn: string;
  userId: string;
};

const EventCard: React.FC<EventCardProps> = ({ event, btn,  userId }) => {

  const router = useRouter();

  const formatDate = (dateString: string): string => {
    try {
      const date: Date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error parsing date:", e.message);
      } else {
        console.error("Unknown error occurred while parsing date.");
      }
      return "Date TBA";
    }
  };

  return (
    <div className="group transition-all duration-300 transform hover:-translate-y-2">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all duration-300 w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-[450px] flex flex-col">
        {/* Image container with overlay gradient */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={event.banner ?? "/class.jpg"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            width={100}
            height={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
          
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-xs text-white font-medium px-3 py-1 rounded-full uppercase tracking-wider">
              {event.type || "Event"}
            </span>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-gray-300 line-clamp-3 mb-4">
              {event.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                </svg>
                <p className="text-gray-300">
                  Host: <span className="text-white font-medium">{event.owner.name}</span>
                </p>
              </div>
              
              {event.domain && (
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-300">
                    Domain: <span className="text-white font-medium">{event.domain}</span>
                  </p>
                </div>
              )}
              
              {event.startTime && (
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                  </svg>
                  <p className="text-gray-300">{formatDate(event.startTime)}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className={`flex items-center ${event.helpEmail ? "justify-between" : 
            "justify-center "}  mt-6 pt-4 border-t border-gray-700`}>
            {event.helpEmail  && (
            <button
            onClick={() => router.push(`/events/${event.id}`)}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none `}
          >
            View Details
          </button>
            )}
            
            
            {btn === "On" && (
              <Link
                href={event.roomId ? `/class/${event.roomId}` : `/events/register/${event.id}`}
                className={`bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:outline-none ${!event.helpEmail && "px-32"}`}
              >
                {event.roomId
                  ? event.owner.admissionNumber === userId
                    ? "Start Class"
                    : "Join Class"
                  : "Register"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;