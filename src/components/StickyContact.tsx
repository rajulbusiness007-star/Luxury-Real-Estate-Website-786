"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, PhoneCall } from "lucide-react";
import gsap from "gsap";
import styles from "./StickyContact.module.css";

export default function StickyContact() {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    if (visible) {
      gsap.to(wrapperRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [visible]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.whatsapp}`}
        aria-label="Chat on WhatsApp"
      >
        <Phone size={22} />
        <span className={styles.tooltip}>Chat on WhatsApp</span>
      </a>

      {/* Call Button */}
      <a
        href="tel:+1234567890"
        className={`${styles.button} ${styles.call}`}
        aria-label="Call Us Now"
      >
        <PhoneCall size={22} />
        <span className={styles.tooltip}>Call Us Now</span>
      </a>
    </div>
  );
}
