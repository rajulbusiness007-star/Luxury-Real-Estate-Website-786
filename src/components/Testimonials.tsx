"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import styles from "./Testimonials.module.css";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "Aurelia Luxury Estates redefined our property acquisition experience. Their discretion, taste, and responsiveness are unmatched. They found us an architectural marvel in Malibu before it ever reached the open market.",
    author: "Sir Julian Thorne",
    role: "Chairman, Thorne Capital Group",
  },
  {
    quote: "Working with the Aurelia team to acquire our Lake Como villa was an absolute pleasure. From coordinate drone inspections to final maritime dock registration, every detail was handled with precision and elite service.",
    author: "Elena Rostova",
    role: "Principal Designer, Rostova Atelier",
  },
  {
    quote: "Their curated portfolio is a breath of fresh air. Instead of listing volume, Aurelia focuses purely on architectural pedigree and prime locations. Truly the Apple of real estate curation.",
    author: "Dr. Marcus Vance",
    role: "Founder, Zenith Healthcare",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const length = TESTIMONIALS_DATA.length;

  const fadeSlide = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Fade out active text
    gsap.to(textRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      onComplete: () => {
        setCurrent(newIndex);
        // Fade back in new text
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  const nextSlide = () => {
    fadeSlide(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    fadeSlide(current === 0 ? length - 1 : current - 1);
  };

  // Auto-play testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [current, isAnimating]);

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          {/* Backdrop Large Quote Accent */}
          <div className={styles.quoteIcon}>“</div>

          {/* Testimonial Quote display */}
          <div ref={textRef} className={styles.carousel}>
            <p className={styles.quote}>
              "{TESTIMONIALS_DATA[current].quote}"
            </p>
            <div className={styles.author}>
              {TESTIMONIALS_DATA[current].author}
            </div>
            <div className={styles.role}>
              {TESTIMONIALS_DATA[current].role}
            </div>
          </div>

          {/* Nav buttons & Progress dots */}
          <div className={styles.controls}>
            <button className={styles.arrowBtn} onClick={prevSlide}>
              <ArrowLeft size={18} />
            </button>

            <div className={styles.dots}>
              {TESTIMONIALS_DATA.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${
                    current === index ? styles.activeDot : ""
                  }`}
                  onClick={() => fadeSlide(index)}
                />
              ))}
            </div>

            <button className={styles.arrowBtn} onClick={nextSlide}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
