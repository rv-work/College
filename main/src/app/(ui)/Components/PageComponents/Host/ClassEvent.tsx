import React, { useState } from "react";
import { FaBook, FaTag, FaClock } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const ClassEvent = () => {
  const [classDetails, setClassDetails] = useState({
    title: "",
    datetime: new Date() as Date,
    description: "",
    detail: "",
  });

  const [loading, setLoading] = useState<boolean>(false); 

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClassDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitClass = async () => {
    setLoading(true); 
    try {
      const response = await fetch("/api/host/class/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classDetails),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Class created successfully!");
        console.log("Class created successfully:", data);
      } else {
        toast.error("Failed to create class.");
      }
    } catch (error) {
      console.error("Error submitting class:", error);
      toast.error("An error occurred while creating the class.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="class-form bg-gray-700 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-teal-400 flex items-center gap-2">
        <FaBook /> Create a Class
      </h2>
      <div className="mb-6 flex gap-4">
        <div className="w-[85%]">
          <label className="text-lg mb-2 flex items-center gap-2">
            <FaTag /> Class Title:
          </label>
          <input
            type="text"
            name="title"
            className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-teal-400"
            value={classDetails.title}
            onChange={handleClassChange}
            disabled={loading}
          />
        </div>
        <div className="w-[15%]">
          <label className="text-lg mb-2 flex items-center gap-2">
            <FaClock /> Date & Time:
          </label>
          <DatePicker
            selected={classDetails.datetime}
            onChange={(date: Date | null) => {
              if (date) {
                setClassDetails({ ...classDetails, datetime: date });
              }
            }}
            showTimeSelect
            dateFormat="Pp"
            className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-teal-400"
            disabled={loading} 
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="text-lg mb-2 flex items-center gap-2">
          <FaBook /> Description:
        </label>
        <textarea
          name="description"
          className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-teal-400"
          rows={4}
          value={classDetails.description}
          onChange={handleClassChange}
          disabled={loading} 
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="text-lg mb-2 flex items-center gap-2">
          <FaBook /> Course Content:
        </label>
        <textarea
          name="detail"
          className="border p-2 w-full bg-black text-white rounded-md focus:ring-2 focus:ring-teal-400"
          rows={4}
          value={classDetails.detail}
          onChange={handleClassChange}
          disabled={loading} 
        ></textarea>
      </div>

      <button
        onClick={handleSubmitClass}
        className="bg-teal-500 py-2 px-6 rounded-lg shadow-lg hover:bg-teal-400 transition-transform transform hover:scale-105"
        disabled={loading} 
      >
        {loading ? "Creating..." : "Create Class"} 
      </button>
      
      {loading && (
        <div className="mt-4 text-center text-teal-400">Please wait...</div> 
      )}
    </div>
  );
};

export default ClassEvent;
