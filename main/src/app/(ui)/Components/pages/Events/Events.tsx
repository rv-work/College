"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EventSet from "../../PageComponents/Events/EventSet";
import Loader from "../../General/Loader";
import Image from "next/image";
import Link from "next/link";

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


const Events: React.FC = () => {
  const [eventsData, setEventsData] = useState<EventData[] | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [loadingCard, setLoadingCard] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/verify", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUserId(res.data.userId);
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log("Error verifying user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleCardClick = async (category: string) => {
    setLoadingCard(category);
    try {
      const response = await axios.post("/api/event/fetchAll", {
        eventCategory: category,
      });
      if (response.data.success) {
        setEventsData(response.data.data);
        console.log("data , " , eventsData)
        setActiveCategory(category);
      } else {
        console.error("Event fetch failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoadingCard(null);
    }
  };

  const eventCategories = [
    {
      label: "Classroom Events",
      category: "classroomEvents",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      description: "Join interactive learning sessions and workshops",
      color: "from-blue-700 to-blue-900"
    },
    {
      label: "College Events",
      category: "collegeEvents",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      description: "Participate in campus-wide activities and competitions",
      color: "from-purple-700 to-purple-900"
    },
    {
      label: "Coding Events",
      category: "codingEvents",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      description: "Challenge yourself in hackathons and coding competitions",
      color: "from-green-700 to-green-900"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="relative h-80 mb-12 overflow-hidden rounded-b-3xl shadow-2xl">
        <Image
          src="/banner2.png"
          fill
          className="object-cover w-full h-full"
          alt="Event Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Discover Amazing Events
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Explore and participate in a variety of events designed to enhance your learning experience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-4">
        <div className="flex justify-end mb-6">
        <Link
          href="/events/host"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white font-semibold px-6 py-4 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Host an Event or Class
        </Link>

        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Choose a Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventCategories.map((item) => (
              <div
                key={item.category}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-opacity-20 ${
                  activeCategory === item.category ? "ring-2 ring-white ring-opacity-60 scale-105" : "border-gray-700"
                }`}
                onClick={() => handleCardClick(item.category)}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white text-center">
                    {loadingCard === item.category ? <Loader /> : item.label}
                  </h3>
                  <p className="text-center text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {eventsData && (
          <div className="mt-8 bg-gray-900 bg-opacity-50 rounded-xl p-6 shadow-lg border border-gray-800">
            <EventSet eventsData={eventsData} userId={userId} />
          </div>
        )}

        {!eventsData && !loadingCard && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="w-20 h-20 text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
            </svg>
            <h3 className="text-2xl font-bold mb-3 text-white">Select a category to explore events</h3>
            <p className="text-gray-400 max-w-lg">
              Choose from classroom events, college activities, or coding competitions to see what&apos;s happening
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
