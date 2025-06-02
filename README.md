# 🌍 AI Travel Planner

An intelligent travel itinerary planner powered by OpenAI's GPT-4o mini that creates personalized travel experiences based on your preferences, budget, and interests.

## ✨ Features

- **AI-Powered Itineraries**: Generate detailed travel plans using advanced AI
- **Personalized Recommendations**: Tailored suggestions based on your interests and preferences
- **Budget-Aware Planning**: Get recommendations that fit your budget
- **Beautiful UI**: Modern, responsive interface with an intuitive design
- **Flexible Planning**: Support for various trip durations, group sizes, and accommodation types

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/daltonlim/ai-travel-planner.git
cd ai-travel-planner
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

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