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
          <h1 className={styles.heroTitle}>About CEBC Youth Church</h1>
          <p className={styles.heroText}>
            Empowering youth to live for Christ!
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <h2 className={styles.missionTitle}>Our Mission & Vision</h2>
        <p className={styles.missionText}>
          At CEBC Youth Church, we’re passionate about guiding young people to discover their purpose in Christ. Our mission is to create a vibrant community where youth can grow spiritually, connect with others, and make a positive impact in the world. We envision a generation that’s bold, faith-filled, and ready to lead with love and purpose.
        </p>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2 className={styles.teamTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {([
            {
              name: "Pastor John Doe",
              role: "Youth Pastor",
              image: "/image6.jpg",
            },
            {
              name: "Sarah Smith",
              role: "Worship Leader",
              image: "/image7.jpg",
            },
            {
              name: "Mike Johnson",
              role: "Community Outreach",
              image: "/image6.jpg",
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
          Ready to be part of something bigger? Get involved with CEBC Youth Church today!
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