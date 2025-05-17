"use client";

import Image from "next/image";
import styles from "./LiveService.module.css";

export default function LiveService() {
  // Hardcode YouTube URL here (replace with @cebigchurch video, e.g., https://www.youtube.com/watch?v=VIDEO_ID)
  const videoUrl = "https://www.youtube.com/watch?v=pef93NO1C9M"; // Placeholder

  // Extract video ID from YouTube URL
  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoUrl);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.liveBadge}>Live Now</div>
          <h1 className={styles.heroTitle}>Join Our Live Service</h1>
          {videoId ? (
            <iframe
              className={styles.heroPlayer}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
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
                No video available. Check back soon!
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
            { day: "Sunday Worship", time: "May 18, 2025, 10:00 AM WAT", class: styles.sundayCard },
            { day: "Midweek Service", time: "May 21, 2025, 7:00 PM WAT", class: styles.wednesdayCard },
          ].map((service, index) => (
            <div key={index} className={`${styles.scheduleCard} ${service.class}`}>
              <h3 className={styles.scheduleDay}>{service.day}</h3>
              <p className={styles.scheduleTime}>{service.time}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}