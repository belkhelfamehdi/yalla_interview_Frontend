# Yalla Interview Frontend

A modern React application for AI-powered interview preparation, built with TypeScript and Vite.

## ✨ Features

- **Modern UI**: Built with React 19 and TypeScript
- **Authentication**: Secure user registration and login
- **Interview Prep**: AI-generated questions tailored to your role
- **Session Management**: Create and track interview preparation sessions
- **Responsive Design**: Optimized for all device sizes
- **Real-time Updates**: Seamless user experience

## 🛠️ Tech Stack

- **React 19**: Latest React features and performance improvements
- **TypeScript**: Type-safe development
- **Vite**: Fast development and build tool
- **TailwindCSS**: Modern styling framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Framer Motion**: Smooth animations
- **React Hot Toast**: Elegant notifications

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Update VITE_API_BASE_URL in .env

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests (requires dev server running)
npm run test:e2e
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Cards/          # Card components
│   ├── Charts/         # Data visualization
│   ├── Inputs/         # Form inputs
│   ├── layouts/        # Layout components
│   └── Loader/         # Loading states
├── context/            # React context providers
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Home/           # Dashboard
│   └── InterviewPrep/  # Interview preparation
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🔗 API Integration

The frontend communicates with the backend API for:
- User authentication and profile management
- Interview session CRUD operations
- AI-powered question generation
- File uploads for profile images

## 🎨 Design System

The application uses a consistent design system with:
- Custom color palette (red/pink gradient theme)
- Responsive breakpoints
- Consistent spacing and typography
- Smooth animations and transitions
