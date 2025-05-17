"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./LiveService.module.css";

export default function LiveService() {
  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission (no backend yet)
    alert("Prayer request submitted! We'll pray for you!");
  };

  const youtubeChannelId = "UCeSA9J33hAdblwSOovMdM-A"; // Replace with @cebigchurch's Channel ID (e.g., UC1234567890)
  const isLive = true; // Static for now; set to true for testing live player, false for fallback

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.liveBadge}>Live Now</div>
          <h1 className={styles.heroTitle}>Join Our Live Service</h1>
          <p className={styles.heroText}>
            Experience the power of worship and the word with CEBC Youth Church!
          </p>
          {isLive ? (
            <iframe
              className={styles.heroPlayer}
              src={`https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=1&mute=1&rel=0`}
              title="CEBC Youth Church Live Service"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className={styles.heroFallback}>
              <Image
                src="/cebc-logo.png"
                alt="CEBC Logo"
                width={120}
                height={120}
                className={styles.fallbackLogo}
              />
              <p className={styles.fallbackText}>
                No live stream active. Check back soon for our next service!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Schedule Section */}
      <section className={styles.schedule}>
        <h2 className={styles.scheduleTitle}>Service Schedule</h2>
        <div className={styles.scheduleGrid}>
          {[
            { day: "Sunday Worship", time: "May 18, 2025, 10:00 AM WAT" },
            { day: "Midweek Service", time: "May 21, 2025, 7:00 PM WAT" },
          ].map((service, index) => (
            <div key={index} className={styles.scheduleCard}>
              <h3 className={styles.scheduleDay}>{service.day}</h3>
              <p className={styles.scheduleTime}>{service.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prayer Request Section */}
      <section className={styles.prayer}>
        <h2 className={styles.prayerTitle}>Submit a Prayer Request</h2>
        <form className={styles.prayerForm} onSubmit={handlePrayerSubmit}>
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
            <label htmlFor="prayer" className={styles.formLabel}>
              Prayer Request
            </label>
            <textarea
              id="prayer"
              className={styles.formTextarea}
              placeholder="Your Prayer Request"
              rows={4}
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.formButton}>
            Submit Prayer
          </button>
        </form>
        <Image
          src="/prayer-icon.png"
          alt="Prayer Icon"
          width={40}
          height={40}
          className={styles.prayerIcon}
        />
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Join Our Community</h2>
        <p className={styles.ctaText}>
          Be part of our vibrant youth church family!
        </p>
        <Link href="/contact" className={styles.ctaButton}>
          Get Involved
        </Link>
      </section>
    </main>
  );
}