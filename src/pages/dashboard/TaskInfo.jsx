import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../contextStore/task.context";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import axios from "axios";
import { useAuth } from "../../contextStore/auth.context";
import { useMessage } from "../../contextStore/message.context.jsx";
export default function TaskInfo() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const senderId = user?.user?._id;
  const recieverId = useParams().createdBy;
  const { createConversation } = useMessage();
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t._id === taskId);

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Task not found.</p>
      </div>
    );
  }
  // create a conversation with the provider
  const handleConverstaion = async () => {
    // console.log("tasks: ", tasks);
    // console.log("senderId: ", user.user._id, "   recieverId: ", receiverId);
    // call the create conversation function from the message context
    try {
      const response = await createConversation(senderId,recieverId);
        alert("Conversation created successfully");
        console.log("Conversation created successfully:", response.data);
        navigate("/dashboardLayout/messages");
    } catch (error) {
      console.error("Error creating conversation:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex items-center justify-center p-6 ">
      {/* <button
        onClick={() => navigate("/dashboardLayout/browse-tasks")}
        className="mb-6 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition"
      >
        ← Back to Browse Tasks
      </button> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full p-4 bg-inherit border-2 rounded-lg "
      >
        {/* Overview */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={24} className="text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Task Overview</h2>
        </div>
        {/* description */}
        <div className="mb-6 border-gray-200 p-6  border-2 rounded-md">
          <p className="font-semibold">Description:</p>
          <p className="mt-1">{task.description}</p>
        </div>
        <div className="mb-6 border-gray-200  p-6 border-2 rounded-md">
          <p className="font-semibold">Requirements:</p>
          <p className="mt-1">{task.requirements}</p>
        </div>
        <div className=" flex justify-between text-gray-700">
          <div>
            <p className="font-semibold  ">Amount:</p>
            <p className="mt-1 text-green-700">${task.budget}</p>
          </div>

          <div>
            <p className="font-semibold">State:</p>
            <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 ">
              {task.status}
            </p>
          </div>

          <div>
            <p className="font-semibold">Deadline:</p>
            <p className="mt-1 text-red-700">{task.deadline}</p>
          </div>

          <div>
            <p className="font-semibold">Category:</p>
            <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-primary-800">
              {task.category}
            </p>
          </div>

          <div>
            <p className="font-semibold">Tags:</p>
            <p className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {task.tags.join("  ")}
            </p>
          </div>
        </div>
        {/* related documents */}
        <div className="mt-6">
          <p className="font-semibold">Attachments:</p>
          <ul className="mt-1 list-disc list-inside">
            {task.attachments.map((doc, index) => (
              // show the document logo and a download link
              <li key={index} className="flex  flex-col items-start mt-1">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                  alt="Document"
                  className="w-16 h-16 mr-2"
                />
                <a
                  href={doc}
                  download
                  className="text-blue-500 hover:underline"
                >
                  Click
                </a>
              </li>
              
            ))}
          </ul>
        </div>
        {/* navigation section */}
        <div 
        className="flex justify-end space-x-2 items-center mt-6"
        >
          <button
            onClick={() => navigate("/dashboardLayout/browse-tasks")}
            className="mt-6 w-auto px-2 py-1  h-auto bg-blue-400 text-white rounded hover:bg-blue-500 transition"
          >
            ← Back
          </button>
          <button
            onClick={handleConverstaion}
            className="mt-6 w-auto px-2 py-1  h-auto bg-blue-400 text-white rounded hover:bg-blue-500 transition"
          >
            Connect+
          </button>
        </div>
      </motion.div>
    </div>
  );
}
