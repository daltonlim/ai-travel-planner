# AI Travel Planner - React Client

This is the React frontend for the AI Travel Planner application.

## State Management

The app uses **Zustand** for state management, which provides:

- **Persistent Storage**: Form data and generated itineraries are automatically saved to localStorage
- **Simple API**: No boilerplate, just clean state actions
- **TypeScript Ready**: Full type support for better development experience

### Store Structure

The main store (`src/store/travelStore.js`) manages:

- `formData`: All form inputs (destination, duration, budget, etc.)
- `itinerary`: Generated travel itinerary text
- `isGenerating`: Loading state for API calls
- `error`: Error messages
- Actions for updating state and making API calls

## Component Structure

```
src/
├── components/
│   ├── TravelForm.js          # Main form component
│   ├── TravelForm.css         # Form styling
│   ├── ItineraryDisplay.js    # Displays generated itinerary
│   └── ItineraryDisplay.css   # Itinerary styling
├── store/
│   └── travelStore.js         # Zustand store
├── utils/
│   └── formatItinerary.js     # Text formatting utilities
└── App.js                     # Main app with routing
```

## Key Features

- **React Router**: Client-side routing between form and itinerary pages
- **Automatic Persistence**: State is saved and restored across browser sessions
- **Loading States**: Proper loading indicators during API calls
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on desktop and mobile devices
- **Print Support**: Itinerary page can be printed directly

## Development

The React app runs on port 3000 and proxies API calls to the Express server on port 3001.

```bash
npm start     # Start development server
npm run build # Build for production
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
