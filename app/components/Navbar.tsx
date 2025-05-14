import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/cebc-logo.png"
            alt="CEBC Youth Church Logo"
            width={50}
            height={50}
          />
        </Link>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/live-service" className={styles.navLink}>
              Live Service
            </Link>
          </li>
          <li>
            <Link href="/testimony" className={styles.navLink}>
              Testimony
            </Link>
          </li>
          <li>
            <Link href="/podcast" className={styles.navLink}>
              Podcast
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;