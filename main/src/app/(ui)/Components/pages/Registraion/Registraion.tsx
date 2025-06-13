"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface RegistrationDetails {
  name: string;
  mobile: string;
  email: string;
  admissionNumber: string;
  branch: string;
  teamEmails: string[];
}

interface Event {
  banner: string;
  title: string;
  description: string;
  priceSolo: number;
  priceTeam: number;
  team: number;
}

const Registration: React.FC = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails>({
    name: "",
    mobile: "",
    email: "",
    admissionNumber: "",
    branch: "",
    teamEmails: [],
  });
  const [isTeam, setIsTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.post("/api/event/getEvent", { eventId });
        if (res.data.success) {
          setEvent(res.data.data.event);
          setRegistrationDetails((prev) => ({
            ...prev,
            ...res.data.data.user,
            teamEmails: new Array(res.data.data.event.team - 1).fill(""),
          }));
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
      } finally {
        setPageLoading(false);
      }
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleTeamEmailChange = (index: number, value: string) => {
    setRegistrationDetails((prevDetails) => {
      const updatedEmails = [...prevDetails.teamEmails];
      updatedEmails[index] = value; 
      return { ...prevDetails, teamEmails: updatedEmails };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast.success("Proceeding to payment... 💳");
  
    try {
      const res = await axios.post("/api/event/register", {
        registrationDetails,
        eventId,
        isTeam,
        teamName,
      });
  
      if (res.data.success) {
        toast.success("Registration successful! 🎉");
      } else {
        toast.error(res.data.message || "Registration failed. ❌");
      }
    } catch (error: unknown) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again. ❌");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-300">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-6">
        <div className="bg-gray-800 rounded-xl p-8 text-center max-w-md">
          <svg className="w-20 h-20 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-3">Event Not Found</h2>
          <p className="text-gray-400 mb-6">The event you&#39;re looking for doesnt exist or couldn&#39;t be loaded.</p>
          <Link href="/events" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Return to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black ">
      <div className="mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 flex flex-col">
            <div className="relative h-64 rounded-xl overflow-hidden mb-6 shadow-lg">
              <Image 
                fill
                quality={100}
                src={event.banner || "/placeholder-event.jpg"} 
                alt={event.title} 
                className=" object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60"></div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-white">{event.title}</h2>
            
            <div className="mb-6 flex-grow">
              <p className="text-lg text-gray-300 leading-relaxed">{event.description}</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Solo Registration</span>
                <span className="text-xl font-bold text-green-400">₹{event.priceSolo}</span>
              </div>
              
              {event.team > 1 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Team Registration</span>
                  <span className="text-xl font-bold text-blue-400">₹{event.priceTeam}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Team Size</span>
                <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full">
                  Up to {event.team} members
                </span>
              </div>
            </div>
          </div>
          
          {/* Registration Form Side */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <h1 className="text-3xl font-bold mb-8 text-white flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Registration Form
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {[
                  { label: "Full Name", value: registrationDetails.name, icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                  { label: "Email", value: registrationDetails.email, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                  { label: "College Admission Number", value: registrationDetails.admissionNumber, icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" },
                  { label: "Branch", value: registrationDetails.branch, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                  { label: "Mobile Number", value: registrationDetails.mobile, icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-1">{field.label}:</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={field.icon} />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="border border-gray-600 pl-10 p-3 w-full rounded-lg bg-gray-800/50 text-white shadow-inner cursor-not-allowed"
                        value={field.value}
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-1">Team Name:</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onChange={(e) => setTeamName(e.target.value)}
                    className="border border-gray-600 pl-10 p-3 w-full rounded-lg bg-gray-800/50 text-white shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={teamName}
                    placeholder="Enter your team name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Registration Type:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setIsTeam(false)}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition-all flex items-center justify-center ${
                      !isTeam 
                        ? "bg-blue-600 ring-2 ring-blue-400 ring-opacity-50" 
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Solo Entry
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTeam(true)}
                    disabled={event.team === 1}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition-all flex items-center justify-center ${
                      isTeam && event.team > 1
                        ? "bg-blue-600 ring-2 ring-blue-400 ring-opacity-50"
                        : event.team > 1
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-800 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    Team Entry
                  </button>
                </div>
              </div>

              {isTeam && event.team > 1 && (
                <div className="space-y-3 bg-gray-900/50 p-4 rounded-lg border border-gray-700 mt-4">
                  <label className="block text-sm font-medium text-gray-300">Team Member Emails:</label>
                  {registrationDetails.teamEmails.map((email, index) => (
                    <div key={index} className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder={`Team Member ${index + 2} Email`}
                        value={email}
                        onChange={(e) => handleTeamEmailChange(index, e.target.value)} 
                        className="border border-gray-700 pl-10 p-3 w-full rounded-lg bg-gray-800/80 text-white shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`mt-6 relative w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
                  loading ? "opacity-90" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;