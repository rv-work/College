"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import toast, { Toaster } from "react-hot-toast"; // 🔥 Added Toast
import {
  UploadCloud,
  FileText,
  Send,
  Bot,
  User,
  Loader2,
  RefreshCw,
  FileUp
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function PdfChatPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfId, setPdfId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [ready, setReady] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingChat]);

  const handleUploadPdf = async () => {
    if (!selectedFile) return;

    try {
      setLoadingPdf(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/rag/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Upload failed");
        return;
      }

      setPdfId(data.pdfId);
      setReady(true);
      toast.success("PDF uploaded successfully!");

      setMessages([
        {
          role: "assistant",
          text: `PDF uploaded successfully. Ask me anything from this PDF.`,
        },
      ]);
    } catch (error) {
      // 🔥 Type-safe error handling
      if (error instanceof Error) {
        console.log("Upload Error:", error.message);
      } else {
        console.log("Upload Error:", String(error));
      }
      toast.error("Failed to upload PDF");
    } finally {
      setLoadingPdf(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !pdfId) return;

    const userMessage = inputMessage;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInputMessage("");
    setLoadingChat(true);

    try {
      const response = await fetch("/api/rag/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdfId,
          question: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Server error");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch (error) {
      // 🔥 Type-safe error handling for 'unknown' type
      let errorMsg = "";

      if (error instanceof Error) {
        errorMsg = error.message;
        console.log("Chat Error:", errorMsg);
      } else {
        errorMsg = String(error);
        console.log("Chat Error:", errorMsg);
      }

      // Toast logic based on parsed error message
      if (errorMsg.includes("503") || errorMsg.includes("UNAVAILABLE")) {
        toast.error("AI is currently experiencing high demand. Please try again later.", {
          style: { background: '#1f2937', color: '#fff', border: '1px solid #ef4444' }
        });
      } else {
        toast.error("Something went wrong. Try again.", {
          style: { background: '#1f2937', color: '#fff', border: '1px solid #ef4444' }
        });
      }
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030711] text-gray-100 flex items-center justify-center p-4 sm:p-6 selection:bg-blue-500/30">
      {/* 🔥 Toast Container Added Here */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">
        {!ready ? (
          <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 tracking-tight text-white">
              Chat with your PDF
            </h1>
            <p className="text-gray-400 text-center mb-8 text-sm md:text-base">
              Upload any document and instantly ask questions, extract summaries, and find information.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-700 hover:border-blue-500/50 rounded-3xl bg-gray-900/50 hover:bg-gray-800/50 transition-all cursor-pointer overflow-hidden"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-200 truncate max-w-[250px] sm:max-w-xs">
                    {selectedFile.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-lg font-medium text-gray-300">
                    Click to browse your files
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports PDF documents up to 50MB
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleUploadPdf}
              disabled={!selectedFile || loadingPdf}
              className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-semibold text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loadingPdf ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Document...
                </>
              ) : (
                <>
                  <FileUp className="w-5 h-5" />
                  Start Chatting
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-[#111827]/90 backdrop-blur-md border border-gray-800 rounded-3xl shadow-2xl h-[85vh] flex flex-col overflow-hidden">
            <div className="border-b border-gray-800 bg-gray-900/50 p-4 sm:p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-white leading-tight truncate max-w-[200px] sm:max-w-md">
                    {selectedFile?.name || "PDF Document"}
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-400 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    AI Assistant Active
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setReady(false);
                  setSelectedFile(null);
                  setPdfId("");
                  setMessages([]);
                }}
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors flex items-center gap-2 text-sm font-medium border border-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">New PDF</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth custom-scrollbar">
              {messages.map((message, index) => {
                const isUser = message.role === "user";
                return (
                  <div
                    key={index}
                    className={`flex items-end gap-3 ${isUser ? "justify-end" : "justify-start"
                      }`}
                  >
                    {!isUser && (
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mb-1">
                        <Bot className="w-4 h-4 text-blue-400" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 leading-relaxed shadow-sm text-sm sm:text-base ${isUser
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm"
                        : "bg-gray-800 border border-gray-700 text-gray-200 rounded-bl-sm"
                        }`}
                    >
                      <ReactMarkdown
                        components={{
                          p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                          ul: (props) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                          ol: (props) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                          strong: (props) => <strong className="font-semibold text-white" {...props} />,
                          a: (props) => <a className="text-blue-400 hover:underline" {...props} />,
                          code: (props) => <code className="bg-gray-900 px-1.5 py-0.5 rounded text-sm text-blue-300" {...props} />,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>

                    {isUser && (
                      <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mb-1">
                        <User className="w-4 h-4 text-purple-400" />
                      </div>
                    )}
                  </div>
                );
              })}

              {loadingChat && (
                <div className="flex items-end gap-3 justify-start animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mb-1">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-bl-sm px-5 py-4 text-gray-400 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 sm:p-5 bg-gray-900/50 border-t border-gray-800">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask a question about your PDF..."
                  className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />

                <button
                  onClick={sendMessage}
                  disabled={loadingChat || !inputMessage.trim()}
                  className="px-5 sm:px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <span className="hidden sm:inline">Send</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}