import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth.context";
import axios from "axios";
import { BACKEND_URL } from "../../constant";
// const BACKEND_URL: "http://localhost:3000/api/v1"
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [done, setDone] = useState(false);
  const [shouldFetchTasks, setShouldFetchTasks] = useState(true);

  // Submit a new task
  const submitTask = async (taskDetails) => {
    // for(const item of taskDetails){
    //   console.log(item)
    // }
    try {
      const response = await axios.post(
        `${BACKEND_URL}/tasks/create-task`,
        taskDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        // console.log("Task created successfully:", response.data);
        setDone(true);
        setShouldFetchTasks(true); // trigger re-fetch after submission
      }

      return response;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  // Fetch all tasks for the user
  const fetchBrowseTasks = async (userId) => {
    if (shouldFetchTasks && userId && user?.accessToken) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/tasks/browse-task?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        const fetchedTasks = response.data?.data;
        // console.log("Browse tasks response:", fetchedTasks);

        if (Array.isArray(fetchedTasks)) {
          setTasks(fetchedTasks);
          if (fetchedTasks.length === 0) {
            setShouldFetchTasks(false);
          }
          return fetchedTasks;
        } else {
          console.warn("Expected an array, got:", fetchedTasks);
          return [];
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
      }
    } else {
      // Return cached tasks if no fetch needed
      return tasks;
    }
  };

  // Auto-fetch tasks when shouldFetchTasks is true and user ID is available
  useEffect(() => {
    if (shouldFetchTasks && user?.user?._id) {
      fetchBrowseTasks(user.user._id);
      setShouldFetchTasks(false);
    }
  }, [shouldFetchTasks, user]);

  // Optional: reset `done` after some time or after UI reacts
  // For example, after a successful submit, reset done after 2 seconds
  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => setDone(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [done]);

  const value = {
    submitTask,
    fetchBrowseTasks,
    shouldFetchTasks,
    tasks,
    setTasks,
    done,
    setDone,
    setShouldFetchTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook for accessing task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
