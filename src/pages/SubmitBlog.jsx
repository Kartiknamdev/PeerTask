import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient"; // Assuming this path is correct
import { motion } from "framer-motion"; // Import motion for animations

export default function SubmitBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_name: "",
  });
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    setStatus("Submitting your story...");
    setIsSuccess(false); // Reset status for new submission

    const { data, error } = await supabase.from("blog_posts").insert([
      {
        ...formData,
        created_at: new Date().toISOString()
      },
    ]);

    if (error) {
      setStatus("❌ Failed to submit: " + error.message);
      setIsSuccess(false);
    } else {
      setStatus("✅ Story published successfully! Awaiting review."); // Changed to awaiting review
      setIsSuccess(true);
      setFormData({ title: "", content: "", author_name: "" });
      // Redirect to blog page after a short delay to show success message
      setTimeout(() => {
        navigate("/blog");
      }, 2000); // Increased delay slightly
    }
  };

  // Framer Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } },
  };

  return (
    // Main container with dark background gradient from BlogPost.jsx
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 font-sans p-6 sm:p-10 lg:p-12 flex items-center justify-center">
      <motion.div
        className="max-w-3xl w-full mx-auto" // Increased max-w for a slightly larger form area
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section - styled like BlogPost */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 text-center drop-shadow-lg">
          📝 Share Your Story
        </h1>

        {/* Glassmorphic Form Container */}
        <motion.div
          className="relative p-8 rounded-3xl overflow-hidden
                     bg-gradient-to-br from-gray-700/60 to-gray-800/60
                     border border-gray-700/30 shadow-2xl backdrop-filter backdrop-blur-lg
                     transform transition-all duration-300 ease-in-out hover:shadow-purple-500/20"
          variants={formCardVariants}
          initial="hidden"
          animate="visible"
        >
          <form onSubmit={submitBlog} className="space-y-6"> {/* Increased space-y */}
            {/* Input fields with glassmorphic style */}
            <input
              name="title"
              placeholder="Blog title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400
                         border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                         outline-none transition-all duration-200 text-lg" // Larger text size
            />
            <input
              name="author_name"
              placeholder="Your name (optional)"
              value={formData.author_name}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400
                         border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                         outline-none transition-all duration-200 text-lg" // Larger text size
            />
            <textarea
              name="content"
              placeholder="Write your story here..."
              value={formData.content}
              onChange={handleChange}
              required
              rows={8} // Increased rows for more writing space
              className="w-full p-4 rounded-xl bg-white/10 text-white placeholder-gray-400
                         border border-white/10 focus:border-purple-400 focus:ring-1 focus:ring-purple-400
                         outline-none transition-all duration-200 text-lg resize-y" // Larger text size, allow vertical resize
            />

            {/* Submit Button with animated gradient from BlogPost */}
            <button
              type="submit"
              className="relative px-10 py-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600
                         text-white font-semibold text-xl overflow-hidden group shadow-lg hover:shadow-xl
                         transition-all duration-300 ease-in-out w-full sm:w-auto block mx-auto" // Full width on small screens, center on larger
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-700 to-purple-800
                                 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              <span className="relative z-10">Submit Story ✨</span>
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <motion.p
              className={`mt-6 text-center text-md font-medium ${isSuccess ? "text-green-400" : "text-red-400"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}