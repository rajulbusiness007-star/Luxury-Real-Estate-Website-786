import Link from "next/link";
import { Globe, ExternalLink, AtSign } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.upper}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              AURELIA<span className={styles.logoGold}>.</span>
            </div>
            <p className={styles.brandDesc}>
              Curating the world&apos;s most extraordinary residences for
              discerning clients who demand nothing less than perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className={styles.colTitle}>Explore</div>
            <div className={styles.colLinks}>
              <Link href="#properties" className={styles.colLink}>Properties</Link>
              <Link href="#testimonials" className={styles.colLink}>Testimonials</Link>
              <Link href="#faq" className={styles.colLink}>FAQs</Link>
              <Link href="#contact" className={styles.colLink}>Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className={styles.colTitle}>Services</div>
            <div className={styles.colLinks}>
              <span className={styles.colLink}>Buyer Representation</span>
              <span className={styles.colLink}>Seller Advisory</span>
              <span className={styles.colLink}>Property Management</span>
              <span className={styles.colLink}>Interior Design</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className={styles.colTitle}>Legal</div>
            <div className={styles.colLinks}>
              <span className={styles.colLink}>Privacy Policy</span>
              <span className={styles.colLink}>Terms of Service</span>
              <span className={styles.colLink}>Cookie Policy</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} Aurelia Luxury Estates. All rights
            reserved.
          </span>
          <div className={styles.socials}>
            <div className={styles.socialIcon}>
              <Globe size={16} />
            </div>
            <div className={styles.socialIcon}>
              <ExternalLink size={16} />
            </div>
            <div className={styles.socialIcon}>
              <AtSign size={16} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
