"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PropertyShowcase from "@/components/PropertyShowcase";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

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
        <PropertyShowcase searchFilters={searchFilters} />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
