import { motion } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar, Code, Award, ChevronRight } from "lucide-react";

// Interfaces
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

interface SideBarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  hostedEvents: Event[];
  joinedEvents: Event[];
  setSelectedEvent: (event: Event | null) => void;
  setEventRegistrations: React.Dispatch<React.SetStateAction<Registration[]>>;
  setJoined: (joined: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  setActiveTab,
  hostedEvents,
  setSelectedEvent,
  setEventRegistrations,
  joinedEvents,
  setJoined,
}) => {
  const handleEventSelect = async (event: Event) => {
    setSelectedEvent(event);
    try {
      const response = await fetch(`/api/event/registrations?eventId=${event.id}`);
      const data = await response.json();

      if (data.success) {
        setEventRegistrations(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    }
  };

  // Card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full shadow-xl p-6 overflow-hidden flex flex-col"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">My Events</h2>
          <p className="text-blue-600 text-sm">Manage your events and registrations</p>
        </div>
        
        <Tabs defaultValue="college" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2 p-1 rounded-xl bg-blue-100/50 mb-6">
            <TabsTrigger
              value="college"
              className="rounded-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              <span>College Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="coding"
              className="rounded-lg py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Code size={18} />
              <span>Coding Events</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="mb-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-blue-900 flex items-center">
                  <Award size={20} className="mr-2 text-blue-600" />
                  Hosted Events
                </h3>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {hostedEvents.length}
                </span>
              </div>
              
              <div className="space-y-3 overflow-y-auto pr-2 max-h-64 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                {hostedEvents.length > 0 ? (
                  hostedEvents.map((event: Event, index: number) => (
                    <motion.div
                      key={event.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setJoined(false);
                        handleEventSelect(event);
                      }}
                      className="p-4 bg-white border border-blue-100 hover:border-blue-300 hover:bg-blue-50 cursor-pointer rounded-xl transition-all shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold text-blue-800 line-clamp-1">{event.title}</h4>
                        <p className="text-xs text-blue-500 mt-1">{event.category}</p>
                      </div>
                      <ChevronRight size={16} className="text-blue-400" />
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 bg-white/50 rounded-xl border border-dashed border-blue-200">
                    <Calendar size={24} className="text-blue-300 mb-2" />
                    <p className="text-blue-400 text-sm">No hosted events yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-indigo-900 flex items-center">
                  <Code size={20} className="mr-2 text-indigo-600" />
                  Joined Events
                </h3>
                <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                  {joinedEvents.length}
                </span>
              </div>
              
              <div className="space-y-3 overflow-y-auto pr-2 max-h-64 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100">
                {joinedEvents.length > 0 ? (
                  joinedEvents.map((event: Event, index: number) => (
                    <motion.div
                      key={event.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setJoined(true);
                        handleEventSelect(event);
                      }}
                      className="p-4 bg-white border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer rounded-xl transition-all shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-indigo-800">{event.title}</h4>
                          <p className="text-xs text-indigo-500 mt-1">{event.category}</p>
                        </div>
                        <ChevronRight size={16} className="text-indigo-400" />
                      </div>
                      
                      <div className="mt-2 flex items-center">
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-xs text-indigo-600">{event.team}</span>
                        </div>
                        <span className="text-xs text-indigo-500 ml-2">Team Size</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 bg-white/50 rounded-xl border border-dashed border-indigo-200">
                    <Award size={24} className="text-indigo-300 mb-2" />
                    <p className="text-indigo-400 text-sm">No joined events yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SideBar;