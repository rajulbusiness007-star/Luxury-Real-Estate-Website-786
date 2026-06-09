"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CaseStudies.module.css";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  link: string;
}

const caseStudies: CaseStudy[] = [
  {
    tag: "Residential",
    title: "From Listing to Closing in 10 Days",
    description:
      "A stunning oceanfront estate in Malibu was listed at $12.5M and attracted multiple competing offers within 48 hours. Our strategic marketing approach and curated private showings created urgency among ultra-high-net-worth buyers, resulting in a record-breaking close.",
    metrics: [
      { label: "Sale Price", value: "$12.5M" },
      { label: "ROI", value: "340%" },
      { label: "Timeline", value: "10 Days" },
    ],
    link: "#",
  },
  {
    tag: "Commercial",
    title: "Transforming a Portfolio into a Legacy",
    description:
      "A diversified commercial portfolio spanning three Manhattan addresses was consolidated and repositioned for maximum yield. Through meticulous market analysis and bespoke negotiation, we delivered returns that exceeded client expectations by a significant margin.",
    metrics: [
      { label: "Sale Price", value: "$47.2M" },
      { label: "ROI", value: "215%" },
      { label: "Timeline", value: "45 Days" },
    ],
    link: "#",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Cards staggered reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.label}>Case Studies</span>
          <h2 className={styles.title}>Success Stories</h2>
          <p className={styles.subtitle}>
            Discover how we&apos;ve helped clients achieve extraordinary results
            in the world&apos;s most competitive real estate markets.
          </p>
        </div>

        <div className={styles.grid}>
          {caseStudies.map((study, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={styles.card}
            >
              <div className={styles.cardInner}>
                <span className={styles.tag}>{study.tag}</span>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.cardDescription}>{study.description}</p>

                <div className={styles.metricsRow}>
                  {study.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className={styles.metric}>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </div>
                  ))}
                </div>

                <a href={study.link} className={styles.readMore}>
                  <span>Read Full Story</span>
                  <ArrowRight size={18} className={styles.arrow} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
