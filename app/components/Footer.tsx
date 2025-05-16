"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Social Media Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://instagram.com/cebc_youth"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <Image
              src="/instagram-logo.png"
              alt="Instagram"
              width={40}
              height={40}
              className={styles.socialIcon}
            />
          </a>
          <a
            href="https://youtube.com/cebc_youth"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <Image
              src="/youtube-logo.png"
              alt="YouTube"
              width={40}
              height={40}
              className={styles.socialIcon}
            />
          </a>
          <a
            href="https://kingschat.com/cebc_youth"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <Image
              src="/kingschat-logo.png"
              alt="KingsChat"
              width={40}
              height={40}
              className={styles.socialIcon}
            />
          </a>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <Link href="/" className={styles.quickLink}>
            Home
          </Link>
          <Link href="/live-service" className={styles.quickLink}>
            Live Service
          </Link>
          <Link href="/contact" className={styles.quickLink}>
            Contact
          </Link>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={styles.backToTop}
          aria-label="Scroll to top"
        >
          Back to Top
        </button>

        {/* Copyright */}
        <p className={styles.copyright}>
          © 2025 Christ Embassy Big Church
        </p>
      </div>
    </footer>
  );
}