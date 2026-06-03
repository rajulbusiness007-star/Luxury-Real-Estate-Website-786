"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const els = sectionRef.current.querySelectorAll(
        `.${styles.info}, .${styles.formCard}`
      );
      gsap.set(els, { opacity: 0, y: 30 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column — Contact Info */}
          <div className={styles.info}>
            <span className={styles.subtitle}>Get in Touch</span>
            <h2 className={styles.title}>
              Begin Your Journey to Extraordinary Living
            </h2>
            <p className={styles.desc}>
              Schedule a private consultation with our acquisitions team. Every
              conversation is held in the strictest confidence.
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <Phone size={20} />
                </div>
                <div>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className={styles.contactValue}>+1 (310) 555-0199</div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <Mail size={20} />
                </div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.contactValue}>
                    concierge@aurelia-estates.com
                  </div>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div className={styles.contactLabel}>Headquarters</div>
                  <div className={styles.contactValue}>
                    Beverly Hills, California
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Form Card */}
          <div className={`glass-card ${styles.formCard}`}>
            {submitted ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✦</div>
                <h3 className={styles.successTitle}>Thank You</h3>
                <p className={styles.successText}>
                  Your inquiry has been received. A member of our acquisitions
                  team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>First Name</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Julian"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Last Name</label>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Thorne"
                      required
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="julian@example.com"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone</label>
                    <input
                      className={styles.input}
                      type="tel"
                      placeholder="+1 (310) 555-0199"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Tell us about your ideal property — location, style, features, and budget..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Schedule Consultation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
