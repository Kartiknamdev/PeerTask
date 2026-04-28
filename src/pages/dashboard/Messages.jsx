import { useState, useEffect, useRef } from "react";
import { HiSearch, HiChat, HiPaperAirplane, HiChevronLeft, HiDotsVertical, HiPhone, HiVideoCamera, HiChevronDown, HiTrash } from "react-icons/hi";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contextStore/auth.context.jsx";
import { useMessage } from "../../contextStore/message.context.jsx";
import defaultImage from "../../assets/image.png";

const Messages = () => {
  const { user } = useAuth();
  const currentUser = user?.user;
  const messageRef = useRef(null);

  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const hasFetchedConversations = useRef(false);

  const {
    loadConversations,
    loadRecieverDetails,
    loadMessages,
    sendMessage,
    deleteConversation,
    conversations,
    RecieverDetails,
    messages,
  } = useMessage();

  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [shouldScroll, setShouldScroll] = useState(true);

  // Auto scroll only on new messages or conversation change
  useEffect(() => {
    if (shouldScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [messages, selectedConversation, shouldScroll]);

  const enableScroll = () => {
    setShouldScroll(true);
  };

  useEffect(() => {
    const fetchConversations = async () => {
      if (!currentUser?._id || hasFetchedConversations.current) return;
      setLoading(true);
      try {
        await loadConversations(currentUser._id);
        hasFetchedConversations.current = true;
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?._id) fetchConversations();
  }, [currentUser, loadConversations]);

  useEffect(() => {
    const fetchRecieverDetails = async () => {
      if (conversations.length === 0 || (RecieverDetails && RecieverDetails.length > 0)) return;
      try {
        const recieverIds = conversations.map(c => c.recieverId);
        if (recieverIds.length > 0) {
          await loadRecieverDetails(recieverIds);
        }
      } catch (error) {
        console.error("Error fetching receiver details:", error);
      }
    };
    fetchRecieverDetails();
  }, [conversations, loadRecieverDetails]);

  useEffect(() => {
    let firstLoad = true;
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        if (firstLoad) setMessageLoading(true);
        await loadMessages(selectedConversation._id, null, 50);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        if (firstLoad) {
          setMessageLoading(false);
          firstLoad = false;
        }
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => {
      clearInterval(interval);
      firstLoad = true;
    };
  }, [selectedConversation, loadMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const content = messageRef.current.value;
    if (!content.trim() || !selectedConversation) return;

    try {
      await sendMessage(content, selectedConversation._id, selectedConversation.recieverId);
      messageRef.current.value = "";
      enableScroll();
      await loadMessages(selectedConversation._id, null, 50);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const filteredConversations = conversations.filter((c) => {
    const receiver = RecieverDetails.find(r => r._id === c.recieverId);
    const name = receiver?.fullName || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentReceiver = selectedConversation
    ? RecieverDetails.find(r => r._id === selectedConversation.recieverId)
    : null;

  const handleDeleteChat = async () => {
    if (window.confirm("Are you sure you want to delete this chat? This cannot be undone.")) {
      try {
        await deleteConversation(selectedConversation._id);
        setSelectedConversation(null);
        setShowMenu(false);
      } catch (error) {
        alert("Failed to delete chat");
      }
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Messages</h1>
          <p className="text-sm text-gray-500 font-medium">Connect and collaborate with your partners.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex relative">
        
        {/* Conversations Sidebar */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col bg-gray-50/30 ${mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6">
            <div className="relative group">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-white border-none rounded-2xl py-3.5 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-8 h-8 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Chats...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-sm font-medium">No conversations found</p>
              </div>
            ) : (
              filteredConversations.map((c) => {
                const receiver = RecieverDetails.find(r => r._id === c.recieverId);
                const isActive = selectedConversation?._id === c._id;
                return (
                  <motion.button
                    key={c._id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedConversation(c);
                      setMobileShowChat(true);
                      enableScroll();
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all ${
                      isActive 
                        ? 'bg-white shadow-lg shadow-gray-200/50 ring-1 ring-gray-100' 
                        : 'hover:bg-white/50'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={receiver?.photo || defaultImage}
                        alt=""
                        className="w-12 h-12 rounded-2xl object-cover shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className={`text-sm font-bold truncate ${isActive ? 'text-indigo-600' : 'text-gray-900'}`}>
                          {receiver?.fullName || "Anonymous"}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-bold flex-shrink-0 ml-2">
                          {c.updatedAt && format(new Date(c.updatedAt), "h:mm a")}
                        </span>
                      </div>
                      {c.task?.taskTitle && (
                        <div className="mb-1 flex">
                          <span className="text-[9px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md font-bold truncate max-w-full">
                            Task: {c.task.taskTitle}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 line-clamp-1 font-medium">
                        {c.lastMessage?.content || "Click to start chatting"}
                      </p>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col bg-white ${!mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setMobileShowChat(false)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <HiChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <img
                    src={currentReceiver?.photo || defaultImage}
                    alt=""
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover shadow-lg"
                  />
                  <div>
                    <h3 className="text-sm md:text-base font-black text-gray-900 leading-none mb-1">
                      {currentReceiver?.fullName || "Anonymous"}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Online Now</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all hidden sm:flex">
                    <HiPhone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all hidden sm:flex">
                    <HiVideoCamera className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className={`p-2 transition-all rounded-xl ${showMenu ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}
                  >
                    <HiDotsVertical className="w-5 h-5" />
                  </button>

                  <AnimatePresence>
                    {showMenu && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setShowMenu(false)} />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-30"
                        >
                          <button
                            onClick={handleDeleteChat}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <HiTrash className="w-4 h-4" />
                            Delete Chat
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Task Context Bar */}
              {selectedConversation.task && (
                <div className="border-b border-indigo-100/50 bg-indigo-50/30">
                  <button 
                    onClick={() => setShowTaskDetails(!showTaskDetails)}
                    className="w-full px-6 py-3 flex items-center justify-between group hover:bg-indigo-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <HiChat className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1">Working on</p>
                        <h4 className="text-xs font-bold text-gray-900">{selectedConversation.task.taskTitle}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Budget</p>
                        <p className="text-xs font-black text-indigo-600">₹{selectedConversation.task.budget}</p>
                      </div>
                      <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showTaskDetails ? 'rotate-180 text-indigo-600' : ''}`} />
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {showTaskDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-17 pb-4 pl-[72px] pr-6">
                          <p className="text-xs text-gray-600 font-medium leading-relaxed bg-white/50 p-4 rounded-2xl border border-indigo-100/30">
                            {selectedConversation.task.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
                <AnimatePresence initial={false}>
                  {messages.map((m, idx) => {
                    const isMe = m.sender === currentUser?._id;
                    const showAvatar = idx === 0 || messages[idx-1].sender !== m.sender;

                    return (
                      <motion.div
                        key={m._id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        {!isMe && (
                          <div className="w-8 h-8 flex-shrink-0">
                            {showAvatar && (
                              <img src={currentReceiver?.photo || defaultImage} alt="" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
                            )}
                          </div>
                        )}
                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                          <div className={`px-4 py-3 max-w-[85%] md:max-w-[70%] shadow-sm ${
                            isMe 
                              ? 'bg-indigo-600 text-white rounded-t-2xl rounded-bl-2xl rounded-br-none' 
                              : 'bg-white text-gray-800 rounded-t-2xl rounded-br-2xl rounded-bl-none border border-gray-100'
                          }`}>
                            <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                          </div>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1.5 px-1">
                            {format(new Date(m.createdAt), "h:mm a")}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 bg-white border-t border-gray-100">
                <form 
                  onSubmit={handleSendMessage}
                  className="relative flex items-center gap-3"
                >
                  <div className="relative flex-1">
                    <input
                      ref={messageRef}
                      type="text"
                      placeholder="Type your message..."
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-6 pr-12 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
                    />
                    <button 
                      type="button" 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <HiDotsVertical />
                    </button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center"
                  >
                    <HiPaperAirplane className="w-5 h-5 rotate-90" />
                  </motion.button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/20">
              <div className="w-32 h-32 bg-indigo-50 rounded-[3rem] flex items-center justify-center mb-8 animate-pulse">
                <HiChat className="w-16 h-16 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Your Conversations</h3>
              <p className="text-gray-500 max-w-xs font-medium">Select a partner from the sidebar to start collaborating on your projects.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
