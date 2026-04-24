import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineDocument,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineTag,
  HiChevronRight,
  HiChevronLeft,
  HiCheck,
  HiUpload,
  HiX,
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "../../contextStore/task.context";
import { useAuth } from "../../contextStore/auth.context";

const categories = [
  "ProofReading",
  "Editing",
  "Formatting",
  "Transcription",
  "Resume",
  "Legal",
  "Academic",
  "Business",
  "Other",
];

const CreateTask = () => {
  const navigate = useNavigate();
  const { submitTask } = useTasks();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    budget: "",
    deadline: "",
    category: "",
    tags: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 7;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      return fileSizeInMB <= 10;
    });
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !formData.title.trim()) newErrors.title = "Title is required";
    if (step === 2 && !formData.description.trim()) newErrors.description = "Description is required";
    if (step === 3 && !formData.requirements.trim()) newErrors.requirements = "Requirements are required";
    if (step === 4 && !formData.category) newErrors.category = "Category is required";
    if (step === 5) {
      if (!formData.budget || isNaN(formData.budget)) newErrors.budget = "Valid budget is required";
      if (!formData.deadline) newErrors.deadline = "Deadline is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in to create a task");
      navigate("/login");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("taskTitle", formData.title);
    data.append("description", formData.description);
    data.append("requirements", formData.requirements);
    data.append("category", formData.category);
    data.append("budget", formData.budget);
    data.append("deadline", formData.deadline);
    data.append("createdBy", user?._id);
    data.append("status", "open");

    formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")
      .forEach((tag) => data.append("tags", tag));

    files.forEach((file) => data.append("attachments", file));

    try {
      const result = await submitTask(data);
      if (result?.status === 201) {
        setStep(totalSteps); // Move to success step
      } else {
        const errorMsg = result?.data?.message || "Something went wrong";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Task submission error:", error);
      const errorMsg = error.response?.data?.message || error.message || "Server error";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.95 },
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <HiOutlineDocument className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              Ready to post a task?
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
              We'll guide you through a few quick steps to get your task in front of the best freelancers.
            </p>
            <button
              onClick={() => setStep(1)}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700"
            >
              Get Started
              <HiChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );

      case 1:
        return (
          <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs">Step 1 of 6</span>
              <h2 className="text-3xl font-bold text-gray-900">What's the title of your task?</h2>
              <p className="text-gray-500 text-lg">Keep it short and descriptive to attract the right people.</p>
            </div>
            <div className="relative group">
              <input
                autoFocus
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Proofread Marketing Document"
                className={`w-full bg-gray-50 border-2 ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:bg-white rounded-2xl px-6 py-5 text-xl transition-all outline-none shadow-sm group-hover:shadow-md`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-2 font-medium">{errors.title}</p>}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs">Step 2 of 6</span>
              <h2 className="text-3xl font-bold text-gray-900">Describe the task in detail</h2>
              <p className="text-gray-500 text-lg">Explain what needs to be done and the desired outcome.</p>
            </div>
            <textarea
              autoFocus
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide context, goals, and any specific details..."
              className={`w-full bg-gray-50 border-2 ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:bg-white rounded-2xl px-6 py-5 text-lg transition-all outline-none shadow-sm`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1 font-medium">{errors.description}</p>}
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs">Step 3 of 6</span>
              <h2 className="text-3xl font-bold text-gray-900">What are the requirements?</h2>
              <p className="text-gray-500 text-lg">List any specific skills, qualifications or tools needed.</p>
            </div>
            <textarea
              autoFocus
              name="requirements"
              rows={5}
              value={formData.requirements}
              onChange={handleInputChange}
              placeholder="e.g., Experience with financial reports, Native English speaker..."
              className={`w-full bg-gray-50 border-2 ${errors.requirements ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:bg-white rounded-2xl px-6 py-5 text-lg transition-all outline-none shadow-sm`}
            />
            {errors.requirements && <p className="text-red-500 text-sm mt-1 font-medium">{errors.requirements}</p>}
          </motion.div>
        );

      case 4:
        return (
          <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs">Step 4 of 6</span>
              <h2 className="text-3xl font-bold text-gray-900">Pick a category</h2>
              <p className="text-gray-500 text-lg">Help freelancers find your task by categorizing it correctly.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`p-4 rounded-xl border-2 transition-all font-medium text-center ${
                    formData.category === cat
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md transform scale-105"
                      : "border-gray-100 bg-white text-gray-600 hover:border-indigo-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && <p className="text-red-500 text-sm mt-1 font-medium">{errors.category}</p>}
          </motion.div>
        );

      case 5:
        return (
          <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs">Step 5 of 6</span>
              <h2 className="text-3xl font-bold text-gray-900">Budget & Deadline</h2>
              <p className="text-gray-500 text-lg">Set expectations for payment and timing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Estimated Budget (INR)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineCurrencyDollar className="h-6 w-6 text-indigo-400" />
                  </div>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="500"
                    className={`w-full bg-gray-50 border-2 ${errors.budget ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:bg-white rounded-2xl pl-12 pr-6 py-4 text-xl outline-none transition-all`}
                  />
                </div>
                {errors.budget && <p className="text-red-500 text-sm font-medium">{errors.budget}</p>}
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">Deadline</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineCalendar className="h-6 w-6 text-indigo-400" />
                  </div>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-50 border-2 ${errors.deadline ? 'border-red-500' : 'border-gray-200'} focus:border-indigo-500 focus:bg-white rounded-2xl pl-12 pr-6 py-4 text-xl outline-none transition-all`}
                  />
                </div>
                {errors.deadline && <p className="text-red-500 text-sm font-medium">{errors.deadline}</p>}
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div key="step6" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="space-y-2">
              <span className="text-indigo-600 font-semibold tracking-wider uppercase text-xs">Final Step</span>
              <h2 className="text-3xl font-bold text-gray-900">Tags & Attachments</h2>
              <p className="text-gray-500 text-lg">Add finishing touches to make your task stand out.</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Tags (comma separated)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiOutlineTag className="h-6 w-6 text-indigo-400" />
                  </div>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="urgent, business, formatting"
                    className="w-full bg-gray-50 border-2 border-gray-200 focus:border-indigo-500 focus:bg-white rounded-2xl pl-12 pr-6 py-4 text-lg outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Supporting Documents</label>
                <div className="border-2 border-dashed border-indigo-200 rounded-2xl p-8 text-center bg-indigo-50/30 hover:bg-indigo-50/50 transition-colors cursor-pointer relative group">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <HiUpload className="w-10 h-10 text-indigo-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-indigo-700 font-medium">Click to upload or drag files</p>
                  <p className="text-gray-500 text-xs mt-1">PDF, DOC, TXT (Max 10MB each)</p>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                        <span className="text-sm text-gray-600 truncate flex-1 mr-2">{file.name}</span>
                        <button onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500">
                          <HiX className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 7:
        return (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner animate-bounce">
              <HiCheck className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Task Published!</h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-10 leading-relaxed">
              Your task is now live and freelancers can start submitting proposals. Good luck!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/dashboardLayout/history")}
                className="w-full sm:w-auto px-8 py-4 font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
              >
                View Task History
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-8 py-4 font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Post Another Task
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-12 pt-4 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        {step > 0 && step < totalSteps && (
          <div className="mb-12 relative">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 6) * 100}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500"
              />
            </div>
            <div className="absolute -top-1 right-0 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Progress: {Math.round((step / 6) * 100)}%
            </div>
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 overflow-hidden min-h-[500px] flex flex-col">
          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {step > 0 && step < totalSteps && (
            <div className="px-8 md:px-12 py-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={prevStep}
                className="flex items-center text-gray-500 hover:text-gray-900 font-bold transition-colors"
              >
                <HiChevronLeft className="mr-1 w-5 h-5" />
                Back
              </button>
              
              {step === 6 ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish Task"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="group px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all flex items-center"
                >
                  Continue
                  <HiChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTask;