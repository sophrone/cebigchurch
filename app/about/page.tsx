"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Our Story</div>
          <h1 className={styles.heroTitle}>About Christ Embassy Big Church</h1>
          <p className={styles.heroText}>
            The Church without boundaries!
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <h2 className={styles.missionTitle}>Our Mission & Vision</h2>
        <p className={styles.missionText}>
          At Christ Embassy Big Church, we’re passionate about guiding young people to discover their purpose in Christ. Our mission is to spread the message of the gospel to everyone in our world and beyond. We are a generation that’s bold, faith-filled, and ready to take over the world for our Lord Jesus.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2 className={styles.teamTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {([
            {
              name: "Pastor Trusouth",
              role: "Pastor",
              image: "/image6.jpg",
            },
            {
              name: "Bro Austin Duru",
              role: "Fellowship Leader",
              image: "/image8.jpg",
            },
            {
              name: "Bro Francis Ugochukwu",
              role: "Community Outreach Coordinator",
              image: "/image9.jpg",
            },
          ]).map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className={styles.teamImage}
                priority
                loading="eager"
                data-image={member.image}
                onError={() => console.error(`Failed to load image: ${member.image}`)}
              />
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Join Our Community</h2>
        <p className={styles.ctaText}>
          Ready to be part of something bigger? Get involved with Christ Embassy Big Church today!
        </p>
        <Link href="/contact" className={styles.ctaButton}>
          Get Involved
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