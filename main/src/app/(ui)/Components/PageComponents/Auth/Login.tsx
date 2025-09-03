"use client";
import React, { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Mail, Lock, ArrowRight, Loader2, TestTube
} from "lucide-react";
import { useAuth } from "@/app/Context/AuthContext";
import Redirect from "./Redirect";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showDestinationModal, setShowDestinationModal] = useState<boolean>(false);

  const { setIsLoggedIn } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Logged in Successfully");
        setIsLoggedIn(true);
        setShowDestinationModal(true);
      } else {
        setError(res.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Something went wrong!");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = (username: string, password: string) => {
    setFormData({
      emailOrUsername: username,
      password: password
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-blue-500/20"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl text-center font-extrabold mb-2 tracking-wide">
            Welcome to 100x<span className="text-blue-700">Code</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">Sign in to continue your journey</p>
        </motion.div>

        {/* Test Credentials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30"
        >
          <div className="flex items-center justify-center mb-3">
            <TestTube className="h-4 w-4 text-blue-400 mr-2" />
            <h4 className="text-sm font-semibold text-blue-300">Test Platform</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex space-x-4">
                <span className="text-gray-400">Username: <span className="text-blue-300">user1</span></span>
                <span className="text-gray-400">Password: <span className="text-blue-300">12345678</span></span>
              </div>
              <button
                onClick={() => handleTestLogin("user1", "12345678")}
                className="text-blue-400 hover:text-blue-300 underline text-xs"
              >
                Use
              </button>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex space-x-4">
                <span className="text-gray-400">Username: <span className="text-blue-300">user2</span></span>
                <span className="text-gray-400">Password: <span className="text-blue-300">12345678</span></span>
              </div>
              <button
                onClick={() => handleTestLogin("user2", "12345678")}
                className="text-blue-400 hover:text-blue-300 underline text-xs"
              >
                Use
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Click &quot;Use&quot; to auto-fill credentials
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-lg mb-2 font-medium">Email / Username:</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="emailOrUsername"
                placeholder="Enter your email/Username"
                value={formData.emailOrUsername}
                onChange={handleInputChange}
                className="pl-10 border border-gray-600 p-3 w-full bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-lg mb-2 font-medium">Password:</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 border border-gray-600 p-3 w-full bg-black text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
              />
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-center text-sm bg-red-500/10 p-2 rounded-md"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg shadow-lg flex items-center justify-center space-x-2 font-semibold text-lg transition-all duration-300 ${loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/20 hover:shadow-lg"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => router.push("/auth/signup")}
            className="text-sm flex items-center justify-center space-x-1 mx-auto"
          >
            <span className="text-red-400 font-medium">New?</span>
            <span className="text-blue-400 hover:text-blue-300 hover:underline transition-all">
              Create an Account
            </span>
          </motion.button>
        </div>
      </motion.div>

      <Redirect showDestinationModal={showDestinationModal} setShowDestinationModal={setShowDestinationModal} />
    </div>
  );
};

export default Login;