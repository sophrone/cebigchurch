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

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <h2 className={styles.formTitle}>Send Us a Message</h2>
        <div className={styles.form}>
          <div className={styles.formFields}>
            <input
              type="text"
              placeholder="Your Name"
              className={styles.input}
              aria-label="Your Name"
            />
            <input
              type="email"
              placeholder="Your Email"
              className={styles.input}
              aria-label="Your Email"
            />
          </div>
          <textarea
            placeholder="Your Message"
            className={styles.textarea}
            aria-label="Your Message"
          />
          <button className={styles.submitButton} disabled>
            Send Message
          </button>
          <p className={styles.formNote}>
            Note: Form submission is disabled in this demo.
          </p>
        </div>
      </section>

      {/* Social Links Section */}
      <section className={styles.social}>
        <h2 className={styles.socialTitle}>Connect With Us</h2>
        <div className={styles.socialLinks}>
          <Link href="https://www.instagram.com/ce_bigchurch/" className={styles.socialLink}>
            <Image
              src="/instagram-logo.png"
              alt="Instagram"
              width={32}
              height={32}
              className={styles.socialIcon}
              onError={() => console.error("Failed to load image: /instagram-logo.png")}
            />
          </Link>
          <Link href="https://www.youtube.com/@cebigchurch" className={styles.socialLink}>
            <Image
              src="/youtube-logo.png"
              alt="YouTube"
              width={32}
              height={32}
              className={styles.socialIcon}
              onError={() => console.error("Failed to load image: /youtube-logo.png")}
            />
          </Link>
          <Link href="https://kingschat.online/user/ce_bigchurch" className={styles.socialLink}>
            <Image
              src="/kingschat-logo.png"
              alt="KingsChat"
              width={32}
              height={32}
              className={styles.socialIcon}
              onError={() => console.error("Failed to load image: /kingschat-logo.png")}
            />
          </Link>
        </div>
        <div className={styles.contactInfo}>
          <p className={styles.contactText}>Email: <a href="mailto:cebigchurchtestimonies@gmail.com" className={styles.contactLink}>cebigchurchtestimonies@gmail.com</a></p>
          <p className={styles.contactText}>Phone: <a href="tel:+2341234567890" className={styles.contactLink}>+234 123 456 7890</a></p>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.map}>
        <h2 className={styles.mapTitle}>Find Us</h2>
        <p className={styles.mapText}>
          Christ Embassy Big Church<br />
          123 Faith Avenue, Lagos, Nigeria
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