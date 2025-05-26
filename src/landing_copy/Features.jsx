// import React from 'react';
// import { Check, Zap, Layers, Users, BarChart, Lock } from 'lucide-react';

// const Feature = ({ icon, title, description }) => {
//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// };

// const Features = () => {
//   const features = [ /* ...same feature objects... */ ];

//   return (
//     <section id="features" className="py-24 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <span className="text-blue-600 font-semibold tracking-wider uppercase">Features</span>
//           <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Everything you need to boost productivity</h2>
//           <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
//             Horizon provides all the tools you need to organize work, streamline processes, and collaborate effectively.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <Feature
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const featureData = [
  {
    id: 1,
    title: 'Create & Find Tasks',
    description: 'Easily post tasks you need help with or browse available tasks that match your skills and interests.',
    icon: '📝',
  },
  {
    id: 2,
    title: 'Earn Value',
    description: 'Complete tasks to earn points, value, or payments, building your reputation in the process.',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Return the Favor',
    description: 'Help others with their tasks, creating a supportive community network of shared knowledge and assistance.',
    icon: '🤝',
  },
  {
    id: 4,
    title: "Build Your Profile",
    description: "Showcase your skills and completed tasks to build a trusted reputation in the PeerTask community.",
    icon: "👤"
  },
  {
    id: 5,
    title: "Secure Transactions",
    description: "Our platform ensures secure interactions and fair exchanges for all participants.",
    icon: "🔒"
  },
  {
    id: 6,
    title: "Connect & Collaborate",
    description: "Find like-minded students to form study groups and long-term collaborative experience.",
    icon: "🔄"
  }
];

const FeatureCard = ({ feature, isActive, setActiveFeature }) => {
  return (
    <motion.div
      layoutId={`feature-${feature.id}`}
      onClick={() => setActiveFeature(feature.id)}
      className={`p-8 rounded-2xl cursor-pointer backdrop-blur-sm ${
        isActive 
          ? 'bg-white/90 shadow-xl scale-105' 
          : 'bg-white/60 hover:bg-white/80 hover:shadow-lg'
      } transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: isActive ? 1.02 : 1.05 }}
    >
      <motion.div 
        className="text-4xl mb-4"
        whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      <motion.div
        className="h-1 bg-blue-500 rounded-full mt-4"
        initial={{ width: 0 }}
        whileInView={{ width: isActive ? '100%' : '0%' }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const moveX = useSpring(mouseX, springConfig);
  const moveY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const targetX = (clientX - window.innerWidth / 2) * 0.05;
      const targetY = (clientY - window.innerHeight / 2) * 0.05;
      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="features" className="relative min-h-screen flex items-center py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 opacity-30 blur-2xl z-0" />
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl z-0"
        style={{ x: moveX, y: moveY }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400 rounded-full opacity-20 blur-3xl z-0"
        style={{ x: useTransform(moveX, x => -x), y: useTransform(moveY, y => -y) }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-blue-600 font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Features
          </motion.span>
          <motion.h2 
            className="mt-2 text-4xl md:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Everything you need to succeed together
          </motion.h2>
          <motion.p 
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Join a vibrant community of students helping each other achieve their goals through collaboration and mutual support.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {featureData.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isActive={activeFeature === feature.id}
              setActiveFeature={setActiveFeature}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
