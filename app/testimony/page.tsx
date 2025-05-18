"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Testimony.module.css";

export default function Testimony() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Testimony submitted! Glory!");
  };

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.praiseBadge}>Praise Report</div>
          <h1 className={styles.heroTitle}>Share Your Testimony</h1>
          <p className={styles.heroText}>
            Tell us how God’s moving in your life!
          </p>
        </div>
      </section>

      {/* Testimony Form Section */}
      <section className={styles.form}>
        <h2 className={styles.formTitle}>Submit Your Praise Report</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.formInput}
              placeholder="Your Name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="testimony" className={styles.formLabel}>
              Testimony
            </label>
            <textarea
              id="testimony"
              className={styles.formTextarea}
              placeholder="Share your praise report..."
              rows={5}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.formButton}>
            Submit Testimony
          </button>
        </form>
        <Image
          src="/cebc-logo.png"
          alt="CEBC Logo"
          width={40}
          height={40}
          className={styles.formIcon}
        />
      </section>

      {/* Testimony Showcase Section */}
      <section className={styles.testimonies}>
        <h2 className={styles.testimonyTitle}>Our Community’s Praises</h2>
        <div className={styles.testimonyGrid}>
          {[
            {
              name: "Temi",
              text: "God blessed me with a new job after months of praying!",
            },
            {
              name: "Chisom",
              text: "I was healed from a long illness—praise God!",
            },
            {
              name: "David",
              text: "My family came together in unity through CEBC’s prayers!",
            },
          ].map((testimony, index) => (
            <div key={index} className={styles.testimonyCard}>
              <h3 className={styles.testimonyName}>{testimony.name}</h3>
              <p className={styles.testimonyText}>{testimony.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Join Our Services</h2>
        <p className={styles.ctaText}>
          Come worship with us and experience God’s power!
        </p>
        <Link href="/live-service" className={styles.ctaButton}>
          Join Now
        </Link>
      </section>
    </main>
  );
}