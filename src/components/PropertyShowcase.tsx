"use client";

import { useState, useEffect, useRef } from "react";
import { Maximize2, BedDouble, Bath, Square, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PropertyShowcase.module.css";

interface Property {
  id: string;
  title: string;
  locationName: string;
  locationCode: string;
  typeCode: string;
  priceCode: string;
  priceString: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
}

const PROPERTIES_DATA: Property[] = [
  {
    id: "glass-pavilion",
    title: "The Glass Pavilion",
    locationName: "Malibu, California",
    locationCode: "malibu",
    typeCode: "villa",
    priceCode: "over30",
    priceString: "$32,500,000",
    image: "/images/hero_mansion.png",
    beds: 6,
    baths: 8,
    sqft: 12000,
    description: "Perched majestically above the Malibu coastline, The Glass Pavilion is an architectural masterpiece of glass, steel, and fair-faced concrete. Offering 360-degree panoramic ocean views, an 80-foot infinity-edge pool, private beach access, a state-of-the-art wellness center, and a gallery car room, this home redefines the standard for modern luxury coastal living.",
  },
  {
    id: "villa-sereno",
    title: "Villa Sereno",
    locationName: "Lake Como, Italy",
    locationCode: "como",
    typeCode: "villa",
    priceCode: "20to30",
    priceString: "$28,000,000",
    image: "/images/villa_como.png",
    beds: 7,
    baths: 9,
    sqft: 14500,
    description: "A gorgeous, private waterfront estate nestled on the tranquil shores of Lake Como. Villa Sereno masterfully combines classical Italian craftsmanship with cutting-edge minimalist design. Features include expansive terraced gardens, a heated indoor-outdoor pool, a private deep-water dock hosting a bespoke wooden boat, high glass ceilings, and separate guest quarters.",
  },
  {
    id: "horizon-penthouse",
    title: "The Horizon Penthouse",
    locationName: "Tokyo, Japan",
    locationCode: "tokyo",
    typeCode: "penthouse",
    priceCode: "under20",
    priceString: "$18,900,000",
    image: "/images/tokyo_penthouse.png",
    beds: 3,
    baths: 4,
    sqft: 6200,
    description: "Suspended in the sky above Minato, Tokyo, this ultra-luxury penthouse presents double-height glass walls framing unobstructed views of the Tokyo Tower and Tokyo Bay. Designed by award-winning Japanese architects, it offers custom stone slab finishes, a Zen sky-garden, a private teahouse, personal elevator entrance, and full smart-home customization.",
  },
  {
    id: "chalet-sommet",
    title: "Chalet Sommet",
    locationName: "Zermatt, Switzerland",
    locationCode: "zermatt",
    typeCode: "chalet",
    priceCode: "20to30",
    priceString: "$24,800,000",
    image: "/images/swiss_chalet.png",
    beds: 5,
    baths: 6,
    sqft: 8400,
    description: "An exclusive ski-in, ski-out chalet of unparalleled refinement at the base of the majestic Matterhorn. Chalet Sommet incorporates hand-hewn alpine timber and natural Swiss slate. It features an outdoor heated spa pool overlooking the peaks, a massive open-hearth fireplace, private cinema, wine vault, and dedicated chalet staff quarters.",
  },
];

interface PropertyShowcaseProps {
  searchFilters: {
    location: string;
    type: string;
    price: string;
  };
}

export default function PropertyShowcase({ searchFilters }: PropertyShowcaseProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sync tab with external search component type filter
  useEffect(() => {
    if (searchFilters.type !== "all") {
      setActiveTab(searchFilters.type);
    }
  }, [searchFilters.type]);

  // Filter listings based on both activeTab and searchBar filters
  const filteredProperties = PROPERTIES_DATA.filter((property) => {
    // 1. Tab Filter (Villas, Penthouses, Chalets)
    const matchesTab = activeTab === "all" || property.typeCode === activeTab;

    // 2. SearchBar Location Filter
    const matchesLocation =
      searchFilters.location === "all" || property.locationCode === searchFilters.location;

    // 3. SearchBar Type Filter
    const matchesSearchType =
      searchFilters.type === "all" || property.typeCode === searchFilters.type;

    // 4. SearchBar Price Filter
    const matchesPrice =
      searchFilters.price === "all" || property.priceCode === searchFilters.price;

    return matchesTab && matchesLocation && matchesSearchType && matchesPrice;
  });

  // Stagger reveal animation for the grid items when the filter changes
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);
    if (cards && cards.length > 0) {
      // Clear previous animations if any
      gsap.killTweensOf(cards);

      // Reset styles
      gsap.set(cards, { opacity: 0, y: 30 });

      // Animate entering cards
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
  }, [activeTab, searchFilters]);

  const openLightbox = (property: Property) => {
    setSelectedProperty(property);
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedProperty(null);
    // Re-enable body scroll
    document.body.style.overflow = "unset";
  };

  return (
    <section id="properties" ref={gridRef} className={styles.showcaseSection}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subtitle}>Curated Living</span>
          <h2 className={styles.title}>Our Exclusive Estates</h2>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className={styles.filterContainer}>
          {["all", "villa", "penthouse", "chalet"].map((tab) => (
            <button
              key={tab}
              className={`${styles.filterBtn} ${
                activeTab === tab ? styles.activeFilterBtn : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "all" ? "All Collections" : tab + "s"}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className={styles.grid}>
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className={styles.card}
                onClick={() => openLightbox(property)}
              >
                {/* Background image & gradient overlay */}
                <div className={styles.imageWrapper}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardOverlay} />

                {/* Exclusive Tag */}
                <div className={styles.badge}>Exclusive</div>

                {/* Bottom glassmorphic overlay details */}
                <div className={styles.cardContent}>
                  <span className={styles.location}>{property.locationName}</span>
                  <h3 className={styles.propertyTitle}>{property.title}</h3>

                  <div className={styles.detailsFooter}>
                    <div className={styles.specs}>
                      <div className={styles.specItem}>
                        <BedDouble size={14} />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className={styles.specItem}>
                        <Bath size={14} />
                        <span>{property.baths} Baths</span>
                      </div>
                      <div className={styles.specItem}>
                        <Square size={12} />
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                    <div className={styles.price}>{property.priceString}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-secondary)" }}>
            <p style={{ fontSize: "1.2rem", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
              No estates match your current criteria.
            </p>
            <button 
              className={styles.filterBtn} 
              style={{ marginTop: "1.5rem" }}
              onClick={() => setActiveTab("all")}
            >
              View All Properties
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedProperty && (
        <div className={styles.modalOverlay} onClick={closeLightbox}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery / Picture Side */}
            <div className={styles.modalGallery}>
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className={styles.modalImage}
              />
              <button className={styles.modalCloseBtn} onClick={closeLightbox}>
                <X size={20} />
              </button>
            </div>

            {/* Info Side */}
            <div className={styles.modalDetails}>
              <div>
                <span className={styles.modalLoc}>{selectedProperty.locationName}</span>
                <h3 className={styles.modalTitle}>{selectedProperty.title}</h3>
                <p className={styles.modalDesc}>{selectedProperty.description}</p>

                <div className={styles.modalSpecsGrid}>
                  <div className={styles.modalSpec}>
                    <span className={styles.modalSpecVal}>{selectedProperty.beds}</span>
                    <span className={styles.modalSpecLbl}>Bedrooms</span>
                  </div>
                  <div className={styles.modalSpec}>
                    <span className={styles.modalSpecVal}>{selectedProperty.baths}</span>
                    <span className={styles.modalSpecLbl}>Bathrooms</span>
                  </div>
                  <div className={styles.modalSpec}>
                    <span className={styles.modalSpecVal}>{selectedProperty.sqft.toLocaleString()}</span>
                    <span className={styles.modalSpecLbl}>Square Feet</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <div className={styles.modalPrice}>
                  <span className={styles.priceLbl}>List Price</span>
                  <span className={styles.priceVal}>{selectedProperty.priceString}</span>
                </div>
                <button 
                  className={styles.modalBtn}
                  onClick={() => {
                    closeLightbox();
                    const contactSection = document.getElementById("contact");
                    contactSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
