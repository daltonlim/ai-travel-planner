import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/travelStore';
import { formatItinerary } from '../utils/formatItinerary';
import './ItineraryDisplay.css';

const ItineraryDisplay = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(new Set(['overview']));
  const [activeDay, setActiveDay] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const {
    formData,
    itinerary,
    generatedAt,
    clearItinerary,
    resetForm
  } = useTravelStore();

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Travel Itinerary for ${formData.destination}`,
          text: `Check out my travel itinerary for ${formData.destination}!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const formattedItinerary = formatItinerary(itinerary);

  // Parse days from itinerary for timeline view
  const extractDays = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const dayHeaders = doc.querySelectorAll('h4, .day-header');
    const days = [];
    
    dayHeaders.forEach((header, index) => {
      const dayNumber = index + 1;
      const dayTitle = header.textContent || `Day ${dayNumber}`;
      
      // Get content until next day header
      let content = '';
      let nextElement = header.nextElementSibling;
      while (nextElement && !nextElement.matches('h4, .day-header')) {
        content += nextElement.outerHTML;
        nextElement = nextElement.nextElementSibling;
      }
      
      days.push({
        id: dayNumber,
        title: dayTitle,
        content: content
      });
    });
    
    return days;
  };

  const days = extractDays(formattedItinerary);

  return (
    <div className="itinerary-container">
      {/* Enhanced Hero Header */}
      <header className="itinerary-hero">
        <div className="hero-background">
          <div className="hero-content">
            <div className="destination-info">
              <h1 className="destination-name">{formData.destination}</h1>
              <p className="trip-subtitle">Your personalized travel itinerary</p>
              <div className="destination-stats">
                <span className="stat-item">
                  <span className="stat-icon">📍</span>
                  <span>{formData.destination}</span>
                </span>
                <span className="stat-item">
                  <span className="stat-icon">📅</span>
                  <span>{formData.duration}</span>
                </span>
                <span className="stat-item">
                  <span className="stat-icon">💰</span>
                  <span>{formData.budget}</span>
                </span>
              </div>
            </div>
            
            <div className="trip-details-enhanced">
              <div className="detail-chip">
                <span className="detail-icon">👥</span>
                <span>{formData.groupSize}</span>
              </div>
              {formData.accommodationType && (
                <div className="detail-chip">
                  <span className="detail-icon">🏨</span>
                  <span>{formData.accommodationType}</span>
                </div>
              )}
              {formData.interests && (
                <div className="detail-chip">
                  <span className="detail-icon">🎯</span>
                  <span>{formData.interests}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="hero-actions">
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <span className="btn-icon">🖨️</span>
              {!isMobile && "Print"}
            </button>
            <button className="btn btn-secondary" onClick={handleShare}>
              <span className="btn-icon">📤</span>
              {!isMobile && "Share"}
            </button>
            <button className="btn btn-primary" onClick={handleNewTrip}>
              <span className="btn-icon">✨</span>
              {!isMobile ? "Plan New Trip" : "New Trip"}
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="itinerary-main">
        {/* Quick Stats Overview */}
        <section className="quick-stats">
          <div className="stat-card">
            <div className="stat-number">{days.length}</div>
            <div className="stat-label">Days</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{formData.destination.split(',')[0]}</div>
            <div className="stat-label">Destination</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{formData.budget}</div>
            <div className="stat-label">Budget</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{formData.groupSize}</div>
            <div className="stat-label">Group</div>
          </div>
        </section>

        {/* Trip Overview Card - Enhanced */}
        <section className="content-card overview-card enhanced">
          <div 
            className="card-header clickable"
            onClick={() => toggleSection('overview')}
          >
            <h2 className="card-title">
              <span className="card-icon">📋</span>
              Trip Overview
            </h2>
            <span className={`expand-icon ${expandedSections.has('overview') ? 'expanded' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          
          <div className={`card-content ${expandedSections.has('overview') ? 'expanded' : 'collapsed'}`}>
            <div className="overview-grid-enhanced">
              <div className="overview-item-enhanced">
                <div className="overview-icon">📍</div>
                <div className="overview-details">
                  <span className="overview-label">Destination</span>
                  <span className="overview-value">{formData.destination}</span>
                </div>
              </div>
              <div className="overview-item-enhanced">
                <div className="overview-icon">📅</div>
                <div className="overview-details">
                  <span className="overview-label">Duration</span>
                  <span className="overview-value">{formData.duration}</span>
                </div>
              </div>
              <div className="overview-item-enhanced">
                <div className="overview-icon">💰</div>
                <div className="overview-details">
                  <span className="overview-label">Budget</span>
                  <span className="overview-value">{formData.budget}</span>
                </div>
              </div>
              <div className="overview-item-enhanced">
                <div className="overview-icon">👥</div>
                <div className="overview-details">
                  <span className="overview-label">Group Size</span>
                  <span className="overview-value">{formData.groupSize}</span>
                </div>
              </div>
              {formData.accommodationType && (
                <div className="overview-item-enhanced">
                  <div className="overview-icon">🏨</div>
                  <div className="overview-details">
                    <span className="overview-label">Accommodation</span>
                    <span className="overview-value">{formData.accommodationType}</span>
                  </div>
                </div>
              )}
              {formData.interests && (
                <div className="overview-item-enhanced">
                  <div className="overview-icon">🎯</div>
                  <div className="overview-details">
                    <span className="overview-label">Interests</span>
                    <span className="overview-value">{formData.interests}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="generation-info-enhanced">
              <div className="generation-icon">🤖</div>
              <div className="generation-details">
                <span className="generation-label">Generated on</span>
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
          </div>
        </section>

        {/* Enhanced Timeline Itinerary */}
        {days.length > 0 && (
          <section className="content-card timeline-card enhanced">
            <div 
              className="card-header clickable"
              onClick={() => toggleSection('timeline')}
            >
              <h2 className="card-title">
                <span className="card-icon">🗓️</span>
                Day-by-Day Timeline
              </h2>
              <span className={`expand-icon ${expandedSections.has('timeline') ? 'expanded' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            
            <div className={`card-content ${expandedSections.has('timeline') ? 'expanded' : 'collapsed'}`}>
              <div className="timeline-container">
                {days.map((day, index) => (
                  <div 
                    key={day.id} 
                    className={`timeline-item ${activeDay === day.id ? 'active' : ''}`}
                    onClick={() => setActiveDay(activeDay === day.id ? null : day.id)}
                  >
                    <div className="timeline-marker">
                      <div className="timeline-dot">{day.id}</div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h3 className="timeline-title">{day.title}</h3>
                        <div className="timeline-toggle">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div 
                        className={`timeline-details ${activeDay === day.id ? 'expanded' : 'collapsed'}`}
                        dangerouslySetInnerHTML={{ __html: day.content }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Detailed Itinerary Card - Enhanced */}
        <section className="content-card itinerary-card enhanced">
          <div 
            className="card-header clickable"
            onClick={() => toggleSection('itinerary')}
          >
            <h2 className="card-title">
              <span className="card-icon">🗺️</span>
              Complete Itinerary
            </h2>
            <span className={`expand-icon ${expandedSections.has('itinerary') ? 'expanded' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          
          <div className={`card-content ${expandedSections.has('itinerary') ? 'expanded' : 'collapsed'}`}>
            <div className="itinerary-content-enhanced">
              <div 
                className="formatted-itinerary"
                dangerouslySetInnerHTML={{ __html: formattedItinerary }}
              />
            </div>
          </div>
        </section>

        {/* Enhanced Travel Tips Card */}
        <section className="content-card tips-card enhanced">
          <div 
            className="card-header clickable"
            onClick={() => toggleSection('tips')}
          >
            <h2 className="card-title">
              <span className="card-icon">💡</span>
              Travel Tips & Recommendations
            </h2>
            <span className={`expand-icon ${expandedSections.has('tips') ? 'expanded' : ''}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          
          <div className={`card-content ${expandedSections.has('tips') ? 'expanded' : 'collapsed'}`}>
            <div className="tips-grid-enhanced">
              <div className="tip-item-enhanced">
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">📱</span>
                </div>
                <div className="tip-content">
                  <h4>Stay Connected</h4>
                  <p>Download offline maps, translation apps, and keep emergency contacts easily accessible</p>
                </div>
              </div>
              <div className="tip-item-enhanced">
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">💳</span>
                </div>
                <div className="tip-content">
                  <h4>Budget Management</h4>
                  <p>Track expenses with apps, notify banks of travel, and have multiple payment methods</p>
                </div>
              </div>
              <div className="tip-item-enhanced">
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">🎒</span>
                </div>
                <div className="tip-content">
                  <h4>Smart Packing</h4>
                  <p>Check weather forecasts, pack versatile clothing, and always have essentials in carry-on</p>
                </div>
              </div>
              <div className="tip-item-enhanced">
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">🕐</span>
                </div>
                <div className="tip-content">
                  <h4>Flexible Schedule</h4>
                  <p>Build buffer time between activities and be open to spontaneous discoveries</p>
                </div>
              </div>
              <div className="tip-item-enhanced">
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">🏥</span>
                </div>
                <div className="tip-content">
                  <h4>Health & Safety</h4>
                  <p>Check travel advisories, get necessary vaccinations, and have travel insurance</p>
                </div>
              </div>
              <div className="tip-item-enhanced">
                <div className="tip-icon-wrapper">
                  <span className="tip-icon">📸</span>
                </div>
                <div className="tip-content">
                  <h4>Capture Memories</h4>
                  <p>Bring portable chargers, backup storage, and don't forget to enjoy the moment</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="itinerary-footer enhanced">
        <div className="footer-content">
          <div className="footer-message">
            <h3>Ready for Your Adventure?</h3>
            <p>
              Your personalized itinerary for <strong>{formData.destination}</strong> is ready! 
              Safe travels and create unforgettable memories.
            </p>
          </div>
          <div className="footer-actions">
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <span className="btn-icon">🖨️</span>
              Print Itinerary
            </button>
            <button className="btn btn-primary" onClick={handleNewTrip}>
              <span className="btn-icon">✨</span>
              Plan Another Adventure
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ItineraryDisplay; 