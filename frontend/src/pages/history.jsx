
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gem, Orbit, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";
import { getRecommendationHistory } from "../services/recommendationService";

const History = () => {
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const { showError } = useToast();
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        startLoading("Loading your recommendations...");
        const res = await getRecommendationHistory();
        if (mounted) setItems(res.data || []);
      } catch (e) {
        if (mounted) showError(e?.response?.data?.message || "Failed to load history");
      } finally {
        stopLoading();
      }
    })();
    return () => { mounted = false; stopLoading(); };
  }, []);

  return (
    <div className="min-h-[87.5vh] bg-gradient-to-br from-[#fffdf8] via-[#fff8ef] to-[#f9edd5] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3F2E1E] mb-2">Recommendation History</h1>
        <p className="text-gray-600 mb-8">View your previous AI gemstone recommendations.</p>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-white/70 backdrop-blur p-10 text-center shadow">
            <Gem className="mx-auto h-12 w-12 text-amber-500 mb-4"/>
            <h2 className="text-2xl font-semibold">No recommendations yet</h2>
            <p className="text-gray-500 mt-2">Generate your first recommendation to see it here.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {items.map((rec, idx) => (
              <motion.button
                key={rec.id}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{delay:idx*0.05}}
                onClick={() => navigate(`/recommendation/${rec.id}/false`)}
                className="w-full text-left rounded-3xl bg-white/75 backdrop-blur border border-amber-100 shadow-lg p-6 hover:shadow-2xl transition"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <img src={rec.imageUrl} alt={rec.gemstone} className="h-28 w-28 object-contain shrink-0"/>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-bold text-[#3F2E1E]">{rec.gemstone}</h2>
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm flex items-center gap-1">
                        <Orbit className="h-4 w-4"/> {rec.planet}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600 line-clamp-2">{rec.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/>{rec.birthPlace}</span>
                      <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4"/>{new Date(rec.createdAt).toLocaleDateString()}</span>
                      <span className="rounded-full bg-yellow-50 px-3 py-1 border">{rec.goal}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-amber-600"/>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
