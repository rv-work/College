"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaRupeeSign,
  FaImage,
  FaCalendarAlt,
  FaBook,
  FaTag,
  FaListAlt,
  FaNetworkWired,
  FaMapMarkerAlt,
  FaBuilding,
  FaEnvelope,
  FaQuestionCircle,
  FaHandshake,
  FaTrophy,
  FaTags,
  FaClock,
  FaImages,
  FaPlusCircle,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface Prize {
  position: number;
  message: string;
  amount: number;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TimeLine {
  heading: string;
  subheading: string;
  time: string;
}

interface EventDetails {
  image: File | null;
  title: string;
  description: string;
  details: string;
  priceSolo: number;
  team: number;
  priceTeam: number;
  category: string;
  domain: string;
  startTime: string;
  organizedBy: string;
  location: string;
  helpEmail: string;
  sponsors: string[];
  tags: string[];
  prizes: Prize[];
  faqs: FAQ[];
  timeLines: TimeLine[];
  photos: File[];
  status: string;
}

const CollegeEvent: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    image: null,
    title: "",
    description: "",
    details: "",
    priceSolo: 20,
    team: 1,
    priceTeam: 30,
    category: "",
    domain: "",
    startTime: "",
    organizedBy: "",
    location: "",
    helpEmail: "",
    sponsors: [""],
    tags: [""],
    prizes: [{ position: 1, message: " Internship Opportunity", amount: 1000 }],
    faqs: [{ question: "", answer: "" }],
    timeLines: [{ heading: "", subheading: "", time: "" }],
    photos: [],
    status: "Upcoming",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>("");
  const [newSponsor, setNewSponsor] = useState<string>("");

  const handleEventChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
    }
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        photos: [...prevDetails.photos, ...Array.from(files)],
      }));
    }
  };

  const removePhoto = (index: number) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      photos: prevDetails.photos.filter((_, i) => i !== index),
    }));
  };

  const handlePrizeChange = (index: number, field: keyof Prize, value: string | number) => {
    const updatedPrizes = [...eventDetails.prizes];
    updatedPrizes[index] = {
      ...updatedPrizes[index],
      [field]: field === "position" || field === "amount" ? Number(value) : value,
    };
    setEventDetails({ ...eventDetails, prizes: updatedPrizes });
  };

  const addPrize = () => {
    const newPosition = eventDetails.prizes.length + 1;
    setEventDetails({
      ...eventDetails,
      prizes: [...eventDetails.prizes, { position: newPosition, message: "", amount: 0 }],
    });
  };

  const removePrize = (index: number) => {
    setEventDetails({
      ...eventDetails,
      prizes: eventDetails.prizes.filter((_, i) => i !== index),
    });
  };

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    const updatedFAQs = [...eventDetails.faqs];
    updatedFAQs[index] = {
      ...updatedFAQs[index],
      [field]: value,
    };
    setEventDetails({ ...eventDetails, faqs: updatedFAQs });
  };

  const addFAQ = () => {
    setEventDetails({
      ...eventDetails,
      faqs: [...eventDetails.faqs, { question: "", answer: "" }],
    });
  };

  const removeFAQ = (index: number) => {
    setEventDetails({
      ...eventDetails,
      faqs: eventDetails.faqs.filter((_, i) => i !== index),
    });
  };

  const handleTimeLineChange = (index: number, field: keyof TimeLine, value: string) => {
    const updatedTimeLines = [...eventDetails.timeLines];
    updatedTimeLines[index] = {
      ...updatedTimeLines[index],
      [field]: value,
    };
    setEventDetails({ ...eventDetails, timeLines: updatedTimeLines });
  };

  const addTimeLine = () => {
    setEventDetails({
      ...eventDetails,
      timeLines: [...eventDetails.timeLines, { heading: "", subheading: "", time: "" }],
    });
  };

  const removeTimeLine = (index: number) => {
    setEventDetails({
      ...eventDetails,
      timeLines: eventDetails.timeLines.filter((_, i) => i !== index),
    });
  };

  const addTag = () => {
    if (newTag.trim() !== "" && !eventDetails.tags.includes(newTag.trim())) {
      setEventDetails({
        ...eventDetails,
        tags: [...eventDetails.tags.filter(tag => tag !== ""), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setEventDetails({
      ...eventDetails,
      tags: eventDetails.tags.filter((t) => t !== tag),
    });
  };

  const addSponsor = () => {
    if (newSponsor.trim() !== "" && !eventDetails.sponsors.includes(newSponsor.trim())) {
      setEventDetails({
        ...eventDetails,
        sponsors: [...eventDetails.sponsors.filter(sponsor => sponsor !== ""), newSponsor.trim()],
      });
      setNewSponsor("");
    }
  };

  const removeSponsor = (sponsor: string) => {
    setEventDetails({
      ...eventDetails,
      sponsors: eventDetails.sponsors.filter((s) => s !== sponsor),
    });
  };

  const handleSubmitEvent = async () => {
    // Validate required fields
    if (
      !eventDetails.title ||
      !eventDetails.category ||
      !eventDetails.image ||
      !eventDetails.description ||
      !eventDetails.details ||
      !eventDetails.team ||
      !eventDetails.priceSolo ||
      !eventDetails.domain ||
      !eventDetails.startTime ||
      !eventDetails.organizedBy ||
      !eventDetails.location ||
      !eventDetails.helpEmail
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", eventDetails.title);
      formData.append("category", eventDetails.category);
      formData.append("description", eventDetails.description);
      formData.append("details", eventDetails.details);
      formData.append("domain", eventDetails.domain);
      formData.append("team", eventDetails.team.toString());
      formData.append("priceSolo", eventDetails.priceSolo.toString());
      formData.append("priceTeam", eventDetails.priceTeam.toString());
      formData.append("startTime", eventDetails.startTime);
      formData.append("organizedBy", eventDetails.organizedBy);
      formData.append("location", eventDetails.location);
      formData.append("helpEmail", eventDetails.helpEmail);
      formData.append("status", eventDetails.status);
      
      // Add banner image
      if (eventDetails.image) {
        formData.append("image", eventDetails.image);
      }
      
      // Add previous photos
      eventDetails.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
      
      formData.append("sponsors", JSON.stringify(eventDetails.sponsors.filter(s => s !== "")));
      formData.append("tags", JSON.stringify(eventDetails.tags.filter(t => t !== "")));
      formData.append("prizes", JSON.stringify(eventDetails.prizes.filter(p => p.message !== "")));
      formData.append("faqs", JSON.stringify(eventDetails.faqs.filter(f => f.question !== "" && f.answer !== "")));
      formData.append("timeLines", JSON.stringify(eventDetails.timeLines.filter(t => t.heading !== "")));

      const response = await axios.post("/api/host/event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event created successfully!");
      console.log("Event submitted:", response.data);
    } catch (error) {
      console.error("Error submitting event:", error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-form bg-gray-700 p-6 rounded-lg shadow-lg  mx-auto mb-10">
      <h2 className="text-3xl font-semibold mb-6 text-yellow-400 flex items-center gap-2">
        <FaCalendarAlt /> Create an Event
      </h2>

      {/* Basic Information Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">Basic Information</h3>
        
        <div className="mb-6 flex flex-wrap gap-4 w-full justify-between">
          <div className="flex-1 min-w-[300px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaImage /> Event Banner:
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              onChange={handleFileChange}
              disabled={loading}
            />
            {eventDetails.image && (
              <div className="mt-2">
                <p className="text-green-400">✓ Image selected: {eventDetails.image.name}</p>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-[300px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaCalendarAlt /> Start Time:
            </label>
            <input
              type="datetime-local"
              name="startTime"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.startTime}
              onChange={handleEventChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 w-full justify-between">
          <div className="flex-1 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaTag /> Event Title:
            </label>
            <input
              type="text"
              name="title"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.title}
              onChange={handleEventChange}
              disabled={loading}
            />
          </div>
        
          <div className="flex-1 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaMapMarkerAlt /> Location:
            </label>
            <input
              type="text"
              name="location"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.location}
              onChange={handleEventChange}
              disabled={loading}
              placeholder="e.g., Main Auditorium"
            />
          </div>
        
          <div className="flex-1 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaBuilding /> Organized By:
            </label>
            <input
              type="text"
              name="organizedBy"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.organizedBy}
              onChange={handleEventChange}
              disabled={loading}
              placeholder="e.g., Tech Club"
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 w-full justify-between">
          <div className="w-1/4 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaListAlt /> Category:
            </label>
            <select
              name="category"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.category}
              onChange={handleEventChange}
              disabled={loading}
            >
              <option value="">Select</option>
              <option value="Coding">Coding</option>
              <option value="Non-Coding">Non-Coding</option>
            </select>
          </div>
        
          <div className="w-1/4 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaNetworkWired /> Domain:
            </label>
            <select
              name="domain"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.domain}
              onChange={handleEventChange}
              disabled={loading}
            >
              <option value="">Select</option>
              <option value="Web-Dev">Web-Dev</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Mobile-Dev">Mobile-Dev</option>
              <option value="Web3">Web3</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-1/4 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaUsers /> Team Size:
            </label>
            <input
              type="number"
              name="team"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.team}
              onChange={handleEventChange}
              disabled={loading}
              min="1"
            />
          </div>

          <div className="w-1/4 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaExclamationCircle /> Status:
            </label>
            <select
              name="status"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.status}
              onChange={handleEventChange}
              disabled={loading}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 w-full justify-between">
          <div className="flex-1 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaRupeeSign /> Price Solo:
            </label>
            <input
              type="number"
              name="priceSolo"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.priceSolo}
              onChange={handleEventChange}
              disabled={loading}
              min="0"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaRupeeSign /> Price Team:
            </label>
            <input
              type="number"
              name="priceTeam"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.priceTeam}
              onChange={handleEventChange}
              disabled={loading}
              min="0"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="text-lg mb-2 flex items-center gap-2">
              <FaEnvelope /> Help Email:
            </label>
            <input
              type="email"
              name="helpEmail"
              className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              value={eventDetails.helpEmail}
              onChange={handleEventChange}
              disabled={loading}
              placeholder="support@example.com"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-lg mb-2 flex items-center gap-2">
            <FaBook /> Short Description:
          </label>
          <textarea
            name="description"
            className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
            rows={2}
            value={eventDetails.description}
            onChange={handleEventChange}
            disabled={loading}
            placeholder="Brief overview of the event (max 150 characters)"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="text-lg mb-2 flex items-center gap-2">
            <FaBook /> Full Details:
          </label>
          <textarea
            name="details"
            className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
            rows={5}
            value={eventDetails.details}
            onChange={handleEventChange}
            disabled={loading}
            placeholder="Complete details of the event including rules, requirements, etc."
          ></textarea>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <FaTags /> Tags
        </h3>
        
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="border p-2 flex-grow bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              placeholder="Add a tag"
              disabled={loading}
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              disabled={loading || !newTag.trim()}
            >
              <FaPlusCircle />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {eventDetails.tags.filter(tag => tag !== "").map((tag, index) => (
            <div key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-red-400 hover:text-red-500"
                disabled={loading}
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
          {eventDetails.tags.filter(tag => tag !== "").length === 0 && (
            <p className="text-gray-400 italic">No tags added yet</p>
          )}
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <FaHandshake /> Sponsors
        </h3>
        
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSponsor}
              onChange={(e) => setNewSponsor(e.target.value)}
              className="border p-2 flex-grow bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
              placeholder="Add a sponsor"
              disabled={loading}
            />
            <button
              type="button"
              onClick={addSponsor}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              disabled={loading || !newSponsor.trim()}
            >
              <FaPlusCircle />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {eventDetails.sponsors.filter(sponsor => sponsor !== "").map((sponsor, index) => (
            <div key={index} className="bg-gray-600 text-white px-3 py-1 rounded-full flex items-center gap-2">
              {sponsor}
              <button
                type="button"
                onClick={() => removeSponsor(sponsor)}
                className="text-red-400 hover:text-red-500"
                disabled={loading}
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
          {eventDetails.sponsors.filter(sponsor => sponsor !== "").length === 0 && (
            <p className="text-gray-400 italic">No sponsors added yet</p>
          )}
        </div>
      </div>

      {/* Prizes Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <FaTrophy /> Prizes
        </h3>
        
        {eventDetails.prizes.map((prize, index) => (
          <div key={index} className="mb-4 bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Prize #{prize.position}</h4>
              <button
                type="button"
                onClick={() => removePrize(index)}
                className="text-red-400 hover:text-red-500"
                disabled={loading}
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm mb-1 block">Position</label>
                <input
                  type="number"
                  value={prize.position}
                  onChange={(e) => handlePrizeChange(index, "position", e.target.value)}
                  className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                  min="1"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Additional Message</label>
                <input
                  type="text"
                  value={prize.message}
                  onChange={(e) => handlePrizeChange(index, "message", e.target.value)}
                  className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                  placeholder="First Prize, Runner-up, etc."
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Amount (₹)</label>
                <input
                  type="number"
                  value={prize.amount}
                  onChange={(e) => handlePrizeChange(index, "amount", e.target.value)}
                  className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                  min="0"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addPrize}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          disabled={loading}
        >
          <FaPlusCircle /> Add Prize
        </button>
      </div>

      {/* FAQs Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <FaQuestionCircle /> FAQs
        </h3>
        
        {eventDetails.faqs.map((faq, index) => (
          <div key={index} className="mb-4 bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">FAQ #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeFAQ(index)}
                className="text-red-400 hover:text-red-500"
                disabled={loading}
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="mb-3">
              <label className="text-sm mb-1 block">Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter question"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="text-sm mb-1 block">Answer</label>
              <textarea
                value={faq.answer}
                onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                rows={2}
                placeholder="Enter answer"
                disabled={loading}
              ></textarea>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addFAQ}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          disabled={loading}
        >
          <FaPlusCircle /> Add FAQ
        </button>
      </div>

      {/* Timeline Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <FaClock /> Timeline
        </h3>
        
        {eventDetails.timeLines.map((timeline, index) => (
          <div key={index} className="mb-4 bg-gray-900 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Timeline #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeTimeLine(index)}
                className="text-red-400 hover:text-red-500"
                disabled={loading}
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm mb-1 block">Heading</label>
                <input
                  type="text"
                  value={timeline.heading}
                  onChange={(e) => handleTimeLineChange(index, "heading", e.target.value)}
                  className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Registration Deadline"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Subheading</label>
                <input
                  type="text"
                  value={timeline.subheading}
                  onChange={(e) => handleTimeLineChange(index, "subheading", e.target.value)}
                  className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                  placeholder="e.g., Don't miss it!"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label className="text-sm mb-1 block">Time</label>
                <input
                  type="datetime-local"
                  value={timeline.time}
                  onChange={(e) => handleTimeLineChange(index, "time", e.target.value)}
                  className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addTimeLine}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
          disabled={loading}
        >
          <FaPlusCircle /> Add Timeline Item
        </button>
      </div>

      {/* Photos Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
          <FaImages /> Photos from Previous Events
        </h3>
        
        <div className="mb-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotosChange}
            className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-yellow-400"
            disabled={loading}
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {eventDetails.photos.map((photo, index) => (
            <div key={index} className="relative">
              <div className="bg-gray-900 p-2 rounded-lg h-24 flex items-center justify-center">
                <p className="text-center text-sm text-ellipsis overflow-hidden">{photo.name}</p>
              </div>
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                disabled={loading}
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
          {eventDetails.photos.length === 0 && (
            <p className="text-gray-400 italic col-span-full">No photos added yet</p>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">Payment Information</h3>
        
        <div className="mb-6">
          <label className="block text-lg mb-2">
            Amount Payable (₹): <strong>100</strong>
          </label>
          <p className="text-gray-400">This is the fee to host an event on the platform.</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitEvent}
        className="bg-yellow-500 py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 text-lg font-semibold"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Event"}
      </button>

      {loading && (
        <div className="mt-4 text-center text-yellow-400">Please wait while we create your event...</div>
      )}
    </div>
  );
};

export default CollegeEvent;