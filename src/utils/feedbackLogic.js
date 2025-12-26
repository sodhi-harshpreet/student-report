

/**
 * Get feedback based on score
 * @param {number} score - Score value (0-9)
 * @returns {Object} Feedback object with level, message, and styling properties
 */
export const getFeedback = (score) => {
  if (score >= 8) {
    return {
      level: "Excellent",
      message: "Excellent performance with strong control and minimal errors.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-500",
      progressColor: "#10b981",
      badgeColor: "bg-gradient-to-r from-emerald-500 to-green-500",
    };
  } else if (score >= 6) {
    return {
      level: "Good",
      message: "Good performance with minor inaccuracies. Shows competent use of language.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      progressColor: "#3b82f6",
      badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    };
  } else {
    return {
      level: "Needs Improvement",
      message: "Needs improvement. Practice required to build confidence and accuracy.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-500",
      progressColor: "#f59e0b",
      badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    };
  }
};

/**
 * Get overall feedback for the entire assessment
 * @param {number} overallScore - Overall score (0-9)
 * @returns {Object} Overall feedback object
 */
export const getOverallFeedback = (overallScore) => {
  return getFeedback(overallScore);
};

/**
 * Get skill-specific feedback
 * @param {Object} skill - Skill object with name and score
 * @returns {Object} Skill feedback object
 */
export const getSkillFeedback = (skill) => {
  return {
    ...getFeedback(skill.score),
    skillName: skill.name,
    score: skill.score,
  };
};

