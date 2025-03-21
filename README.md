# Voyago - AI-Powered Trip Planner

![Voyago Logo](/public/logoo.png)

## 🌐 Live Demo
[Visit Voyago](https://voyago-one.vercel.app/)

## 📝 Description
Voyago is an AI-powered trip planning application that helps users create personalized travel itineraries. Using Google's Gemini AI, it generates custom travel plans based on user preferences, including budget, duration, and group size.

## ✨ Features
- 🤖 AI-powered itinerary generation
- 🏨 Hotel recommendations based on budget
- 📍 Location-based attractions and activities
- 🗺️ Interactive maps integration
- 👥 Group travel planning
- 💰 Budget-conscious planning options
- 🔐 Google authentication
- 💾 Save and manage multiple trips

## 🛠️ Technologies Used
- React.js
- Vite
- Tailwind CSS
- Firebase (Firestore)
- Google Gemini AI
- Google Maps API
- Google OAuth
- Shadcn UI Components
- Vercel (Deployment)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Cloud Platform account
- Firebase account

### Environment Variables
Create a `.env` file in the root directory with the following:
```env
VITE_GOMAP_API_KEY=your_google_maps_api_key
VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_ai_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
```

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/voyago.git
cd voyago
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 📱 Usage
1. Sign in with your Google account
2. Choose your destination
3. Specify trip duration (up to 5 days)
4. Select your budget preference
5. Choose number of travelers
6. Generate your personalized trip itinerary
7. View hotel recommendations and daily activities
8. Save and manage your trips

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check issues page.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author
**Shikhar**
- Created the entire application from concept to deployment
- Implemented AI integration and user authentication
- Designed the responsive UI/UX

## 🙏 Acknowledgments
- Google Gemini AI for powering the trip planning algorithm
- Shadcn UI for beautiful component library
- Vercel for hosting