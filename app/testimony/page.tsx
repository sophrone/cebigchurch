"use client";

import Image from "next/image";
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
            We celebrate God’s word in your life. Kindly share your testimonies with us today.
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
          width={32}
          height={32}
          className={styles.formIcon}
        />
      </section>

      {/* Praise Reports Section */}
      <section className={styles.testimonies}>
        <h2 className={styles.testimonyTitle}>Praise Reports</h2>
        <div className={styles.testimonyGrid}>
          {[
            {
              name: "Austinray",
              text: "My life has been transformed by the word! Glory!",
              image: "/image8.jpg",
            },
            {
              name: "Francis",
              text: "I experience so much grace like never before seen!",
              image: "/image9.jpg",
            },
            {
              name: "Chidera",
              text: "My life has moved from one level of glory to another!",
              image: "/image10.jpg",
            },
            {
              name: "Michael",
              text: "The word of God is real! I know this because it works for me. Glory!",
              image: "/image11.jpg",
            },
          ].map((testimony, index) => (
            <div key={index} className={styles.testimonyCard}>
              <Image
                src={testimony.image}
                alt={`${testimony.name}'s photo`}
                width={80}
                height={80}
                className={styles.testimonyImage}
              />
              <h3 className={styles.testimonyName}>{testimony.name}</h3>
              <p className={styles.testimonyText}>{testimony.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}