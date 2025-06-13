"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import Tesseract from "tesseract.js";
import Image from "next/image";
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
  const [result, setResult] = useState("");
  const [confirm, setConfirm] = useState(false)
  const [available, setAvailable] = useState<string | null>(null)
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [scanningProgress, setScanningProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState<boolean>(false);

  const {setIsLoggedIn } = useAuth()

  console.log("image : " , confirm , "iamgeeee : " , imagePreview)


  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, username: value });
  
    if (value.length < 3) {
      setAvailable(null);
      return;
    }
  
    try {
      const res = await axios.post("/api/auth/checkusername" , {userName : value});
      setAvailable(res.data.success ? "Available" : "Not available");
    } catch (error) {
      console.error("Error checking username availability:", error);
      setAvailable("Not available");
    }
  };
  
  

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMobileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("+91-")) {
      setFormData((prev) => ({ ...prev, mobile: "+91-" }));
      return;
    }
    if (value.length <= 14 && /^\+91-\d{0,10}$/.test(value)) {
      setFormData((prev) => ({ ...prev, mobile: value }));
    }
  };

  const preprocessImage = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement("img");
        if (typeof reader.result === "string") {
          img.src = reader.result;
        }
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width * 2;
          canvas.height = img.height * 2;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = avg;
              data[i + 1] = avg;
              data[i + 2] = avg;
            }

            ctx.putImageData(imageData, 0, 0);
          }

          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
          }, "image/jpeg");
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const idCard = e.target.files[0];
      const imageUrl = URL.createObjectURL(idCard);
      setImagePreview(imageUrl);
      setIsProcessing(true);
      setScanningProgress(0);

      try {
        setLoading(true);

        const progressInterval = setInterval(() => {
          setScanningProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return prev;
            }
            return prev + Math.floor(Math.random() * 10);
          });
        }, 300);

        const preprocessedImage = await preprocessImage(idCard);

        const {
          data: { text },
        } = await Tesseract.recognize(preprocessedImage as Blob, "eng", {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setScanningProgress(90 + Math.floor(m.progress * 10));
            }
          },
        });

        clearInterval(progressInterval);
        setScanningProgress(100);

        const upperText = text.toUpperCase();

        const nameMatch = upperText.match(/([A-Z\s]+)[\n\r]+B\.TECH/);
        const extractedName = nameMatch ? nameMatch[1].trim() : "";

        const branchMatch = upperText.match(/\((.*?)\)/);
        const extractedBranch = branchMatch ? branchMatch[1].trim() : "";

        const admissionMatch = upperText.match(/ADMISSION\s*NO\.?\s*:?[\s\r\n]*([0-9A-Z]+)/);
        const extractedAdmissionNumber = admissionMatch ? admissionMatch[1].trim() : "";

        const validTillMatch = upperText.match(/VALID\s*TILL\s*:?\s*(\d{2})-(\d{2})-(\d{4})/);
        let extractedYear = "";
        if (validTillMatch) {
          const validYear = parseInt(validTillMatch[3], 10);
          const currentYear = new Date().getFullYear();
          extractedYear = (validYear - currentYear).toString();
        }

        const str = `Name: ${extractedName} \nBranch: ${extractedBranch} \nAdmission No: ${extractedAdmissionNumber} \nYear: ${extractedYear}`;

        setTimeout(() => {
          setResult(str);
          setIsProcessing(false);
          setFormData((prev) => ({
            ...prev,
            name: extractedName,
            year: extractedYear,
            branch: extractedBranch,
            admissionNumber: extractedAdmissionNumber,
          }));
        }, 500);
      } catch (error) {
        console.error("Error extracting text from ID card:", error);
        setError("Failed to extract details from ID card.");
        setIsProcessing(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!confirm) {
      setError("Upload Id Card")
    }

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setError("Passwords do not match");
      return;
    }
    if (formData.mobile.length !== 14) {
      setError("Please enter a valid 10-digit mobile number with +91");
      return;
    }

    const { name, year, branch, admissionNumber, email, password, mobile, confirmPassword , username } = formData;

    if (!name || !year || !branch || !admissionNumber) {
      setError("Failed to extract all ID card details. Ensure all fields are filled.");
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
      setIsLoggedIn(true)
      toast.success("Thank you for being a part of our community!")
      router.push("/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const closeResult = () => {
    setResult("");
    setImagePreview("")
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
        input.removeEventListener("focus", () => {});
        input.removeEventListener("blur", () => {});
      });
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4">
      <div className="w-full max-w-5xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center z-10">
          <h2 className="text-3xl text-center font-extrabold mb-6 tracking-wide">
            Join 100x<span className="text-blue-500 animate-pulse">Code</span>
          </h2>
          
          <div className="relative w-full">
            <label
              htmlFor="idCard"
              className="border-2 border-dashed border-blue-400 rounded-2xl w-full h-80 flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="ID Preview"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover rounded-xl"
                    style={{ width: "100%", height: "100%" }}
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                      <div className="w-3/4 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${scanningProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-white mt-3">Scanning... {scanningProgress}%</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-md font-medium">Upload ID Card</p>
                  <p className="text-xs text-gray-400 mt-2">Supported formats: JPG, PNG</p>
                </div>
              )}
            </label>
            <input
              type="file"
              id="idCard"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 z-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Email</label>
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
              
              <div className="input-group transition-all duration-300 mb-6">
                <label className="block text-sm font-semibold mb-2 text-blue-300">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    className={`border p-3 w-full bg-black bg-opacity-50 text-white rounded-lg focus:ring-2 transition-all duration-300 ${
                      available === "Available"
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
                    className={`mt-1 text-sm ${
                      available === "Available" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {available}
                  </p>
                )}
              </div>
            </div>

            <div className="input-group transition-all duration-300">
              <label className="block text-sm font-medium mb-2 text-blue-300">Mobile Number</label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="input-group transition-all duration-300">
                <label className="block text-sm font-medium mb-2 text-blue-300">Password</label>
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
                <label className="block text-sm font-medium mb-2 text-blue-300">Confirm Password</label>
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

      {result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-2xl w-[90%] max-w-md border border-gray-700 transform transition-all duration-300 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-400">Extracted Details</h3>
              <button 
                onClick={closeResult}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <pre className="text-gray-200 whitespace-pre-line font-mono text-sm">{result}</pre>
            </div>
            
            <div className="flex justify-between items-center gap-2 mt-6">
              <div>
              <span className="text-gray-400">Not correct? </span>
              <label 
                htmlFor="idCard" 
                className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium transition-colors"
                onClick={closeResult}
              >
                Upload Again
              </label>

              </div>
              <div>
              <span className="text-gray-400">Correct? </span>
              <button 
                className="text-green-400 hover:text-green-300 cursor-pointer font-medium transition-colors"
                onClick={() =>{
                  setConfirm(true)
                  setResult("")
                } }
              >
                Submit
              </button>
              </div>
             
            </div>
          </div>
        </div>
      )}

        <Redirect showDestinationModal={showDestinationModal} setShowDestinationModal={setShowDestinationModal} />
     </div>
 );
};

export default Signup;