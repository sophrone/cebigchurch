import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <section className="text-center py-16">
        <Image
          src="/cebc-logo.png"
          alt="CEBC Youth Church Logo"
          width={150}
          height={150}
          className="mx-auto mb-4"
        />
        <h1 className="text-5xl font-bold text-blue-800 mb-4">
          Welcome to Christ Embassy Big Church!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          A vibrant community where young people connect, worship, and grow in faith. Join us for live services, inspiring testimonies, and uplifting podcasts!
        </p>
        <div className="space-x-4">
          <Link
            href="/live-service"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Watch Live
          </Link>
          <Link
            href="/contact"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition"
          >
            Connect With Us
          </Link>
        </div>
      </section>
    </div>
  );
}