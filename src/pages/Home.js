import React from "react";
import Banner from "../components/Banner";
import ProductCategories from "../components/FeaturedBrands";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

// Import images
import solarImg from "../assets/solar.png";
import inverterImg from "../assets/inverter.png";
import batteryImg from "../assets/battery.png";
import ledImg from "../assets/led.png";

// Dummy products with imported images
const dummyProducts = [
  { id: 1, name: "Solar Panel 250W", price: 25000, image: solarImg },
  { id: 2, name: "Inverter 1kW", price: 45000, image: inverterImg },
  { id: 3, name: "Battery 100Ah", price: 30000, image: batteryImg },
  { id: 4, name: "LED Light", price: 1500, image: ledImg },
];

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <section className="section">
        <ProductCategories />
      </section>
      <section className="section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {dummyProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
