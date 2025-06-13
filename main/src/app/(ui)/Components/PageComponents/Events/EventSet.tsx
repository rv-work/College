import React from "react";
import EventCard from "./EventCard";

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

interface EventSetProps {
  eventsData: EventData[];
  userId: string;
}

const EventSet: React.FC<EventSetProps> = ({ eventsData, userId }) => {

  const ongoingEvents = eventsData.filter((event) => event.status === "Ongoing" || event.status ===  "ongoing");
  const upcomingEvents = eventsData.filter((event) => event.status === "Upcoming" || event.status ===  "upcoming");

  return (
    <div className="relative space-y-12 py-6">
      <section>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-white">
            Ongoing Events
            {ongoingEvents.length > 0 && (
              <span className="ml-3 text-sm bg-blue-600 text-white px-3 py-1 rounded-full">
                {ongoingEvents.length}
              </span>
            )}
          </h2>
        </div>

        {ongoingEvents.length > 0 ? (
          <div className="mb-8 flex gap-6 w-full overflow-x-auto custom-scrollbar pb-6 snap-x">
            {ongoingEvents.map((event, index) => (
              <div key={index} className="flex-shrink-0 snap-start">
                <EventCard 
                  event={event} 
                  btn="On" 
                  userId={userId} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-center p-6">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-lg">No ongoing events at the moment</p>
              <p className="text-gray-500 mt-2">Check back later or explore upcoming events</p>
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-purple-600 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold text-white">
            Upcoming Events
            {upcomingEvents.length > 0 && (
              <span className="ml-3 text-sm bg-purple-600 text-white px-3 py-1 rounded-full">
                {upcomingEvents.length}
              </span>
            )}
          </h2>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="mb-8 flex gap-6 w-full overflow-x-auto custom-scrollbar pb-6 snap-x">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex-shrink-0 snap-start">
                <EventCard 
                  event={event} 
                  btn="Up" 
                  userId={userId} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="text-center p-6">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-gray-400 text-lg">No upcoming events scheduled</p>
              <p className="text-gray-500 mt-2">New events will appear here when announced</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventSet;