import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-900 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/cebc-logo.png"
            alt="Christ Embassy Big Church Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </Link>
        <h2 className="font-poppins text-xl font-semibold text-center sm:text-2xl">
          Christ Embassy Big Church
        </h2>
        <p className="font-montserrat text-center text-sm sm:text-base">
          The Church without boundaries!
        </p>
        <div className="flex gap-6">
          <Link
            href="https://x.com/cebc_youth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-200 transition"
            aria-label="Follow us on X"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <Link
            href="https://instagram.com/cebc_youth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-200 transition"
            aria-label="Follow us on Instagram"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 3.668.227 1.981 1.97 1.826 5.354.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.155 3.384 1.898 5.071 5.282 5.226 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c3.384-.155 5.071-1.842 5.226-5.226.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.155-3.384-1.842-5.071-5.226-5.226C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </Link>
          <Link
            href="mailto:info@cebc.org"
            className="text-white hover:text-blue-200 transition"
            aria-label="Email us"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.287L12 15 22 7.287V19H2z" />
            </svg>
          </Link>
        </div>
        <p className="font-montserrat text-sm text-center sm:text-base">
          © {new Date().getFullYear()} Christ Embassy Big Church. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;