"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Home, Heart, Award } from "lucide-react";
import styles from "./StatsCounter.module.css";

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  decimals: number;
}

const stats: StatItem[] = [
  {
    id: "properties-sold",
    value: 2.5,
    prefix: "$",
    suffix: "B+",
    label: "Properties Sold",
    icon: <DollarSign size={28} strokeWidth={1.5} />,
    decimals: 1,
  },
  {
    id: "luxury-homes",
    value: 500,
    prefix: "",
    suffix: "+",
    label: "Luxury Homes",
    icon: <Home size={28} strokeWidth={1.5} />,
    decimals: 0,
  },
  {
    id: "satisfaction",
    value: 98,
    prefix: "",
    suffix: "%",
    label: "Client Satisfaction",
    icon: <Heart size={28} strokeWidth={1.5} />,
    decimals: 0,
  },
  {
    id: "experience",
    value: 15,
    prefix: "",
    suffix: "+",
    label: "Years Experience",
    icon: <Award size={28} strokeWidth={1.5} />,
    decimals: 0,
  },
];

const StatsCounter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate cards fading in
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate numbers counting up
      stats.forEach((stat, index) => {
        const numberEl = numberRefs.current[index];
        if (!numberEl) return;

        const obj = { val: 0 };

        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            numberEl.textContent = `${stat.prefix}${obj.val.toFixed(stat.decimals)}${stat.suffix}`;
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.card}
            >
              <div className={styles.iconWrap}>{stat.icon}</div>
              <span
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
                className={styles.number}
              >
                {stat.prefix}0{stat.suffix}
              </span>
              <span className={styles.label}>{stat.label}</span>

              {/* Divider — hidden on the last card */}
              {index < stats.length - 1 && (
                <div className={styles.divider} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
