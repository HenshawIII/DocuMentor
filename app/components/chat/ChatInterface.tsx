'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/app/contexts/UserContext';
import supabase from '@/app/supabase';
import Navbar from '@/app/New/Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Document {
  name: string;
  id: string;
}

export default function ChatInterface() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userDocs, setUserDocs] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isLoadingDocs, setIsLoadingDocs] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate storage key for messages
  const getMessagesKey = (userId: string, docId: string) => `chat_messages_${userId}_${docId}`;
  const getSelectedDocKey = (userId: string) => `selected_doc_${userId}`;

  // Save messages to localStorage
  const saveMessages = (userId: string, docId: string, messages: Message[]) => {
    try {
      localStorage.setItem(getMessagesKey(userId, docId), JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  };

  // Load messages from localStorage
  const loadMessages = (userId: string, docId: string): Message[] => {
    try {
      const saved = localStorage.getItem(getMessagesKey(userId, docId));
      if (saved) {
        const messages = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading messages from localStorage:', error);
    }
    return [];
  };

  // Save selected document to localStorage
  const saveSelectedDoc = (userId: string, docId: string) => {
    try {
      localStorage.setItem(getSelectedDocKey(userId), docId);
    } catch (error) {
      console.error('Error saving selected doc to localStorage:', error);
    }
  };

  // Load selected document from localStorage
  const loadSelectedDoc = (userId: string): string | null => {
    try {
      return localStorage.getItem(getSelectedDocKey(userId));
    } catch (error) {
      console.error('Error loading selected doc from localStorage:', error);
      return null;
    }
  };

  // Fetch user documents on component mount
  useEffect(() => {
    const fetchUserDocs = async () => {
      if (!user) {
        setIsLoadingDocs(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('UserProfile')
          .select('docs')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user docs:', error);
        } else {
          setUserDocs(data?.docs || []);
          
          // Load previously selected document or default to first
          const savedDocId = loadSelectedDoc(user.id);
          if (savedDocId && data?.docs) {
            const savedDoc = data.docs.find((doc: Document) => doc.id === savedDocId);
            if (savedDoc) {
              setSelectedDoc(savedDoc);
              // Load messages for the selected document
              const savedMessages = loadMessages(user.id, savedDocId);
              setMessages(savedMessages);
            } else {
              // Saved document no longer exists, use first available
              if (data.docs.length > 0) {
                setSelectedDoc(data.docs[0]);
                const savedMessages = loadMessages(user.id, data.docs[0].id);
                setMessages(savedMessages);
              }
            }
          } else if (data?.docs && data.docs.length > 0) {
            // No saved document, use first available
            setSelectedDoc(data.docs[0]);
            const savedMessages = loadMessages(user.id, data.docs[0].id);
            setMessages(savedMessages);
          }
        }
      } catch (error) {
        console.error('Error fetching user docs:', error);
      } finally {
        setIsLoadingDocs(false);
      }
    };

    fetchUserDocs();
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleDocumentSelect = (doc: Document) => {
    if (!user) return;
    
    setSelectedDoc(doc);
    saveSelectedDoc(user.id, doc.id);
    
    // Load messages for the selected document
    const savedMessages = loadMessages(user.id, doc.id);
    setMessages(savedMessages);
  };

  const handleClearChat = () => {
    if (!user || !selectedDoc) return;
    
    // Clear messages from state
    setMessages([]);
    
    // Clear messages from localStorage
    localStorage.removeItem(getMessagesKey(user.id, selectedDoc.id));
    
    // Close modal
    setShowClearModal(false);
  };

  const handleClearChatCancel = () => {
    setShowClearModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !user || !selectedDoc) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      if (user && selectedDoc) {
        saveMessages(user.id, selectedDoc.id, newMessages);
      }
      return newMessages;
    });
    setInputMessage('');
    setIsLoading(true);

    try {
        // console.log(user.id, selectedDoc.id, inputMessage);
              const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/user/chat`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        body: JSON.stringify({
          user_id: user.id,
          document_id: selectedDoc.id,
          question: inputMessage,
        }),
      });

    //   console.log('Response headers:', response.headers);
    //   console.log('Response status:', response.status);
    //   console.log('Set-Cookie header:', response.headers.get('set-cookie'));
      const data = await response.json();
    //   console.log('Response data:', data);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        if (user && selectedDoc) {
          saveMessages(user.id, selectedDoc.id, newMessages);
        }
        return newMessages;
      });
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, there was an error processing your request.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        if (user && selectedDoc) {
          saveMessages(user.id, selectedDoc.id, newMessages);
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex items-center justify-center relative xl:pt-28 py-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-semibold text-white mb-4">Please Login</h1>
            <p className="text-gray-400 mb-6">You need to be logged in to upload documents.</p>
            <a href="/login" className="inline-block bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Go to Login
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Desktop Navigation - Only visible on large screens */}
      <div className="hidden lg:block relative z-10">
        {/* <Navbar /> */}
      </div>

      {/* Mobile Header with Hamburger - Only visible on small screens */}
      <div className="lg:hidden bg-white/10 backdrop-blur-lg border-b border-white/20 px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">RAG Chat</h1>
              {selectedDoc && (
                <p className="text-sm text-gray-300 truncate">Chatting with: {selectedDoc.name.slice(0, 7)}...</p>
              )}
            </div>
          </div>
          
          {selectedDoc && messages.length > 0 && (
            <button
              onClick={() => setShowClearModal(true)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md transition-colors"
              title="Clear chat history"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex relative z-10 ">
        {/* Desktop Sidebar - Only visible on large screens */}
        <div className="hidden lg:flex w-80 bg-white/10 backdrop-blur-lg border-r border-white/20 flex-col">
          <div className="p-4 border-b border-white/20">
            <h2 className="text-lg font-semibold text-white">Your Documents</h2>
            <p className="text-sm text-gray-300 mt-1">Select a document to chat with</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {isLoadingDocs ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                <span className="ml-2 text-gray-300">Loading documents...</span>
              </div>
            ) : userDocs.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-gray-400 text-sm">No documents available</p>
                <p className="text-gray-500 text-xs mt-1">Upload documents to start chatting</p>
              </div>
            ) : (
              <div className="space-y-2">
                {userDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleDocumentSelect(doc)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                      selectedDoc?.id === doc.id
                        ? 'bg-purple-500/20 border border-purple-400/30 text-white'
                        : 'hover:bg-white/10 border border-transparent text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">📄</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400 truncate">ID: {doc.id}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-70"
              onClick={() => setIsSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="absolute left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-2xl">
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Your Documents</h2>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 rounded-md hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-300 mt-1">Select a document to chat with</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {isLoadingDocs ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                    <span className="ml-2 text-gray-300">Loading documents...</span>
                  </div>
                ) : userDocs.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📄</div>
                    <p className="text-gray-400 text-sm">No documents available</p>
                    <p className="text-gray-500 text-xs mt-1">Upload documents to start chatting</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {userDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          handleDocumentSelect(doc);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                          selectedDoc?.id === doc.id
                            ? 'bg-purple-500/20 border border-purple-400/30 text-white'
                            : 'hover:bg-white/10 border border-transparent text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">📄</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{doc.name}</p>
                            <p className="text-xs text-gray-400 truncate">ID: {doc.id}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className='absolute bottom-6 left-4 w-full flex items-center space-x-6 text-lg'>
                <Link href="/" className='text-white hover:text-gray-300 transition-colors'>Home</Link>
                <Link href="/documents" className='text-white hover:text-gray-300 transition-colors'>Docs</Link>
               
              </div>
            </div>
          </div>
        )}

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Header - Only visible on large screens */}
          <div className="hidden lg:block bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                {selectedDoc ? (
                  <div>
                    <h1 className="text-xl font-semibold text-white">
                      Chat with: {selectedDoc.name}
                    </h1>
                    <p className="text-sm text-gray-300 mt-1">
                      Ask questions about this document
                    </p>
                  </div>
                ) : (
                  <div className=''>
                    <h1 className="text-xl font-semibold text-white">Select a Document</h1>
                    <p className="text-sm text-gray-300 mt-1">
                      Choose a document from the sidebar to start chatting
                    </p>
                  </div>
                )}
              </div>

              <div className='flex items-center space-x-4 '>
                <Link href="/" className='text-white hover:text-gray-300 transition-colors'>Home</Link>
                <Link href="/docs" className='text-white hover:text-gray-300 transition-colors'>Docs</Link>
             
               
              </div>
              
              {selectedDoc && messages.length > 0 && (
                <button
                  onClick={() => setShowClearModal(true)}
                  className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors flex items-center space-x-2"
                  title="Clear chat history"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-sm font-medium">Clear Chat</span>
                </button>
              )}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-20">
            {!selectedDoc ? (
              <div className="text-center text-gray-400 mt-8">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium mb-2 text-white">Select a document</h3>
                <p className="text-sm">Choose a document from the sidebar to start chatting</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium mb-2 text-white">Start a conversation</h3>
                <p className="text-sm">Ask questions about {selectedDoc.name}</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-[#8F72D0] to-[#347FB0] text-white'
                        : 'bg-white/10 backdrop-blur-lg text-white border border-white/20'
                    }`}
                  >
                    <div className={`text-sm ${message.isUser ? 'text-white' : 'text-white'}`}>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Custom styling for different markdown elements
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="text-sm">{children}</li>,
                          code: ({ children, className }) => (
                            <code className={`px-1 py-0.5 rounded text-xs font-mono ${
                              message.isUser 
                                ? 'bg-white/20 text-white' 
                                : 'bg-white/20 text-white'
                            }`}>
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className={`p-2 rounded text-xs font-mono overflow-x-auto ${
                              message.isUser 
                                ? 'bg-white/20 text-white' 
                                : 'bg-white/20 text-white'
                            }`}>
                              {children}
                            </pre>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className={`border-l-4 pl-3 italic ${
                              message.isUser 
                                ? 'border-white/40' 
                                : 'border-white/40'
                            }`}>
                              {children}
                            </blockquote>
                          ),
                          a: ({ children, href }) => (
                            <a 
                              href={href} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`underline hover:no-underline ${
                                message.isUser 
                                  ? 'text-white/80 hover:text-white' 
                                  : 'text-purple-300 hover:text-purple-200'
                              }`}
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-lg text-white border border-white/20 px-4 py-2 rounded-xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 p-4 fixed bottom-0 w-full">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={selectedDoc ? `Ask a question about ${selectedDoc.name}...` : "Select a document to chat..."}
                className="flex-1 p-3 bg-white/5 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                disabled={isLoading || !selectedDoc}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading || !selectedDoc}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                  inputMessage.trim() && !isLoading && selectedDoc
                    ? 'bg-gradient-to-r from-[#8F72D0] to-[#347FB0] hover:from-[#7A5FBA] hover:to-[#2D6BA0] text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Clear Chat Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="text-red-400 mr-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Clear Chat History</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to clear the chat history for <strong className="text-white">"{selectedDoc?.name}"</strong>? 
              This action cannot be undone and will remove all messages from this conversation.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleClearChatCancel}
                className="flex-1 px-4 py-3 border border-white/30 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleClearChat}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 