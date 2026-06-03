"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchBar from "./SearchBar";
import styles from "./Hero.module.css";

interface HeroProps {
  onSearch?: (filters: { location: string; type: string; price: string }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register plugin inside useEffect to prevent SSR errors
    gsap.registerPlugin(ScrollTrigger);

    // Initial page load animations
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial state setup
    gsap.set(imageRef.current, { scale: 1.15 });
    gsap.set([subtitleRef.current, titleRef.current, searchRef.current, scrollRef.current], {
      opacity: 0,
      y: 40,
    });

    // Reveal sequence
    tl.to(imageRef.current, {
      scale: 1.0,
      duration: 2.2,
      ease: "power2.out",
    })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
      }, "-=1.6")
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
      }, "-=1.4")
      .to(searchRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
      }, "-=1.0")
      .to(scrollRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.8");

    // Parallax scrolling effect
    if (containerRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleScrollDown = () => {
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Background Parallax Image */}
      <div className={styles.backgroundWrapper}>
        <img
          ref={imageRef}
          src="/images/hero_mansion.png"
          alt="Aurelia Luxury Mansion"
          className={styles.backgroundImage}
        />
      </div>

      {/* Elegant Dark Overlay */}
      <div className={styles.overlay} />

      {/* Main Hero Content */}
      <div className="container" style={{ position: "relative", zIndex: 3 }}>
        <div className={styles.content}>
          <div ref={subtitleRef} className={styles.subtitle}>
            Aurelia Luxury Estates
          </div>
          <h1 ref={titleRef} className={styles.title}>
            The Art of <span className={styles.titleLight}>Architectural</span> Living
          </h1>
        </div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <div ref={scrollRef} className={styles.scrollIndicator} onClick={handleScrollDown}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Explore Collection</span>
      </div>

      {/* Floating Search Bar */}
      <div ref={searchRef} className={styles.searchWrapper}>
        <SearchBar onSearch={onSearch} />
      </div>
    </section>
  );
}
