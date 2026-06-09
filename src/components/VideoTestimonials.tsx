"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoTestimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  clientName: string;
  property: string;
  duration: string;
}

// NOTE: Video sources can be added later by providing a `videoSrc` field
// to each testimonial object and rendering a <video> element instead
// of the gradient placeholder div.
const testimonials: Testimonial[] = [
  {
    clientName: "James & Victoria Harrington",
    property: "Oceanfront Villa, Malibu",
    duration: "2:45",
  },
  {
    clientName: "Dr. Alexander Chen",
    property: "Penthouse Suite, Manhattan",
    duration: "3:12",
  },
  {
    clientName: "Sophia & Liam Beaumont",
    property: "Lake Estate, Lake Como",
    duration: "4:08",
  },
];

export default function VideoTestimonials() {
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
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.from(validCards, {
          y: 80,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: validCards[0],
            start: "top 85%",
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
        <div ref={headerRef} className={styles.header}>
          <span className={styles.label}>Testimonials</span>
          <h2 className={styles.title}>Hear From Our Clients</h2>
          <p className={styles.subtitle}>
            Real stories from real clients — discover why discerning buyers and
            sellers trust us with their most important investments.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={styles.card}
            >
              {/* Video Thumbnail Placeholder */}
              <div className={styles.thumbnail}>
                <div className={styles.gradientOverlay} />

                {/* Play Button */}
                <button className={styles.playButton} aria-label="Play video">
                  <div className={styles.playCircle}>
                    <Play size={24} className={styles.playIcon} />
                  </div>
                </button>

                {/* Duration Badge */}
                <span className={styles.duration}>{testimonial.duration}</span>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <h3 className={styles.clientName}>{testimonial.clientName}</h3>
                <p className={styles.property}>{testimonial.property}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
