import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getSkillFeedback } from '../utils/feedbackLogic';

const DescriptiveFeedback = ({ skills }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Descriptive Feedback</h2>
        <p className="text-gray-600 text-sm">Detailed assessment for each skill area</p>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => {
          const feedback = getSkillFeedback(skill);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl p-5 ${feedback.bgColor} border-l-4 ${feedback.borderColor} hover-lift transition-all duration-300 shadow-soft hover:shadow-medium`}
            >
              {/* Decorative gradient overlay */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${feedback.bgColor} opacity-20 blur-2xl`}></div>
              
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${feedback.bgColor} ${feedback.color} flex items-center justify-center border-2 ${feedback.borderColor}`}>
                      <span className="font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${feedback.color}`}>
                      {skill.score.toFixed(1)}
                    </span>
                    <span className="text-gray-500 font-medium">/ 9</span>
                    <div className={`px-3 py-1 rounded-lg ${feedback.badgeColor} shadow-sm`}>
                      <span className="text-white text-xs font-bold">{feedback.level}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                  {feedback.message}
                </p>
                
                {skill.description && (
                  <p className="text-gray-600 text-sm mt-2 italic">
                    {skill.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default DescriptiveFeedback;

