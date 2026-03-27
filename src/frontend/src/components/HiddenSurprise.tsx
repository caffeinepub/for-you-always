import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function HiddenSurprise() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Pulsing secret heart */}
      <div className="flex justify-center py-8">
        <motion.button
          data-ocid="surprise.open_modal_button"
          onClick={() => setOpen(true)}
          animate={{
            scale: [1, 1.15, 1],
            boxShadow: [
              "0 0 10px rgba(201,167,106,0.3)",
              "0 0 30px rgba(201,167,106,0.7)",
              "0 0 10px rgba(201,167,106,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E9B9C6] to-[#C9A76A] flex items-center justify-center text-2xl shadow-glow"
          title="A secret for you..."
        >
          ❤
        </motion.button>
      </div>

      {/* Full-screen surprise overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="surprise.modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex flex-col items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at center, #1B1622 0%, #120F16 60%, #0A0810 100%)",
            }}
          >
            {/* Animated glow rings */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.15, 0.3] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute w-96 h-96 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(201,167,106,0.25) 0%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{ scale: [1.2, 1.5, 1.2], opacity: [0.2, 0.08, 0.2] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(233,185,198,0.15) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 max-w-lg text-center px-8 flex flex-col items-center gap-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                className="text-6xl"
              >
                ❤️
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-serif text-[#C9B3D6] text-lg italic tracking-wide"
              >
                No one else will ever know this...
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="font-serif text-white text-3xl md:text-4xl font-light leading-snug"
              >
                But you are the best thing that has ever happened to me.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="font-serif text-[#C9A76A] text-xl italic"
              >
                Every single day, I choose you. Always.
              </motion.p>

              <motion.button
                data-ocid="surprise.close_button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-3 rounded-full border border-[#C9A76A]/50 text-[#C9A76A] font-sans text-sm tracking-widest uppercase hover:bg-[#C9A76A]/10 transition-colors"
              >
                Close ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
