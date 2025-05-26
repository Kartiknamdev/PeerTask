import { createContext, useContext, useState, useMemo } from "react";
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
  const createConversation = async (senderId, recieverId) => {
    try {
      alert("Creating conversation");
      const response = await axios.post(
        `${BACKEND_URL}/messages_route/create-conversation`,
        { senderId, recieverId },
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
  };
  // Load all conversations
  const loadConversations = async function (userId) {
    try {
      // console.log("Loading conversations", userId,accessToken);
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
        setConversations(conversationList);
        // console.log("Conversations loaded:", conversationList);
      }
      return conversationList;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  };

  const loadRecieverDetails = async (recieverIds) => {
    try {
      alert("Loading receiver details");
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
        alert("Receiver details loaded");
        // console.log("ReceiverDetails loaded:", details);
        setRecieverDetails(details);
      }
      return details;
    } catch (error) {
      console.error("Error fetching other user details:", error);
      throw error;
    }
  };

  // Load messages
  const loadMessages = async (conversationId, timeStamp=null, limit = 20) => {
    try {
      setFetchedMessages(true);
       const response = await axios.post(
        `${BACKEND_URL}/messages_route/get-messages`,
        {
          senderId:user?.user?._id,
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
        // console.log("messages loaded:", messagesList);
        setMessages(messagesList);
      }
      return messagesList;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  };

  // Send a message
  const sendMessage = async (content, conversationId, recieverId) => {
    try {
      const senderId = user?.user?._id;
      // alert("sending message");
      // console.log(
      //   content,
      //   "\n",
      //   conversationId,
      //   "\n",
      //   senderId,
      //   "\n",
      //   recieverId,
      //   "\n"
      // );
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
      if (response.status === 201) {
        // console.log("message sent: ", response.data?.data);
      }
      return response.data?.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

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
    }),
    [conversations, RecieverDetails, messages, read]
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
