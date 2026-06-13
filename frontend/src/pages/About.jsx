
import React from "react";
import { motion } from "framer-motion";
import {
  Gem,
  Sparkles,
  Brain,
  ShieldCheck,
  Stars,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced intelligence combines your birth details with curated gemstone knowledge to generate personalized recommendations.",
  },
  {
    icon: Stars,
    title: "Astrology Inspired",
    description:
      "Recommendations are informed by traditional astrological concepts and presented in an accessible modern experience.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Your submitted information is handled securely and used only to generate your personalized insights.",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[87.5vh] bg-gradient-to-br from-[#fffdf9] via-[#fff8ef] to-[#f7ead2] overflow-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <motion.section
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          className="rounded-[36px] bg-white/70 backdrop-blur-xl border border-amber-100 shadow-2xl p-10"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-amber-700 font-medium">
                <Sparkles className="h-4 w-4"/>
                About GemAura
              </span>

              <h1 className="mt-6 text-5xl font-bold text-[#3F2E1E] leading-tight">
                Where AI Meets the Timeless Beauty of Gemstones
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-8">
                GemAura is built to make personalized gemstone discovery simple,
                elegant, and insightful. We combine intelligent analysis with
                birth information and user goals to provide tailored gemstone
                recommendations in a premium digital experience.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <button
                  onClick={() => navigate("/recommendation")}
                  className="rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 px-6 py-3 text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  Get Recommendation
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="rounded-2xl border border-amber-200 bg-white px-6 py-3 font-semibold text-[#3F2E1E]"
                >
                  View History
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <motion.div
                animate={{rotate:[0,5,-5,0]}}
                transition={{repeat:Infinity,duration:6}}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-amber-300/20 blur-3xl"/>
                <div className="rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 p-12 shadow-2xl">
                  <Gem className="h-32 w-32 text-white"/>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section className="grid md:grid-cols-3 gap-6 mt-10">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{opacity:0,y:20}}
                whileInView={{opacity:1,y:0}}
                viewport={{once:true}}
                transition={{delay:i*0.1}}
                whileHover={{y:-6}}
                className="rounded-3xl bg-white/75 backdrop-blur border border-amber-100 p-7 shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-amber-600"/>
                </div>
                <h3 className="mt-5 text-2xl font-bold text-[#3F2E1E]">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600 leading-7">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </section>

        <motion.section
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          viewport={{once:true}}
          className="mt-10 rounded-[32px] bg-[#3F2E1E] text-white p-10"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Users className="h-8 w-8 text-amber-300"/>
              <h2 className="mt-3 text-4xl font-bold">10K+</h2>
              <p className="text-gray-300 mt-2">Community Members</p>
            </div>
            <div>
              <Gem className="h-8 w-8 text-amber-300"/>
              <h2 className="mt-3 text-4xl font-bold">25+</h2>
              <p className="text-gray-300 mt-2">Gemstones Covered</p>
            </div>
            <div>
              <Brain className="h-8 w-8 text-amber-300"/>
              <h2 className="mt-3 text-4xl font-bold">98.7%</h2>
              <p className="text-gray-300 mt-2">AI Confidence Target</p>
            </div>
          </div>
        </motion.section>

        <section className="mt-10 text-center">
          <h2 className="text-4xl font-bold text-[#3F2E1E]">
            Begin Your Personalized Journey
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Discover recommendations tailored to your birth details and aspirations with an intuitive AI-powered experience.
          </p>

          <button
            onClick={() => navigate("/recommendation")}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-4 text-white font-semibold shadow-xl hover:scale-105 transition"
          >
            Start Now
            <ArrowRight className="h-5 w-5"/>
          </button>
        </section>

      </div>
    </div>
  );
};

export default About;
