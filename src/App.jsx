import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import StudentInfo from './components/StudentInfo';
import OverallScore from './components/OverallScore';
import ScoreCard from './components/ScoreCard';
import ChartSection from './components/ChartSection';
import DescriptiveFeedback from './components/DescriptiveFeedback';
import { fetchStudentData } from './utils/api';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const studentData = await fetchStudentData();
        setData(studentData);
      } catch (err) {
        setError(err.message || 'Failed to load assessment data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium text-lg">Loading assessment report...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-large p-8 max-w-md text-center"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* student info */}
        <StudentInfo
          studentName={data.studentName}
          studentId={data.studentId}
          testDate={data.testDate}
        />

        {/* //overall score */}
        <OverallScore overallScore={data.overallScore} />

        {/* //summary of scores */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-emerald-600 rounded-full"></div>
            Summary of Scores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {data.skills.map((skill, index) => (
              <ScoreCard
                key={index}
                label={skill.name}
                score={skill.score}
                index={index}
                description={skill.description}
              />
            ))}
          </div>
        </motion.section>

        {/* //chart section */}
        <ChartSection skills={data.skills} />

        {/* //descriptive feedback */}
        <DescriptiveFeedback skills={data.skills} />

        {/* //footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-gray-600 text-sm font-medium mb-2">
            This report provides a comprehensive evaluation of speaking assessment performance.
          </p>
          <p className="text-gray-500 text-xs">
            For questions or concerns, please contact your instructor.
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default App;
