import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getOverallFeedback } from '../utils/feedbackLogic';

const OverallScore = ({ overallScore }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [mounted, setMounted] = useState(false);
  const feedback = getOverallFeedback(overallScore);

  useEffect(() => {
    setMounted(true);
    const duration = 1500;
    const steps = 60;
    const increment = overallScore / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= overallScore) {
        setDisplayScore(overallScore);
        clearInterval(timer);
      } else {
        setDisplayScore(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [overallScore]);

  const percentage = (overallScore / 9) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative overflow-hidden rounded-3xl shadow-large mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative p-8 md:p-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-6 opacity-90 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Overall Score
          </h2>
          
          <div className="flex items-end gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 15 }}
              className="text-7xl md:text-8xl font-bold tracking-tight"
            >
              {displayScore.toFixed(1)}
            </motion.div>
            <div className="text-3xl md:text-4xl font-light opacity-75 pb-2">/ 9</div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="h-full bg-white rounded-full shadow-lg"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className={`inline-block px-5 py-2.5 rounded-xl ${feedback.badgeColor} shadow-medium mb-4`}
          >
            <span className="text-white font-bold text-sm">{feedback.level}</span>
          </motion.div>

          {/* Feedback Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-teal-50 text-base md:text-lg font-medium mt-4 leading-relaxed"
          >
            {feedback.message}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverallScore;

