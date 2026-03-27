import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    );
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setReady(true), {
      once: true,
    });
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        // Fade in
        let vol = 0;
        const fade = setInterval(() => {
          vol = Math.min(vol + 0.05, 0.35);
          audio.volume = vol;
          if (vol >= 0.35) clearInterval(fade);
        }, 100);
        setPlaying(true);
      } catch (_) {
        // autoplay blocked
      }
    }
  };

  return (
    <motion.button
      data-ocid="music.toggle"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={playing ? "Pause music" : "Play music"}
      className={`fixed top-4 right-4 z-50 w-11 h-11 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
        playing
          ? "bg-gradient-to-br from-[#E9B9C6] to-[#C9A76A] shadow-glow text-white"
          : "glass text-[#C9A76A]"
      }`}
    >
      {playing ? "♪" : "♫"}
      {!ready && (
        <span className="absolute inset-0 rounded-full border border-[#C9A76A]/30 animate-ping" />
      )}
    </motion.button>
  );
}
