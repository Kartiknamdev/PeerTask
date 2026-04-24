import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiPlus, 
  HiClock, 
  HiDocumentText, 
  HiCheckCircle, 
  HiUserGroup,
  HiTrendingUp,
  HiLightningBolt,
  HiChevronRight
} from 'react-icons/hi';
import { motion } from 'framer-motion';
import { useAuth } from '../../contextStore/auth.context';
import { useTasks } from '../../contextStore/task.context';

const StatCard = ({ icon: Icon, title, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="relative group overflow-hidden bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-110 duration-500 bg-${color}-500`} />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-${color}-50 text-${color}-600 shadow-inner`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-gray-500 font-medium text-sm mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-gray-900">{value}</span>
        <span className="text-xs font-bold text-green-500 flex items-center">
          <HiTrendingUp className="mr-0.5" /> +12%
        </span>
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ title, status, time, type }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        type === 'task' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {type === 'task' ? <HiDocumentText className="w-5 h-5" /> : <HiLightningBolt className="w-5 h-5" />}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
      status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
    }`}>
      {status}
    </span>
  </div>
);

const Dashboard = () => {
  const { user: authUser } = useAuth();
  const user = authUser?.user || authUser || {};
  const { tasks } = useTasks();
  
  const userType = user.userType || 'client';
  const userId = user._id || user.id;

  // Calculate real stats for the logged-in user
  const myTasks = tasks.filter(t => t.createdBy === userId || t.assignedTo === userId);
  const activeTasks = myTasks.filter(t => t.status === 'open' || t.status === 'in progress').length;
  const totalPosted = tasks.filter(t => t.createdBy === userId).length;
  const completedTasks = myTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{user.fullName?.split(' ')[0] || 'User'}</span>! 👋
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Welcome back. Here's what's happening with your projects today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            {userType === 'client' ? (
              <Link
                to="/dashboardLayout/create-task"
                className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold shadow-xl shadow-gray-200 hover:bg-gray-800 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <HiPlus className="w-5 h-5" />
                Post New Task
              </Link>
            ) : (
              <Link
                to="/dashboardLayout/browse-tasks"
                className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <HiDocumentText className="w-5 h-5" />
                Find Work
              </Link>
            )}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={HiClock} 
            title="Active Tasks" 
            value={activeTasks} 
            color="indigo" 
            delay={0.1}
          />
          <StatCard 
            icon={HiDocumentText} 
            title="Total Posted" 
            value={totalPosted} 
            color="violet" 
            delay={0.2}
          />
          <StatCard 
            icon={HiCheckCircle} 
            title="Completed" 
            value={completedTasks} 
            color="green" 
            delay={0.3}
          />
          <StatCard 
            icon={HiUserGroup} 
            title="Collaborators" 
            value="12" 
            color="amber" 
            delay={0.4}
          />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-gray-900">Recent Activity</h2>
              <Link to="/dashboardLayout/history" className="text-indigo-600 font-bold text-sm hover:underline flex items-center">
                View All <HiChevronRight className="ml-1" />
              </Link>
            </div>

            <div className="space-y-2 flex-1">
              {myTasks.length > 0 ? (
                myTasks.slice(0, 5).map((task, idx) => (
                  <ActivityItem 
                    key={task._id}
                    title={task.taskTitle}
                    status={task.status === 'open' ? 'Active' : task.status}
                    time={new Date(task.createdAt).toLocaleDateString()}
                    type="task"
                  />
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <HiClock className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium italic">No recent activity yet.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Info / Tips Card */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200"
            >
              <h3 className="text-xl font-black mb-4">Pro Tip 💡</h3>
              <p className="text-indigo-100 leading-relaxed mb-6 font-medium">
                Detailed requirements help freelancers understand your project better and result in 40% faster completion.
              </p>
              <Link 
                to="/dashboardLayout/create-task"
                className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
            >
              <h3 className="text-lg font-black text-gray-900 mb-4">Earnings Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-4xl font-black text-gray-900">$2,450</span>
                  <span className="text-green-500 font-bold text-sm">+8.2%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[65%]" />
                </div>
                <p className="text-xs text-gray-500 font-medium">You've reached 65% of your monthly goal.</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
