import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import PageHeader from "../components/PageHeader";
import "../css/listedItems.css";

export default function ListedItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/donations");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleImageError = (e) => {
    e.target.onerror = null; // hawa infinite loop hudaina
    e.target.src =
      "https://via.placeholder.com/300x200?text=Item+Image+Not+Found";
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <PageHeader title="Listed Items" path="/listed-items" />

      <div className="listed-items-container">
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <img
                src={item.image}
                alt={item.title}
                className="item-image"
                onError={handleImageError}
              />
              <div className="item-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="item-details">
                  <p>
                    <i className="fas fa-user"></i>
                    <strong>Donor:</strong> {item.donor_name}
                  </p>
                  <p>
                    <i className="fas fa-tag"></i>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <i className="fas fa-clock"></i>
                    <strong>Age:</strong> {item.itemAge}
                  </p>
                  <p>
                    <i className="fas fa-star"></i>
                    <strong>Condition:</strong>
                    <span
                      className={`condition-badge ${item.condition.toLowerCase()}`}
                    >
                      {item.condition}
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>
                    <strong>Contact:</strong> {item.contact_info}
                  </p>
                </div>
                <button className="request-btn">Request Item</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
}
