import api from "../utils/api";

export const createRecommendation = async (data) => {
  try {
    const response = await api.post("/recommendation/createRecommendation", data);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching recommendation:", error);
    throw error;
  }
}

export const getRecommendationById = async (recommendationId) => {
  try {
    const response = await api.get(`/recommendation/${recommendationId}`);
    return response.data;
  }
  catch (error) {
    console.error("Error fetching recommendation:", error);
    throw error;
  }
};

export const getRecommendationHistory = async () => {
  try {
    const response = await api.get("/recommendation/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendation history:", error);
    throw error;
  }
};

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};
