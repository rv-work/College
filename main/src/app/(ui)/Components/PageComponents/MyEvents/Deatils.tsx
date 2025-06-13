import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
} from "@/components/ui/card"; 
import { X, CalendarDays, Info, Users, DollarSign } from "lucide-react"; 

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

interface DetailsProps {
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  eventRegistrations: Registration[]; 
}

const Details: React.FC<DetailsProps> = ({ selectedEvent, setSelectedEvent, eventRegistrations }) => {
  if (!selectedEvent) return null;

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <Card className="w-full shadow-xl rounded-3xl overflow-hidden bg-white border border-gray-200">
          <div className="relative w-full h-64">
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-between px-6 py-4 text-white">
              <h1 className="text-3xl font-bold z-50">{selectedEvent.title}</h1>
              <X
                onClick={() => setSelectedEvent(null)}
                className="cursor-pointer text-red-400 w-8 h-8 hover:text-red-600 transition-colors z-50"
              />
            </div>

            <Image
              src={selectedEvent.banner || "/default-banner.jpg"}
              alt="Event Banner"
              width={100}
              height={100}
              className="w-1/2 right-0 absolute h-full object-cover border border-blue-500"
              loading="lazy"
            />
          </div>

          <CardContent className="p-8 space-y-6">
            <div className="flex justify-between items-center bg-blue-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-4">
                <Image
                  src={selectedEvent.owner.profilePicture || "/default-avatar.png"}
                  alt="Owner Avatar"
                  width={50}
                  height={50}
                  className="rounded-full border border-blue-500"
                />
                <div>
                  <p className="text-gray-700 text-lg font-semibold">Hosted by:</p>
                  <p className="text-blue-800 font-bold text-xl">{selectedEvent.owner.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <CalendarDays className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium">{new Date(selectedEvent.startTime).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold flex items-center text-blue-800">
                <Info className="mr-3 text-blue-600 w-6 h-6" /> Event Details
              </h3>
              <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-100 p-4 rounded-xl shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Users className="text-indigo-600 w-8 h-8" />
                  <div>
                    <p className="text-gray-700 text-lg font-semibold">Team Size</p>
                    <p className="text-indigo-800 font-bold text-xl">{selectedEvent.team}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-xl shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Users className="text-green-600 w-8 h-8" />
                  <div>
                    <p className="text-gray-700 text-lg font-semibold">Total Registrations</p>
                    <p className="text-green-800 font-bold text-xl">{eventRegistrations.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-100 p-4 rounded-xl shadow-md flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <DollarSign className="text-yellow-600 w-8 h-8" />
                  <div>
                    <p className="text-gray-700 text-lg font-semibold">Solo Price</p>
                    <p className="text-yellow-800 font-bold text-xl">₹{selectedEvent.priceSolo}</p>
                  </div>
                </div>
              </div>

              {selectedEvent.priceTeam && (
                <div className="bg-purple-100 p-4 rounded-xl shadow-md flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="text-purple-600 w-8 h-8" />
                    <div>
                      <p className="text-gray-700 text-lg font-semibold">Team Price</p>
                      <p className="text-purple-800 font-bold text-xl">₹{selectedEvent.priceTeam}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Details;
