import mongoose from "mongoose";

const gemstoneRecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    birthTime: {
      type: String,
      required: true,
    },

    birthPlace: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    gemstone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true, // AI-generated explanation for the recommendation
    },

    planet: {
      type: String,
      required: true,
    },
    imageUrl:{
        type: String,
    },
    purchaseLinks: [
      {
        websiteName: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        price: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "GemstoneRecommendation",
  gemstoneRecommendationSchema
);