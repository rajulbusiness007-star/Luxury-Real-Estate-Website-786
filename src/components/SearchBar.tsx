"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch?: (filters: { location: string; type: string; price: string }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [price, setPrice] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ location, type, price });
    }
    
    // Smooth scroll to showcase
    const showcaseSection = document.getElementById("properties");
    if (showcaseSection) {
      showcaseSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <form className={`glass-card ${styles.searchBarContainer}`} onSubmit={handleSearch}>
      <div className={styles.searchGroup}>
        <span className={styles.label}>Location</span>
        <div className={styles.selectWrapper}>
          <select 
            className={styles.select}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="malibu">Malibu, CA</option>
            <option value="como">Lake Como, Italy</option>
            <option value="tokyo">Tokyo, Japan</option>
            <option value="zermatt">Zermatt, Switzerland</option>
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>

      <div className={styles.searchGroup}>
        <span className={styles.label}>Property Type</span>
        <div className={styles.selectWrapper}>
          <select 
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="villa">Villas</option>
            <option value="penthouse">Penthouses</option>
            <option value="chalet">Chalets</option>
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>

      <div className={styles.searchGroup}>
        <span className={styles.label}>Price Range</span>
        <div className={styles.selectWrapper}>
          <select 
            className={styles.select}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="all">Any Price</option>
            <option value="under20">Under $20M</option>
            <option value="20to30">$20M – $30M</option>
            <option value="over30">Over $30M</option>
          </select>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>

      <button type="submit" className={styles.searchBtn}>
        <Search size={18} />
        <span>Search</span>
      </button>
    </form>
  );
}
