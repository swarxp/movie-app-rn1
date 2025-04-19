# Movie Explorer App

A sleek, modern mobile application built with React Native and Expo Router that allows users to search for and explore movies using the OMDB API.

## Features

- **Movie Search:** Search for movies by title with real-time results
- **Movie Details:** View comprehensive information about specific movies
- **Responsive UI:** Beautiful interface with smooth transitions
- **Tab Navigation:** Easy navigation between Home, Search, Saved, and Profile sections

## Tech Stack

- **React Native:** Core framework for building the mobile application
- **Expo:** Development platform for creating universal React applications
- **Expo Router:** File-based routing system for Expo applications
- **Tailwind CSS:** Utility-first CSS framework for styling
- **OMDB API:** Movie database API for fetching movie data

## Project Structure

```
├── app/
│   ├── _layout.tsx           # Root layout with Stack navigator
│   ├── globals.css           # Global Tailwind CSS imports
│   ├── movies/
│   │   └── [id].tsx          # Dynamic route for movie details
│   └── tabs/
│       ├── _layout.tsx       # Tab navigation layout
│       ├── index.tsx         # Home screen
│       ├── search.tsx        # Search screen
│       ├── saved.tsx         # Saved movies screen
│       └── profile.tsx       # User profile screen
├── components/
│   ├── MovieCard.tsx         # Reusable movie card component
│   └── SearchBar.tsx         # Reusable search bar component
├── constants/
│   ├── icons.ts              # Icon assets
│   └── images.ts             # Image assets
└── services/
    ├── api.ts                # API service for fetching movie data
    └── usefetch.ts           # Custom hook for data fetching
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/movie-explorer-app.git
   cd movie-explorer-app
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the development server
   ```
   npx expo start
   ```

4. Open the app on your device or emulator
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your physical device

## API Configuration

The app uses the OMDB API to fetch movie data. The API key is already configured in the `services/api.ts` file, but if you want to use your own:

1. Get an API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Update the API key in `services/api.ts`

```typescript
export const OMDB_CONFIG = {
  BASE_URL: "http://www.omdbapi.com",
  API_KEY: "YOUR_API_KEY",
};
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgements

- [OMDB API](http://www.omdbapi.com/) for providing movie data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for the mobile framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities
