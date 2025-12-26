import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from 'recharts';
import { getFeedback } from '../utils/feedbackLogic';

const ChartSection = ({ skills }) => {
  const [chartType, setChartType] = useState('bar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6 md:p-8 mb-8">
        <div className="h-80 md:h-96 flex items-center justify-center">
          <div className="text-gray-400">No data available</div>
        </div>
      </div>
    );
  }

  const chartData = skills.map(skill => ({
    name: skill.name,
    score: skill.score,
    fullMark: 9,
    color: getFeedback(skill.score).progressColor
  }));

  const averageScore = chartData.reduce((sum, item) => sum + item.score, 0) / chartData.length;
  const radarColor = getFeedback(averageScore).progressColor;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-large border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].payload.name}</p>
          <p className="text-teal-600 font-bold">
            Score: <span className="text-gray-900">{payload[0].value.toFixed(1)}</span> / 9
          </p>
        </div>
      );
    }
    return null;
  };

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6 md:p-8 mb-8">
        <div className="h-80 md:h-96 flex items-center justify-center">
          <div className="text-gray-400">Loading chart...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white rounded-2xl shadow-medium border border-gray-100 p-6 md:p-8 mb-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Visual Analysis</h2>
          <p className="text-gray-600 text-sm">Interactive charts to visualize skill performance</p>
        </div>
        <div className="flex gap-2 bg-gray-50 p-1 rounded-xl">
          <button
            onClick={() => setChartType('bar')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
              chartType === 'bar'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('radar')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
              chartType === 'radar'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Radar Chart
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 md:h-96 w-full" style={{ minHeight: '320px' }}>
        {chartType === 'bar' ? (
          <ResponsiveContainer width="100%" height="100%" key="bar-chart">
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                domain={[0, 9]} 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[12, 12, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%" key="radar-chart">
            <RadarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <PolarGrid stroke="#e5e7eb" opacity={0.5} />
              <PolarAngleAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 9]} 
                tick={{ fill: '#6b7280', fontSize: 11 }}
              />
              <Radar 
                name="Score" 
                dataKey="score" 
                stroke={radarColor} 
                fill={radarColor} 
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default ChartSection;

