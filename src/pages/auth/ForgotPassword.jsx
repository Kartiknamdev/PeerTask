import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    // In a real app, this would call an API to send a password reset email
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
      <h2 className="text-center text-2xl font-bold mb-6">Reset your password</h2>
      
      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="rounded-full bg-success-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <p className="text-gray-700 mb-4">
            Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
          </p>
          
          <Link to="/login" className="btn-primary inline-block">
            Return to sign in
          </Link>
        </motion.div>
      ) : (
        <>
          {error && (
            <motion.div 
              className="bg-error-50 text-error-700 p-3 rounded-md mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <p className="text-gray-600 mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
    
            <div>
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Sending reset link...' : 'Send password reset link'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-primary-600 hover:text-primary-800 text-sm">
              &larr; Back to sign in
            </Link>
          </div>
        </>
      )}
       </motion.div>
    </div>
  )
}

export default ForgotPassword