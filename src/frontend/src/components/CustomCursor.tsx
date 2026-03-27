import { useEffect, useRef } from "react";

interface TrailHeart {
  id: number;
  x: number;
  y: number;
  el: HTMLDivElement;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailHeart[]>([]);
  const counterRef = useRef(0);
  const lastTrailRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const now = Date.now();
      const dx = e.clientX - lastTrailRef.current.x;
      const dy = e.clientY - lastTrailRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 40 && now - lastTrailRef.current.time > 150) {
        lastTrailRef.current = { x: e.clientX, y: e.clientY, time: now };
        const el = document.createElement("div");
        el.textContent = "❤";
        el.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          pointer-events: none;
          z-index: 99998;
          font-size: ${8 + Math.random() * 8}px;
          color: rgba(233,185,198,0.8);
          transform: translate(-50%,-50%);
          animation: heart-float 1s ease-out forwards;
        `;
        document.body.appendChild(el);
        const id = counterRef.current++;
        trailRef.current.push({ id, x: e.clientX, y: e.clientY, el });
        setTimeout(() => {
          el.remove();
          trailRef.current = trailRef.current.filter((h) => h.id !== id);
        }, 1000);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={cursorRef} id="cursor-glow" aria-hidden="true" />;
}
