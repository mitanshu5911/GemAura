import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecommendationLoading from "../components/common/RecommendationLoading";
// import Recommendation from "../../../backend/src/models/Recommendation";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";
import { getRecommendationById } from "../services/recommendationService";
import { motion } from "framer-motion";
import {
  Gem,
  Sparkles,
  Calendar,
  Clock3,
  MapPin,
  User,
  Target,
  Orbit,
  ExternalLink,
} from "lucide-react";
const GetRecommendation = () => {
  const { recommendationId, isGenerating } = useParams();

  const { startLoading, stopLoading } = useLoading();

  const { showError } = useToast();

  const [recommendation, setRecommendation] = useState(null);
  const [showGeneratingScreen, setShowGeneratingScreen] = useState(
    isGenerating === "true",
  );

  useEffect(() => {
  let mounted = true;

  const fetchRecommendation = async () => {
    try {
      if (isGenerating !== "true") {
        startLoading("Loading recommendation...");
      }

      const res = await getRecommendationById(recommendationId);

      if (isGenerating === "true") {
        await new Promise((resolve) => setTimeout(resolve, 3500));
      }

      if (mounted) {
        setRecommendation(res.data);
        console.log(res.data);
      }
    } catch (error) {
      if (mounted) {
        showError(
          error?.response?.data?.message ||
            "Failed to load recommendation."
        );
      }
    } finally {
      if (mounted) {
        stopLoading();
        setShowGeneratingScreen(false);
      }
    }
  };

  fetchRecommendation();

  return () => {
    mounted = false;
    stopLoading();
  };
}, [recommendationId, isGenerating]);

  if (showGeneratingScreen) { return <RecommendationLoading />; }

  if (!recommendation) {
  return null;
  // or:
  // return (
  //   <div className="min-h-[87.5vh] flex items-center justify-center">
  //     Loading...
  //   </div>
  // );
}

    const InfoCard = ({ icon, title, children }) => (
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-2xl bg-white/70 backdrop-blur border border-amber-100 p-5 shadow-md"
      >
        <div className="flex items-center gap-2 text-amber-600">
          {icon}
          <span className="font-semibold">{title}</span>
        </div>
        <p className="mt-3 text-gray-700 font-medium">{children}</p>
      </motion.div>
    );

  return <div>
         <div className="min-h-[87.5vh] bg-gradient-to-br from-[#fffdf8] via-[#fff9ef] to-[#f8ecd0] px-8 py-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[32px] bg-white/70 backdrop-blur-xl shadow-2xl border border-amber-100 p-8"
              >
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-amber-300/20 blur-3xl animate-pulse" />
                      <img
                        src={recommendation.imageUrl}
                        alt={recommendation.gemstone}
                        className="relative h-72 w-72 object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
        
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700">
                      <Sparkles size={18} />
                      AI Recommended
                    </div>
        
                    <h1 className="mt-5 text-5xl font-bold text-[#3F2E1E]">
                      {recommendation.gemstone}
                    </h1>
        
                    <div className="mt-4 flex items-center gap-2 text-lg text-amber-700">
                      <Orbit size={20} />
                      Planet: {recommendation.planet}
                    </div>
        
                    <p className="mt-6 leading-8 text-gray-600">
                      {recommendation.description}
                    </p>
                  </div>
                </div>
              </motion.div>
        
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <InfoCard icon={<User size={18} />} title="Full Name">
                  {recommendation.fullName}
                </InfoCard>
                <InfoCard icon={<Calendar size={18} />} title="Date of Birth">
                  {new Date(recommendation.dateOfBirth).toLocaleDateString()}
                </InfoCard>
                <InfoCard icon={<Clock3 size={18} />} title="Birth Time">
                  {recommendation.birthTime}
                </InfoCard>
                <InfoCard icon={<MapPin size={18} />} title="Birth Place">
                  {recommendation.birthPlace}
                </InfoCard>
                <InfoCard icon={<Target size={18} />} title="Primary Goal">
                  {recommendation.goal}
                </InfoCard>
                <InfoCard icon={<Gem size={18} />} title="Recommended Gem">
                  {recommendation.gemstone}
                </InfoCard>
              </div>
        
              <div className="mt-10 rounded-3xl bg-white/70 backdrop-blur border border-amber-100 p-6 shadow-xl">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#3F2E1E]">
                  <Gem />
                  Buy From Trusted Sellers
                </h2>
        
                <div className="flex flex-wrap gap-4">
                  {recommendation.purchaseLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-3 font-semibold text-white transition hover:scale-105"
                    >
                      {link.name}
                      <ExternalLink size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
  </div>;
};

export default GetRecommendation;
