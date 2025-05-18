"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Podcast.module.css";

export default function Podcast() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.podcastBadge}>New Episodes</div>
          <h1 className={styles.heroTitle}>CEBC Youth Podcasts</h1>
          <p className={styles.heroText}>
            Tune into God’s word with our youth-inspired podcasts!
          </p>
        </div>
      </section>

      {/* Podcast Grid Section */}
      <section className={styles.podcasts}>
        <h2 className={styles.podcastTitle}>Latest Episodes</h2>
        <div className={styles.podcastGrid}>
          {[
            {
              title: "Episode 1: Finding Faith",
              text: "Discover how to strengthen your faith in tough times.",
              image: "/image1.jpg",
            },
            {
              title: "Episode 2: Youth on Fire",
              text: "Get inspired to live boldly for Christ!",
              image: "/image2.jpg",
            },
            {
              title: "Episode 3: Prayer Power",
              text: "Learn the impact of prayer in your daily life.",
              image: "/image6.jpg",
            },
            {
              title: "Episode 4: God’s Plan",
              text: "Understand God’s purpose for your journey.",
              image: "/image7.jpg",
            },
          ].map((episode, index) => (
            <div key={index} className={styles.podcastCard}>
              <Image
                src={episode.image}
                alt={episode.title}
                width={280}
                height={160}
                className={styles.podcastImage}
                priority
              />
              <h3 className={styles.podcastTitle}>{episode.title}</h3>
              <p className={styles.podcastText}>{episode.text}</p>
              <Link href="#" className={styles.podcastButton}>
                Listen Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Stay Connected</h2>
        <p className={styles.ctaText}>
          Subscribe to our podcast for weekly inspiration and youth-focused messages!
        </p>
        <Link href="#" className={styles.ctaButton}>
          Subscribe Now
        </Link>
        <Image
          src="/cebc-logo.png"
          alt="CEBC Logo"
          width={32}
          height={32}
          className={styles.ctaIcon}
        />
      </section>
    </main>
  );
}