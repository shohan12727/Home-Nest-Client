import { Home, MapPin, Users, Star, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-primary">HomeNest</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-80">
          HomeNest is a trusted real estate platform where finding, listing, and
          managing properties feels simple, transparent, and reliable.
        </p>
      </section>

      {/* About Description */}
      <section className="bg-base-200">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Your Trusted Property Companion
            </h2>
            <p className="opacity-80 leading-relaxed">
              HomeNest connects property owners and seekers in one unified
              platform. Whether you are searching for a rental home, a property
              to buy, or a commercial space, HomeNest helps you make informed
              decisions with clarity and confidence.
            </p>
            <p className="opacity-80 leading-relaxed mt-4">
              We believe finding the right place should not be complicated. Our
              platform focuses on ease of use, verified listings, and meaningful
              property information.
            </p>
          </div>
          <div className="flex justify-center">
            <Home className="w-32 h-32 text-primary opacity-80" />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto opacity-80">
          Our mission is to simplify the real estate experience by creating a
          platform where property information is clear, access is secure, and
          trust is built through transparency.
        </p>
      </section>

      {/* Values */}
      <section className="bg-base-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 p-6 shadow-md text-center">
              <MapPin className="w-10 h-10 mx-auto text-primary mb-4" />
              <h4 className="font-semibold mb-2">Accurate Listings</h4>
              <p className="text-sm opacity-75">
                Clear property details with location-focused information.
              </p>
            </div>

            <div className="card bg-base-100 p-6 shadow-md text-center">
              <Users className="w-10 h-10 mx-auto text-primary mb-4" />
              <h4 className="font-semibold mb-2">User-Centered</h4>
              <p className="text-sm opacity-75">
                Designed for both property owners and seekers.
              </p>
            </div>

            <div className="card bg-base-100 p-6 shadow-md text-center">
              <Star className="w-10 h-10 mx-auto text-primary mb-4" />
              <h4 className="font-semibold mb-2">Real Feedback</h4>
              <p className="text-sm opacity-75">
                Ratings and reviews to support confident decisions.
              </p>
            </div>

            <div className="card bg-base-100 p-6 shadow-md text-center">
              <ShieldCheck className="w-10 h-10 mx-auto text-primary mb-4" />
              <h4 className="font-semibold mb-2">Secure Experience</h4>
              <p className="text-sm opacity-75">
                Protected access ensures privacy and trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Find Your Next Place with Confidence
        </h2>
        <p className="max-w-3xl mx-auto opacity-80 mb-8">
          HomeNest is built to help you explore properties effortlessly and make
          better real estate decisions — whether you are listing or searching.
        </p>
        <Link to="/all-properties">
          <button className="btn btn-primary">View Properties</button>
        </Link>
      </section>
    </div>
  );
};

export default About;
