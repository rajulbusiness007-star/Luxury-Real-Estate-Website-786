"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
        <div className="container">
          <div className={`${styles.inner} ${isScrolled ? styles.scrolledInner : ""}`}>
            <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
              AURELIA<span className={styles.logoGold}>.</span>
            </Link>

            <nav className={styles.navLinks}>
              <Link href="#properties" className={styles.navLink}>Properties</Link>
              <Link href="#testimonials" className={styles.navLink}>Testimonials</Link>
              <Link href="#faq" className={styles.navLink}>FAQs</Link>
              <Link href="#contact" className={styles.navLink}>Contact</Link>
            </nav>

            <button className={styles.ctaBtn} onClick={() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }}>
              Book Consultation
            </button>

            <div className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <Link href="#properties" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          Properties
        </Link>
        <Link href="#testimonials" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          Testimonials
        </Link>
        <Link href="#faq" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          FAQs
        </Link>
        <Link href="#contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>
          Contact
        </Link>
        <button 
          className={styles.ctaBtn} 
          style={{ display: "block", marginTop: "2rem" }}
          onClick={() => {
            closeMobileMenu();
            setTimeout(() => {
              const el = document.getElementById("contact");
              el?.scrollIntoView({ behavior: "smooth" });
            }, 300);
          }}
        >
          Book Consultation
        </button>
      </div>
    </>
  );
}
