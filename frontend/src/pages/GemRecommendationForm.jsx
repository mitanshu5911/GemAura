import { useState } from "react";
import { createRecommendation } from "../services/recommendationService";
import RecommendationLoading from "../components/common/RecommendationLoading";
import image from "../assets/recbg.png";
// import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Clock3,
  MapPin,
  Briefcase,
  Gem,
  Heart,
  Shield,
  Sparkles,
  Brain,
  Trophy,
  Coins,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const goals = [
  "Career Growth",
  "Business",
  "Wealth",
  "Education",
  "Marriage",
  "Health",
  "Mental Peace",
  "Confidence",
  "Relationships",
  "Leadership",
  "Foreign Opportunities",
  "Spiritual Growth",
];

const GemRecommendationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    birthTime: "",
    birthPlace: "",
    goal: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await createRecommendation(formData);

    if (res?.success) {
     

      
      
        navigate(`/recommendation/${res.data.id}/true`);
    

      return;
    }

    showError(
      res?.message || "Failed to generate recommendation."
    );
  } catch (err) {
    console.error(err);

    showError(
      err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
     {loading && <RecommendationLoading />}

   {!loading &&( <div
      className="h-[87.5vh] w-full flex items-center justify-center bg-cover bg-center px-10 py-0 bg-no-repeat"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full flex gap-x-5 items-center justify-center ">
        <div className="w-1/4 max-h-70 flex flex-col justify-center px-6 py-4">
          {/* Heading */}
          <h1 className="text-3xl font-serif font-semibold leading-tight text-[#4B3525]">
            Discover Your
            <br />
            Perfect Gemstone
          </h1>

          {/* Decorative line */}
          <div className="flex items-center gap-2 my-5">
            <div className="h-[2px] w-12 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-sm leading-6 text-gray-600 max-w-xs">
            Get AI-powered gemstone recommendations aligned with your birth
            details and life goals.
          </p>
        </div>
        <div className="w-3/4  h-110 flex items-center justify-baseline px-1 ">
          <div className="max-h-120 w-4/5  flex-col items-center justify-between space-y-3 px-4 py-5 rounded-2xl bg-white/50 backdrop-blur-sm">
            <div className="w-full flex flex-col items-center justify-center text-center ">
              {/* Icon + Heading */}
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-amber-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-serif font-semibold text-[#3F342C]">
                  Tell Us About Yourself
                </h2>
              </div>

              {/* Subtitle */}
              <p className="mt-1 text-sm text-gray-500">
                Please provide your details to receive accurate AI
                recommendations.
              </p>
            </div>
            <div className="w-full rounded-2xl  p-4 space-y-4">
            <form
               onSubmit={handleSubmit}
  className="w-full rounded-2xl backdrop-blur-sm p-4 space-y-3"
            >
              {/* Full Name */}
              <div>
                <label className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#5a4632]">
                  <User className="h-4 w-4 text-amber-600" />
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="h-10 w-full rounded-xl border border-amber-100 px-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              {/* DOB + Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#5a4632]">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="h-10 w-full rounded-xl border border-amber-100 px-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </div>

                <div>
                  <label className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#5a4632]">
                    <Clock3 className="h-4 w-4 text-amber-600" />
                    Birth Time
                  </label>

                  <input
                    type="time"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleChange}
                    className="h-10 w-full rounded-xl border border-amber-10 px-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>

              {/* Birth Place */}
              <div>
                <label className="mb-1 flex items-center gap-2 text-xs font-semibold text-[#5a4632]">
                  <MapPin className="h-4 w-4 text-amber-600" />
                  Place of Birth
                </label>

                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="h-10 w-full rounded-xl border border-amber-100  px-3 text-sm outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                />
              </div>

              {/* Goals */}
              {/* Goal Selection */}
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[#5a4632]">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  Primary Goal
                </label>

                <div className="relative">
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-xl border border-amber-100 bg-white px-3 pr-10 text-sm text-gray-700 outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  >
                    <option value="">Choose your primary objective</option>

                    {goals.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>

                  <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Generating Recommendation..."
                  : "✨ Get AI Recommendation"}
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
)}
    </>
  );
};

export default GemRecommendationForm;
