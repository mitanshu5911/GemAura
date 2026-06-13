import User from "../models/User.js";
import GemstoneRecommendation from "../models/Recommendation.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalRecommendations] = await Promise.all([
      User.countDocuments(),
      GemstoneRecommendation.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully.",
      data: {
        totalUsers,
        totalRecommendations,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
      error: error.message,
    });
  }
};