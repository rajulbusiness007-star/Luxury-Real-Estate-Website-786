"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ClientLogos.module.css";

gsap.registerPlugin(ScrollTrigger);

const logos: string[] = [
  "Christie's",
  "Sotheby's",
  "Knight Frank",
  "Savills",
  "Berkshire Hathaway",
  "Douglas Elliman",
  "Compass",
  "Coldwell Banker",
];

const ClientLogos: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, heading);

    return () => ctx.revert();
  }, []);

  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...logos, ...logos];

  return (
    <section className={styles.section}>
      <div ref={headingRef} className={styles.heading}>
        <h2 className={styles.title}>Trusted By Industry Leaders</h2>
        <p className={styles.subtitle}>
          Partnering with the world&apos;s most prestigious real estate brands
        </p>
      </div>

      {/* ── Marquee Track ── */}
      <div className={styles.marqueeWrap}>
        {/* gradient fade edges */}
        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        <div className={styles.marqueeTrack}>
          {doubled.map((name, i) => (
            <div key={`${name}-${i}`} className={styles.logoPill}>
              <span className={styles.logoText}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
