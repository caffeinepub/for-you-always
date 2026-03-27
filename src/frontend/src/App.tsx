import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { FloatingParticles } from "./components/FloatingParticles";
import { HiddenSurprise } from "./components/HiddenSurprise";
import { LoveNoteCard } from "./components/LoveNoteCard";
import { MusicToggle } from "./components/MusicToggle";

// ─── Data ────────────────────────────────────────────────────────────────────

const STORY_SECTIONS = [
  {
    id: "ch1",
    photo:
      "/assets/uploads/img-20210724-wa0004-019d3041-4126-717c-910c-14908a48ba9e-1.jpg",
    quote: "This smile… it rewrote everything I thought I knew about love.",
    label: "Chapter One",
  },
  {
    id: "ch2",
    photo:
      "/assets/uploads/img-20210727-wa0013-019d3041-42c5-7754-af71-77b42d5b2002-2.jpg",
    quote:
      "You look at me like that, and I forget every version of myself that existed before you.",
    label: "Chapter Two",
  },
  {
    id: "ch3",
    photo:
      "/assets/uploads/img-20211103-wa0009-019d3041-4463-71f8-beea-3614158052b8-3.jpg",
    quote:
      "Your joy is contagious. Your laughter is my favorite sound in the world.",
    label: "Chapter Three",
  },
  {
    id: "ch4",
    photo:
      "/assets/uploads/img-20220319-wa0032-019d3041-481d-77b0-98d8-c77d16039790-4.jpg",
    quote: "In every lifetime, in every form — it would always be you.",
    label: "Chapter Four",
  },
  {
    id: "ch5",
    photo:
      "/assets/uploads/img-20230712-wa0004_2-019d3041-4807-75ff-a884-69c4b846ca62-5.jpg",
    quote:
      "You don’t just look beautiful. You feel beautiful. You make everything beautiful.",
    label: "Chapter Five",
  },
  {
    id: "ch6",
    photo:
      "/assets/uploads/img-20210606-wa0003-019d3041-4863-7026-a631-d233d938c532-6.jpg",
    quote: "In the quiet, in the stillness — that’s where I love you the most.",
    label: "Chapter Six",
  },
  {
    id: "ch7",
    photo:
      "/assets/uploads/img-20210707-wa0012-019d3041-4ca5-750e-a7c4-aa88937d7dc9-7.jpg",
    quote:
      "They say the eyes are the soul’s mirror. Yours hold entire universes.",
    label: "Chapter Seven",
  },
  {
    id: "ch8",
    photo:
      "/assets/uploads/screenshot_20210814_165646_1-019d3043-112d-71d8-bca5-f6e78fcf7b2a-14.jpg",
    quote: "You walk into a room and it changes. Not the room — me.",
    label: "Chapter Eight",
  },
];

const LOVE_NOTES = [
  { id: "ln1", text: "Because you make silence feel safe." },
  { id: "ln2", text: "Because your laugh is my favorite song." },
  { id: "ln3", text: "Because you care deeply about everything." },
  { id: "ln4", text: "Because you’re brave, even when you’re scared." },
  { id: "ln5", text: "Because with you, ordinary days feel like gifts." },
  { id: "ln6", text: "Because you loved me at my worst." },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      data-ocid="nav.panel"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 transition-all duration-500 ${
        scrolled ? "mx-4 mt-3" : "mx-0 mt-0"
      }`}
    >
      <div
        className={`flex items-center justify-between w-full px-6 py-3 transition-all duration-500 ${
          scrolled ? "glass rounded-full shadow-glass" : "bg-transparent"
        }`}
      >
        <span className="font-serif text-white/90 text-lg tracking-widest italic">
          For You, Always
        </span>
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="text-xl"
        >
          ❤️
        </motion.span>
      </div>
    </motion.nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      data-ocid="hero.section"
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Ken Burns background */}
      <motion.div className="absolute inset-0 ken-burns" style={{ y }}>
        <img
          src="/assets/uploads/img-20210606-wa0003-019d3041-4863-7026-a631-d233d938c532-6.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ transform: "scale(1.1)" }}
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120F16]/40 via-transparent to-transparent" />

      {/* Text */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="font-sans text-[#C9A76A] text-xs md:text-sm tracking-[0.6em] uppercase mb-6"
        >
          For You, Always
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif text-white font-light leading-[1.1]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          In a world full of people… <span className="italic">I found you</span>{" "}
          ❤️
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 1, delay: 1.6 }}
          className="h-px bg-gradient-to-r from-transparent via-[#C9A76A] to-transparent mx-auto mt-10"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-white/50 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A76A]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Story Section ───────────────────────────────────────────────────────────

function StorySection({
  section,
  index,
}: { section: (typeof STORY_SECTIONS)[0]; index: number }) {
  return (
    <section
      data-ocid={`story.section.${index + 1}`}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 ken-burns overflow-hidden">
        <img
          src={section.photo}
          alt=""
          className="w-full h-full object-cover object-top"
          style={{ transform: "scale(1.1)", animationDelay: `${index * 2}s` }}
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-xl w-full mx-6 glass-dark px-8 py-10 text-center"
      >
        <p className="font-sans text-[#C9A76A] text-xs tracking-[0.4em] uppercase mb-4">
          {section.label}
        </p>
        <p
          className="font-serif text-white/95 font-light leading-relaxed"
          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
        >
          &ldquo;{section.quote}&rdquo;
        </p>
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#C9A76A]/50 to-transparent" />
      </motion.div>
    </section>
  );
}

// ─── Pull Quote ───────────────────────────────────────────────────────────────

function PullQuote() {
  return (
    <section
      data-ocid="pullquote.section"
      className="py-24 px-6 text-center"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.95 0.015 70) 0%, oklch(0.92 0.025 357) 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl mx-auto"
      >
        <div
          className="font-serif text-[#C9A76A]/30 leading-none select-none"
          style={{ fontSize: "clamp(6rem, 15vw, 12rem)", lineHeight: 0.8 }}
        >
          &ldquo;
        </div>
        <p
          className="font-serif text-[#120F16] font-light italic leading-relaxed -mt-4"
          style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
        >
          You are my favorite hello and my hardest goodbye. In every moment in
          between, you are my entire world.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#C9A76A]/40" />
          <span className="text-[#C9A76A] text-sm">❤</span>
          <div className="h-px w-12 bg-[#C9A76A]/40" />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Love Notes Section ──────────────────────────────────────────────────────

function LoveNotesSection() {
  return (
    <section
      data-ocid="love-notes.section"
      className="py-24 px-6"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.96 0.01 70) 0%, oklch(0.94 0.02 357) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-sans text-[#C9A76A] text-xs tracking-[0.4em] uppercase mb-3">
            A thousand reasons
          </p>
          <h2
            className="font-serif text-[#120F16] font-light"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Why I Love You
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LOVE_NOTES.map((note, i) => (
            <LoveNoteCard key={note.id} index={i + 1} reason={note.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final Section ───────────────────────────────────────────────────────────

function FinalSection() {
  const burstHearts = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 20; i++) {
      const el = document.createElement("div");
      el.textContent = i % 3 === 0 ? "💕" : i % 2 === 0 ? "❤️" : "✨";
      const angle = (i / 20) * Math.PI * 2;
      const radius = 80 + Math.random() * 60;
      el.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        pointer-events: none;
        z-index: 99998;
        font-size: ${12 + Math.random() * 14}px;
        transform: translate(-50%, -50%);
        --r: ${(Math.random() - 0.5) * 60}deg;
        --x: ${Math.cos(angle) * radius}px;
        animation: confetti-fly 1.5s ease-out forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
  };

  return (
    <section
      data-ocid="final.section"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #120F16 0%, #1B1622 50%, #0E0B14 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(233,185,198,0.15) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <p className="font-sans text-[#C9A76A]/60 text-xs tracking-[0.5em] uppercase">
          Always & Forever
        </p>

        <h2
          className="font-serif text-white font-light leading-snug"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          No matter what happens…
        </h2>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif italic leading-snug"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            background: "linear-gradient(90deg, #E9B9C6, #C9A76A, #C9B3D6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          it will always be you.
        </motion.h2>

        <div className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#C9A76A]/50 to-transparent" />

        <motion.button
          data-ocid="final.primary_button"
          onClick={burstHearts}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-10 py-4 rounded-full text-[#120F16] font-sans font-medium tracking-wider text-sm"
          style={{
            background:
              "linear-gradient(135deg, #C9A76A 0%, #E9B9C6 50%, #C9A76A 100%)",
            backgroundSize: "200% auto",
            boxShadow:
              "0 0 20px rgba(201,167,106,0.5), 0 0 40px rgba(201,167,106,0.2)",
          }}
        >
          Forever ❤️
        </motion.button>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
          className="text-3xl mt-2"
        >
          ❤
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const link = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;
  return (
    <footer className="py-8 text-center" style={{ background: "#0A0810" }}>
      <p className="font-sans text-white/30 text-xs">
        © {year}. Built with ❤️ using{" "}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white/50 transition-colors"
        >
          caffeine.ai
        </a>
      </p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative vignette">
      <FloatingParticles />
      <CustomCursor />
      <MusicToggle />
      <Navbar />

      <main>
        <HeroSection />

        {STORY_SECTIONS.map((section, i) => (
          <StorySection key={section.id} section={section} index={i} />
        ))}

        <PullQuote />
        <LoveNotesSection />

        <section
          className="py-8 text-center"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.94 0.02 357) 0%, #120F16 100%)",
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-[#120F16]/50 text-xs tracking-[0.4em] uppercase mb-6"
          >
            A secret just for you
          </motion.p>
          <HiddenSurprise />
        </section>

        <FinalSection />
      </main>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            data-ocid="nav.button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-4 z-40 w-10 h-10 rounded-full glass flex items-center justify-center text-[#C9A76A] text-lg"
            whileHover={{ scale: 1.1 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
