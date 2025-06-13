import React from 'react';
import Details from "./Deatils";
import Registrations from "./Registrations";
import { Search } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  category: string;
  team: number;
  owner: {
    name: string;
    profilePicture: string;
  };
  banner: string;
  priceTeam: string;
  priceSolo: string;
}

interface TeamMember {
  admissionNumber: string;
  name: string;
  year: string;
  branch: string;
  profilePicture?: string;
}

interface Registration {
  id: string;
  teamName: string;
  name: string;
  createdAt: string;
  teamMembers: TeamMember[];
}

interface MainProps {
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  eventRegistrations: Registration[];
  expandedRows: Record<string, boolean>;
  setExpandedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  joined : boolean
}

const Main: React.FC<MainProps> = ({
  selectedEvent,
  setSelectedEvent,
  eventRegistrations,
  expandedRows,
  setExpandedRows,
  joined,
}) => {



  return (
    <div>
    {selectedEvent ? (
      <div>
        <Details
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          eventRegistrations={eventRegistrations}
        />
        <Registrations
          eventRegistrations={eventRegistrations}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          joined={joined}
        />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-[500px]  p-6">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-5 rounded-full animate-pulse">
            <Search className="text-blue-500" size={48} strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Select an Event
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Browse through the available events and click to view detailed information, 
          team registrations, and event specifics.
        </p>
        <div className="mt-6 text-sm text-gray-500 italic">
          Your event journey starts here
        </div>
      </div>
    </div>
  
    )}
    </div>
  );
};

export default Main;