import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        console.log("Fetching blogs...");
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, title, content, author_name, created_at")
          .limit(100)
          .eq('approved', true);

        console.log('Raw Supabase response:', { data, error });

        if (error) {
          console.error("Error fetching blogs:", error.message);
          return;
        }

        console.log("Fetched blogs data:", data);
        if (Array.isArray(data)) {
          console.log("Number of posts:", data.length);
          setPosts(data);
        } else {
          console.error("Data is not an array:", data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Exception in fetchBlogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children animations
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 font-sans p-6 sm:p-10 lg:p-12">
      {/* Back to Home Button */}
      <motion.div
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-gray-700/60 to-gray-800/60 
                     border border-gray-700/30 text-gray-300 hover:text-white transition-all duration-300
                     group hover:shadow-lg hover:shadow-purple-500/10"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </motion.div>

      {/* Header Section */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-16 px-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center sm:text-left mb-6 sm:mb-0">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3 drop-shadow-lg">
            📚 PeerTask Stories
          </h1>
          <p className="text-lg text-gray-400 max-w-xl">
            Dive into inspiring narratives about students using PeerTask to learn, collaborate, and grow together.
          </p>
        </div>
        <Link
          to="/submit-story"
          className="relative px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold text-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-700 to-purple-800 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          <span className="relative z-10">Share Your Story ✨</span>
        </Link>
      </motion.div>

      {/* Blog Posts Grid */}
      {loading ? (
        <motion.p
          className="text-center text-gray-400 text-xl mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading inspiring stories...
        </motion.p>
      ) : posts.length === 0 ? (
        <motion.p
          className="text-center text-gray-400 text-xl mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          No stories available yet. Be the first to share!
        </motion.p>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="relative p-7 rounded-3xl overflow-hidden cursor-pointer
                         bg-gradient-to-br from-gray-700/60 to-gray-800/60 
                         border border-gray-700/30 shadow-2xl
                         transform hover:-translate-y-2 hover:shadow-purple-500/20
                         transition-all duration-300 ease-in-out group"
              variants={itemVariants}
              onClick={() => {
                setSelectedPost(post);
                setIsModalOpen(true);
              }}
            >
              {/* Glassmorphism overlay for subtle shine */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl"></div>

              <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-300 leading-tight">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 mb-2 font-mono">
                By {post.author_name || "Anonymous"} •{" "}
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-300 text-base leading-relaxed mb-5 whitespace-pre-line">
                {post.content.length > 200
                  ? post.content.substring(0, 200) + "..."
                  : post.content}
              </p>
              <button className="relative z-10 text-pink-400 hover:text-pink-300 font-semibold flex items-center group-hover:underline transition-colors duration-200">
                Read More
                <svg
                  className="ml-2 w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Modal with Framer Motion */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 
                         backdrop-blur-xl rounded-2xl max-w-3xl w-full
                         shadow-3xl p-8 border border-gray-700/50 text-gray-200"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-3xl font-light transition-colors duration-200"
                aria-label="Close modal"
              >
                ✕
              </button>
              <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-purple-400 leading-tight">
                {selectedPost.title}
              </h2>
              <p className="text-md text-gray-400 mb-6 font-mono">
                By {selectedPost.author_name || "Anonymous"} •{" "}
                {new Date(selectedPost.created_at).toLocaleDateString()}
              </p>
              <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed space-y-4">
                <p>{selectedPost.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}