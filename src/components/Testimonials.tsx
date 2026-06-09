"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ChevronDown, Image as ImageIcon } from "lucide-react";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

const DISTRIBUTION = [
  { label: "5.0", count: "14K reviews", pct: 70 },
  { label: "4.0", count: "6K reviews", pct: 40 },
  { label: "3.0", count: "4K reviews", pct: 25 },
  { label: "2.0", count: "800 reviews", pct: 10 },
  { label: "1.0", count: "9K reviews", pct: 45 },
];

const CATEGORIES = [
  { score: "4.0", name: "Cleanliness" },
  { score: "4.0", name: "Safety & Security" },
  { score: "4.0", name: "Staff" },
  { score: "3.5", name: "Amenities" },
  { score: "3.0", name: "Location" },
];

const REVIEWS = [
  {
    avatar: "https://i.pravatar.cc/150?img=11",
    name: "Alexander Rity",
    time: "4 months ago",
    score: "5.0",
    text: "Easy booking, great value! Cozy rooms at a reasonable price in Sheffield's vibrant center. Surprisingly quiet with nearby Traveller's accommodations. Highly recommended!",
    images: [1, 2, 3, 4]
  },
  {
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "Emma Crieght",
    time: "4 months ago",
    score: "4.0",
    text: "Effortless booking, unbeatable affordability! Small yet comfortable rooms in the heart of Sheffield's nightlife hub. Surrounded by elegant housing, it's a peaceful gem. Thumbs up!",
    images: []
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("." + styles.reviewItem, {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderStars = (count: number, fillHex = "#7C3AED", emptyHex = "transparent") => {
    return (
      <div className={styles.starsGroup}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            size={16}
            fill={star <= count ? fillHex : emptyHex}
            color={fillHex}
            strokeWidth={1.5}
          />
        ))}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="container">
        
        <div className={styles.layout}>
          {/* Summary Panel */}
          <div className={styles.summaryPanel}>
            <h2 className={styles.title}>Reviews</h2>
            
            <div className={styles.overallRow}>
              <div className={styles.overallScore}>4.0</div>
              <div className={styles.overallStarsWrap}>
                {renderStars(4, "#7C3AED")}
                <div className={styles.overallRatingsCount}>35K ratings</div>
              </div>
            </div>

            <div className={styles.distribution}>
              {DISTRIBUTION.map((d, i) => (
                <div key={i} className={styles.distRow}>
                  <div className={styles.distTrack}>
                    <div className={styles.distFill} style={{ width: `${d.pct}%` }} />
                  </div>
                  <div className={styles.distLabel}>
                    <span className={styles.distScore}>{d.label}</span> {d.count}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.categories}>
              {CATEGORIES.map((c, i) => (
                <div key={i} className={styles.categoryPill}>
                  <span className={styles.catScore}>{c.score}</span>
                  <span className={styles.catName}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className={styles.reviewsList}>
            {REVIEWS.map((r, i) => (
              <div key={i} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerInfo}>
                    <img src={r.avatar} alt={r.name} className={styles.avatar} />
                    <div className={styles.reviewerNameRow}>
                      <span className={styles.reviewerName}>{r.name}</span>
                      <span className={styles.reviewTime}>{r.time}</span>
                    </div>
                  </div>
                  <div className={styles.reviewScoreRow}>
                    <span className={styles.reviewScore}>{r.score}</span>
                    {renderStars(Math.floor(parseFloat(r.score)), "#7C3AED")}
                  </div>
                </div>
                
                <p className={styles.reviewText}>{r.text}</p>
                
                {r.images.length > 0 && (
                  <div className={styles.reviewImages}>
                    {r.images.map((img, idx) => (
                      <div key={idx} className={styles.reviewImgPlaceholder}>
                        <ImageIcon size={20} color="#CBD5E1" />
                      </div>
                    ))}
                  </div>
                )}
                
                {i !== REVIEWS.length - 1 && <div className={styles.divider} />}
              </div>
            ))}

            <button className={styles.readAllBtn}>
              Read all reviews <ChevronDown size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
