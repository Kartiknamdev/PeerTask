import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../../contextStore/auth.context"; // Assuming this path is correct
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useAuth(); // Make sure useAuth provides loginUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(""); // Clear previous errors

    try {
      await loginUser(email, password);
      toast.success("Login successful! Redirecting...");
      navigate("/dashboardLayout/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      console.error("Login attempt failed:", err); // Log the actual error for debugging
      setLoginError("Invalid email or password. Please try again."); // More user-friendly message
      toast.error("Invalid email or password. Please try again.");
      // No need to clear email/password on error, let user correct it
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } },
  };

  return (
    // Main container with dark background gradient
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 font-sans p-6 sm:p-10 relative overflow-hidden">
      {/* Background Animated Blobs/Shapes - Added for "liveliness" */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
        initial={{ scale: 0.8, x: -100, y: -100, rotate: 0 }}
        animate={{ scale: 1.2, x: 100, y: 100, rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
        initial={{ scale: 1.2, x: 100, y: 100, rotate: 360 }}
        animate={{ scale: 0.8, x: -100, y: -100, rotate: 0 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", delay: 2 }} // Directly apply delay here
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"
        initial={{ scale: 1, x: -150, y: 50, rotate: 0 }}
        animate={{ scale: 1.1, x: 50, y: -150, rotate: 270 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", delay: 4 }} // Directly apply delay here
      ></motion.div>

      <motion.div
        className="w-full max-w-md relative z-10" // Container for animation, increased z-index to be above blobs
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glassmorphic Login Card */}
        <motion.div
          className="relative p-8 md:p-10 rounded-3xl overflow-hidden
                     bg-gradient-to-br from-gray-700/60 to-gray-800/60
                     border border-gray-700/30 shadow-2xl backdrop-filter backdrop-blur-lg
                     transform transition-all duration-300 ease-in-out hover:shadow-purple-500/20"
          variants={cardVariants}
        >
          {/* Title with gradient text from BlogPost.jsx */}
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 text-center drop-shadow-lg">
            Sign in to your account
          </h2>

          {LoginError && (
            <motion.div
              className="bg-red-900/40 text-red-300 border border-red-700/50 p-3 rounded-xl mb-6 text-center text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {LoginError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-md font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                           border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                           outline-none transition-all duration-200 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-md font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                           border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                           outline-none transition-all duration-200 text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded-md text-purple-600 bg-white/20 border-white/30 focus:ring-purple-500 accent-purple-400"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              {/* Submit Button with animated gradient from BlogPost/SubmitBlog */}
              <motion.button
                type="submit"
                className="relative px-10 py-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600
                           text-white font-semibold text-xl overflow-hidden group shadow-lg hover:shadow-xl
                           transition-all duration-300 ease-in-out w-full"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-700 to-purple-800
                                 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                <span className="relative z-10">
                  {loading ? "Signing in..." : "Sign in"}
                </span>
              </motion.button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-800 text-gray-400">
                  or Sign in with
                </span>
              </div>
            </div>

            {/* Social Login Buttons with glassmorphic style */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                className="relative p-3 rounded-xl bg-white/10 text-gray-100 text-base font-medium
                           overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                           flex items-center justify-center space-x-2 border border-white/10"
                onClick={() => alert("Google login not implemented yet")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FcGoogle className="h-6 w-6" />
                <span className="relative z-10 hidden sm:inline">Google</span>
              </motion.button>
              <motion.button
                type="button"
                className="relative p-3 rounded-xl bg-white/10 text-gray-100 text-base font-medium
                           overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                           flex items-center justify-center space-x-2 border border-white/10"
                onClick={() => alert("GitHub login not implemented yet")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="h-6 w-6" />
                <span className="relative z-10 hidden sm:inline">GitHub</span>
              </motion.button>
              <motion.button
                type="button"
                className="relative p-3 rounded-xl bg-white/10 text-gray-100 text-base font-medium
                           overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                           flex items-center justify-center space-x-2 border border-white/10"
                onClick={() => alert("Twitter login not implemented yet")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaXTwitter className="h-6 w-6" />
                <span className="relative z-10 hidden sm:inline">Twitter</span>
              </motion.button>
              <motion.button
                type="button"
                className="relative p-3 rounded-xl bg-white/10 text-gray-100 text-base font-medium
                           overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 ease-in-out
                           flex items-center justify-center space-x-2 border border-white/10"
                onClick={() => alert("Facebook login not implemented yet")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookF className="h-6 w-6" />
                <span className="relative z-10 hidden sm:inline">Facebook</span>
              </motion.button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-md text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;