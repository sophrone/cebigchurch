import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Hero Section with Video Background */}
      <section className="relative flex items-center justify-center h-[70vh] sm:h-[80vh]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/montage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-poppins text-4xl font-bold text-white mb-4 sm:text-5xl md:text-6xl">
            Christ Embassy Big Church
          </h1>
          <p className="font-montserrat text-lg text-white/90 mb-6 sm:text-xl max-w-md mx-auto">
            The Church without boundaries! Join our vibrant youth community.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center">
            <Link
              href="/live-service"
              className="bg-gradient-to-r from-blue-800 to-purple-900 text-white px-6 py-3 rounded-full font-poppins font-semibold text-lg hover:bg-blue-900 transition transform hover:scale-105 active:scale-95"
            >
              Watch Live
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-6 py-3 rounded-full font-poppins font-semibold text-lg hover:bg-white/10 transition transform hover:scale-105 active:scale-95"
            >
              Connect Now
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 px-4 bg-white sm:py-16">
        <div className="container mx-auto text-center">
          <h2 className="font-poppins text-3xl font-bold text-blue-800 mb-6 sm:text-4xl">
            Welcome to CEBC Youth Church
          </h2>
          <p className="font-montserrat text-lg text-gray-600 mb-8 max-w-2xl mx-auto sm:text-xl">
            We’re a community of young believers passionate about worship, growth, and making a difference. Join us for live services, inspiring testimonies, and more!
          </p>
          <Image
            src="/cebc-logo.png"
            alt="CEBC Youth Church"
            width={120}
            height={120}
            className="mx-auto mb-6 rounded-full animate-fade-in"
          />
        </div>
      </section>

      {/* Events Teaser */}
      <section className="py-12 px-4 bg-gray-100 sm:py-16">
        <div className="container mx-auto">
          <h2 className="font-poppins text-3xl font-bold text-blue-800 mb-6 text-center sm:text-4xl">
            Upcoming Events
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory">
            {[
              { title: "Youth Worship Night", date: "May 25, 2025", time: "6 PM" },
              { title: "Community Outreach", date: "June 1, 2025", time: "10 AM" },
              { title: "Prayer Marathon", date: "June 15, 2025", time: "8 AM" },
            ].map((event, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-white rounded-lg shadow-lg p-6 snap-center transform transition-transform hover:scale-105"
              >
                <h3 className="font-poppins text-xl font-semibold text-blue-800 mb-2">
                  {event.title}
                </h3>
                <p className="font-montserrat text-gray-600">
                  {event.date} at {event.time}
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block text-blue-600 font-montserrat hover:underline"
                >
                  RSVP Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimony Highlight */}
      <section className="py-12 px-4 bg-white sm:py-16">
        <div className="container mx-auto text-center">
          <h2 className="font-poppins text-3xl font-bold text-blue-800 mb-6 sm:text-4xl">
            Featured Testimony
          </h2>
          <div className="max-w-md mx-auto bg-gradient-to-r from-blue-800/10 to-purple-900/10 rounded-lg p-6 shadow-lg animate-fade-in">
            <p className="font-montserrat text-gray-600 italic mb-4">
              “Joining CEBC Youth Church was a game-changer. The community lifted my faith to new heights!” — Sarah, 19
            </p>
            <Link
              href="/testimony"
              className="text-blue-600 font-montserrat hover:underline"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-800 to-purple-900 text-white sm:py-16">
        <div className="container mx-auto text-center">
          <h2 className="font-poppins text-3xl font-bold mb-6 sm:text-4xl">
            Join the Movement
          </h2>
          <p className="font-montserrat text-lg mb-8 max-w-md mx-auto sm:text-xl">
            Ready to connect with a vibrant youth community? Get involved today!
          </p>
          <Link
            href="/contact"
            className="bg-yellow-400 text-blue-800 px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-yellow-500 transition transform hover:scale-105 active:scale-95"
          >
            Join Us Now
          </Link>
        </div>
      </section>
    </div>
  );
}