// function to simulate api call to get student data
import studentData from '../data/studentData.json';

/**

 * @returns {Promise<Object>} Student assessment data
 */
export const fetchStudentData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real application, this would be:
  // const response = await fetch('/api/student-assessment');
  // return await response.json();
  
  return studentData;
};

/**
 * Get student data synchronously (for immediate use)
 * @returns {Object} Student assessment data
 */
export const getStudentData = () => {
  return studentData;
};

