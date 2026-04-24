import { useState, useEffect } from "react";
import { format, isPast } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiSearch,
  HiFilter,
  HiX,
  HiCurrencyDollar,
  HiTag,
  HiCalendar,
} from "react-icons/hi";
import { useTasks } from "../../contextStore/task.context";
import { useAuth } from "../../contextStore/auth.context";

export default function BrowseTasks() {
  const { fetchBrowseTasks } = useTasks();
  const { user } = useAuth();
  const { tasks, setTasks } = useTasks(); // Use the context
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false); // Corrected initial value

  const categories = [...new Set(tasks.map((task) => task.category))] // Use tasks from context
    .filter(Boolean)
    .sort();

  useEffect(() => {
    const fetchAndFilterTasks = async () => {
      if (tasks.length === 0 && user?.user?._id) {
        // Only fetch if tasks is empty
        setLoading(true);
        try {
          const fetchedTasks = await fetchBrowseTasks(user.user._id);
          setTasks(fetchedTasks); // Store fetched tasks in context
        } catch (err) {
          console.error("Error in fetchAndFilterTasks", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAndFilterTasks();
  }, [fetchBrowseTasks, setTasks, user?.user?._id, tasks.length]); // tasks.length as dependency

  useEffect(() => {
    let filtered = tasks.filter((task) => {
      // Use tasks from context
      if (task.status !== "open") return false;
      const isOwnTask = task.createdBy === user?.user?._id;
      if (isOwnTask) return false; // Corrected: use !==
      if (isPast(new Date(task.deadline))) return false;

      const search = searchTerm.toLowerCase();
      if (
        search &&
        !task.title.toLowerCase().includes(search) &&
        !task.description.toLowerCase().includes(search) &&
        !task.tags.some((tag) => tag.toLowerCase().includes(search))
      ) {
        return false;
      }

      if (category && task.category !== category) return false;
      if (minBudget && task.budget < parseFloat(minBudget)) return false;
      if (maxBudget && task.budget > parseFloat(maxBudget)) return false;

      return true;
    });

    filtered = filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setFilteredTasks(filtered);
  }, [tasks, searchTerm, category, minBudget, maxBudget, user?.user?._id]); // tasks instead of demoTasks

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setMinBudget("");
    setMaxBudget("");
  };
  const filtersVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Browse Tasks</h1>
        <p className="text-sm text-gray-600 mt-1">
          Find document-related tasks that match your skills
        </p>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="form-input pl-10 pr-10"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm("")}
              >
                <HiX className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <button
            className="btn-outline inline-flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <HiFilter className="h-5 w-5 mr-1" />
            Filters
          </button>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    id="category"
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="min-budget" className="form-label">
                    Min Budget
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiCurrencyDollar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="min-budget"
                      className="form-input pl-10"
                      placeholder="Min amount"
                      min="0"
                      value={minBudget}
                      onChange={(e) => setMinBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="max-budget" className="form-label">
                    Max Budget
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiCurrencyDollar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="max-budget"
                      className="form-input pl-10"
                      placeholder="Max amount"
                      min="0"
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(e.target.value)}
                    />
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

      {/* Tasks list */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <HiSearch className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-base font-medium text-gray-900">
              No tasks found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria to find what you're
              looking for.
            </p>
            {(searchTerm || category || minBudget || maxBudget) && (
              <button
                onClick={resetFilters}
                className="mt-4 btn-outline text-sm"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task,index) => {
              return (
                <motion.li
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/dashboardLayout/browse-tasks/${task._id}/${task.createdBy}`}
                    className="block hover:bg-gray-50 transition-colors"
                  >
                    <div className="px-6 py-4">
                      <div className="sm:flex sm:justify-between sm:items-baseline">
                        <h3 className="text-base font-medium text-gray-900">
                          {task.title}
                        </h3>
                        <div className="mt-1 sm:mt-0 text-sm font-medium text-success-600">
                          ${task.budget}
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="badge-primary flex items-center">
                          <HiTag className="h-3 w-3 mr-1" />
                          {task.category}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <HiCalendar className="h-3 w-3 mr-1" />
                          Deadline:{" "}
                          {format(new Date(task.deadline), "MMM d, yyyy")}
                        </div>
                        <div className="text-xs text-gray-500">
                          Posted:{" "}
                          {format(new Date(task.createdAt), "MMM d, yyyy")}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
