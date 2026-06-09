"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import StatsCounter from "@/components/StatsCounter";
import PropertyShowcase from "@/components/PropertyShowcase";
import BeforeAfter from "@/components/BeforeAfter";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import VideoTestimonials from "@/components/VideoTestimonials";
import TrustBadges from "@/components/TrustBadges";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import StickyContact from "@/components/StickyContact";
import FloatingQuote from "@/components/FloatingQuote";

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState({
    location: "all",
    type: "all",
    price: "all",
  });

  const handleSearch = (filters: {
    location: string;
    type: string;
    price: string;
  }) => {
    setSearchFilters(filters);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero onSearch={handleSearch} />
        <ClientLogos />
        <StatsCounter />
        <PropertyShowcase searchFilters={searchFilters} />
        <BeforeAfter />
        <CaseStudies />
        <Testimonials />
        <VideoTestimonials />
        <TrustBadges />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <StickyContact />
      <FloatingQuote />
    </>
  );
}
