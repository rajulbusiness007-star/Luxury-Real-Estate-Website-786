"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
  TrendingUp,
  Pen,
  Play,
  Image,
  MessageSquareQuote,
} from "lucide-react";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Static Data ---------- */

const DISTRIBUTION = [
  { label: "5.0", count: "14K", pct: 56 },
  { label: "4.0", count: "6K", pct: 24 },
  { label: "3.0", count: "4K", pct: 16 },
  { label: "2.0", count: "800", pct: 3.2 },
  { label: "1.0", count: "200", pct: 0.8 },
];

const CATEGORIES = [
  { score: "5.0", name: "Service Quality" },
  { score: "4.9", name: "Market Knowledge" },
  { score: "4.8", name: "Negotiation" },
  { score: "5.0", name: "Communication" },
  { score: "4.9", name: "Results" },
];

interface Review {
  initials: string;
  color: string;
  name: string;
  time: string;
  stars: number;
  text: string;
}

const REVIEWS: Review[] = [
  {
    initials: "JM",
    color: "#6366F1",
    name: "James Morrison",
    time: "3 months ago",
    stars: 5,
    text: "Absolutely exceptional service from start to finish. They found us a stunning penthouse in Manhattan that exceeded every expectation. The attention to detail in the negotiation process saved us over $2M. Truly the gold standard in luxury real estate.",
  },
  {
    initials: "SK",
    color: "#EC4899",
    name: "Sophia Kensington",
    time: "1 month ago",
    stars: 5,
    text: "After working with five other agencies, I can confidently say this is the only team that truly understands ultra-luxury properties. They handled every aspect of our $18M acquisition with unmatched discretion and professionalism.",
  },
  {
    initials: "RV",
    color: "#14B8A6",
    name: "Robert Vanderbilt",
    time: "2 weeks ago",
    stars: 5,
    text: "Impeccable market knowledge and an extensive off-market portfolio. They connected us with properties we didn't even know existed. The concierge-level service continued well beyond closing — a rarity in this industry.",
  },
  {
    initials: "EH",
    color: "#F59E0B",
    name: "Elena Hartwell",
    time: "5 months ago",
    stars: 4,
    text: "From the initial consultation to the final walkthrough, every interaction was thoughtful and professional. Their staging recommendations alone added significant value to our sale. Would recommend without hesitation.",
  },
  {
    initials: "DW",
    color: "#8B5CF6",
    name: "David Wellington",
    time: "6 months ago",
    stars: 5,
    text: "Outstanding results. They marketed our estate to an international buyer network that no other agency could match. Sold above asking price within three weeks. The entire experience was seamless and stress-free.",
  },
];

const TRUST_STATS = [
  {
    icon: Star,
    value: "4.9/5 Average Rating",
    label: "Based on 35K+ reviews",
  },
  {
    icon: Users,
    value: "100+ Happy Clients",
    label: "Served in 2024 alone",
  },
  {
    icon: TrendingUp,
    value: "95% Client Retention",
    label: "Year over year retention",
  },
];

const AUTO_PLAY_MS = 5000;

/* ---------- Component ---------- */

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-play */
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, AUTO_PLAY_MS);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (idx: number) => {
      setCurrent(idx);
      resetTimer();
    },
    [resetTimer]
  );

  const prev = useCallback(() => {
    goTo((current - 1 + REVIEWS.length) % REVIEWS.length);
  }, [current, goTo]);

  const next = useCallback(() => {
    goTo((current + 1) % REVIEWS.length);
  }, [current, goTo]);

  /* GSAP fade transition on card change */
  useEffect(() => {
    const cards = carouselRef.current?.querySelectorAll(
      `.${styles.reviewCard}`
    );
    if (!cards) return;
    cards.forEach((card, i) => {
      if (i === current) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
        );
      } else {
        gsap.set(card, { opacity: 0, y: 24 });
      }
    });
  }, [current]);

  /* GSAP ScrollTrigger reveals */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* header */
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      /* summary panel */
      gsap.from(summaryRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: summaryRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      /* carousel */
      gsap.from(carouselRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      /* distribution bars animate width */
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const w = bar.style.width;
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: w,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: summaryRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* trust cards stagger */
      const trustCards = trustRef.current?.children;
      if (trustCards) {
        gsap.from(Array.from(trustCards), {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }

      /* actions */
      gsap.from(actionsRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: actionsRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------- Render Helpers ---------- */

  const renderStars = (count: number, size = 18) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={styles.starIcon}
        fill={i < count ? "currentColor" : "none"}
        strokeWidth={i < count ? 0 : 1.5}
        style={i >= count ? { color: "rgba(255,255,255,0.15)" } : undefined}
      />
    ));

  const renderPartialStars = () => (
    <div className={styles.starsRow}>
      {[0, 1, 2, 3].map((i) => (
        <Star
          key={i}
          size={22}
          className={styles.starIcon}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
      {/* 5th star 90% filled */}
      <span className={styles.starIconPartial}>
        <Star
          size={22}
          className={styles.starIconPartialEmpty}
          fill="none"
          strokeWidth={1.5}
        />
        <Star
          size={22}
          className={styles.starIconPartialFill}
          fill="currentColor"
          strokeWidth={0}
        />
      </span>
    </div>
  );

  /* ---------- JSX ---------- */

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.label}>
            <MessageSquareQuote size={14} />
            Testimonials
          </span>
          <h2 className={styles.title}>What Our Clients Say</h2>
          <p className={styles.subtitle}>
            Trusted by Elite Property Investors Worldwide
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className={styles.mainLayout}>
          {/* LEFT — Rating Summary */}
          <div ref={summaryRef} className={styles.ratingSummary}>
            <div className={styles.overallRating}>
              <span className={styles.ratingNumber}>4.9</span>
              <div className={styles.ratingMeta}>
                {renderPartialStars()}
                <span className={styles.totalRatings}>35K+ ratings</span>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Distribution */}
            <div className={styles.distributionList}>
              {DISTRIBUTION.map((d, i) => (
                <div key={d.label} className={styles.distributionRow}>
                  <span className={styles.distributionLabel}>{d.label}</span>
                  <div className={styles.distributionBarTrack}>
                    <div
                      ref={(el) => { barRefs.current[i] = el; }}
                      className={styles.distributionBarFill}
                      style={{ width: `${d.pct}%` }}
                    />
                  </div>
                  <span className={styles.distributionCount}>{d.count}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider} />

            {/* Category Pills */}
            <div className={styles.categoryRatings}>
              {CATEGORIES.map((c) => (
                <span key={c.name} className={styles.categoryPill}>
                  <span className={styles.categoryScore}>{c.score}</span>
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Carousel */}
          <div ref={carouselRef} className={styles.carouselWrapper}>
            <div className={styles.carouselTrack}>
              {REVIEWS.map((r, i) => (
                <div
                  key={r.name}
                  className={`${styles.reviewCard} ${
                    i === current ? styles.reviewCardActive : ""
                  }`}
                >
                  {/* Header */}
                  <div className={styles.reviewHeader}>
                    <div
                      className={styles.avatar}
                      style={{ background: r.color }}
                    >
                      {r.initials}
                    </div>
                    <div className={styles.reviewerInfo}>
                      <div className={styles.reviewerNameRow}>
                        <span className={styles.reviewerName}>{r.name}</span>
                        <span className={styles.verifiedBadge}>
                          <CheckCircle2
                            size={12}
                            className={styles.verifiedIcon}
                          />
                          Verified Buyer
                        </span>
                      </div>
                      <span className={styles.reviewTime}>{r.time}</span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className={styles.reviewStars}>
                    {renderStars(r.stars)}
                  </div>

                  {/* Text */}
                  <p className={styles.reviewText}>{r.text}</p>

                  {/* Thumbnails */}
                  <div className={styles.reviewThumbnails}>
                    {[0, 1, 2, 3].map((t) => (
                      <div key={t} className={styles.thumbnail}>
                        <Image
                          size={20}
                          className={styles.thumbnailIcon}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Nav */}
            <div className={styles.carouselNav}>
              <div className={styles.carouselArrows}>
                <button
                  className={styles.arrowBtn}
                  onClick={prev}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className={styles.arrowBtn}
                  onClick={next}
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className={styles.dots}>
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${
                      i === current ? styles.dotActive : ""
                    }`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div ref={trustRef} className={styles.trustIndicators}>
          {TRUST_STATS.map((t) => (
            <div key={t.value} className={styles.trustCard}>
              <div className={styles.trustIconWrap}>
                <t.icon size={22} className={styles.trustIcon} />
              </div>
              <div className={styles.trustInfo}>
                <span className={styles.trustValue}>{t.value}</span>
                <span className={styles.trustLabel}>{t.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div ref={actionsRef} className={styles.bottomActions}>
          <button className={styles.btnPrimary}>
            <Pen size={16} />
            Leave a Review
          </button>
          <button className={styles.btnOutline}>
            <Play size={16} />
            Watch Video Testimonials
          </button>
        </div>
      </div>
    </section>
  );
}
