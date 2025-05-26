import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPlus, HiClock, HiDocumentText, HiCheckCircle, HiUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';

// --- Custom Tailwind-like color definitions for consistency ---
// These will be used for bg-colors, text-colors etc.
// In a real project, you'd configure these in your tailwind.config.js
// For this example, we'll map them to the closest shades in the JSX.
const appColors = {
  // Main background (lighter than before)
  'bg-main-lighter': 'linear-gradient(135deg, #3d4e60, #4a5c6d)', // Subtle lightened dark grey

  // Primary accent (e.g., for 'Create Task' or 'Active Tasks')
  'primary-base': 'rgb(108, 92, 231)', // Purple-blue
  'primary-dark': 'rgb(88, 72, 211)',

  // Secondary accent (e.g., for 'Messages' or 'Pending Tasks')
  'secondary-base': 'rgb(255, 159, 67)', // Orange
  'secondary-dark': 'rgb(235, 139, 47)',

  // Accent for completed tasks or success
  'accent-base': 'rgb(76, 209, 55)', // Green
  'accent-dark': 'rgb(56, 189, 35)',

  // General text and borders for glassmorphism
  'glass-bg-opacity': '0.3', // Lower opacity for lighter effect
  'glass-border-opacity': '0.15',
  'text-light': '#e0e0e0', // Light text for contrast
  'text-dark-subtle': '#b0b0b0', // Slightly darker subtle text
};

// Card component for dashboard stats
const StatCard = ({ icon: Icon, title, value, bgColor }) => (
  <motion.div
    // Dynamically apply classes based on bgColor prop
    className={`
      ${bgColor} 
      rounded-xl shadow-lg p-6
      bg-opacity-40 backdrop-filter backdrop-blur-lg border border-white border-opacity-[${appColors['glass-border-opacity']}]
      hover:shadow-xl transition-all duration-300 ease-in-out
    `}
    whileHover={{ y: -5, transition: { duration: 0.3 } }} // Increased hover lift
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="flex items-start">
      <div className="p-3 rounded-xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm"> {/* Slightly larger padding, rounded-xl */}
        <Icon className="h-7 w-7 text-white" /> {/* Larger icons */}
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-white opacity-90">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-white">{value}</p> {/* Larger value text */}
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const user = 'client'; // Placeholder for user type
  const [stats] = useState({
    activeTasks: 2,
    pendingTasks: 2,
    completedTasks: 2,
    earnings: 232, // For workers
  });

  return (
    <div className="min-h-screen p-6 sm:p-8 md:p-10 lg:p-12"
      style={{ background: appColors['bg-main-lighter'] }} // Apply the custom background
    >
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <motion.div
          className="mb-10 text-white" // Text white for dark background
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-md">Dashboard</h1>
          <p className="text-md text-gray-300 mt-1">
            {user === 'client'
              ? 'Manage your document tasks and track progress'
              : 'Find tasks and manage your ongoing work'}
          </p>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6" // Increased gap
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {user === 'client' ? (
            <Link
              to="/dashboardLayout/create-task"
              className={`relative px-6 py-5 rounded-2xl overflow-hidden group shadow-lg
                         bg-[${appColors['primary-base']}] text-white
                         hover:bg-[${appColors['primary-dark']}] transition-all duration-300 ease-in-out
                         flex items-center backdrop-filter backdrop-blur-lg border border-white border-opacity-[${appColors['glass-border-opacity']}]`}
            >
              <div className="flex items-center">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <HiPlus className="h-7 w-7" /> {/* Larger icon */}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">Create New Task</h3> {/* Larger text */}
                  <p className="text-sm text-white text-opacity-80">Post a new document task</p>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              to="/dashboardLayout/browse-tasks"
              className={`relative px-6 py-5 rounded-2xl overflow-hidden group shadow-lg
                         bg-[${appColors['primary-base']}] text-white
                         hover:bg-[${appColors['primary-dark']}] transition-all duration-300 ease-in-out
                         flex items-center backdrop-filter backdrop-blur-lg border border-white border-opacity-[${appColors['glass-border-opacity']}]`}
            >
              <div className="flex items-center">
                <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                  <HiDocumentText className="h-7 w-7" /> {/* Larger icon */}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg">Find Tasks</h3>
                  <p className="text-sm text-white text-opacity-80">Browse available document tasks</p>
                </div>
              </div>
            </Link>
          )}

          <Link
            to="/dashboardLayout/messages"
            className={`relative px-6 py-5 rounded-2xl overflow-hidden group shadow-lg
                       bg-[${appColors['secondary-base']}] text-white
                       hover:bg-[${appColors['secondary-dark']}] transition-all duration-300 ease-in-out
                       flex items-center backdrop-filter backdrop-blur-lg border border-white border-opacity-[${appColors['glass-border-opacity']}]`}
          >
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <HiUserGroup className="h-7 w-7" /> {/* Larger icon */}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-lg">Messages</h3>
                <p className="text-sm text-white text-opacity-80">
                  {user === 'client'
                    ? 'Communicate with your workers'
                    : 'Communicate with clients'}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="mb-10">
          <motion.h2
            className="text-2xl font-semibold text-white mb-6 drop-shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            Overview
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* Increased gap */}
            <StatCard
              icon={HiClock}
              title="Active Tasks"
              value={stats.activeTasks}
              bgColor={`bg-[${appColors['primary-base']}]`}
            />
            <StatCard
              icon={HiDocumentText}
              title="Pending Tasks"
              value={stats.pendingTasks}
              bgColor={`bg-[${appColors['secondary-base']}]`}
            />
            <StatCard
              icon={HiCheckCircle}
              title="Completed Tasks"
              value={stats.completedTasks}
              bgColor={`bg-[${appColors['accent-base']}]`}
            />
            {user === 'worker' && (
              <StatCard
                icon={HiPlus}
                title="Total Earnings"
                value={`$${stats.earnings}`}
                bgColor="bg-green-600" // Using a standard Tailwind green for earnings if no specific appColors defined
              />
            )}
          </div>
        </div>

        {/* Tasks in progress */}
        <div className="mb-10">
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-white drop-shadow-sm">Tasks in Progress</h2>
            <Link to="/dashboardLayout/history" className="text-md text-sky-400 hover:text-sky-300 font-medium transition-colors">
              View all →
            </Link>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl shadow-xl text-center
                       bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-[${appColors['glass-border-opacity']}]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <p className="text-gray-400 text-lg">No active tasks found</p>
          </motion.div>
        </div>

        {/* Recent activity */}
        <div>
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-semibold text-white drop-shadow-sm">Recent Activity</h2>
            <Link to="/dashboardLayout/history" className="text-md text-sky-400 hover:text-sky-300 font-medium transition-colors">
              View all →
            </Link>
          </motion.div>

          <motion.div
            className="p-8 rounded-2xl shadow-xl text-center
                       bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-[${appColors['glass-border-opacity']}]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          >
            <p className="text-gray-400 text-lg">No recent activity found</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;