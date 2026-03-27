import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  shape: "circle" | "heart";
  life: number;
  maxLife: number;
}

const COLORS = [
  "rgba(233,185,198,",
  "rgba(201,167,106,",
  "rgba(201,179,214,",
  "rgba(246,238,231,",
];

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.random() * 8 + 3,
      opacity: Math.random() * 0.5 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.5 ? "heart" : "circle",
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    for (let i = 0; i < 25; i++) {
      const p = spawnParticle();
      p.y = Math.random() * window.innerHeight;
      p.life = Math.random() * p.maxLife;
      particlesRef.current.push(p);
    }

    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 10, size / 10);
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.bezierCurveTo(-5, -8, -10, 0, 0, 6);
      ctx.bezierCurveTo(10, 0, 5, -8, 0, -3);
      ctx.restore();
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame % 12 === 0 && particlesRef.current.length < 40) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const progress = p.life / p.maxLife;
        const fade =
          progress < 0.1
            ? progress / 0.1
            : progress > 0.8
              ? (1 - progress) / 0.2
              : 1;
        const alpha = p.opacity * fade;

        ctx.globalAlpha = alpha;
        if (p.shape === "heart") {
          ctx.fillStyle = `${p.color}${alpha})`;
          drawHeart(ctx, p.x, p.y, p.size);
          ctx.fill();
        } else {
          ctx.fillStyle = `${p.color}${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        return p.life < p.maxLife && p.y > -50;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
