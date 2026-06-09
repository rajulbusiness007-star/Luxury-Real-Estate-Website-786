"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Sparkles, X } from "lucide-react";
import gsap from "gsap";
import styles from "./FloatingQuote.module.css";

export default function FloatingQuote() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bounceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll-based visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!dismissed) {
        setVisible(window.scrollY > 500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  // Entrance / exit animation
  useEffect(() => {
    if (!buttonRef.current) return;

    if (visible && !dismissed) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        x: -20,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [visible, dismissed]);

  // Bounce animation every 5 seconds
  useEffect(() => {
    if (visible && !dismissed) {
      bounceTimerRef.current = setInterval(() => {
        if (buttonRef.current) {
          gsap.to(buttonRef.current, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 3,
          });
        }
      }, 5000);
    }

    return () => {
      if (bounceTimerRef.current) {
        clearInterval(bounceTimerRef.current);
      }
    };
  }, [visible, dismissed]);

  const handleClick = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleDismiss = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setDismissed(true);
      setVisible(false);
    },
    []
  );

  if (dismissed) return null;

  return (
    <div ref={buttonRef} className={styles.wrapper}>
      <button
        onClick={handleClick}
        className={styles.button}
        aria-label="Get Free Quote"
      >
        <Sparkles size={18} className={styles.icon} />
        <span className={styles.text}>Get Free Quote</span>
      </button>

      <button
        onClick={handleDismiss}
        className={styles.close}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
