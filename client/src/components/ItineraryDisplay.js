import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/travelStore';
import { formatItinerary } from '../utils/formatItinerary';
import './ItineraryDisplay.css';

const ItineraryDisplay = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(new Set(['overview']));
  
  const {
    formData,
    itinerary,
    generatedAt,
    clearItinerary,
    resetForm
  } = useTravelStore();

  // Redirect if no itinerary
  if (!itinerary) {
    navigate('/');
    return null;
  }

  const handleNewTrip = () => {
    clearItinerary();
    resetForm();
    navigate('/');
  };

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formattedItinerary = formatItinerary(itinerary);

  return (
    <div className="itinerary-container">
      {/* Hero Header */}
      <header className="itinerary-hero">
        <div className="hero-content">
          <div className="destination-info">
            <h1 className="destination-name">{formData.destination}</h1>
            <p className="trip-subtitle">Your personalized travel itinerary</p>
          </div>
          
          <div className="trip-details">
            <div className="detail-chip">
              <span className="detail-icon">📅</span>
              <span>{formData.duration}</span>
            </div>
            <div className="detail-chip">
              <span className="detail-icon">💰</span>
              <span>{formData.budget}</span>
            </div>
            <div className="detail-chip">
              <span className="detail-icon">👥</span>
              <span>{formData.groupSize}</span>
            </div>
          </div>
        </div>
        
        <div className="hero-actions">
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <span className="btn-icon">🖨️</span>
            Print
          </button>
          <button className="btn btn-primary" onClick={handleNewTrip}>
            <span className="btn-icon">✨</span>
            Plan New Trip
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="itinerary-main">
        {/* Trip Overview Card */}
        <section className="content-card overview-card">
          <div 
            className="card-header clickable"
            onClick={() => toggleSection('overview')}
          >
            <h2 className="card-title">
              <span className="card-icon">📋</span>
              Trip Overview
            </h2>
            <span className={`expand-icon ${expandedSections.has('overview') ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          
          {expandedSections.has('overview') && (
            <div className="card-content">
              <div className="overview-grid">
                <div className="overview-item">
                  <span className="overview-label">Destination</span>
                  <span className="overview-value">{formData.destination}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Duration</span>
                  <span className="overview-value">{formData.duration}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Budget</span>
                  <span className="overview-value">{formData.budget}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Group Size</span>
                  <span className="overview-value">{formData.groupSize}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Accommodation</span>
                  <span className="overview-value">{formData.accommodationType || 'Not specified'}</span>
                </div>
                <div className="overview-item">
                  <span className="overview-label">Interests</span>
                  <span className="overview-value">{formData.interests || 'Not specified'}</span>
                </div>
              </div>
              
              <div className="generation-info">
                <span className="generation-label">Generated on:</span>
                <span className="generation-date">
                  {new Date(generatedAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Detailed Itinerary Card */}
        <section className="content-card itinerary-card">
          <div 
            className="card-header clickable"
            onClick={() => toggleSection('itinerary')}
          >
            <h2 className="card-title">
              <span className="card-icon">🗺️</span>
              Detailed Itinerary
            </h2>
            <span className={`expand-icon ${expandedSections.has('itinerary') ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          
          {expandedSections.has('itinerary') && (
            <div className="card-content">
              <div className="itinerary-content">
                <div 
                  className="formatted-itinerary"
                  dangerouslySetInnerHTML={{ __html: formattedItinerary }}
                />
              </div>
            </div>
          )}
        </section>

        {/* Travel Tips Card */}
        <section className="content-card tips-card">
          <div 
            className="card-header clickable"
            onClick={() => toggleSection('tips')}
          >
            <h2 className="card-title">
              <span className="card-icon">💡</span>
              Travel Tips
            </h2>
            <span className={`expand-icon ${expandedSections.has('tips') ? 'expanded' : ''}`}>
              ▼
            </span>
          </div>
          
          {expandedSections.has('tips') && (
            <div className="card-content">
              <div className="tips-grid">
                <div className="tip-item">
                  <span className="tip-icon">📱</span>
                  <div className="tip-content">
                    <h4>Stay Connected</h4>
                    <p>Download offline maps and keep emergency contacts handy</p>
                  </div>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">💳</span>
                  <div className="tip-content">
                    <h4>Budget Tracking</h4>
                    <p>Keep track of expenses and have backup payment methods</p>
                  </div>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">🎒</span>
                  <div className="tip-content">
                    <h4>Pack Smart</h4>
                    <p>Check weather forecasts and pack accordingly</p>
                  </div>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">🕐</span>
                  <div className="tip-content">
                    <h4>Be Flexible</h4>
                    <p>Allow buffer time between activities for a relaxed experience</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer Actions */}
      <footer className="itinerary-footer">
        <div className="footer-content">
          <p className="footer-text">
            Enjoy your trip to <strong>{formData.destination}</strong>! 
            Safe travels and make wonderful memories.
          </p>
          <button className="btn btn-primary" onClick={handleNewTrip}>
            Plan Another Trip
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ItineraryDisplay; 