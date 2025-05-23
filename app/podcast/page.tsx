"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AudioPlayer from "../components/AudioPlayer";
import styles from "./Podcast.module.css";

interface Episode {
  title: string;
  text: string;
  image: string;
  audioSrc: string;
}

export default function Podcast() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [closedEpisode, setClosedEpisode] = useState<string | null>(null);

  const handlePlayClick = (episode: Episode) => {
    console.log(`Selected episode: ${episode.title}`);
    setSelectedEpisode(episode);
  };

  useEffect(() => {
    if (closedEpisode && selectedEpisode && selectedEpisode.title === closedEpisode) {
      setSelectedEpisode(null);
      setClosedEpisode(null);
    }
  }, [closedEpisode, selectedEpisode]);

  const fallbackImage = "/cebc-logo.png";

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.podcastBadge}>New Episodes</div>
          <h1 className={styles.heroTitle}>CEBC Podcasts</h1>
          <p className={styles.heroText}>
            Get inspired by the word everyday and on the go!
          </p>
        </div>
      </section>

      {/* Podcast Grid Section */}
      <section className={styles.podcasts}>
        <h2 className={styles.podcastTitle}>Latest Episodes</h2>
        <div className={styles.podcastGrid}>
          {([
            {
              title: "Episode 1: Finding Faith",
              text: "Discover how to strengthen your faith in tough times.",
              image: "/image7.jpg",
              audioSrc: "/Drive.mp3",
            },
            {
              title: "Episode 2: Youth on Fire",
              text: "Get inspired to live boldly for Christ!",
              image: "/image6.jpg",
              audioSrc: "/Bliss.mp3",
            },
            {
              title: "Episode 3: Prayer Power",
              text: "Learn the impact of prayer in your daily life.",
              image: "/image6.jpg",
              audioSrc: "/Fulfillment.mp3",
            },
            {
              title: "Episode 4: God’s Plan",
              text: "Understand God’s purpose for your journey.",
              image: "/image7.jpg",
              audioSrc: "/Infinity.mp3",
            },
          ] as Episode[]).map((episode, index) => (
            <div key={index} className={styles.podcastCard}>
              <Image
                src={episode.image}
                alt={episode.title}
                width={280}
                height={160}
                className={styles.podcastImage}
                priority
                loading="eager"
                onError={(e) => {
                  console.error(`Failed to load image: ${episode.image}`);
                  (e.target as HTMLImageElement).src = fallbackImage; // Fallback to logo
                }}
              />
              <h3 className={styles.podcastTitle}>{episode.title}</h3>
              <p className={styles.podcastText}>{episode.text}</p>
              <button
                onClick={() => handlePlayClick(episode)}
                className={styles.podcastButton}
              >
                Listen Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Stay Connected</h2>
        <p className={styles.ctaText}>
          Subscribe to our channel for weekly inspiration and faith-stirring messages!
        </p>
        <Link href="https://www.youtube.com/@cebigchurch" target="_blank"
            rel="noopener noreferrer" className={styles.ctaButton}>
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

      {/* Audio Player */}
      {selectedEpisode && (
        <AudioPlayer
          title={selectedEpisode.title}
          audioSrc={selectedEpisode.audioSrc}
          imageSrc={selectedEpisode.image}
          onCloseComplete={setClosedEpisode}
        />
      )}
    </main>
  );
}