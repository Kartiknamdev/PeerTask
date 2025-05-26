import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { HiFilter, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../../contextStore/task.context';

const TaskHistory = () => {
  // Mock user data
  const user = {
    id: 'user123',
    userType: 'worker', // 'client' or 'worker'
  };

  // Mock tasks data
  const {tasks} = useTasks()

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState(user.userType === 'client' ? 'created' : 'assigned');
  const [showFilters, setShowFilters] = useState(false);

  // Load tasks based on filters
  useEffect(() => {
    let userTasks = [];

    // Get tasks based on type filter
    if (typeFilter === 'created') {
      userTasks = tasks.filter((task) => task.createdBy === user.id);
    } else if (typeFilter === 'assigned') {
      userTasks = tasks.filter((task) => task.assignedTo === user.id);
    } else if (typeFilter === 'applied') {
      userTasks = tasks.filter((task) => task.assignedTo === null && task.createdBy !== user.id);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      userTasks = userTasks.filter((task) => task.status === statusFilter);
    }

    // Sort by newest first
    userTasks = userTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredTasks(userTasks);
  }, [statusFilter, typeFilter, user.id]);

  // Reset filters
  const resetFilters = () => {
    setStatusFilter('all');
    // setTypeFilter(user.userType === 'client' ? 'created' : 'assigned');
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return 'badge-primary';
      case 'assigned':
        return 'badge-warning';
      case 'completed':
        return 'badge-success';
      default:
        return 'badge-primary';
    }
  };

  // Animation variants
  const filtersVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task History</h1>
        <p className="text-sm text-gray-600 mt-1">
          {user.userType === 'client'
            ? 'View and manage all your tasks'
            : 'Track your task applications and assignments'}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <button
              className="btn-outline inline-flex items-center w-full justify-between"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center">
                <HiFilter className="h-5 w-5 mr-2" />
                <span>Filters</span>
              </div>
              <span className="text-xs bg-gray-100 py-1 px-2 rounded-full">
                {typeFilter === 'created'
                  ? 'Created by me'
                  : typeFilter === 'assigned'
                  ? 'Assigned to me'
                  : 'Applied by me'}
                {statusFilter !== 'all' && ` • ${statusFilter}`}
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mt-4 bg-white rounded-lg shadow-sm p-4 overflow-hidden"
              variants={filtersVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Type</label>
                  <div className="mt-1 grid grid-cols-1 gap-2">
                    {user.userType === 'client' && (
                      <button
                        type="button"
                        className={`px-3 py-2 rounded-md border text-sm font-medium ${
                          typeFilter === 'created'
                            ? 'border-primary-300 bg-primary-50 text-primary-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setTypeFilter('created')}
                      >
                        Created by me
                      </button>
                    )}

                    {user.userType === 'worker' && (
                      <>
                        <button
                          type="button"
                          className={`px-3 py-2 rounded-md border text-sm font-medium ${
                            typeFilter === 'assigned'
                              ? 'border-primary-300 bg-primary-50 text-primary-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setTypeFilter('assigned')}
                        >
                          Assigned to me
                        </button>

                        <button
                          type="button"
                          className={`px-3 py-2 rounded-md border text-sm font-medium ${
                            typeFilter === 'applied'
                              ? 'border-primary-300 bg-primary-50 text-primary-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => setTypeFilter('applied')}
                        >
                          Applied by me
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">Status</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className={`px-3 py-2 rounded-md border text-sm font-medium ${
                        statusFilter === 'all'
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setStatusFilter('all')}
                    >
                      All
                    </button>

                    <button
                      type="button"
                      className={`px-3 py-2 rounded-md border text-sm font-medium ${
                        statusFilter === 'open'
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setStatusFilter('open')}
                    >
                      Open
                    </button>

                    <button
                      type="button"
                      className={`px-3 py-2 rounded-md border text-sm font-medium ${
                        statusFilter === 'assigned'
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setStatusFilter('assigned')}
                    >
                      In Progress
                    </button>

                    <button
                      type="button"
                      className={`px-3 py-2 rounded-md border text-sm font-medium ${
                        statusFilter === 'completed'
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setStatusFilter('completed')}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="btn-outline text-sm"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Task list */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-base font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {typeFilter === 'created' && "You haven't created any tasks yet."}
              {typeFilter === 'assigned' && "You don't have any tasks assigned to you."}
              {typeFilter === 'applied' && "You haven't applied to any tasks yet."}
            </p>
            {user.userType === 'client' && typeFilter === 'created' && (
              <div className="mt-6">
                <Link to="/create-task" className="btn-primary">
                  Create a New Task
                </Link>
              </div>
            )}
            {user.userType === 'worker' && (typeFilter === 'assigned' || typeFilter === 'applied') && (
              <div className="mt-6">
                <Link to="/browse-tasks" className="btn-primary">
                  Browse Available Tasks
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Task
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Budget
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deadline
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map((task) => (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = `/tasks/${task.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      {typeFilter === 'applied' && !task.assignedTo && (
                        <div className="text-xs text-gray-500">Application pending</div>
                      )}
                      {typeFilter === 'applied' && task.assignedTo === user.id && (
                        <div className="text-xs text-success-600">Your application was accepted</div>
                      )}
                      {typeFilter === 'applied' && task.assignedTo && task.assignedTo !== user.id && (
                        <div className="text-xs text-gray-500">Task assigned to another worker</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{task.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${getStatusBadge(task.status)}`}>
                        {task.status === 'open'
                          ? 'Open'
                          : task.status === 'assigned'
                          ? 'In Progress'
                          : 'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${task.budget}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {format(new Date(task.createdAt), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {format(new Date(task.deadline), 'MMM d, yyyy')}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskHistory;