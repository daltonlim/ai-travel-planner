// Simple test script for the AI Travel Planner API
// Run this with: node test-api.js

const http = require('http');

const testData = {
  destination: "Paris, France",
  duration: "3 days",
  budget: "$1500",
  interests: "Museums, cafes, photography, architecture",
  travelDates: "Spring 2024",
  groupSize: "Couple",
  accommodationType: "Mid-range hotels"
};

const postData = JSON.stringify(testData);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/plan-trip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 Testing AI Travel Planner API...');
console.log('📍 Test destination:', testData.destination);
console.log('📅 Duration:', testData.duration);
console.log('💰 Budget:', testData.budget);
console.log('');

const req = http.request(options, (res) => {
  console.log(`📊 Status Code: ${res.statusCode}`);
  console.log(`📋 Headers:`, res.headers);
  console.log('');

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (res.statusCode === 200) {
        console.log('✅ SUCCESS! Itinerary generated');
        console.log('📝 Response preview:');
        console.log('   Generated at:', response.generatedAt);
        console.log('   Itinerary length:', response.itinerary.length, 'characters');
        console.log('');
        console.log('🗺️  First 500 characters of itinerary:');
        console.log(response.itinerary.substring(0, 500) + '...');
      } else {
        console.log('❌ ERROR:', response.error);
        if (response.details) {
          console.log('🔍 Details:', response.details);
        }
      }
    } catch (error) {
      console.log('❌ Failed to parse response:', error.message);
      console.log('📄 Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ Request failed:', error.message);
  console.log('');
  console.log('💡 Make sure the server is running:');
  console.log('   npm run dev');
  console.log('   or');
  console.log('   npm start');
});

req.write(postData);
req.end();

// Also test the health endpoint
console.log('🏥 Testing health endpoint...');

const healthOptions = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/health',
  method: 'GET'
};

const healthReq = http.request(healthOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('🏥 Health check result:', response);
      console.log('');
    } catch (error) {
      console.log('❌ Health check failed:', error.message);
    }
  });
});

healthReq.on('error', (error) => {
  console.log('❌ Health check request failed:', error.message);
});

healthReq.end(); 