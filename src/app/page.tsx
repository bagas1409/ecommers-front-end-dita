// src/App.jsx
import BackgroundDecor from "@/components/BackgroundDecor";
import Navbar from "@/components/Navbar1";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Benefits from "@/components/Benefits";
import Bestsellers from "@/components/Bestsellers";
import BannerCTA from "@/components/BannerCTA";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-rose-100 selection:text-rose-900">
      {/* Dekorasi background blur */}
      <BackgroundDecor />

      {/* Navbar */}
      <Navbar />

      {/* Konten utama */}
      <main>
        <Hero />
        <TrustBar />
        <Benefits />
        <Bestsellers />
        <BannerCTA />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
