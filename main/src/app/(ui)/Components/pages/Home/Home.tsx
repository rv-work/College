"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00040e] to-[#050b20] text-white overflow-hidden">
      {/* Navigation */}
      {scrolled && 
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-45 transform-gpu"></div>
              <div className="absolute inset-1 bg-[#050b20] rounded-lg rotate-45 transform-gpu flex items-center justify-center">
                <span className="text-blue-500 font-bold text-xl">&lt;/&gt;</span>
              </div>
            </div>
            <span className="text-2xl font-bold">100x<span className="text-blue-600">Code</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#classroom">Classroom</NavLink>
            <NavLink href="#events">Events</NavLink>
            <NavLink href="#dsa">DSA Track</NavLink>
            <NavLink href="#resources">Resources</NavLink>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-5 py-2 bg-transparent border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300">
              Log In
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center">
              Sign Up <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <button className="md:hidden">
              <div className="w-6 h-6 text-white">
                <MenuIcon />
              </div>
            </button>
          </div>
        </div>
      </header>
}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent"></div>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="relative z-10">
              <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full text-blue-400 font-medium text-sm mb-6 backdrop-blur-sm border border-blue-800/50">
                Your Complete Coding Education Platform
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Learn, Code, <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Collaborate</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                An all-in-one platform for coding education with collaborative classrooms, events, quizzes, DSA tracking, and comprehensive academic resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-medium flex items-center justify-center">
                  Get Started <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
                </button>
                <button className="px-8 py-3 bg-transparent border border-gray-500 text-white rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300 font-medium flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                  Watch Demo
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap mt-12 gap-8">
                <div>
                  <div className="text-3xl font-bold text-white">20+</div>
                  <div className="text-gray-400">Live Events</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-gray-400">DSA Problems</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">1000+</div>
                  <div className="text-gray-400">Active Users</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-2 rounded-2xl backdrop-blur-sm border border-blue-800/30 shadow-2xl">
              <div className="rounded-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-12 bg-[#1e1e1e] flex items-center px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-sm text-gray-400">Collaborative Coding Session</div>
                </div>
                <div className="pt-12">
                  <Image 
                    src="/codeClass.png" 
                    alt="Collaborative Coding" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600 rounded-full opacity-20 filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600 rounded-full opacity-20 filter blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Platform Features"
            title="Everything You Need to Excel in Coding"
            description="Our platform offers comprehensive tools to help you learn, practice, and collaborate with others on your coding journey."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={<CodeIcon />}
              title="Collaborative Classroom"
              description="Real-time code editing with peers and mentors. Chat, share screens, and execute code together."
            />
            <FeatureCard
              icon={<CalendarIcon />}
              title="Event Management"
              description="Host and join coding events, hackathons, and workshops with seamless registration."
            />
            <FeatureCard
              icon={<QuizIcon />}
              title="Video-Based Quizzes"
              description="Turn any YouTube coding tutorial into an interactive quiz to test your understanding."
            />
            <FeatureCard
              icon={<ChartIcon />}
              title="DSA Progress Tracking"
              description="Track your progress through data structures and algorithms with AI-powered feedback."
            />
            <FeatureCard
              icon={<ResourceIcon />}
              title="Academic Resources"
              description="Access comprehensive materials including PYQs, tests, notes, and coding resources."
            />
            <FeatureCard
              icon={<ContributionIcon />}
              title="Community Contributions"
              description="Contribute to the platform's source code and help build a better learning experience."
            />
          </div>
        </div>
      </section>

      {/* Classroom Section */}
      <section id="classroom" className="py-24 bg-[#020818] relative">
        <div className="absolute inset-0 bg-[url('/circuit.svg')] bg-repeat opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-2 rounded-2xl backdrop-blur-sm border border-blue-800/50 shadow-2xl">
                  <Image 
                    src="/codeClass.png" 
                    alt="Collaborative Classroom" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl -z-10 opacity-20 blur-lg"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/30 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-400/50 cursor-pointer hover:bg-blue-500/50 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full text-blue-400 font-medium text-sm mb-6 backdrop-blur-sm border border-blue-800/50">
                Collaborative Learning
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Real-Time Collaborative Coding Classroom
              </h2>
              <p className="text-gray-300 mb-8">
                Our virtual classroom environment enables teachers and students to code together in real-time. Share screens, provide instant feedback, and solve problems collaboratively. The integrated chat system allows for seamless communication while the host maintains complete control over the session.
              </p>
              
              <div className="space-y-4">
                <FeatureItem text="Real-time code editing with syntax highlighting" />
                <FeatureItem text="Integrated chat for seamless communication" />
                <FeatureItem text="Code execution and output visualization" />
                <FeatureItem text="Host controls for managing participants" />
                <FeatureItem text="Screen sharing and annotation tools" />
              </div>
              
              <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-medium flex items-center">
                Try Classroom <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-2 bg-purple-900/30 rounded-full text-purple-400 font-medium text-sm mb-6 backdrop-blur-sm border border-purple-800/50">
                Event Management
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Host and Join Coding Events Seamlessly
              </h2>
              <p className="text-gray-300 mb-8">
                Our event management system allows you to create, manage, and participate in various coding events. From hackathons to workshops, register with just a few clicks and get timely reminders. Event hosts can track attendance, manage registrations, and analyze engagement metrics.
              </p>
              
              <div className="space-y-4">
                <FeatureItem text="One-click event registration" />
                <FeatureItem text="Event reminders and notifications" />
                <FeatureItem text="Attendance tracking and analytics" />
                <FeatureItem text="Certificate generation for participants" />
                <FeatureItem text="Post-event feedback collection" />
              </div>
              
              <button className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 font-medium flex items-center">
                Browse Events <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
              </button>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-2 rounded-2xl backdrop-blur-sm border border-purple-800/50 shadow-2xl">
                  <Image 
                    src="/image.png" 
                    alt="Event Management" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl -z-10 opacity-20 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-24 bg-[#020818] relative">
        <div className="absolute inset-0 bg-[url('/dots.svg')] bg-repeat opacity-5"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-green-900/30 to-blue-900/30 p-2 rounded-2xl backdrop-blur-sm border border-green-800/50 shadow-2xl">
                  <Image 
                    src="/quiz.png" 
                    alt="Video-Based Quizzes" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl -z-10 opacity-20 blur-lg"></div>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="inline-block px-4 py-2 bg-green-900/30 rounded-full text-green-400 font-medium text-sm mb-6 backdrop-blur-sm border border-green-800/50">
                Interactive Learning
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Turn YouTube Tutorials into Interactive Quizzes
              </h2>
              <p className="text-gray-300 mb-8">
                Enhance your learning by transforming any YouTube coding tutorial into an interactive quiz. Simply paste a video link, and our system will generate questions based on the content. Test your understanding immediately after watching to reinforce your knowledge.
              </p>
              
              <div className="space-y-4">
                <FeatureItem text="AI-generated questions from video content" />
                <FeatureItem text="Instant feedback on your answers" />
                <FeatureItem text="Progress tracking across different topics" />
                <FeatureItem text="Share quizzes with friends and classmates" />
                <FeatureItem text="Create custom quizzes for specific videos" />
              </div>
              
              <button className="mt-8 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 font-medium flex items-center">
                Try Video Quizzes <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DSA Section */}
      <section id="dsa" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-2 bg-cyan-900/30 rounded-full text-cyan-400 font-medium text-sm mb-6 backdrop-blur-sm border border-cyan-800/50">
                Track Your Progress
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                DSA Problem Solving with AI Feedback
              </h2>
              <p className="text-gray-300 mb-8">
                Master Data Structures and Algorithms with our comprehensive DSA tracker. Solve problems of varying difficulty levels, track your progress, and receive AI-powered recommendations to improve your code. Build a strong foundation for technical interviews and competitive programming.
              </p>
              
              <div className="space-y-4">
                <FeatureItem text="500+ curated DSA problems with solutions" />
                <FeatureItem text="AI-powered code analysis and feedback" />
                <FeatureItem text="Visual progress tracking by topic" />
                <FeatureItem text="Time and space complexity analysis" />
                <FeatureItem text="Interview preparation roadmaps" />
              </div>
              
              <button className="mt-8 px-8 py-3 bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-all duration-300 font-medium flex items-center">
                Start Solving <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
              </button>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 p-2 rounded-2xl backdrop-blur-sm border border-cyan-800/50 shadow-2xl">
                  <Image 
                    src="/dsa.png" 
                    alt="DSA Progress Tracking" 
                    width={1200} 
                    height={800}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl -z-10 opacity-20 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-[#020818] relative">
        <div className="absolute inset-0 bg-[url('/circuit.svg')] bg-repeat opacity-5"></div>
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Academic Resources"
            title="Comprehensive Learning Materials"
            description="Access a vast library of study materials, including PYQs, notes, tests, and coding resources to excel in your academic journey."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <ResourceCard
              icon={<DocumentIcon />}
              title="Previous Year Papers"
              count="200+"
              color="blue"
            />
            <ResourceCard
              icon={<NotesIcon />}
              title="Subject Notes"
              count="50+"
              color="purple"
            />
            <ResourceCard
              icon={<TestIcon />}
              title="Practice Tests"
              count="100+"
              color="green"
            />
            <ResourceCard
              icon={<TutorialIcon />}
              title="Coding Tutorials"
              count="150+"
              color="amber"
            />
          </div>
          
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 font-medium flex items-center mx-auto">
              Browse All Resources <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="User Stories"
            title="What Our Users Say"
            description="Hear from students and teachers who have transformed their coding education experience with 100xCode."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <TestimonialCard
              content="The collaborative classroom feature has completely changed how I teach coding. My students can now work together seamlessly, and I can provide real-time feedback."
              name="Prof. Rajesh Kumar"
              role="Computer Science Professor"
              avatar="/placeholder/32/32"
            />
            <TestimonialCard
              content="100xCode's DSA tracker helped me prepare for my internship interviews. The AI recommendations on my code pointed out optimization opportunities I had missed."
              name="Priya Sharma"
              role="3rd Year CSE Student"
              avatar="/placeholder/32/32"
            />
            <TestimonialCard
              content="The event management system made organizing our college hackathon so much easier. Registration, updates, and certificate generation were all handled seamlessly."
              name="Amit Patel"
              role="Coding Club Lead"
              avatar="/placeholder/32/32"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Coding Education?</h2>
            <p className="text-xl text-gray-300 mb-10">Join thousands of students and educators who are already using 100xCode to learn, collaborate, and excel in coding.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-medium flex items-center justify-center">
                Get Started For Free <span className="ml-2 w-5 h-5"><ArrowRightIcon /></span>
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 font-medium flex items-center justify-center">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#00030b] border-t border-gray-800 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-45 transform-gpu"></div>
                  <div className="absolute inset-1 bg-[#050b20] rounded-lg rotate-45 transform-gpu flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-sm">&lt;/&gt;</span>
                  </div>
                </div>
                <span className="text-xl font-bold">100x<span className="text-blue-600">Code</span></span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering the next generation of developers with collaborative learning tools and comprehensive resources.
              </p>
              <div className="flex space-x-4">
                <SocialIcon icon={<FacebookIcon />} />
                <SocialIcon icon={<TwitterIcon />} />
                <SocialIcon icon={<InstagramIcon />} />
                <SocialIcon icon={<GithubIcon />} />
                <SocialIcon icon={<LinkedinIcon />} />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <FooterLink href="#classroom">Classroom</FooterLink>
                <FooterLink href="#events">Events</FooterLink>
                <FooterLink href="#quiz">Video Quizzes</FooterLink>
                <FooterLink href="#dsa">DSA Track</FooterLink>
                <FooterLink href="#resources">Resources</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/team">Our Team</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <FooterLink href="/terms">Terms of Service</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/cookies">Cookie Policy</FooterLink>
                <FooterLink href="/security">Security</FooterLink>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 100xCode. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-gray-900 border border-gray-700 text-gray-400 rounded-md text-sm px-3 py-1.5">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
      >
        <ArrowUpIcon className="w-5 h-5 text-white" />
      </button>

    </div>
  );
};

// Helper Components
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link href={href} className="text-gray-300 hover:text-white transition-colors duration-300">
    {children}
  </Link>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 group">
    <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center mb-5 text-blue-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-all duration-300">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start">
    <div className="mt-1 mr-3 text-green-500">
      <CheckIcon className="w-5 h-5" />
    </div>
    <p className="text-gray-300">{text}</p>
  </div>
);

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ subtitle, title, description }) => (
  <div className="text-center max-w-3xl mx-auto">
    <div className="inline-block px-4 py-2 bg-blue-900/30 rounded-full text-blue-400 font-medium text-sm mb-6 backdrop-blur-sm border border-blue-800/50">
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h2>
    <p className="text-lg text-gray-300">{description}</p>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-8"></div>
  </div>
);

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  count: string;
  color: "blue" | "purple" | "green" | "amber";
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, count, color }) => {
  const colorClasses = {
    blue: "from-blue-900/30 to-blue-900/10 border-blue-800/50 text-blue-400 hover:border-blue-500/50",
    purple: "from-purple-900/30 to-purple-900/10 border-purple-800/50 text-purple-400 hover:border-purple-500/50",
    green: "from-green-900/30 to-green-900/10 border-green-800/50 text-green-400 hover:border-green-500/50",
    amber: "from-amber-900/30 to-amber-900/10 border-amber-800/50 text-amber-400 hover:border-amber-500/50"
  };
  
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center h-full flex flex-col items-center justify-center`}>
      <div className="mb-4 text-4xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-1">{count}</p>
      <p className="text-gray-400 text-sm">Available Resources</p>
    </div>
  );
};

interface TestimonialCardProps {
  content: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ content, name, role, avatar }) => (
  <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20">
    <div className="flex items-center mb-4">
      <QuoteIcon className="w-10 h-10 text-blue-500/50" />
    </div>
    <p className="text-gray-300 mb-6 italic">{content}</p>
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <Image 
          src={avatar} 
          alt={name} 
          width={40} 
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium text-white">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <Link href={href} className="hover:text-blue-400 transition-colors duration-300">
      {children}
    </Link>
  </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

// Icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

// const PlayIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
//   </svg>
// );

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

const QuizIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const ResourceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const ContributionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const NotesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const TestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TutorialIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
  </svg>
);

const QuoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default Home;