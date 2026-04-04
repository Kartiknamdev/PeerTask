import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpDown, Clock, BookOpen, X, ArrowLeft, Sparkles } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────
function readTime(text) {
  const words = text?.trim().split(/\s+/).length || 0;
  return Math.max(1, Math.ceil(words / 200));
}

function authorInitials(name) {
  if (!name) return "A";
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

const AVATAR_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-teal-500 to-cyan-600",
  "from-amber-500 to-orange-600",
];
function avatarColor(id) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

// ── Skeleton Card ─────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="p-7 rounded-3xl bg-white/5 border border-white/10 animate-pulse space-y-4">
      <div className="h-4 w-20 rounded-full bg-white/10" />
      <div className="h-6 w-4/5 rounded-lg bg-white/10" />
      <div className="h-4 w-3/5 rounded-lg bg-white/10" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-2/3 rounded bg-white/10" />
      </div>
      <div className="h-4 w-24 rounded-full bg-white/10" />
    </div>
  );
}

// ── Modal Reading Progress ────────────────────────────────────────────
function ReadingProgress({ containerRef }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight <= clientHeight ? 100 : (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, pct));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);
  return (
    <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-2xl overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-400 to-violet-500"
        style={{ width: `${progress}%` }}
        transition={{ ease: "linear" }}
      />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────
export default function BlogPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const modalBodyRef = useRef(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("id, title, content, author_name, created_at")
          .limit(100)
          .eq("approved", true);
        if (error) { console.error("Error fetching blogs:", error.message); return; }
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Exception in fetchBlogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") setIsModalOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filtered = posts
    .filter((p) => {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
    })
    .sort((a, b) =>
      sort === "newest"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );

  const openPost = useCallback((post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  }, []);

  // ── Variants ──
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 14 } },
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-gray-200 font-sans">
      {/* ── Background orbs ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #6366f1, #3b82f6)" }} />
        <div className="absolute bottom-[-80px] left-[-60px] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, #7c3aed, #2563eb)" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {/* ── Back button ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* ── Hero header ── */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12"
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-3">
              <Sparkles className="w-3 h-3" /> Community Stories
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-2">
              PeerTask{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <p className="text-slate-400 max-w-md">
              Inspiring narratives from students using PeerTask to learn, collaborate, and grow together.
            </p>
          </div>
          <Link
            to="/submit-story"
            className="relative shrink-0 px-6 py-3 rounded-full font-semibold text-white overflow-hidden group shadow-lg shadow-blue-900/30 hover:shadow-blue-700/40 transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
          >
            <span className="relative z-10 flex items-center gap-2">Share Your Story ✨</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </Link>
        </motion.div>

        {/* ── Search + Sort ── */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition-all duration-300"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setSort((s) => (s === "newest" ? "oldest" : "newest"))}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-indigo-500/50 hover:text-white transition-all duration-300 shrink-0"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sort === "newest" ? "Newest First" : "Oldest First"}
          </button>
        </motion.div>

        {/* ── Result count ── */}
        {!loading && posts.length > 0 && (
          <p className="text-slate-500 text-sm mb-6">
            {filtered.length === posts.length
              ? `${posts.length} stories`
              : `${filtered.length} of ${posts.length} stories`}
          </p>
        )}

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-32 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              {search ? "No stories match your search" : "No stories yet"}
            </h3>
            <p className="text-slate-500 max-w-xs">
              {search ? "Try a different keyword" : "Be the first to share your PeerTask experience!"}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-4 px-5 py-2 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/50 transition-all">
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((post, idx) => (
              <motion.div
                key={post.id}
                className="relative p-6 rounded-2xl cursor-pointer border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-indigo-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                onClick={() => openPost(post)}
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                {/* Tag + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300">
                    Student Story
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" /> {readTime(post.content)} min read
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-indigo-200 transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                  {post.content.length > 160 ? post.content.substring(0, 160) + "…" : post.content}
                </p>

                {/* Footer: author + read more */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColor(post.id)} flex items-center justify-center text-xs font-bold text-white`}>
                      {authorInitials(post.author_name)}
                    </div>
                    <span className="text-xs text-slate-400">
                      {post.author_name || "Anonymous"} · {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <span className="text-indigo-400 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <BookOpen className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isModalOpen && selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
          >
            <motion.div
              className="relative bg-[#0d1424] border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Reading progress bar */}
              <ReadingProgress containerRef={modalBodyRef} />

              {/* Modal header */}
              <div className="flex items-start justify-between gap-4 px-7 pt-8 pb-4 shrink-0">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 inline-block mb-3">
                    Student Story
                  </span>
                  <h2 className="text-2xl font-extrabold text-white leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-1 shrink-0 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Author + meta */}
              <div className="flex items-center gap-3 px-7 pb-5 shrink-0 border-b border-white/10">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(selectedPost.id)} flex items-center justify-center text-sm font-bold text-white`}>
                  {authorInitials(selectedPost.author_name)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{selectedPost.author_name || "Anonymous"}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    {new Date(selectedPost.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    <span className="w-1 h-1 rounded-full bg-slate-600 inline-block" />
                    <Clock className="w-3 h-3" /> {readTime(selectedPost.content)} min read
                  </p>
                </div>
              </div>

              {/* Scrollable body */}
              <div ref={modalBodyRef} className="px-7 py-6 overflow-y-auto text-slate-300 text-base leading-relaxed whitespace-pre-line">
                {selectedPost.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
