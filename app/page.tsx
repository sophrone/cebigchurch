import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={`${styles.homeContainer} flex flex-col min-h-screen bg-[var(--background)]`}>
      {/* Hero Section with Video Background */}
      <section className={styles.hero}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.heroVideo}
        >
          <source src="/montage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} font-poppins`}>
            Christ Embassy Big Church
          </h1>
          <p className={`${styles.heroSubtitle} font-montserrat`}>
            The Church without boundaries! Join our vibrant youth community.
          </p>
          <div className={styles.heroButtons}>
            <Link
              href="/live-service"
              className={`${styles.heroButton} ${styles.primaryButton} font-poppins`}
            >
              Watch Live
            </Link>
            <Link
              href="/contact"
              className={`${styles.heroButton} ${styles.secondaryButton} font-poppins`}
            >
              Connect Now
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className={styles.welcome}>
        <h2 className={`${styles.welcomeTitle} font-poppins`}>
          Welcome to Christ Embassy Big Church
        </h2>
        <p className={`${styles.welcomeText} font-montserrat`}>
          We’re a community of young believers passionate about worship, growth, and making a difference. Join us for live services, inspiring testimonies, and more!
        </p>
        <Image
          src="/cebc-logo.png"
          alt="CEBC Youth Church"
          width={120}
          height={120}
          className={styles.welcomeLogo}
        />
      </section>

      {/* Events Teaser */}
      <section className={styles.events}>
        <div className={styles.eventsSlideshow}>
          {["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"].map((img, index) => (
            <Image
              key={index}
              src={`/${img}`}
              alt={`Event background ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 1200px"
              className={`${styles.slideshowImage} ${index === 0 ? styles.active : ""}`}
              style={{ animationDelay: `${index * 5}s` }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className={styles.slideshowOverlay}></div>
        </div>
        <div className="relative z-10">
          <h2 className={`${styles.eventsTitle} font-poppins text-center`}>
            Upcoming Events
          </h2>
          <div className={styles.eventsList}>
            {[
              { title: "Youth Worship Night", date: "May 25, 2025", time: "6 PM" },
              { title: "Community Outreach", date: "June 1, 2025", time: "10 AM" },
              { title: "Prayer Marathon", date: "June 15, 2025", time: "8 AM" },
              { title: "Youth Talent Showcase", date: "June 22, 2025", time: "4 PM" },
            ].map((event, index) => (
              <div
                key={index}
                className={styles.eventCard}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className={`${styles.eventTitle} font-poppins`}>
                  {event.title}
                </h3>
                <p className={`${styles.eventDetails} font-montserrat`}>
                  {event.date} at {event.time}
                </p>
                <Link
                  href="/contact"
                  className={`${styles.eventLink} font-montserrat`}
                >
                  RSVP Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimony Highlight */}
      <section className={styles.testimony}>
        <div className="container mx-auto text-center">
          <h2 className={`${styles.testimonyTitle} font-poppins`}>
            Featured Testimony
          </h2>
          <div className={styles.testimonyCard}>
            <p className={`${styles.testimonyText} font-montserrat italic`}>
              “Joining CEBC Youth Church was a game-changer. The community lifted my faith to new heights!” — Sarah, 19
            </p>
            <Link
              href="/testimony"
              className={`${styles.testimonyLink} font-montserrat`}
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className="container mx-auto text-center">
          <h2 className={`${styles.ctaTitle} font-poppins`}>
            Join the Movement
          </h2>
          <p className={`${styles.ctaText} font-montserrat`}>
            Ready to connect with a vibrant youth community? Get involved today!
          </p>
          <Link
            href="/contact"
            className={`${styles.ctaButton} font-poppins`}
          >
            Join Us Now
          </Link>
        </div>
      </section>
    </div>
  );
}