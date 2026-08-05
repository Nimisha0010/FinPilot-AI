import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";

function Landing() {
  return (
    <div className="bg-[var(--background)] text-[var(--text-primary)]">
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <Testimonials />

      <CTA />

      <Footer />
    </div>
  );
}

export default Landing;