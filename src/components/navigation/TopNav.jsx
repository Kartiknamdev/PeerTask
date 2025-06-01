import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenuAlt1, HiBell, HiLogout, HiMoon, HiSun } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../contextStore/auth.context';
import { useTheme } from '../../contextStore/theme.context';

const TopNav = ({ openSidebar }) => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  return (    <header
      className={`${
        isDark
          ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-gray-700/30'
          : 'bg-white border-gray-200'
      } backdrop-blur-lg border-b transition-colors duration-200 relative z-[50]`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Mobile menu button */}
            <button
              type="button"
              className={`lg:hidden px-4 ${
                isDark
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
              onClick={openSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <HiMenuAlt1 className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDark
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-800'
              } mr-4 transition-colors duration-200`}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <HiSun className="h-6 w-6" />
                ) : (
                  <HiMoon className="h-6 w-6" />
                )}
              </motion.div>
            </button>

            {/* Notifications dropdown */}
            <div className="relative mr-4" ref={notificationsRef}>
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <span className="sr-only">View notifications</span>
                <HiBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    className="origin-top-right absolute right-0 mt-2 w-80 rounded-lg shadow-lg bg-gray-800 ring-1 ring-gray-800 ring-opacity-5 z-50"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="py-2 px-4 flex justify-between items-center border-b border-gray-700">
                      <h3 className="text-sm font-medium text-gray-200">
                        Notifications
                      </h3>
                      {notifications.length > 0 && (
                        <button
                          className="text-xs text-blue-400 hover:text-blue-300"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto py-1">
                      {notifications.length === 0 ? (
                        <p className="text-sm text-gray-400 py-4 px-4 text-center">
                          No new notifications
                        </p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-gray-700/50 transition-colors duration-150"
                          >
                            <p className="text-sm text-gray-300">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>            {/* User menu */}
            <div className="relative z-[999]" ref={userMenuRef}>
              <button
                type="button"
                className="flex items-center text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <img
                  className="h-8 w-8 rounded-full border-2 border-gray-700"
                  src={
                    user?.user.photo ||
                    'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
                  }
                  alt="User avatar"
                />
                <span className="ml-2 text-sm font-medium hidden sm:block">
                  {user?.name || 'User'}
                </span>
              </button>              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-800 ring-1 ring-gray-700 ring-opacity-5 z-[999]"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="py-1">
                      <Link
                        to="/dashboardLayout/profile"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-150"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboardLayout/settings"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-150"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors duration-150 flex items-center"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                      >
                        <HiLogout className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;