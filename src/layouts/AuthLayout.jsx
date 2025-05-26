import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/ui/Logo'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size="large" />
        </motion.div>
        <motion.h2
          className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          PeerTask
        </motion.h2>
      </div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
        
        <p className="mt-3 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} PeerTask, All rights reserved.
        </p>
      </motion.div>
    </div>
  )
}

export default AuthLayout