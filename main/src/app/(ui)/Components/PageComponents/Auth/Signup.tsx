"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/app/Context/AuthContext";
import Redirect from "./Redirect";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "+91-",
    name: "",
    year: "",
    branch: "",
    admissionNumber: "",
  });

  const [error, setError] = useState("");
  const [available, setAvailable] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState<boolean>(false);

  const { setIsLoggedIn } = useAuth();

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, username: value });

    if (value.length < 3) {
      setAvailable(null);
      return;
    }

    try {
      const res = await axios.post("/api/auth/checkusername", { userName: value });
      setAvailable(res.data.success ? "Available" : "Not available");
    } catch (error) {
      console.error("Error checking username availability:", error);
      setAvailable("Not available");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+91-")) {
      setFormData((prev) => ({ ...prev, mobile: "+91-" }));
      return;
    }
    if (value.length <= 14 && /^\+91-\d{0,10}$/.test(value)) {
      setFormData((prev) => ({ ...prev, mobile: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setError("Passwords do not match");
      return;
    }
    if (formData.mobile.length !== 14) {
      setError("Please enter a valid 10-digit mobile number with +91");
      return;
    }

    const { name, year, branch, admissionNumber, email, password, mobile, confirmPassword, username } = formData;

    if (!name || !year || !branch || !admissionNumber || !email || !password || !username) {
      setError("Please fill all required fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const userPayload = {
        name,
        year,
        branch,
        admissionNumber,
        email,
        password,
        mobile,
        confirmPassword,
        username
      };

      console.log("Sending payload: ", userPayload);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userPayload),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Signup failed");
      }
      setIsLoggedIn(true);
      toast.success("Thank you for being a part of our community!");
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (input.parentElement) {
          input.parentElement.classList.add("input-focused");
        }
      });
      input.addEventListener("blur", () => {
        input.parentElement?.classList.remove("input-focused");
      });
    });
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", () => { });
        input.removeEventListener("blur", () => { });
      });
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4">
      <div className="w-full max-w-4xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="z-10 relative">
          <h2 className="text-4xl text-center font-extrabold mb-8 tracking-wide">
            Join 100x<span className="text-blue-500 animate-pulse">Code</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-semibold mb-2 text-blue-300">
                  Username *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    className={`border p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 transition-all duration-300 ${available === "Available"
                      ? "border-green-400 focus:ring-green-500"
                      : available === "Not available"
                        ? "border-red-400 focus:ring-red-500"
                        : "border-gray-700 focus:ring-blue-500"
                      }`}
                    required
                  />
                  {available && (
                    <span className="absolute right-3 top-3">
                      {available === "Available" ? (
                        <CheckCircle className="text-green-400 w-5 h-5" />
                      ) : (
                        <XCircle className="text-red-400 w-5 h-5" />
                      )}
                    </span>
                  )}
                </div>
                {available && (
                  <p
                    className={`mt-1 text-sm ${available === "Available" ? "text-green-400" : "text-red-400"
                      }`}
                  >
                    {available}
                  </p>
                )}
              </div>

              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+91-XXXXXXXXXX"
                  value={formData.mobile}
                  onChange={handleMobileChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Branch *</label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                  <option value="MECH">Mechanical Engineering</option>
                  <option value="CIVIL">Civil Engineering</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Year *</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div className="input-group transition-all duration-300">
              <label className="block text-sm font-medium mb-2 text-blue-300">Admission Number *</label>
              <input
                type="text"
                name="admissionNumber"
                placeholder="Enter your admission number"
                value={formData.admissionNumber}
                onChange={handleInputChange}
                className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border border-gray-700 p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900 bg-opacity-30 border border-red-500 text-red-300 p-3 rounded-lg text-center text-sm animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="text-gray-500">Already have an account?</div>
            <button
              onClick={() => router.push("/auth/login")}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </div>

      <Redirect showDestinationModal={showDestinationModal} setShowDestinationModal={setShowDestinationModal} />
    </div>
  );
};

export default Signup;