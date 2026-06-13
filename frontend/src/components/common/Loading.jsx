import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FCFBF8]">
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
          }}
          className="text-5xl font-bold tracking-tight"
          style={{
            fontFamily: "Playfair Display, serif",
          }}
        >
          <span className="text-slate-800">Gem</span>
          <span className="bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-500 bg-clip-text text-transparent">
            Aura
          </span>
        </motion.h1>

        <div className="mt-4 h-[2px] w-44 overflow-hidden rounded-full bg-stone-200">
          <motion.div
            animate={{
              x: ["-100%", "250%"],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-20 bg-amber-700"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mt-4 text-sm tracking-[0.2em] uppercase text-stone-500"
        >
          Preparing your experience
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;

