import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  HiClock, 
  HiCurrencyDollar, 
  HiCalendar, 
  HiDocumentText, 
  HiUser,
  HiPaperClip,
  HiArrowLeft,
  HiCheck,
  HiX,
  HiChat
} from 'react-icons/hi'
import { format, formatDistance } from 'date-fns'
import { useTasks } from '../../contextStore/task.context'
import { useAuth } from '../../contextStore/auth.context'
 import { motion } from 'framer-motion'

const TaskDetails = () => {
  const { taskId } = useParams()
  const { getTaskById, applyForTask, assignTask, completeTask, processPayment } = useTasks()
  const { user } = useAuth()
   const navigate = useNavigate()
  
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [coverLetter, setCoverLetter] = useState('')
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [applying, setApplying] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  
  // Get task details
  useEffect(() => {
    if (taskId) {
      const taskData = getTaskById(taskId)
      if (taskData) {
        setTask(taskData)
      } else {
        // Task not found, redirect
        navigate('/browse-tasks')
      }
      setLoading(false)
    }
  }, [taskId, getTaskById, navigate])
  
  // Check if current user has applied to this task
  const hasApplied = task?.applicants?.some(app => app.userId === user?.id)
  
  // Check if current user is the creator of this task
  const isCreator = task?.createdBy === user?.id
  
  // Check if current user is assigned to this task
  const isAssigned = task?.assignedTo === user?.id
  
  // Format deadline
  const formattedDeadline = task ? format(new Date(task.deadline), 'MMMM d, yyyy') : ''
  
  // Time until deadline
  const timeUntilDeadline = task ? formatDistance(new Date(task.deadline), new Date(), { addSuffix: true }) : ''
  
  // Apply for task
  const handleApply = async (e) => {
    e.preventDefault()
    
    if (!coverLetter.trim()) {
      return
    }
    
    setApplying(true)
    
    try {
      await applyForTask(taskId, user.id, coverLetter)
      
      // Update local task state
      const updatedTask = getTaskById(taskId)
      setTask(updatedTask)
      
      // Close modal
      setApplyModalOpen(false)
      setCoverLetter('')
      
      // Add notification
      // addNotification({
      //   type: 'success',
      //   content: 'Your application was submitted successfully!'
      // })
    } catch (error) {
      console.error('Error applying for task:', error)
      // addNotification({
      //   type: 'error',
      //   content: 'Failed to submit application. Please try again.'
      // })
    } finally {
      setApplying(false)
    }
  }
  
  // Assign task to a worker
  const handleAssign = async (workerId) => {
    setActionLoading(true)
    
    try {
      await assignTask(taskId, workerId)
      
      // Update local task state
      const updatedTask = getTaskById(taskId)
      setTask(updatedTask)
      
      // Add notification
      // addNotification({
      //   type: 'success',
      //   content: 'Task assigned successfully!'
      // })
    } catch (error) {
      console.error('Error assigning task:', error)
      // addNotification({
      //   type: 'error',
      //   content: 'Failed to assign task. Please try again.'
      // })
    } finally {
      setActionLoading(false)
    }
  }
  
  // Mark task as complete
  const handleComplete = async () => {
    setActionLoading(true)
    
    try {
      await completeTask(taskId)
      
      // Update local task state
      const updatedTask = getTaskById(taskId)
      setTask(updatedTask)
      
      // Add notification
      // addNotification({
      //   type: 'success',
      //   content: 'Task marked as completed!'
      // })
    } catch (error) {
      console.error('Error completing task:', error)
      // addNotification({
      //   type: 'error',
      //   content: 'Failed to complete task. Please try again.'
      // })
    } finally {
      setActionLoading(false)
    }
  }
  
  // Process payment
  const handlePayment = async () => {
    setActionLoading(true)
    
    try {
      await processPayment(taskId)
      
      // Update local task state
      const updatedTask = getTaskById(taskId)
      setTask(updatedTask)
      
      // Add notification
      // addNotification({
      //   type: 'success',
      //   content: 'Payment processed successfully!'
      // })
    } catch (error) {
      console.error('Error processing payment:', error)
      // addNotification({
      //   type: 'error',
      //   content: 'Failed to process payment. Please try again.'
      // })
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-l-primary-600"></div>
      </div>
    )
  }

  if (!task) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Task not found.</p>
        <Link to="/browse-tasks" className="mt-4 btn-primary inline-block">
          Browse Tasks
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <HiArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
            <div className="flex items-center space-x-3 mt-1">
              <span className={`
                badge
                ${task.status === 'open' ? 'badge-primary' : ''}
                ${task.status === 'assigned' ? 'badge-warning' : ''}
                ${task.status === 'completed' ? 'badge-success' : ''}
              `}>
                {task.status === 'open' ? 'Open' : 
                 task.status === 'assigned' ? 'In Progress' : 'Completed'}
              </span>
              <span className="text-sm text-gray-500">
                Posted {format(new Date(task.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>
        
        {/* Task actions based on user role and task status */}
        <div className="flex gap-3">
          {!isCreator && task.status === 'open' && !hasApplied && (
            <button 
              className="btn-primary"
              onClick={() => setApplyModalOpen(true)}
            >
              Apply Now
            </button>
          )}
          
          {!isCreator && hasApplied && (
            <button className="btn-outline" disabled>
              Application Submitted
            </button>
          )}
          
          {isAssigned && task.status === 'assigned' && (
            <button 
              className="btn-primary"
              onClick={handleComplete}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Mark Complete'}
            </button>
          )}
          
          {isCreator && task.status === 'completed' && task.paymentStatus === 'pending' && (
            <button 
              className="btn-primary"
              onClick={handlePayment}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Process Payment'}
            </button>
          )}
          
          {/* Show message button if task is assigned */}
          {task.status !== 'open' && (task.assignedTo === user?.id || task.createdBy === user?.id) && (
            <Link to="/messages" className="btn-outline">
              <HiChat className="h-5 w-5 mr-1" />
              Message
            </Link>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="md:col-span-2">
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <HiDocumentText className="h-5 w-5 mr-2 text-gray-500" />
              Task Description
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
              
              {task.requirements && (
                <>
                  <h3 className="text-base font-medium mt-4 mb-2">Requirements</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{task.requirements}</p>
                </>
              )}
            </div>
            
            {task.tags && task.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {task.attachments && task.attachments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <HiPaperClip className="h-4 w-4 mr-1" />
                  Attachments
                </h3>
                <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                  {task.attachments.map((attachment, index) => (
                    <li 
                      key={index}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <HiPaperClip className="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <span className="ml-2 flex-1 w-0 truncate">
                          {attachment.name}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="font-medium text-gray-500">
                          {attachment.size}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
          
          {/* Applicants section - only visible to task creator */}
          {isCreator && task.status === 'open' && task.applicants && task.applicants.length > 0 && (
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <HiUser className="h-5 w-5 mr-2 text-gray-500" />
                Applicants ({task.applicants.length})
              </h2>
              
              <ul className="divide-y divide-gray-200">
                {task.applicants.map((applicant) => {
                  const applicantData = applicant.userId ? 
                    { 
                      name: 'Sarah Miller', 
                      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                      rating: 4.9,
                      completedTasks: 32
                    } : null
                  
                  return (
                    <li key={applicant.userId} className="py-4">
                      <div className="flex items-start">
                        <img 
                          src={applicantData?.avatar || "https://via.placeholder.com/40"}
                          alt={applicantData?.name || "Applicant"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">{applicantData?.name || "User"}</h3>
                            <p className="text-sm text-gray-500">
                              Applied {format(new Date(applicant.appliedAt), 'MMM d, yyyy')}
                            </p>
                          </div>
                          
                          <div className="mt-1 flex items-center">
                            <div className="flex items-center text-yellow-400">
                              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                              <span className="ml-1 text-xs text-gray-700">
                                {applicantData?.rating || 0} ({applicantData?.completedTasks || 0} tasks)
                              </span>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm text-gray-600">
                            {applicant.coverLetter}
                          </p>
                          
                          <div className="mt-2 flex space-x-2">
                            <button
                              className="btn-primary text-xs py-1"
                              onClick={() => handleAssign(applicant.userId)}
                              disabled={actionLoading}
                            >
                              Assign Task
                            </button>
                            <button
                              className="btn-outline text-xs py-1"
                              onClick={() => navigate('/messages')}
                            >
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
          
          {/* Assigned worker section */}
          {task.status !== 'open' && task.assignedTo && (
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <HiUser className="h-5 w-5 mr-2 text-gray-500" />
                Assigned To
              </h2>
              
              <div className="flex items-start">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Worker"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Sarah Miller</h3>
                    <p className="text-sm text-gray-500">
                      Assigned {format(new Date(task.assignedAt || task.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  
                  <div className="mt-1 flex items-center">
                    <div className="flex items-center text-yellow-400">
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="ml-1 text-xs text-gray-700">4.9 (32 tasks)</span>
                    </div>
                  </div>
                  
                  {task.status === 'completed' && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="badge-success">Completed</span>
                      {task.completedAt && (
                        <span className="text-xs text-gray-500">
                          on {format(new Date(task.completedAt), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {task.paymentStatus === 'paid' && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="badge-success">Payment Processed</span>
                      {task.paidAt && (
                        <span className="text-xs text-gray-500">
                          on {format(new Date(task.paidAt), 'MMM d, yyyy')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Sidebar */}
        <div>
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">Task Details</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-500">
                  <HiCurrencyDollar />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Budget</p>
                  <p className="text-sm text-gray-500">${task.budget}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-500">
                  <HiCalendar />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Deadline</p>
                  <p className="text-sm text-gray-500">{formattedDeadline}</p>
                  <p className="text-xs text-gray-500 mt-1">{timeUntilDeadline}</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-gray-500">
                  <HiClock />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Category</p>
                  <p className="text-sm text-gray-500">{task.category || "Uncategorized"}</p>
                </div>
              </li>
              
              {task.paymentStatus && (
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-gray-500">
                    <HiCurrencyDollar />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Payment Status</p>
                    <p className={`text-sm ${task.paymentStatus === 'paid' ? 'text-success-600' : 'text-warning-600'}`}>
                      {task.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold mb-4">Posted By</h2>
            
            <div className="flex items-center">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Client"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Alex Johnson</h3>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center text-yellow-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="ml-1 text-xs text-gray-700">4.8 (15 tasks)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              <p>Marketing professional with a focus on content creation and strategy.</p>
            </div>
            
            {!isCreator && (
              <button 
                className="mt-4 btn-outline btn-sm w-full"
                onClick={() => navigate('/messages')}
              >
                Contact Client
              </button>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Apply modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <motion.div 
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  onClick={() => setApplyModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <HiX className="h-6 w-6" />
                </button>
              </div>
              
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Apply for Task
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Tell the client why you're the best candidate for this task. Highlight your relevant skills and experience.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleApply} className="mt-5">
                <div>
                  <label htmlFor="cover-letter" className="form-label">
                    Cover Letter <span className="text-error-600">*</span>
                  </label>
                  <textarea
                    id="cover-letter"
                    rows={5}
                    className="form-input"
                    placeholder="Why are you a good fit for this task?"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="btn-primary w-full sm:col-start-2"
                    disabled={applying}
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                  <button
                    type="button"
                    className="btn-outline w-full sm:col-start-1 mt-3 sm:mt-0"
                    onClick={() => setApplyModalOpen(false)}
                    disabled={applying}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDetails