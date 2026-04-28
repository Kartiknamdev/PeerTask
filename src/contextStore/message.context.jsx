import { createContext, useContext, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./auth.context";
import { BACKEND_URL } from "../../constant";

// Create context
const messageContext = createContext();

// Provider component
export const MessageProvider = ({ children }) => {
  const { user } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [RecieverDetails, setRecieverDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const [FetchedMessages, setFetchedMessages] = useState(false);
  const [read, setRead] = useState(false);

  // Create a conversation
  const createConversation = useCallback(async (senderId, recieverId, taskId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/messages_route/create-conversation`,
        { senderId, recieverId, taskId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      return response.data?.data;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  }, [user?.accessToken]);

  // Load all conversations
  const loadConversations = useCallback(async (userId) => {
    if (!userId || !user?.accessToken) return [];
    try {
      const response = await axios.get(
        `${BACKEND_URL}/messages_route/get-all-conversations?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      const conversationList = response.data?.data;
      if (response.status === 200 && Array.isArray(conversationList)) {
        setConversations(prev => {
          if (JSON.stringify(prev) === JSON.stringify(conversationList)) return prev;
          return conversationList;
        });
      }
      return conversationList;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }, [user?.accessToken]);

  const loadRecieverDetails = useCallback(async (recieverIds) => {
    if (!recieverIds || recieverIds.length === 0 || !user?.accessToken) return [];
    try {
      const response = await axios.post(
        `${BACKEND_URL}/messages_route/get-all-reciever-details`,
        { recieverIds },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      const details = response.data?.data;
      if (response.status === 200 && Array.isArray(details)) {
        setRecieverDetails(prev => {
          if (JSON.stringify(prev) === JSON.stringify(details)) return prev;
          return details;
        });
      }
      return details;
    } catch (error) {
      console.error("Error fetching other user details:", error);
      throw error;
    }
  }, [user?.accessToken]);

  // Load messages
  const loadMessages = useCallback(async (conversationId, timeStamp = null, limit = 20) => {
    if (!conversationId || !user?.accessToken) return [];
    try {
      setFetchedMessages(true);
      const response = await axios.post(
        `${BACKEND_URL}/messages_route/get-messages`,
        {
          senderId: user?.user?._id,
          conversationId,
          timeStamp,
          limit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      const messagesList = response.data?.data;
      if (response.status === 200 && Array.isArray(messagesList)) {
        // Only update if messages have actually changed to prevent flashing
        setMessages(prev => {
          if (JSON.stringify(prev) === JSON.stringify(messagesList)) return prev;
          return messagesList;
        });
      }
      return messagesList;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }, [user?.accessToken, user?.user?._id]);

  // Send a message
  const sendMessage = useCallback(async (content, conversationId, recieverId) => {
    if (!content || !conversationId || !user?.accessToken) return null;
    try {
      const senderId = user?.user?._id;
      const response = await axios.post(
        `${BACKEND_URL}/messages_route/send-message`,
        { content, conversationId, senderId, recieverId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      return response.data?.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }, [user?.accessToken, user?.user?._id]);

  // Delete a conversation
  const deleteConversation = useCallback(async (conversationId) => {
    if (!conversationId || !user?.accessToken) return;
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/messages_route/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setConversations(prev => prev.filter(c => c._id !== conversationId));
      }
      return response;
    } catch (error) {
      console.error("Error deleting conversation:", error);
      throw error;
    }
  }, [user?.accessToken]);

  // Context value
  const contextValue = useMemo(
    () => ({
      createConversation,
      conversations,
      RecieverDetails,
      messages,
      FetchedMessages,
      read,
      loadConversations,
      loadRecieverDetails,
      loadMessages,
      sendMessage,
      deleteConversation,
    }),
    [
      createConversation,
      conversations,
      RecieverDetails,
      messages,
      FetchedMessages,
      read,
      loadConversations,
      loadRecieverDetails,
      loadMessages,
      sendMessage,
      deleteConversation
    ]
  );

  return (
    <messageContext.Provider value={contextValue}>
      {children}
    </messageContext.Provider>
  );
};

// Hook to use the message context
export const useMessage = () => {
  const context = useContext(messageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
