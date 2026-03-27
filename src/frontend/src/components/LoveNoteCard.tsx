import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Props {
  index: number;
  reason: string;
}

export function LoveNoteCard({ index, reason }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <motion.div
      data-ocid={`love-note.card.${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => setRevealed(!revealed)}
      whileHover={{ scale: 1.03, rotateY: revealed ? 0 : 3 }}
      className="relative cursor-pointer select-none"
      style={{ perspective: 800 }}
    >
      <div
        className="glass p-6 min-h-[140px] flex flex-col items-center justify-center text-center rounded-2xl relative overflow-hidden"
        style={{
          background: revealed
            ? "rgba(201,167,106,0.25)"
            : "rgba(210,200,195,0.32)",
          transition: "background 0.5s",
        }}
      >
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="front"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-3xl">❤️</span>
              <span className="text-sm font-sans text-[#120F16]/60 tracking-wide uppercase">
                Tap to discover
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-2xl">✨</span>
              <p className="font-serif text-lg italic text-[#120F16] leading-snug">
                {reason}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shimmer on reveal */}
        {revealed && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>
    </motion.div>
  );
}
