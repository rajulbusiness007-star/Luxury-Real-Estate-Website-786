"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, TrendingUp, Clock } from "lucide-react";
import styles from "./BeforeAfter.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ResultCard {
  id: string;
  property: string;
  listedPrice: string;
  soldPrice: string;
  percentAbove: number;
  daysOnMarket: number;
}

const results: ResultCard[] = [
  {
    id: "oceanfront-villa",
    property: "Oceanfront Villa",
    listedPrice: "$4.2M",
    soldPrice: "$5.1M",
    percentAbove: 21,
    daysOnMarket: 14,
  },
  {
    id: "manhattan-penthouse",
    property: "Manhattan Penthouse",
    listedPrice: "$8.5M",
    soldPrice: "$9.8M",
    percentAbove: 15,
    daysOnMarket: 22,
  },
  {
    id: "swiss-chalet",
    property: "Swiss Chalet",
    listedPrice: "$3.8M",
    soldPrice: "$4.5M",
    percentAbove: 18,
    daysOnMarket: 18,
  },
];

const BeforeAfter: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards stagger
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* ── Heading ── */}
        <div ref={headingRef} className={styles.heading}>
          <h2 className={styles.title}>Transformative Results</h2>
          <p className={styles.subtitle}>
            See How We Maximize Property Value
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <div className={styles.grid}>
          {results.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.card}
            >
              {/* Property name */}
              <h3 className={styles.propertyName}>{item.property}</h3>

              {/* Prices row */}
              <div className={styles.pricesRow}>
                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Listed</span>
                  <span className={styles.priceListed}>{item.listedPrice}</span>
                </div>

                <div className={styles.arrowWrap}>
                  <ArrowRight size={22} strokeWidth={1.8} />
                </div>

                <div className={styles.priceBlock}>
                  <span className={styles.priceLabel}>Sold</span>
                  <span className={styles.priceSold}>{item.soldPrice}</span>
                </div>
              </div>

              {/* Footer badges */}
              <div className={styles.badgeRow}>
                <span className={styles.percentBadge}>
                  <TrendingUp size={14} strokeWidth={2} />
                  +{item.percentAbove}% above asking
                </span>
                <span className={styles.daysBadge}>
                  <Clock size={14} strokeWidth={2} />
                  Sold in {item.daysOnMarket} days
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
