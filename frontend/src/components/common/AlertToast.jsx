import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

const AlertToast = ({
  type = "success",
  message,
  visible,
  onClose,
}) => {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 80,
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="fixed right-6 top-6 z-[999] overflow-hidden rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl"
        >
          <div className="flex min-w-[360px] max-w-md items-start gap-4 p-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                isSuccess
                  ? "bg-emerald-50"
                  : "bg-red-50"
              }`}
            >
              {isSuccess ? (
                <CheckCircle2
                  size={22}
                  className="text-emerald-600"
                />
              ) : (
                <AlertTriangle
                  size={22}
                  className="text-red-600"
                />
              )}
            </div>

            <div className="flex-1">
              <h4
                className={`text-sm font-semibold ${
                  isSuccess
                    ? "text-emerald-700"
                    : "text-red-700"
                }`}
              >
                {isSuccess
                  ? "Success"
                  : "Something went wrong"}
              </h4>

              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{
              duration: 4,
              ease: "linear",
            }}
            className={`h-1 ${
              isSuccess
                ? "bg-emerald-500"
                : "bg-red-500"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertToast;

