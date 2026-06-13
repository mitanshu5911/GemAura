import GemstoneRecommendation from "../models/Recommendation.js";
import { getAiRecommendations } from "../services/geminiService.js";
import gemstoneImages from "../utils/gemstoneImages.js";

export const createGemstoneRecommendation = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      birthTime,
      birthPlace,
      goal,
    } = req.body;

    // Validate input
    if (
      !fullName ||
      !dateOfBirth ||
      !birthTime ||
      !birthPlace ||
      !goal
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Get AI recommendation
    const aiResponse = await getAiRecommendations({
      fullName,
      dateOfBirth,
      birthTime,
      birthPlace,
      goal,
    });

    // Normalize gemstone name
    const normalizedGemstone = aiResponse.gemstone
      .split("(")[0]
      .trim();

    // Get image from local mapping
    const imageUrl =
      gemstoneImages[normalizedGemstone] || "";

    // Save to database
    const recommendation = await GemstoneRecommendation.create({
      userId: req.user._id,
      fullName,
      dateOfBirth,
      birthTime,
      birthPlace,
      goal,
      gemstone: aiResponse.gemstone,
      planet: aiResponse.planet,
      description: aiResponse.description,
      purchaseLinks: aiResponse.purchaseLinks || [],
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Recommendation generated successfully.",
      data: {...recommendation, id: recommendation._id},
    });
  } catch (error) {
    console.error("Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate recommendation.",
      error: error.message,
    });
  }
};



export const getRecommendationById = async (req, res) => {
  try {
    const { recommendationId } = req.params;

    const recommendation = await GemstoneRecommendation.findOne({
      _id: recommendationId,
      userId: req.user._id, // ensures user can only access their own data
    });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: recommendation._id,
        fullName: recommendation.fullName,
        dateOfBirth: recommendation.dateOfBirth,
        birthTime: recommendation.birthTime,
        birthPlace: recommendation.birthPlace,
        goal: recommendation.goal,
        gemstone: recommendation.gemstone,
        planet: recommendation.planet,
        description: recommendation.description,
        purchaseLinks: recommendation.purchaseLinks,
        imageUrl: recommendation.imageUrl,
        createdAt: recommendation.createdAt,
      },
    });
  } catch (error) {
    console.error("Get Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recommendation.",
      error: error.message,
    });
  }
};

export const getUserRecommendationHistory = async (req, res) => {
  try {
    const recommendations = await GemstoneRecommendation.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 }) // Newest first
      .lean();

    const formattedRecommendations = recommendations.map((item) => ({
      id: item._id,
      fullName: item.fullName,
      dateOfBirth: item.dateOfBirth,
      birthTime: item.birthTime,
      birthPlace: item.birthPlace,
      goal: item.goal,
      gemstone: item.gemstone,
      planet: item.planet,
      description: item.description,
      purchaseLinks: item.purchaseLinks || [],
      imageUrl: item.imageUrl || "",
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      success: true,
      message: "Recommendation history fetched successfully.",
      count: formattedRecommendations.length,
      data: formattedRecommendations,
    });
  } catch (error) {
    console.error("Get Recommendation History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recommendation history.",
      error: error.message,
    });
  }
};