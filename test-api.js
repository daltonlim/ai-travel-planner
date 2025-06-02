// Simple test script for the AI Travel Planner API
// Run this with: node test-api.js

const https = require('https');

// Test configuration
const config = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/plan-trip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  // For self-signed certificates (development only)
  rejectUnauthorized: false
};

// Test data
const testData = {
  destination: "Tokyo, Japan",
  duration: "7 days",
  budget: "$2000",
  interests: "temples, food, technology, gardens",
  travelDates: "March 2024",
  groupSize: "couple",
  accommodationType: "mid-range hotels"
};

// Function to make the API request
function testAPI(useHttps = false) {
  const protocol = useHttps ? https : require('http');
  const testConfig = useHttps ? config : { ...config, port: 3001 };

  const postData = JSON.stringify(testData);

  console.log('🧪 Testing AI Travel Planner API...');
  console.log('📍 Test destination:', testData.destination);
  console.log('📅 Duration:', testData.duration);
  console.log('💰 Budget:', testData.budget);
  console.log('');

  const req = protocol.request(testConfig, (res) => {
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
}

// Also test the health endpoint
console.log('🏥 Testing health endpoint...');

const healthOptions = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/health',
  method: 'GET'
};

const healthReq = require('http').request(healthOptions, (res) => {
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

// Run tests
testAPI();
testAPI(true); 