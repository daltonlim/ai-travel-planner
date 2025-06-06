import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TravelForm from './components/TravelForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TravelForm />} />
          <Route path="/itinerary" element={<ItineraryDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
