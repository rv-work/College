'use client';
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { Calendar, Clock, MapPin, Users, Award, DollarSign, MessageCircle, Star, ChevronDown, ChevronUp, ExternalLink, Share2, Heart, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'nextjs-toploader/app';
import TimeLines from './TimeLines';

interface User {
  admissionNumber: string;
  name: string;
  profilePicture?: string;
  username: string;
  year: number;
  branch: string;
}

interface Reply {
  id: string;
  replyContent: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface Comment {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  replies: Reply[];
}

interface Event {
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
  domain: string;
  helpEmail: string;
  isApproved: boolean;
  isDone: boolean;
  location: string;
  organizedBy: string;
  ownerId: string;
  photos: string[];
  priceSolo: number;
  priceTeam: number;
  sponsors: string[];
  team: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  Tags: string[];
  comments  : Comment[]
  prize : Prize[]
  faq : FAQ[]
  timeLines : TimeLine[]
}

interface Prize {
  position: string;
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

// interface Event {
//   id: string;
//   title: string;
//   description: string;
//   detail: string;
//   startTime: string;
//   status: string;
//   ownerId: string;
//   banner: string;
//   domain: string;
//   category: string;
//   team: string;
//   priceSolo: number;
//   priceTeam: number;
//   isApproved: boolean;
//   isDone: boolean;
//   comments: Comment[];
//   // New fields for enhanced UI
//   location?: string;
//   capacity?: number;
//   organizer?: string;
//   sponsors?: string[];
//   prizes?: {
//     first: string;
//     second: string;
//     third: string;
//   };
// }

interface ApiResponse {
  success: boolean;
  data: {
    event: Event;
    user: User;
  };
  message?: string;
}



const EventDetailPage = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>('');
  const [replyInputs, setReplyInputs] = useState<{ [commentId: string]: string }>({});
  const [showReplyBox, setShowReplyBox] = useState<{ [commentId: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'details' | 'comments' | 'faq'>('details');
  const [openFaqItems, setOpenFaqItems] = useState<number[]>([]);
  const [isInterestedCount, setIsInterestedCount] = useState<number>(42); // Dummy count
  const [isInterested, setIsInterested] = useState<boolean>(false);
  
  const { eventId } = useParams();
  const router = useRouter()

 

  useEffect(() => {
    const fetchEvent = async () => {
      try {
      
        const response = await fetch(`/api/event/getEvent/?eventId=${eventId}`);
        const data: ApiResponse = await response.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch event');
        }

        setEvent(data.data.event);
        setUser(data.data.user);
        setComments(data.data.event?.comments || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    
    try {
      const res = await axios.post('/api/event/comment', {
        eventId: eventId,
        comment: commentText,
      }, {
        withCredentials: true,
      });
      
      if (res.data.success) {
        setComments((prev) => [
          ...prev,
          {
            id: res.data.data.newComment.id,
            comment: commentText,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: res.data.data.user,
            replies: [],
          },
        ]);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    const replyContent = replyInputs[commentId];
    if (!replyContent?.trim()) return;

    try {
      const res = await axios.post('/api/event/comment/reply', {
        commentId,
        replyContent,
        eventId
      }, { withCredentials: true });

      if (res.data.success) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: res.data.data.newReply.id,
                      replyContent,
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                      user: res.data.data.user,
                    },
                  ],
                }
              : comment
          )
        );
        setReplyInputs((prev) => ({ ...prev, [commentId]: '' }));
        setShowReplyBox((prev) => ({ ...prev, [commentId]: false }));
      }
    } catch (err) {
      console.error('Error submitting reply:', err);
    }
  };

  const toggleFaqItem = (index: number) => {
    setOpenFaqItems((prev) => 
      prev.includes(index) 
        ? prev.filter(item => item !== index) 
        : [...prev, index]
    );
  };

  const toggleInterested = () => {
    setIsInterested(!isInterested);
    setIsInterestedCount(prev => isInterested ? prev - 1 : prev + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-blue-900 p-8 text-center">
    <div className="mb-6">
      <svg className="animate-spin h-16 w-16 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <h3 className="text-2xl font-bold text-white mb-3">Loading Your Content</h3>
    <p className="text-blue-300 max-w-md text-lg">
      Please wait while we retrieve Event materials...
    </p>
  </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-[#030711] to-[#0a1529]">
        <div className="bg-[#111827] p-6 rounded-lg max-w-lg w-full border border-red-800 shadow-lg shadow-red-900/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-red-400" />
            <h2 className="text-xl font-bold text-red-400">Error</h2>
          </div>
          <p className="text-gray-300">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#030711] to-[#0a1529]">
        <div className="bg-[#111827] p-6 rounded-lg border border-yellow-600 shadow-lg shadow-yellow-900/20">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-yellow-400" />
            <p className="text-yellow-400 font-medium">Event not found</p>
          </div>
          <p className="text-gray-300 mt-2">The event you&apos;re looking for might have been removed or doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030711] to-[#0a1529] text-gray-100">
      {/* Hero Section with Banner and Quick Actions */}
      <div className="relative w-full h-80 md:h-[50vh] overflow-hidden">
        {event.banner ? (
          <>
            <Image 
              quality={100}
              
              src={event.banner} 
              alt={event.title} 
              fill 
              className="object-cover " 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030711] via-transparent to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">{event.title}</h2>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    event.status === 'UPCOMING' ? 'bg-green-900 text-green-300' :
                    event.status === 'ONGOING' ? 'bg-blue-900 text-blue-300' :
                    'bg-gray-800 text-gray-300'
                  }`}>
                    {event.status}
                  </span>
                  {event.isDone && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                      Completed
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">{event.title}</h1>
                <p className="text-gray-300 text-sm md:text-base max-w-2xl drop-shadow-md">{event.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
                  onClick={() => {router.push(`/events/register/${eventId}`)}}
                >
                  Register Now
                </button>
                
                <button 
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                    isInterested 
                      ? 'bg-pink-700 hover:bg-pink-800 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                  onClick={toggleInterested}
                >
                  <Heart className={`h-4 w-4 ${isInterested ? 'fill-pink-300' : ''}`} />
                  <span>{isInterestedCount}</span>
                </button>
                
                <button 
                  className="flex items-center justify-center p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                  onClick={() => {/* Share logic */}}
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button 
                className={`px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'details' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'comments' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('comments')}
              >
                Comments ({comments.length})
              </button>
              <button 
                className={`px-4 py-3 font-medium text-sm transition-colors ${
                  activeTab === 'faq' 
                    ? 'text-indigo-400 border-b-2 border-indigo-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('faq')}
              >
                FAQ
              </button>
            </div>

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Event Details */}
                <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
                  <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-4">About This Event</h2>
                  <div className="prose max-w-none text-gray-300">
                    {event.detail.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Prizes Section */}
                {event.prize && (
                  <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="h-6 w-6 text-yellow-400" />
                      <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 w-full">Prizes & Rewards</h2>
                    </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((pos, index) => {
                        const prize = event.prize.find(p => p.position.toString() === pos.toString());
                
                        const styles = [
                          {
                            bg: "from-yellow-900/30",
                            border: "border-yellow-700/50",
                            circleBg: "bg-yellow-500",
                            circleText: "text-yellow-900",
                            text: "text-yellow-300"
                          },
                          {
                            bg: "from-gray-700/30",
                            border: "border-gray-600/50",
                            circleBg: "bg-gray-400",
                            circleText: "text-gray-900",
                            text: "text-gray-300"
                          },
                          {
                            bg: "from-amber-200/30",
                            border: "border-amber-700/50",
                            circleBg: "bg-amber-600",
                            circleText: "text-amber-900",
                            text: "text-amber-300"
                          }
                        ];
                
                        const s = styles[index];
                
                        return (
                          <div
                            key={pos}
                            className={`bg-gradient-to-b ${s.bg} to-transparent p-4 rounded-lg border ${s.border}`}
                          >
                            <div className="flex items-center justify-center mb-3">
                              <div className={`${s.circleBg} ${s.circleText} w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl`}>
                              {pos}
                              </div>
                            </div>
                            <p className={`text-center ${s.text} font-medium`}>
                              {prize ? `${prize.message} (₹${prize.amount})` : "No prize info"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}


                {/* Sponsors Section */}
                {event.sponsors && event.sponsors.length > 0 && (
                  <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
                    <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-4">Sponsors</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {event.sponsors.map((sponsor, index) => (
                        <div 
                          key={index} 
                          className="px-6 py-3 bg-gray-800 rounded-lg border border-gray-700 text-gray-300 font-medium"
                        >
                          {sponsor}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comments Tab */}
            {activeTab === 'comments' && (
              <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-2xl font-bold text-white">Comments & Discussions</h2>
                </div>
                
                {comments.length === 0 ? (
                  <div className="text-center py-12 bg-[#0c1322] rounded-lg border border-gray-800">
                    <p className="text-gray-400 mb-2">No comments yet. Be the first to comment!</p>
                    <p className="text-sm text-gray-500">Share your thoughts about this event</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-b border-gray-700 pb-6">
                        <div className="flex gap-4 mb-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                              {comment.user?.profilePicture ? (
                                <Image 
                                  src={comment.user.profilePicture} 
                                  alt={comment.user.name} 
                                  width={48} 
                                  height={48}
                                  className="object-cover w-full h-full" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-indigo-900 text-indigo-200 font-bold">
                                  {comment.user.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-white">{comment.user.name}</h4>
                              <span className="text-sm text-gray-400">@{comment.user.username}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <span>{comment.user.year} Year • {comment.user.branch}</span>
                              <span>•</span>
                              <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                            </div>
                            <p className="text-gray-300">{comment.comment}</p>
                            <button
                              onClick={() =>
                                setShowReplyBox((prev) => ({
                                  ...prev,
                                  [comment.id]: !prev[comment.id],
                                }))
                              }
                              className="mt-2 text-sm text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              {showReplyBox[comment.id] ? 'Cancel' : 'Reply'}
                            </button>

                            {showReplyBox[comment.id] && (
                              <div className="mt-4 ml-4">
                                <textarea
                                  value={replyInputs[comment.id] || ''}
                                  onChange={(e) =>
                                    setReplyInputs((prev) => ({
                                      ...prev,
                                      [comment.id]: e.target.value,
                                    }))
                                  }
                                  rows={2}
                                  placeholder="Write a reply..."
                                  className="w-full bg-[#0c1322] border border-gray-700 rounded-lg p-2 text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <button
                                  onClick={() => handleReplySubmit(comment.id)}
                                  className="mt-2 px-4 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                                >
                                  Post Reply
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {comment.replies.length > 0 && (
                          <div className="ml-16 space-y-4 mt-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                                    {reply.user.profilePicture ? (
                                      <Image 
                                        src={reply.user.profilePicture} 
                                        alt={reply.user.name} 
                                        width={40} 

                                        height={40}
                                        className="object-cover w-full h-full" 
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-indigo-900 text-indigo-200 font-bold">
                                        {reply.user.name.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-white">{reply.user.name}</h4>
                                    <span className="text-sm text-gray-400">@{reply.user.username}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                    <span>{reply.user.year} Year • {reply.user.branch}</span>
                                    <span>•</span>
                                    <span>{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</span>
                                  </div>
                                  <p className="text-gray-300">{reply.replyContent}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-semibold mb-4 text-white">Leave a Comment</h3>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-200 font-bold">
                        <span>{user ? user.name[0] : "U"}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <textarea 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full bg-[#0c1322] border border-gray-700 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Share your thoughts about this event..."
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={handleCommentSubmit}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          disabled={!commentText.trim()}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-4">
                  {event.faq.map((faq, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
                      <button
                        className="w-full p-4 flex items-center justify-between text-left bg-gray-800 hover:bg-gray-700 transition-colors"
                        onClick={() => toggleFaqItem(index)}
                      >
                        <span className="font-medium text-white">{faq.question}</span>
                        {openFaqItems.includes(index) ? (
                          <ChevronUp className="h-5 w-5 text-indigo-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-indigo-400" />
                        )}
                      </button>
                      
                      {openFaqItems.includes(index) && (
                        <div className="p-4 bg-[#0c1322] text-gray-300">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-indigo-900/20 border border-indigo-800 rounded-lg">
                  <p className="text-gray-300 mb-2">Still have questions?</p>
                  <p className="text-sm text-gray-400">Contact the event organizers at <span className="text-indigo-400">events@college.edu</span> or through the comment section above.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Event Info Cards */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">Event Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-gray-300">{new Date(event.startTime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-gray-300">{new Date(event.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-gray-300">{event.location || 'To be announced'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Team Size</p>
                    <p className="text-gray-300">{event.team || 'Individual'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-indigo-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Registration Fee</p>
                    <div className="flex justify-between">
                      <p className="text-gray-300">Solo: ₹{event.priceSolo}</p>
                      <p className="text-gray-300">Team: ₹{event.priceTeam}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
                  Register Now
                </button>
              </div>
            </div>
            
            {/* Organizers Card */}
            <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">Organized By</h3>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-200 font-bold">
                  <span>{event.organizedBy ? event.organizedBy[0] : 'O'}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{event.organizedBy || 'Event Committee'}</p>
                  <p className="text-sm text-gray-400">{`Contact: ${event.helpEmail}`}</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-gray-300 text-sm">Have questions about this event? Reach out to the organizers directly via email or use the comment section.</p>
              </div>
            </div>
            
            {/* Categories & Tags */}
            <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">Categories & Tags</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Domain</p>
                  <div className="inline-block px-4 py-2 bg-indigo-900/50 text-indigo-300 rounded-lg border border-indigo-800">
                    {event.domain}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Category</p>
                  <div className="inline-block px-4 py-2 bg-purple-900/50 text-purple-300 rounded-lg border border-purple-800">
                    {event.category}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Related Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {event.Tags?.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Similar Events */}
            <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
              <h3 className="text-lg font-bold mb-4 text-white">Similar Events</h3>
              
              {/* <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3 pb-3 border-b border-gray-700 last:border-b-0 last:pb-0">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">
                        {item === 1 ? "Technical Hackathon" : 
                         item === 2 ? "Project Exhibition" : "Paper Presentation"}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {item === 1 ? "Jun 15, 2025" : 
                         item === 2 ? "Jul 3, 2025" : "Jul 10, 2025"}
                      </p>
                    </div>
                  </div>
                ))}
              </div> */}
              
              <Link
               href={"/events"}
              className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm flex items-center justify-center gap-1">
                View All Events <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
          < TimeLines timeLines={event.timeLines} />
          

        
        <div className="mt-12 bg-[#111827] p-6 rounded-lg shadow-lg border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <Star className="h-6 w-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Photo Gallery</h2>
          </div>
          
          {event.photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {event.photos.map((url, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg border border-gray-700">
                  <Image
                    width={1200}
                    height={800}
                    src={url}
                    alt={`Event photo ${idx + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400">Photos from previous events will appear here after the event.</p>
              <p className="text-sm text-gray-500 mt-2">Check back later for updates!</p>
            </div>
          )}
        </div>

      </div>
      
      <div className="mt-16 bg-gradient-to-r from-indigo-900 to-purple-900 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to participate?</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto mb-6">Join us for an exciting event filled with learning, competition, and networking opportunities!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={() => router.push(`/events/register/${eventId}`)}
            className="px-6 py-3 bg-white text-indigo-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Register Now
            </button>
            <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;