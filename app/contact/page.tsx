"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Reach Out</div>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroText}>
            We’d love to hear from you!
          </p>
        </div>
      </section>

      {/* Social Links Section */}
      <section className={styles.social}>
        <h2 className={styles.socialTitle}>Connect With Us</h2>
        <div className={styles.socialLinks}>
          <Link href="https://kingschat.online/user/ce_bigchurch" target="_blank"
            rel="noopener noreferrer" className={styles.socialLink}>
            <Image
              src="/kingschat-logo.png"
              alt="KingsChat"
              width={40}
              height={40}
              className={styles.socialIcon}
              onError={() => console.error("Failed to load image: /kingschat-logo.png")}
            />
          </Link>
          <Link href="https://www.youtube.com/@cebigchurch" target="_blank"
            rel="noopener noreferrer" className={styles.socialLink}>
            <Image
              src="/youtube-logo.png"
              alt="YouTube"
              width={40}
              height={40}
              className={styles.socialIcon}
              onError={() => console.error("Failed to load image: /youtube-logo.png")}
            />
          </Link>
          <Link href="https://www.instagram.com/ce_bigchurch/" target="_blank"
            rel="noopener noreferrer" className={styles.socialLink}>
            <Image
              src="/instagram-logo.png"
              alt="Instagram"
              width={40}
              height={40}
              className={styles.socialIcon}
              onError={() => console.error("Failed to load image: /instagram-logo.png")}
            />
          </Link>
        </div>
        <div className={styles.contactInfo}>
          <a href="mailto:cebigchurchtestimonies@gmail.com" className={styles.contactLink}>
            📧 cebigchurchtestimonies@gmail.com
          </a>
          <a href="tel:+2341234567890" className={styles.contactLink}>
            📞 +234 123 456 7890
          </a>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.map}>
        <h2 className={styles.mapTitle}>Find Us</h2>
        <p className={styles.mapText}>
          Christ Embassy Big Church<br />
          MRS Filling Station, Opposite Garden Top Hotel<br />
          Festac Access Road, Lagos, Nigeria.
        </p>
        <Image
          src="/image3.jpg"
          alt="Map of Christ Embassy Big Church location"
          width={600}
          height={300}
          className={styles.mapImage}
          priority
          loading="eager"
          data-image="/image3.jpg"
          onError={() => console.error("Failed to load image: /image3.jpg")}
        />
      </section>
    </main>
  );
}