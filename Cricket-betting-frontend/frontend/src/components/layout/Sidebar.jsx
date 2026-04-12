import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState("cricket");

  const sportCategories = [
    { id: "cricket", name: "🏏 Cricket", icon: "🏏" },
    { id: "football", name: "⚽ Football", icon: "⚽" },
    { id: "basketball", name: "🏀 Basketball", icon: "🏀" },
    { id: "tennis", name: "🎾 Tennis", icon: "🎾" },
    { id: "badminton", name: "🏸 Badminton", icon: "🏸" },
    { id: "hockey", name: "🏑 Hockey", icon: "🏑" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <span className="sports-icon">🎮</span>
            Sports
          </h3>
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-divider"></div>

        <nav className="sports-nav">
          {sportCategories.map((sport) => (
            <button
              key={sport.id}
              className={`sport-item ${activeCategory === sport.id ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(sport.id);
              }}
            >
              <span className="sport-icon">{sport.icon}</span>
              <span className="sport-name">{sport.name}</span>
              <span className="sport-indicator"></span>
            </button>
          ))}
        </nav>

        <div className="sidebar-divider"></div>

        <div className="sidebar-footer">
          <p className="sidebar-subtitle">Quick Stats</p>
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-label">Active Bets</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Win Rate</span>
              <span className="stat-value">68%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;