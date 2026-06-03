"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FAQ.module.css";

const FAQ_DATA = [
  {
    question: "How does your off-market property acquisition process work?",
    answer:
      "Our global network of private sellers, family offices, and development partners grants us exclusive access to properties that never appear on public listings. We begin with a confidential consultation to understand your criteria — location, architecture style, lifestyle requirements, and investment goals — then curate a bespoke shortlist for private viewings.",
  },
  {
    question: "Do you handle international transactions and cross-border compliance?",
    answer:
      "Absolutely. Our legal and financial advisory team specializes in cross-border real estate acquisitions. We coordinate with local counsel in every jurisdiction to handle tax structuring, foreign ownership regulations, currency exchange, escrow services, and all necessary due diligence to ensure a seamless, fully compliant transaction.",
  },
  {
    question: "What is the typical timeline from consultation to closing?",
    answer:
      "Timelines vary by jurisdiction and property complexity. Off-market acquisitions in established markets like Malibu or Lake Como typically close within 60–90 days. For new developments or properties requiring structural modifications, we work with our architecture partners to provide detailed timelines during the initial consultation phase.",
  },
  {
    question: "Can you assist with interior design and property renovation?",
    answer:
      "Yes. We maintain partnerships with world-renowned interior architects and bespoke design studios. From full-scale renovations to turnkey luxury furnishing, our concierge team manages every detail — sourcing rare materials, commissioning custom art, and coordinating with local craftspeople to deliver a space that reflects your vision.",
  },
  {
    question: "What are your fees and commission structure?",
    answer:
      "Our fee structure is tailored to each engagement. For buyer representation, we operate on a transparent commission basis aligned with local market standards. For advisory and concierge services, we offer both retainer-based and project-based arrangements. All fees are disclosed upfront during the initial consultation — there are never hidden costs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = sectionRef.current?.querySelectorAll(`.${styles.item}`);
    if (items) {
      gsap.set(items, { opacity: 0, y: 20 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
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
    <section id="faq" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Knowledge</span>
            <h2 className={styles.title}>Frequently Asked Questions</h2>
          </div>

          <div className={styles.accordionList}>
            {FAQ_DATA.map((item, index) => (
              <div
                key={index}
                className={`${styles.item} ${openIndex === index ? styles.itemOpen : ""}`}
              >
                <div className={styles.itemHeader} onClick={() => toggle(index)}>
                  <span className={styles.question}>{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`${styles.chevron} ${openIndex === index ? styles.chevronOpen : ""}`}
                  />
                </div>
                <div
                  className={`${styles.bodyWrapper} ${openIndex === index ? styles.bodyWrapperOpen : ""}`}
                >
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
