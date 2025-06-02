import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/travelStore';
import { formatItinerary } from '../utils/formatItinerary';
import './ItineraryDisplay.css';

const ItineraryDisplay = () => {
  const navigate = useNavigate();
  const {
    formData,
    itinerary,
    generatedAt,
    clearItinerary,
    resetForm
  } = useTravelStore();

  // If no itinerary exists, redirect to form
  if (!itinerary) {
    navigate('/');
    return null;
  }

  const handlePlanAnother = () => {
    clearItinerary();
    resetForm();
    navigate('/');
  };

  const handlePrint = () => {
    window.print();
  };

  const formattedItinerary = formatItinerary(itinerary);

  return (
    <div className="itinerary-container">
      <header className="itinerary-header">
        <h1>{formData.destination ? `Your ${formData.destination} Adventure` : 'Your Travel Itinerary'}</h1>
        <p className="itinerary-subtitle">
          {formData.duration && `${formData.duration} • `}
          Generated on {new Date(generatedAt).toLocaleDateString()}
        </p>
      </header>

      <section className="trip-overview">
        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-label">Destination</span>
            <span className="overview-value">{formData.destination || '-'}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Duration</span>
            <span className="overview-value">{formData.duration || '-'}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Budget</span>
            <span className="overview-value">{formData.budget || '-'}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Group Size</span>
            <span className="overview-value">{formData.groupSize || '-'}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Accommodation</span>
            <span className="overview-value">{formData.accommodationType || '-'}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">Travel Dates</span>
            <span className="overview-value">{formData.travelDates || '-'}</span>
          </div>
        </div>
      </section>

      <section className="itinerary-content">
        <div 
          dangerouslySetInnerHTML={{ __html: formattedItinerary }}
        />
      </section>

      <div className="action-buttons">
        <button className="btn" onClick={handlePlanAnother}>
          ← Plan Another Trip
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          🖨️ Print Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryDisplay; 