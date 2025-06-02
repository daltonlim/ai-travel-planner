import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTravelStore from '../store/travelStore';
import './TravelForm.css';

const TravelForm = () => {
  const navigate = useNavigate();
  const {
    formData,
    updateFormData,
    isGenerating,
    error,
    generateItinerary
  } = useTravelStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await generateItinerary();
    if (success) {
      navigate('/itinerary');
    }
  };

  return (
    <div className="travel-form-container">
      <header className="header">
        <h1>AI Travel Planner</h1>
        <p className="subtitle">Create your perfect personalized itinerary with AI</p>
      </header>

      <form className="travel-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="destination">
            Destination *
            <span className="label-hint">Where would you like to go?</span>
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="e.g., Tokyo, Japan"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">
            Duration *
            <span className="label-hint">How long is your trip?</span>
          </label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          >
            <option value="">Select duration</option>
            <option value="3-4 days">3-4 days</option>
            <option value="5-7 days">5-7 days (1 week)</option>
            <option value="8-10 days">8-10 days</option>
            <option value="11-14 days">11-14 days (2 weeks)</option>
            <option value="15-21 days">15-21 days (3 weeks)</option>
            <option value="22-30 days">22-30 days (1 month)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">
            Budget
            <span className="label-hint">What's your approximate budget?</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
          >
            <option value="">Select budget range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1,000">$500 - $1,000</option>
            <option value="$1,000 - $2,500">$1,000 - $2,500</option>
            <option value="$2,500 - $5,000">$2,500 - $5,000</option>
            <option value="$5,000+">$5,000+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="interests">
            Interests & Preferences
            <span className="label-hint">What activities do you enjoy?</span>
          </label>
          <textarea
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleInputChange}
            placeholder="e.g., museums, hiking, food tours, nightlife, beaches, shopping, cultural experiences..."
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="travelDates">
            Travel Dates
            <span className="label-hint">When are you planning to travel?</span>
          </label>
          <input
            type="text"
            id="travelDates"
            name="travelDates"
            value={formData.travelDates}
            onChange={handleInputChange}
            placeholder="e.g., March 2024, Summer 2024, December 15-25"
          />
        </div>

        <div className="form-group">
          <label htmlFor="groupSize">
            Group Size
            <span className="label-hint">How many people are traveling?</span>
          </label>
          <select
            id="groupSize"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleInputChange}
          >
            <option value="">Select group size</option>
            <option value="Solo traveler">Solo traveler</option>
            <option value="Couple">Couple</option>
            <option value="Small group (3-5)">Small group (3-5)</option>
            <option value="Family">Family</option>
            <option value="Large group (6+)">Large group (6+)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="accommodationType">
            Accommodation Preference
            <span className="label-hint">What type of accommodation do you prefer?</span>
          </label>
          <select
            id="accommodationType"
            name="accommodationType"
            value={formData.accommodationType}
            onChange={handleInputChange}
          >
            <option value="">Select accommodation type</option>
            <option value="Budget (hostels, budget hotels)">Budget (hostels, budget hotels)</option>
            <option value="Mid-range (3-star hotels, B&Bs)">Mid-range (3-star hotels, B&Bs)</option>
            <option value="Luxury (4-5 star hotels, resorts)">Luxury (4-5 star hotels, resorts)</option>
            <option value="Alternative (Airbnb, guesthouses)">Alternative (Airbnb, guesthouses)</option>
            <option value="Mixed (combination of types)">Mixed (combination of types)</option>
          </select>
        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '✈️ Generate My Itinerary'}
        </button>
      </form>

      {isGenerating && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Our AI is crafting your perfect itinerary...</p>
        </div>
      )}
    </div>
  );
};

export default TravelForm; 