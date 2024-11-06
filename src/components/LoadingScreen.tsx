import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

const tips = [
  "Did you know? You can use keyboard shortcuts for quick navigation!",
  "Try our new dark mode for a comfortable night chat experience.",
  "Double-tap a message to react with your favorite emoji!",
  "You can now share files up to 100MB in size.",
];

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 20);

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8"
    >
      <div className="flex items-center mb-8 space-x-4">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MessageSquare size={48} className="text-blue-400" />
        </motion.div>
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          <Sparkles size={48} className="text-purple-400" />
        </motion.div>
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          <Send size={48} className="text-pink-400" />
        </motion.div>
      </div>

      <div className="w-full max-w-md">
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="text-center text-gray-400">
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-sm"
          >
            {tips[currentTip]}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;