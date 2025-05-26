import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const targetX = (clientX - window.innerWidth / 2) * 0.1;
      const targetY = (clientY - window.innerHeight / 2) * 0.1;
      mouseX.set(targetX);
      mouseY.set(targetY);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-16 sm:py-0">      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0 animate-fade-in" />      <motion.div 
        className="absolute top-1/4 right-4 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"
        style={{ 
          x: moveX,
          y: moveY,
          rotate: moveX
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-4 sm:left-20 w-[20rem] sm:w-[35rem] h-[18rem] sm:h-[28rem] bg-indigo-300 rounded-full opacity-30 blur-3xl"
        style={{ 
          x: moveX,
          y: moveY,
          rotate: moveY
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 pt-20 md:pt-28">
          <div className="flex-1 max-w-4xl animate-slide-in-left text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6">
              <span className="block mb-1">Students Helping Students</span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Succeed Together
              </span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-8 md:mb-14 px-2 sm:px-0">
              PeerTask connects students to complete micro-tasks, earn value, and build a community of mutual support.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mb-16">
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 sm:ml-4 h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <Link 
                to="/blog" 
                className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center"
              >
                Read Stories <span className="ml-2 sm:ml-4 text-xl">📚</span>
              </Link>
              <a 
                href="#features" 
                className="w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:scale-105 transition-all flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
            
            <div className="hidden md:block">
              <p className="text-lg text-gray-500 mb-8">Trusted by a community of active users</p>
              <motion.div 
                className="grid grid-cols-3 gap-12"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-gray-600 font-semibold p-4 rounded-lg hover:bg-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  variants={item}
                >
                  <motion.div 
                    className="text-4xl text-blue-600 font-bold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-blue-600 to-indigo-600"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    100+
                  </motion.div>
                  <div>Active Students</div>
                </motion.div>
                <motion.div 
                  className="text-gray-600 font-semibold p-4 rounded-lg hover:bg-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  variants={item}
                >
                  <motion.div 
                    className="text-4xl text-blue-600 font-bold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-blue-600 to-indigo-600"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    50+
                  </motion.div>
                  <div>Tasks Completed</div>
                </motion.div>
                <motion.div 
                  className="text-gray-600 font-semibold p-4 rounded-lg hover:bg-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  variants={item}
                >
                  <motion.div 
                    className="text-4xl text-blue-600 font-bold bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-blue-600 to-indigo-600"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    95%
                  </motion.div>
                  <div>Satisfaction Rate</div>
                </motion.div>
              </motion.div>
            </div>
          </div>          <motion.div 
            className="flex-1 hidden md:block"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="relative w-full h-[480px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="/src/assets/peerwork.png" 
                alt="PeerWork" 
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
