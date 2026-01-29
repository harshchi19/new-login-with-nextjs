# 🔐 Modern Authentication System

A modern, feature-rich authentication system built with React, Vite, Express, and Firebase. This project demonstrates multiple authentication methods including email/password, Google OAuth, and biometric authentication using WebAuthn.

![Authentication Demo](https://img.shields.io/badge/Auth-Multi--Method-blue) ![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript) ![Firebase](https://img.shields.io/badge/Firebase-10.8-FFCA28?logo=firebase)

## ✨ Features

- **Email/Password Authentication** - Traditional email and password sign-in using Firebase Auth
- **Google OAuth** - One-click sign-in with Google accounts
- **Biometric Authentication** - Secure authentication using WebAuthn (Fingerprint, Face ID, Windows Hello)
- **Modern UI** - Clean and responsive design with Tailwind CSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Express Backend** - Dedicated server for WebAuthn credential management

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications

### Backend
- **Express** - Node.js web framework
- **@simplewebauthn/server** - WebAuthn server implementation
- **CORS** - Cross-origin resource sharing

### Authentication
- **Firebase Auth** - Email/Password and Google OAuth
- **WebAuthn (SimpleWebAuthn)** - Biometric authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A modern web browser that supports WebAuthn (Chrome, Firefox, Safari, Edge)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshchi19/new-login-with-nextjs.git
   cd new-login-with-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## ⚙️ Configuration

### Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Authentication methods (Email/Password and Google)

2. **Get Firebase Configuration**
   - In Firebase Console, go to Project Settings
   - Copy your Firebase configuration

3. **Update Firebase Config**
   - Open `src/lib/firebase.ts`
   - Replace the existing configuration with your Firebase credentials:
   ```typescript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   ⚠️ **Security Note**: For production, use environment variables to store sensitive configuration:
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     // ... other config
   };
   ```

### WebAuthn Configuration

The WebAuthn server is pre-configured to work with `localhost:5173`. If you need to change the port or domain:

1. Open `server/index.js`
2. Update the `rpID` and `origin` variables:
   ```javascript
   const rpID = 'localhost';
   const origin = `http://${rpID}:5173`;
   ```

⚠️ **Important**: The server currently uses in-memory storage (Map) for WebAuthn credentials. This means:
- All registered biometric credentials will be lost when the server restarts
- Not suitable for production use without implementing persistent database storage

## 🏃 Running the Application

You need to run both the frontend and backend servers:

### 1. Start the Backend Server

In one terminal, run:
```bash
npm run server
```
The Express server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

In another terminal, run:
```bash
npm run dev
```
The Vite dev server will start on `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
new-login-with-nextjs/
├── src/                         # Main React application (Vite-based)
│   ├── components/
│   │   ├── AuthForm.tsx         # Main authentication form
│   │   ├── EmailForm.tsx        # Email/password form
│   │   ├── GoogleButton.tsx     # Google OAuth button
│   │   └── BiometricButton.tsx  # Biometric auth button
│   ├── lib/
│   │   └── firebase.ts          # Firebase configuration
│   ├── App.tsx                  # Main App component
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles
├── server/
│   └── index.js                 # Express server for WebAuthn
├── components/
│   └── ui/                      # Reusable shadcn/ui components
├── app/                         # Next.js app directory (alternative setup)
├── hooks/                       # Custom React hooks
├── package.json                 # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

**Note**: This repository contains both Vite and Next.js configurations. The main documented setup uses Vite (via `npm run dev`). The Next.js files in the `app/` directory provide an alternative setup option.

## 🔑 Using Biometric Authentication

### Registration
1. Click "Register Biometric" button at the bottom of the form
2. Follow your device's prompts to register (fingerprint, face, or PIN)
3. Your credentials are stored securely on your device

### Login
1. Click the "Biometric" button
2. Authenticate using your registered method
3. Successfully signed in!

### Supported Methods
- 🖐️ **Fingerprint** (if your device has a fingerprint sensor)
- 😊 **Face ID** (iOS/macOS)
- 💻 **Windows Hello** (Windows)
- 📱 **Device PIN/Password** (fallback option)

## 📜 Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start the Express backend server
- `npm run lint` - Run ESLint

## 🔒 Security Considerations

### Production Checklist

1. **Environment Variables**
   - Move Firebase config to environment variables
   - Never commit sensitive credentials to version control
   - Use `.env` files with proper `.gitignore` settings

2. **Database**
   - Replace in-memory storage (Map) with a proper database (PostgreSQL, MongoDB)
   - **Critical**: Current server uses in-memory storage that resets on restart
   - Implement proper user management and session handling
   - Store WebAuthn credentials persistently

3. **HTTPS**
   - Use HTTPS in production for WebAuthn to work properly
   - Update `rpID` and `origin` in server configuration

4. **CORS**
   - Configure CORS to only allow your frontend domain
   - Don't use wildcard (`*`) CORS in production

5. **Rate Limiting**
   - Implement rate limiting on authentication endpoints
   - Add CAPTCHA for additional protection

6. **Error Handling**
   - Don't expose sensitive error messages to users
   - Log errors securely on the server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [SimpleWebAuthn](https://simplewebauthn.dev/) - WebAuthn library
- [Firebase](https://firebase.google.com/) - Authentication platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Made with ❤️ by [harshchi19](https://github.com/harshchi19)
