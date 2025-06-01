import { useState, useEffect, useRef } from "react";
import { HiSearch, HiChat } from "react-icons/hi";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useAuth } from "../../contextStore/auth.context.jsx";
import { useMessage } from "../../contextStore/message.context.jsx";
import defaultImage from "../../assets/image.png";

const Messages = () => {
  const { user } = useAuth();
  const currentUser = user?.user;
  const messageRef = useRef(null);

  const {
    loadConversations,
    loadRecieverDetails,
    loadMessages,
    sendMessage,
    conversations,
    RecieverDetails,
    FetchedMessages,
    messages,
  } = useMessage();

  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [shouldScroll, setShouldScroll] = useState(true);

  const messagesEndRef = useRef(null);

  // Auto scroll only on new messages or conversation change
  useEffect(() => {
    if (shouldScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [messages, selectedConversation]);

  // Enable scroll on new message send
  const enableScroll = () => {
    setShouldScroll(true);
  };

  // Load all conversations once after user is available
  useEffect(() => {
    const fetchConversations = async () => {
      if (conversations.length > 0 || !currentUser?._id) return; // Prevent re-fetching
      // Check if conversations are already loaded
      setLoading(true);
      try {
        const conversationList = await loadConversations(currentUser._id);
        if (conversationList?.length > 0) {
          setSelectedConversation(conversationList[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser?._id) fetchConversations();
  }, [currentUser]);

  // Load receiver details only once when conversations are available
  useEffect(() => {
    // Check if receiver details are already fetched Check if conversations are available
    const fetchRecieverDetails = async () => {
      if (RecieverDetails.length > 0 || conversations.length === 0) return;
      setLoading(true);
      try {
        const recieverIds = conversations.map(
          (conversation) => conversation.recieverId
        );
        if (recieverIds.length > 0) {
          await loadRecieverDetails(recieverIds);
         }
      } catch (error) {
        console.error("Error fetching receiver details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecieverDetails();
  }, [conversations, RecieverDetails]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    let firstLoad = true;

    const fetchMessages = async () => {
      if (!selectedConversation) return;
      
      try {
        // Only show loading on first load of a conversation
        if (firstLoad) {
          setMessageLoading(true);
        }
        await loadMessages(selectedConversation._id, null, 20);
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

    // Set up polling interval for real-time updates
    const interval = setInterval(fetchMessages, 3000);

    return () => {
      clearInterval(interval);
      firstLoad = true; // Reset for next conversation selection
    };
  }, [selectedConversation, loadMessages]);

  // Select a conversation
  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setNewMessage("");
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageToSend = messageRef.current.value;
    if (!messageToSend.trim()) return;

    try {
      // Send message first
      await sendMessage(
        messageToSend,
        selectedConversation._id,
        selectedConversation.recieverId
      );
      // Clear input field
      messageRef.current.value = "";
      // Immediately load the new messages
      await loadMessages(selectedConversation._id, null, 20);
      // Scroll to bottom after sending
      enableScroll();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Filter conversations based on search term
  // conversation:{
  //          conversationId,
  //           receiverId,
  //        }
  const filteredConversations = conversations.filter((conversation) => {
    if (!Array.isArray(RecieverDetails)) return false;

    const receiver = RecieverDetails.find(
      (receiverDetail) => receiverDetail._id === conversation.recieverId
    );

    const name = receiver?.fullName || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Find current selected receiver details from RecieverDetails array
  const currentReceiver = selectedConversation
    ? RecieverDetails.find(
        (RecieverDetail) =>
          RecieverDetail._id === selectedConversation.recieverId
      )
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-sm text-gray-600 mt-1">
        
        </p>
      </div>      <div className="bg-gradient-to-r from-white to-gray-100/90 backdrop-blur-sm rounded-xl shadow-card max-h-screen h-screen flex flex-col sm:flex-row overflow-hidden">
  {/* Sidebar */}
  <div className="w-full sm:w-1/3 md:w-1/4 bg-gray-50 border-r border-gray-200 flex-shrink-0 flex flex-col">
    {/* Search */}
    <div className="p-4 border-b border-gray-200">
      <div className="relative rounded-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="form-input pl-10 text-sm w-full"
          placeholder="Search conversations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* Conversations */}
    <div className="flex-1 overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin h-6 w-6 border-2 border-gray-200 border-l-primary-600 rounded-full"></div>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No conversations found</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredConversations.map((conversation) => {
            const receiver = RecieverDetails.find(
              (r) => r._id === conversation.recieverId
            );
            const photo = receiver?.photo || defaultImage;
            const name = receiver?.fullName || "Unknown";

            return (
              <motion.li key={conversation._id} whileTap={{ backgroundColor: "#F3F4F6" }}>
                <button
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 focus:outline-none ${
                    selectedConversation?._id === conversation._id ? "bg-gray-100" : ""
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="flex items-center">
                    <img
                      src={photo}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                        {conversation.lastMessage && (
                          <p className="text-xs text-gray-500">
                            {format(new Date(conversation.lastMessage), "h:mm a")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        {conversation.lastMessage ? (
                          <p className="text-xs text-gray-500 truncate">
                            {conversation.senderId === currentUser._id ? "You: " : ""}
                            {conversation.lastMessage?.content || "No messages yet"}
                          </p>
                        ) : (
                          <p className="text-xs text-black">No messages yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  </div>

  {/* Chat Panel */}
  <div className="flex-1 flex flex-col h-full">
    {selectedConversation ? (
      <>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center">
          <img
            src={currentReceiver?.photo}
            alt={currentReceiver?.fullName || "Unknown"}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{currentReceiver?.fullName || "Unknown"}</p>
            <p className="text-xs text-gray-500">
              {currentReceiver?.updatedAt
                ? format(new Date(currentReceiver.updatedAt), "MMM d, yyyy")
                : "No activity"}
            </p>
          </div>
        </div>        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          {messages.map((message) => {
              const isCurrentUser = message.sender === currentUser._id;
            return (
              <div
                key={message._id}
                className={`flex items-baseline ${
                  isCurrentUser ? "justify-end" : "justify-start"
                } mb-2`}
              >
                {!isCurrentUser && (
                  <img
                    src={currentReceiver?.photo}
                    alt={currentReceiver?.fullName || "Unknown"}
                    className="h-8 w-8 rounded-full object-cover mr-2"
                  />
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isCurrentUser
                      ? "bg-primary-400 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 text-right text-gray-500">
                    {format(new Date(message.updatedAt), "h:mm a")}
                  </p>
                </div>
                {isCurrentUser && (
                  <img
                    src={currentUser?.photo}
                    alt={currentUser?.fullName || "You"}
                    className="h-8 w-8 rounded-full object-cover ml-2"
                  />
                )}              </div>
            );          })}
          <div ref={messagesEndRef} />
        </div>        {/* Input */}        <div className="p-4 border-t border-gray-200 bg-white text-black">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              className="form-input flex-1"
              placeholder="Type a message..."
              ref={messageRef}
            />
            <button 
              type="submit" 
              className="ml-3 btn-primary"
            >
              Send
            </button>
          </form>
        </div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center px-4">
        <HiChat className="h-16 w-16 text-gray-300 mb-4" />
        <p className="mb-1">No conversation selected</p>
        <p className="text-sm">Select a conversation from the list to start chatting</p>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Messages;
// This code is a React component for a messaging dashboard. It includes features like searching conversations, displaying messages, and sending new messages. The component uses hooks for state management and effects for data fetching. The UI is styled using Tailwind CSS and includes loading states and error handling.
