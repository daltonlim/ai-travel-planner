# AI Travel Planner

An AI-powered travel itinerary planner that creates personalized travel plans using OpenAI's GPT-4o mini model.

## Features

- **AI-Generated Itineraries**: Detailed day-by-day travel plans with recommendations
- **Customizable Parameters**: Destination, duration, budget, interests, group size, and accommodation preferences
- **React Frontend**: Modern React application with Zustand state management
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Generation**: Powered by OpenAI GPT-4o mini for intelligent planning
- **Export Options**: Print-friendly itinerary pages
- **Persistent Storage**: Automatic saving of form data and generated itineraries

## Architecture

### Frontend (React)
- **Framework**: React 18 with functional components and hooks
- **State Management**: Zustand with persistence middleware
- **Routing**: React Router for client-side navigation
- **Styling**: CSS modules with responsive design
- **Development Server**: Runs on port 3000

### Backend (Express)
- **Framework**: Express.js with middleware for security and CORS
- **AI Integration**: OpenAI GPT-4o mini API
- **Rate Limiting**: Built-in request limiting to prevent abuse
- **Production Server**: Runs on port 3001 (development)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-travel-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=3001
   ```

4. **Start the development environment**
   ```bash
   npm run dev
   ```

   This runs both the React frontend (http://localhost:3000) and Express backend (http://localhost:3001) concurrently.

## Development Commands

```bash
npm run dev      # Start both frontend and backend
npm run client   # Start React app only
npm run server   # Start Express server only
npm run build    # Build React app for production
npm start        # Start production server
```

## State Management

The application uses **Zustand** for state management:

- **Automatic Persistence**: Form data and itineraries are saved to localStorage
- **Simple API**: Clean state updates without boilerplate
- **Type-Safe**: Full TypeScript support (when enabled)

### Store Structure
```javascript
{
  formData: {
    destination: '',
    duration: '',
    budget: '',
    interests: '',
    travelDates: '',
    groupSize: '',
    accommodationType: ''
  },
  itinerary: null,
  generatedAt: null,
  isGenerating: false,
  error: null
}
```

## API Endpoints

### Generate Itinerary
```http
POST /api/plan-trip
Content-Type: application/json

{
  "destination": "Tokyo, Japan",
  "duration": "7 days",
  "budget": "$2000",
  "interests": "temples, food, technology",
  "travelDates": "March 2024",
  "groupSize": "couple",
  "accommodationType": "mid-range hotels"
}
```

### Health Check
```http
GET /api/health
```

## Component Structure

```
client/src/
├── components/
│   ├── TravelForm.js          # Main form component
│   ├── TravelForm.css         # Form styling
│   ├── ItineraryDisplay.js    # Results display
│   └── ItineraryDisplay.css   # Results styling
├── store/
│   └── travelStore.js         # Zustand store
├── utils/
│   └── formatItinerary.js     # Text formatting utilities
└── App.js                     # Router setup
```

## Deployment

### Production Build
```bash
npm run build
NODE_ENV=production npm start
```

The Express server will automatically serve the built React app in production mode.

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)
- `MAX_REQUESTS_PER_MINUTE`: Rate limiting (default: 10)

## Testing

Test the API directly:
```bash
node test-api.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Migration to React

This application has been fully converted from vanilla JavaScript with localStorage to a modern React application:

### What Was Converted

1. **Vanilla JS → React Components**
   - `public/index.html` → `client/src/components/TravelForm.js`
   - `public/itinerary.html` → `client/src/components/ItineraryDisplay.js`
   - `public/app.js` → React components with hooks

2. **localStorage → Zustand Store**
   - Direct localStorage manipulation → Zustand store with persist middleware
   - Manual state management → Automatic state persistence and hydration
   - Imperative updates → Declarative state actions

3. **Manual Navigation → React Router**
   - `window.location.href` redirects → `useNavigate()` hook
   - Static HTML pages → Single Page Application (SPA)
   - Manual URL handling → Client-side routing

### Benefits of the Conversion

- **Better State Management**: Zustand provides predictable state updates with automatic persistence
- **Component Reusability**: React components can be easily reused and tested
- **Modern Development**: Hot reloading, component dev tools, and better debugging
- **Type Safety**: Ready for TypeScript conversion if needed
- **Better UX**: Instant navigation, no page reloads, smoother interactions
- **Maintainability**: Cleaner code organization and easier to extend

### Backward Compatibility

The API endpoints remain unchanged, so any existing integrations will continue to work seamlessly.

## 🛠️ Usage

1. **Enter Your Destination**: Specify where you want to travel
2. **Set Your Duration**: How long your trip will be
3. **Define Your Budget**: Optional budget constraints
4. **Choose Travel Dates**: When you plan to travel
5. **Select Group Size**: Solo, couple, family, or group travel
6. **Pick Accommodation**: From budget hostels to luxury hotels
7. **Add Interests**: Museums, food, adventure, nightlife, etc.
8. **Generate Itinerary**: Let AI create your perfect travel plan

## 🏗️ Project Structure

```
ai-travel-planner/
├── server.js              # Express server and API routes
├── package.json           # Project dependencies and scripts
├── public/
│   ├── index.html         # Main HTML interface
│   └── app.js            # Frontend JavaScript
├── client/               # Additional client-side files
└── test-api.js          # API testing utilities
```

## 🔧 API Endpoints

- `POST /api/generate-itinerary` - Generate a travel itinerary based on user preferences

## 📦 Dependencies

- **Express**: Web framework for Node.js
- **OpenAI**: AI model integration
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **dotenv**: Environment variable management

## 🎨 Features in Detail

### Smart Itinerary Generation
The AI analyzes your inputs to create day-by-day itineraries with:
- Recommended activities and attractions
- Dining suggestions
- Transportation options
- Budget estimates
- Time optimization

### Responsive Design
- Mobile-friendly interface
- Beautiful gradient themes
- Intuitive form layout
- Enhanced typography and spacing

## 🚀 Deployment

The application can be deployed to various platforms:

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Vercel
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4o mini API
- The travel community for inspiration and feedback

## 📧 Contact

For questions or support, please open an issue in this repository.

---

**Happy Travels! 🧳✈️** 