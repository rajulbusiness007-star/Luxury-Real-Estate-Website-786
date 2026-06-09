"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Award,
  Crown,
  GemIcon,
  ThumbsUp,
} from "lucide-react";
import styles from "./TrustBadges.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Data ---------- */

const BADGES = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    subtitle: "Fully certified across all markets",
  },
  {
    icon: Award,
    title: "BBB A+ Rated",
    subtitle: "Top-rated by the Better Business Bureau",
  },
  {
    icon: Crown,
    title: "Top 1% Agency",
    subtitle: "Nationally ranked by volume",
  },
  {
    icon: GemIcon,
    title: "Luxury Certified",
    subtitle: "Institute for Luxury Home Marketing",
  },
  {
    icon: ThumbsUp,
    title: "100% Satisfaction",
    subtitle: "Money-back guarantee on services",
  },
];

/* ---------- Component ---------- */

export default function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Staggered reveal on desktop grid */
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Desktop / Tablet Grid */}
        <div ref={gridRef} className={styles.badgesGrid}>
          {BADGES.map((b) => (
            <div key={b.title} className={styles.badge}>
              <div className={styles.iconWrap}>
                <b.icon size={26} className={styles.badgeIcon} />
              </div>
              <span className={styles.badgeTitle}>{b.title}</span>
              <span className={styles.badgeSubtitle}>{b.subtitle}</span>
            </div>
          ))}
        </div>

        {/* Mobile Marquee */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {/* Duplicate badges for seamless loop */}
            {[...BADGES, ...BADGES].map((b, i) => (
              <div key={`${b.title}-${i}`} className={styles.marqueeBadge}>
                <div className={styles.iconWrap}>
                  <b.icon size={24} className={styles.badgeIcon} />
                </div>
                <span className={styles.badgeTitle}>{b.title}</span>
                <span className={styles.badgeSubtitle}>{b.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
