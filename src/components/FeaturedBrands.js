// src/components/FeaturedBrands.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/FeaturedBrands.css";

// Import brand logos (place actual PNG/SVG files in src/assets/brands/)
import ItelLogo from "../assets/brands/itel.png";
import SofarLogo from "../assets/brands/sofar.png";
import GrowattLogo from "../assets/brands/growatt.png";
import InverexLogo from "../assets/brands/invere.png";
import LongiLogo from "../assets/brands/longi.png";
import JinkoLogo from "../assets/brands/jinko.png";
import TrinaLogo from "../assets/brands/trina.png";
import HuaweiLogo from "../assets/brands/huawei.png";
import GenericLogo from "../assets/brands/generic.png"; // placeholder for generic/no-brand items

const brands = [
  { name: "Itel", logo: ItelLogo },
  { name: "Sofar", logo: SofarLogo },
  { name: "Growatt", logo: GrowattLogo },
  { name: "Inverex", logo: InverexLogo },
  { name: "Longi", logo: LongiLogo },
  { name: "Jinko", logo: JinkoLogo },
  { name: "Trina", logo: TrinaLogo },
  { name: "Huawei", logo: HuaweiLogo },
  { name: "Generic", logo: GenericLogo },
];

const FeaturedBrands = () => {
  return (
    <section className="featured-brands">
      <div className="section-header">
        <h2>Featured Brands</h2>
        <p>Discover premium solar, inverters, batteries & electronics from leading companies</p>
      </div>

      <div className="brands-grid">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            to={`/shop?company=${encodeURIComponent(brand.name)}`}
            className="brand-card"
            title={`Browse all ${brand.name} products`}
          >
            <div className="brand-logo-wrapper">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="brand-logo"
                loading="lazy"
              />
            </div>
            <h3 className="brand-name">{brand.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrands;