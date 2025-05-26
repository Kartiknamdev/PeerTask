import React from 'react';
import { FaUserPlus, FaClipboardList, FaSearch, FaComments, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import motion

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="w-8 h-8" />,
      title: "Sign Up / Log In",
      description: "Create your profile to become a task giver or task doer."
    },
    {
      icon: <FaClipboardList className="w-8 h-8" />,
      title: "Post a Task",
      description: "Fill out task details including title, description, deadline, and budget or return favor."
    },
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Browse Tasks",
      description: "As a task doer, browse available tasks by category, skills, or deadline."
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: "Accept & Communicate",
      description: "Once interested, accept a task and chat with the task poster to clarify requirements."
    },
    {
      icon: <FaCheckCircle className="w-8 h-8" />,
      title: "Submit & Get Rewarded",
      description: "Upload the completed work before deadline. Once approved, you'll receive the promised payment or favor."
    }
  ];

  // Framer Motion variants for common animations
  const fadeInRise = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Overview Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 drop-shadow-lg">
          How PeerTask Works
        </h1>
        <motion.div
          className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 border border-gray-700/30
                     shadow-2xl backdrop-filter backdrop-blur-lg rounded-3xl p-8 mb-12"
          variants={scaleUp} // Apply animation to the overview card
        >
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            PeerTask is a student-to-student micro-task platform. Whether you need help making a presentation,
            typing notes, or analyzing data — you can post a task, and peers can accept, complete, and submit it.
            Tasks are completed either for a reward or a favor — just like helping each other in college life.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex items-start mb-12 group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // Adjust amount for when animation triggers
              variants={fadeInRise}
              transition={{ delay: index * 0.15 }} // Stagger animation for each step
            >
              {/* Timeline line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-8 top-14 w-0.5 h-full bg-purple-600/50 group-hover:bg-purple-400 transition-colors duration-300"></div>
              )}

              {/* Step content */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white
                                  transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 border border-gray-700/20
                                shadow-xl backdrop-filter backdrop-blur-lg rounded-2xl p-6 flex-1
                                transform group-hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why It's Different Section */}
        <motion.div
          className="bg-gradient-to-r from-teal-700/70 to-blue-800/70 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-lg p-8 mt-16 text-white border border-teal-600/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInRise}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-100">Why PeerTask is Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap for better spacing */}
            {/* Feature 1 */}
            <motion.div className="flex items-start space-x-4" variants={scaleUp} transition={{ delay: 0.1 }}>
              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16a5.973 5.973 0 01-5.917-5.173z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Local Community-based</h3>
                <p className="text-blue-200">Connect with peers from your own campus or nearby institutions.</p>
              </div>
            </motion.div>
            {/* Feature 2 */}
            <motion.div className="flex items-start space-x-4" variants={scaleUp} transition={{ delay: 0.2 }}>
              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-teal-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Simple and Fast</h3>
                <p className="text-blue-200">Quick task posting and acceptance process designed for students.</p>
              </div>
            </motion.div>
            {/* Feature 3 */}
            <motion.div className="flex items-start space-x-4" variants={scaleUp} transition={{ delay: 0.3 }}>
              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-pink-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Built on Trust</h3>
                <p className="text-blue-200">A platform fostering mutual help and community trust.</p>
              </div>
            </motion.div>
            {/* Feature 4 */}
            <motion.div className="flex items-start space-x-4" variants={scaleUp} transition={{ delay: 0.4 }}>
              <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L13.586 6H10a1 1 0 110-2h3.586l-1.293-1.293A1 1 0 0112 2z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-gray-100">Flexible Rewards</h3>
                <p className="text-blue-200">Choose between treats, favors, or small payments as compensation.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;