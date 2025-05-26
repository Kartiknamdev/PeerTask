import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../contextStore/auth.context"; // Assuming this path is correct
import { toast } from 'react-toastify';

const Register = () => {
  const { registerUser } = useAuth(); // Make sure useAuth provides registerUser
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // New state for password validation
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    if (pass.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Validate password length
    if (!validatePassword(password)) {
      setLoading(false);
      return;
    }

    // validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    // call register function
    try {
      await registerUser(name, email, password);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      // It's good practice to log the full error for debugging
      console.error("Registration failed:", err);
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion variants (consistent with Login page)
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } },
  };

  return (
    // Main container with dark background gradient from BlogPost.jsx
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 font-sans p-6 sm:p-10">
      <motion.div
        className="w-full max-w-md" // Container for animation
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glassmorphic Register Card */}
        <motion.div
          className="relative p-8 md:p-10 rounded-3xl overflow-hidden
                     bg-gradient-to-br from-gray-700/60 to-gray-800/60
                     border border-gray-700/30 shadow-2xl backdrop-filter backdrop-blur-lg
                     transform transition-all duration-300 ease-in-out hover:shadow-purple-500/20"
          variants={cardVariants}
        >
          {/* Title with gradient text from BlogPost.jsx */}
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 text-center drop-shadow-lg">
            Create your account
          </h2>

          {error && (
            <motion.div
              className="bg-red-900/40 text-red-300 border border-red-700/50 p-3 rounded-xl mb-6 text-center text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-md font-medium text-gray-300 mb-2">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                           border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                           outline-none transition-all duration-200 text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                autoComplete="new-password"
                required
                className={`w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                           border ${passwordError ? 'border-red-500' : 'border-white/10'} focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                           outline-none transition-all duration-200 text-base`}
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <motion.p
                  className="mt-2 text-sm text-red-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {passwordError}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-md font-medium text-gray-300 mb-2">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 rounded-xl bg-white/10 text-white placeholder-gray-400
                           border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                           outline-none transition-all duration-200 text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* "Account type" section (was commented out in original, so kept commented) */}
            {/* <div>
              <label className="block text-md font-medium text-gray-300 mb-2">Account type</label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div
                  className={`
                    border rounded-xl px-4 py-3 flex items-center justify-center cursor-pointer
                    text-base font-medium transition-colors
                    bg-white/10 text-gray-200 border-white/10 hover:bg-white/20
                  `}
                  // onClick={() => setUserType('client')}
                >
                  I need tasks done
                </div>
                <div
                  className={`
                    border rounded-xl px-4 py-3 flex items-center justify-center cursor-pointer
                    text-base font-medium transition-colors
                    bg-white/10 text-gray-200 border-white/10 hover:bg-white/20
                  `}
                  // onClick={() => setUserType('worker')}
                >
                  I want to work
                </div>
              </div>
            </div> */}

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-5 w-5 rounded-md text-purple-600 bg-white/20 border-white/30 focus:ring-purple-500 accent-purple-400"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{" "}
                <Link to="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </label>
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
                  {loading ? "Creating account..." : "Create account"}
                </span>
              </motion.button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-md text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;