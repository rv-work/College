"use client";

import React, { useState, useEffect } from "react";
import SideBar from "../../PageComponents/MyEvents/SideBar";
import Main from "../../PageComponents/MyEvents/Main";

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

const MyEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("college");
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [joined, setJoined] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [eventRegistrations, setEventRegistrations] = useState<Registration[]>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {

    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/event/myevents?category=${activeTab}`);
        const res = await response.json();

        if (res.success) {
          setHostedEvents(res.data.hostedEvents || []);
          setJoinedEvents(
            res.data.joinedEvents.map(
              (reg: { register: { event: Event } }) => reg.register.event
            ) || []
          );
        } else {
          console.error("Something went wrong:", res.message);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } 
    };

    fetchEvents();
  }, [activeTab]);



  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-1/4">
        <SideBar
          setActiveTab={setActiveTab}
          hostedEvents={hostedEvents}
          setSelectedEvent={setSelectedEvent}
          setEventRegistrations={setEventRegistrations}
          joinedEvents={joinedEvents}
          setJoined={setJoined}
        />
      </div>

      <div className="w-3/4 p-6 mb-6 overflow-y-auto">
        <Main
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          eventRegistrations={eventRegistrations}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          joined={joined}
        />
      </div>
    </div>
  );
};

export default MyEvents;
