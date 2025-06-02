const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const OpenAI = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Rate limiting map (simple in-memory store)
const requestCounts = new Map();
const RATE_LIMIT = parseInt(process.env.MAX_REQUESTS_PER_MINUTE) || 10;

// Simple rate limiting middleware
const rateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute window
  
  if (!requestCounts.has(clientIP)) {
    requestCounts.set(clientIP, []);
  }
  
  const requests = requestCounts.get(clientIP);
  const recentRequests = requests.filter(timestamp => timestamp > windowStart);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      retryAfter: 60
    });
  }
  
  recentRequests.push(now);
  requestCounts.set(clientIP, recentRequests);
  next();
};

// Travel itinerary planning prompt template
const createTravelPrompt = (destination, duration, budget, interests, travelDates, groupSize, accommodationType) => {
  return `You are an expert travel planner. Create a detailed, personalized travel itinerary with the following specifications:

**Trip Details:**
- Destination: ${destination}
- Duration: ${duration}
- Budget: ${budget || 'Not specified'}
- Travel Dates: ${travelDates || 'Flexible'}
- Group Size: ${groupSize || '1 person'}
- Accommodation Type: ${accommodationType || 'Any'}
- Interests/Preferences: ${interests || 'General sightseeing'}

**Please provide a comprehensive itinerary that includes:**

1. **Daily Schedule** (Day-by-day breakdown with timing)
2. **Accommodation Recommendations** (3-4 options with price ranges)
3. **Transportation** (How to get around, estimated costs)
4. **Must-Visit Attractions** (Top sights with opening hours and costs)
5. **Food & Dining** (Restaurant recommendations for different budgets)
6. **Local Tips** (Culture, customs, weather, what to pack)
7. **Budget Breakdown** (Estimated costs for major categories)
8. **Alternative Activities** (Backup plans for bad weather, etc.)

**Format your response in clear sections with:**
- Practical information and exact addresses where possible
- Cost estimates in local currency and USD
- Time recommendations for each activity
- Difficulty levels for activities (Easy/Moderate/Challenging)
- Best times to visit each attraction

Make the itinerary realistic, well-paced, and tailored to the specified interests and budget. Include insider tips and lesser-known gems alongside popular attractions.`;
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'AI Travel Planner API',
    version: '1.0.0',
    endpoints: {
      'POST /api/plan-trip': 'Generate a travel itinerary',
      'GET /api/health': 'Health check'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    openaiConnected: !!process.env.OPENAI_API_KEY
  });
});

app.post('/api/plan-trip', rateLimit, async (req, res) => {
  try {
    const {
      destination,
      duration,
      budget,
      interests,
      travelDates,
      groupSize,
      accommodationType
    } = req.body;

    // Validation
    if (!destination || !duration) {
      return res.status(400).json({
        error: 'Missing required fields: destination and duration are required'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OpenAI API key not configured'
      });
    }

    // Generate the prompt
    const prompt = createTravelPrompt(
      destination,
      duration,
      budget,
      interests,
      travelDates,
      groupSize,
      accommodationType
    );

    console.log('\n' + '='.repeat(80));
    console.log('🚀 NEW TRAVEL PLANNING REQUEST');
    console.log('='.repeat(80));
    console.log('📅 Timestamp:', new Date().toISOString());
    console.log('📍 Request Details:', { 
      destination, 
      duration, 
      budget: budget || 'Not specified',
      interests: interests || 'General sightseeing',
      travelDates: travelDates || 'Flexible',
      groupSize: groupSize || '1 person',
      accommodationType: accommodationType || 'Any'
    });
    console.log('\n📝 COMPLETE PROMPT SENT TO OPENAI:');
    console.log('-'.repeat(50));
    console.log('System Message:', 'You are an expert travel planner with extensive knowledge of destinations worldwide. Provide detailed, practical, and personalized travel itineraries.');
    console.log('\nUser Message:');
    console.log(prompt);
    console.log('-'.repeat(50));
    console.log('🤖 Sending to OpenAI GPT-4o-mini...\n');

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner with extensive knowledge of destinations worldwide. Provide detailed, practical, and personalized travel itineraries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const itinerary = completion.choices[0].message.content;

    console.log('✅ OpenAI Response received successfully');
    console.log('📊 Response length:', itinerary.length, 'characters');
    console.log('💰 Tokens used:', completion.usage?.total_tokens || 'Unknown');
    console.log('='.repeat(80) + '\n');

    res.json({
      success: true,
      itinerary,
      requestDetails: {
        destination,
        duration,
        budget,
        interests,
        travelDates,
        groupSize,
        accommodationType
      },
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating itinerary:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        error: 'OpenAI API quota exceeded. Please check your billing.'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'Invalid OpenAI API key'
      });
    }

    res.status(500).json({
      error: 'Failed to generate itinerary',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Serve React app for all non-API routes (production only)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/plan-trip'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Travel Planner server running on port ${PORT}`);
  console.log(`📍 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🗺️  Plan Trip Endpoint: POST http://localhost:${PORT}/api/plan-trip`);
  
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  Warning: OPENAI_API_KEY not found in environment variables');
  }
});

module.exports = app; 