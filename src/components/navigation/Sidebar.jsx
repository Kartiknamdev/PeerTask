import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiX,
  HiHome,
  HiDocumentAdd,
  HiDocumentSearch,
  HiClipboardList,
  HiUser,
  HiChatAlt,
  HiCog,
} from 'react-icons/hi';
import Logo from '../ui/Logo';
import { useTheme } from '../../contextStore/theme.context';

const Sidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const [user] = useState({ userType: 'client' });
  const { isDark } = useTheme();

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'tween' } },
    closed: { x: '-100%', transition: { type: 'tween' } },
  };

  const navItems = [
    { name: 'Dashboard', to: 'dashboard', icon: HiHome },
    { name: 'Create Task', to: 'create-task', icon: HiDocumentAdd, role: 'client' },
    { name: 'Browse Tasks', to: 'browse-tasks', icon: HiDocumentSearch },
    { name: 'Task History', to: 'history', icon: HiClipboardList },
    { name: 'Messages', to: 'messages', icon: HiChatAlt },
    { name: 'Profile', to: 'profile', icon: HiUser },
    { name: 'Settings', to: 'settings', icon: HiCog },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.role || (user && item.role === user.userType)
  );

  return (
    <>
      {/* Mobile sidebar */}
      <motion.div
        className={`lg:hidden fixed inset-y-0 left-0 flex flex-col z-30 w-72 ${
          isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700/30' 
            : 'bg-white border-gray-200'
        } shadow-xl transition-colors duration-200`}
        variants={sidebarVariants}
        animate={isMobileOpen ? 'open' : 'closed'}
        initial="closed"
      >
        <div className={`h-16 flex items-center justify-between px-4 border-b ${
          isDark ? 'border-gray-700/30' : 'border-gray-200'
        }`}>
          <Logo />
          <button
            onClick={closeMobileSidebar}
            className={`p-2 rounded-md ${
              isDark 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 px-2 space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `sidebar-link flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    isDark
                      ? `text-gray-300 hover:bg-gray-700/50 hover:text-white ${
                          isActive ? 'bg-gray-700/70 text-white font-semibold' : ''
                        }`
                      : `text-gray-600 hover:bg-gray-100 ${
                          isActive ? 'bg-gray-200 text-gray-900 font-semibold' : ''
                        }`
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className={`flex flex-col w-64 border-r ${
          isDark 
            ? 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700/30' 
            : 'bg-white border-gray-200'
        } transition-colors duration-200`}>
          <div className={`flex items-center h-16 px-4 border-b ${
            isDark ? 'border-gray-700/30' : 'border-gray-200'
          }`}>
            <Logo />
          </div>
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              {filteredNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar-link flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      isDark
                        ? `text-gray-300 hover:bg-gray-700/50 hover:text-white ${
                            isActive ? 'bg-gray-700/70 text-white font-semibold' : ''
                          }`
                        : `text-gray-600 hover:bg-gray-100 ${
                            isActive ? 'bg-gray-200 text-gray-900 font-semibold' : ''
                          }`
                    }`
                  }
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
