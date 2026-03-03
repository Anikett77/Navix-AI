# Next.js Authentication System 🚀

MONGODB_URI=mongodb+srv://aniketchaturvedi83_db_user:ani%401234@navix.yh0yzzx.mongodb.net/Navix
OPENROUTER_API_KEY=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
NEXT_PUBLIC_MAPTILER_KEY = zioNTKDHkolqin8fgpWk

Industry-level authentication system with Next.js 14, MongoDB, NextAuth.js, and Google OAuth.

## Features ✨

- 🔐 **Secure Authentication** with NextAuth.js
- 🗄️ **MongoDB Database** with Mongoose
- 🔑 **Google OAuth Integration**
- 📧 **Email/Password Login**
- 🎨 **Beautiful Modal-based UI**
- ⚡ **No Navbar on Auth Pages** - Clean white background with popup modals
- 🔄 **Session Management**
- 🛡️ **Password Hashing** with bcrypt

## Tech Stack 🛠️

- **Next.js 14** (App Router)
- **NextAuth.js** (Authentication)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **Tailwind CSS** (Styling)
- **bcryptjs** (Password Hashing)
- **React Icons** (Icons)

## Project Structure 📁

```
nextjs-auth-project/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.js          # NextAuth configuration
│   │       └── signup/
│   │           └── route.js          # Signup API endpoint
│   ├── login/
│   │   └── page.jsx                  # Login page (opens modal)
│   ├── signup/
│   │   └── page.jsx                  # Signup page (opens modal)
│   ├── layout.js                     # Root layout with AuthProvider
│   ├── page.js                       # Home page with Get Started button
│   └── globals.css                   # Global styles
├── components/
│   ├── AuthModal.jsx                 # Reusable authentication modal
│   └── AuthProvider.jsx              # Session provider wrapper
├── lib/
│   └── mongodb.js                    # MongoDB connection utility
├── models/
│   └── User.js                       # User mongoose model
├── .env.local                        # Environment variables (template)
└── package.json
```

## Setup Instructions 🔧

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env.local` with your MongoDB URI

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret
8. Update `.env.local` with your credentials

### 4. Configure Environment Variables

Update your `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl-rand-base64-32

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works 🎯

### Authentication Flow

1. **User clicks "Get Started"** on home page
2. **Modal popup appears** with white background (no navbar)
3. **User can choose:**
   - Sign in with Google (OAuth)
   - Sign in with Email/Password
   - Switch to Sign Up mode

### Sign Up Flow

1. User enters name, email, password
2. POST request to `/api/auth/signup`
3. Password is hashed with bcrypt
4. User created in MongoDB
5. Auto-login after successful signup

### Sign In Flow

1. User enters credentials
2. NextAuth validates against MongoDB
3. Session created with JWT
4. Redirected to home page

### Google OAuth Flow

1. User clicks "Continue with Google"
2. Redirected to Google consent screen
3. Google returns user data
4. User created/found in MongoDB
5. Session created
6. Redirected to home page

## API Routes 🛣️

### Authentication Routes

- `POST /api/auth/signup` - Create new user account
- `GET/POST /api/auth/[...nextauth]` - NextAuth handler for all auth operations

## Components 🧩

### AuthModal

Reusable modal component that handles:
- Login form
- Signup form
- Google OAuth button
- Mode switching (login ↔ signup)
- Error handling
- Loading states

**Props:**
- `isOpen` (boolean) - Controls modal visibility
- `onClose` (function) - Handler for closing modal
- `initialMode` (string) - 'login' or 'signup'

### AuthProvider

Wraps the app with NextAuth SessionProvider for session management.

## Database Schema 💾

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required for credentials),
  image: String,
  provider: String (credentials | google),
  emailVerified: Date,
  timestamps: true
}
```

## Security Features 🔒

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT-based sessions
- ✅ Secure HTTP-only cookies
- ✅ CSRF protection (built into NextAuth)
- ✅ Input validation
- ✅ Error handling without exposing sensitive info

## Customization 🎨

### Styling

All styles use Tailwind CSS. Modify in:
- `components/AuthModal.jsx` - Modal styles
- `app/page.js` - Home page styles
- `app/globals.css` - Global styles

### Add More OAuth Providers

Edit `app/api/auth/[...nextauth]/route.js`:

```javascript
import GitHubProvider from 'next-auth/providers/github';

providers: [
  GoogleProvider({ ... }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
  // Add more providers...
]
```

## Deployment 🚀

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Important: Update OAuth Redirect URIs

Add your production URL to Google OAuth authorized redirect URIs:
```
https://yourdomain.com/api/auth/callback/google
```

Update `NEXTAUTH_URL` in production environment variables.

## Common Issues & Solutions 🔧

### "Invalid callback URL"
- Make sure `NEXTAUTH_URL` matches your domain
- Check Google OAuth redirect URIs

### "Database connection failed"
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Ensure network access is configured

### "Session not persisting"
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again
- Verify `NEXTAUTH_URL` is correct

## Folder Permissions

Ensure proper permissions for development:
```bash
chmod -R 755 nextjs-auth-project
```

## Support 💬

For issues, questions, or contributions, feel free to reach out!

## License 📄

MIT License - feel free to use this in your projects!

---

**Built with ❤️ using Next.js 14**