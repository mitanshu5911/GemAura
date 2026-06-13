
import { motion } from "framer-motion";
import {
  Sparkles,
  Gem,
  Star,
  CircleDashed,
  BadgeCheck,
} from "lucide-react";

const loadingSteps = [
  "Reading Birth Details",
  "Calculating Planetary Positions",
  "Analyzing Cosmic Energy",
  "Matching Gemstone Frequencies",
  "Finalizing Recommendation",
];

const orbitIcons = [Gem, Sparkles, Star, Gem, Sparkles, Star];

export default function RecommendationLoading() {
  return (
    <div className="relative h-[87.5vh] w-full overflow-hidden bg-gradient-to-br from-[#fffdf8] via-[#fff8ef] to-[#fdf0d0] flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_60%)]" />

      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-300"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 100}%`,
          }}
          animate={{
            y: [-10, -80],
            opacity: [0, 1, 0],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute h-72 w-72 rounded-full border border-amber-300"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute h-56 w-56 rounded-full border-2 border-dashed border-amber-400/70"
        />

        <div className="absolute h-72 w-72">
          {orbitIcons.map((Icon, idx) => (
            <motion.div
              key={idx}
              className="absolute left-1/2 top-1/2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 10 + idx,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                transformOrigin: "0 0",
                transform: `rotate(${idx * 60}deg) translateX(140px)`,
              }}
            >
              <Icon className="h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-amber-500 drop-shadow-lg" />
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 shadow-2xl"
        >
          <Gem className="h-12 w-12 text-white" />
        </motion.div>

        <h1 className="mt-10 text-4xl font-bold text-[#3f2b1d]">
          GemAura AI
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Generating your personalized gemstone recommendation…
        </p>

        <div className="mt-10 w-full max-w-xl rounded-3xl border border-white/50 bg-white/55 p-6 backdrop-blur-xl shadow-xl">
          <div className="space-y-3">
            {loadingSteps.map((step, i) => (
              <motion.div
                key={step}
                animate={{ opacity: [0.45, 1, 0.45], x: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="flex items-center gap-3 rounded-xl bg-white/60 px-4 py-3"
              >
                <BadgeCheck className="h-5 w-5 text-amber-500" />
                <span className="font-medium text-gray-700">{step}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-amber-100">
            <motion.div
              className="h-full w-32 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300"
              animate={{ x: [-140, 520] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <CircleDashed className="h-4 w-4 animate-spin" />
            <span>Please wait while our AI completes the analysis…</span>
          </div>
        </div>
      </div>
    </div>
  );
}
