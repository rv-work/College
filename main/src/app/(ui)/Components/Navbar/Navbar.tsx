"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaRegUserCircle , FaYoutube  } from "react-icons/fa";

import { 
  Home, 
  GraduationCap, 
  CalendarCheck, 
  BookOpen, 
  LogIn, 
  User, 
  LogOut, 
  Calendar ,
} from "lucide-react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
import { useAuth } from "@/app/Context/AuthContext";




const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {isLoggedIn , setIsLoggedIn} = useAuth()

  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/auth/verify", { withCredentials: true });
      if (res.data?.success) {
        setIsLoggedIn(true);
      }
    } catch (error : unknown) {
      const err = error as { response: { status: number } };
      console.error("Auth check failed:", err);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setIsLoggedIn(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dsa", label: "DSA", icon: GraduationCap },
    { href: "/events", label: "Events", icon: CalendarCheck },
    { href: "/sources", label: "Sources", icon: BookOpen },
    { href: "/youtube", label: "Youtube", icon:  FaYoutube  }
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white p-4 bg-transparent"
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center"
        >
          <p className="text-2xl font-bold">
            100x<span className="text-blue-600">Code</span>
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#17171790] py-4 px-8 border border-white/10 rounded-full hidden md:flex space-x-8 shadow-lg shadow-blue-500/20"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <motion.div 
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Link 
                  href={link.href} 
                  className={`flex items-center space-x-2 transition-colors duration-300 ${
                    active ? 'text-blue-500 font-semibold' : 'text-white hover:text-blue-400'
                  }`}
                >
                  <link.icon size={18} className={active ? "text-blue-500" : ""} />
                  <span>{link.label}</span>
                  {active && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* User Actions */}
        <div className="flex space-x-4 relative">
          {isLoggedIn ? (
            <div ref={dropdownRef}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaRegUserCircle 
                  size={32}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 rounded-full transition-all duration-300 ease-in-out"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              </motion.div>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-[#171717] shadow-lg rounded-md py-2 z-50"
                >
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                  >
                    <User className="mr-2" size={18} />
                    My Profile
                  </Link>
                  <Link
                    href="/profile/my-events"
                    className="flex items-center px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                  >
                    <Calendar className="mr-2" size={18} />
                    My Events
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-blue-600 transition-colors"
                  >
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/auth/login"
                className="flex items-center px-4 py-2 text-sm font-semibold bg-gradient-to-b from-blue-400 to-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;