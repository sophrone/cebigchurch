"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/cebc-logo.png"
            alt="CEBC Youth Church Logo"
            width={60}
            height={60}
            className={styles.logoImage}
            priority
          />
        </Link>
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen : ""}`}></span>
          <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen : ""}`}></span>
          <span className={`${styles.hamburgerLine} ${isOpen ? styles.hamburgerLineOpen : ""}`}></span>
        </button>
        <ul className={`${styles.navList} ${isOpen ? styles.navListOpen : ""}`}>
          <li>
            <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/live-service" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Live Service
            </Link>
          </li>
          <li>
            <Link href="/testimony" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Testimony
            </Link>
          </li>
          <li>
            <Link href="/podcast" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Podcast
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink} onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink} onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;