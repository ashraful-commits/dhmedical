"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GsapFadeIn({ children, delay = 0, y = 20, duration = 0.8, className = "" }) {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current) return;
    gsap.fromTo(
      el.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay, y, duration]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}

export function GsapStagger({ children, stagger = 0.1, delay = 0.2, className = "" }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    const elements = container.current.children;
    if (!elements || elements.length === 0) return;

    gsap.fromTo(
      elements,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger,
        delay,
        ease: "power2.out",
      }
    );
  }, [stagger, delay]);

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
