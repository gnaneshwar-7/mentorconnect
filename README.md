# 🤝 MentorConnect - Student Mentorship Hub

A full-stack mentorship management system where students can discover mentors and book 1:1 sessions with JWT authentication.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Date**: date-fns
- **Notifications**: Sonner (toast)

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB Atlas (Mongoose 9.2.1)
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Security**: CORS, helmet, dotenv

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📁 Project Structure

```
mentorconnect/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                  # User schema (auth)
│   │   ├── Mentor.js                # Mentor schema
│   │   └── Session.js               # Session schema
│   ├── routes/
│   │   ├── authRoutes.js            # Auth API routes
│   │   ├── mentorRoutes.js          # Mentor API routes
│   │   └── sessionRoutes.js         # Session API routes
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── .node-version                # Node version for deployment
│   ├── server.js                    # Express server
│   └── package.json                 # Dependencies
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── base44Client.js      # API client (legacy)
    │   ├── components/
    │   │   ├── mentors/             # Mentor card & filters
    │   │   ├── sessions/            # Session booking & row
    │   │   └── ui/                  # shadcn/ui components
    │   ├── lib/
    │   │   ├── AuthContext.jsx      # Authentication context
    │   │   └── query-client.js      # TanStack Query config
    │   ├── pages/
    │   │   ├── Login.jsx            # Login page
    │   │   ├── Register.jsx         # Registration page
    │   │   ├── Dashboard.jsx        # Overview & stats
    │   │   ├── Mentors.jsx          # Browse mentors
    │   │   ├── Sessions.jsx         # My sessions
    │   │   ├── Analytics.jsx        # Analytics (admin)
    │   │   └── Settings.jsx         # User settings
    │   ├── services/
    │   │   └── api.js               # API integration layer
    │   ├── App.jsx                  # Main app component
    │   ├── Layout.jsx               # App shell with sidebar
    │   └── main.jsx                 # React entry point
    ├── .env                         # Frontend environment variables
    ├── .env.example                 # Environment template
    ├── vercel.json                  # Vercel deployment config
    └── package.json                 # Dependencies
```

## 🎯 Features

### ✅ Completed Features
- **Authentication & Authorization**
  - JWT-based user registration and login
  - Role-based access (Student, Mentor, Admin)
  - Protected routes with automatic redirects
  - Password hashing with bcrypt
  - Persistent authentication with localStorage

- **Mentor Discovery**
  - Browse all available mentors
  - Filter by expertise area
  - Search by name
  - View mentor ratings and hourly rates
  - Responsive mentor cards with avatars

- **Session Management**
  - Book 1:1 mentoring sessions
  - View all your upcoming/completed sessions
  - Update session status (confirmed, completed, cancelled)
  - Delete sessions
  - Session filtering and search

- **User Interface**
  - Modern, responsive design with Tailwind CSS
  - Dark/light theme toggle
  - Toast notifications for user feedback
  - Loading states and skeleton screens
  - Form validation with error handling
  - Mobile-friendly sidebar navigation

- **Backend API**
  - RESTful API with Express.js
  - MongoDB integration with Mongoose
  - Input validation and error handling
  - CORS configuration for production
  - Environment-based configuration

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/mentorconnect.git
cd mentorconnect
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (copy from `.env.example`):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mentorconnect
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file (copy from `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed the Database
```bash
cd ../backend
node seed-data.js
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### 6. Access the Application

1. Open http://localhost:5173 in your browser
2. Register a new account (Student or Mentor role)
3. Login with your credentials
4. Explore mentors, book sessions, and manage your profile!

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **POST** `/api/auth/logout` - Logout user
- **GET** `/api/auth/me` - Get current user (requires auth)

### Mentor Routes (`/api/mentors`)
- **GET** `/api/mentors` - Get all mentors
- **POST** `/api/mentors` - Create new mentor (requires auth)
- **DELETE** `/api/mentors/:id` - Delete mentor (requires auth)

### Session Routes (`/api/sessions`)
- **GET** `/api/sessions` - Get user's sessions (requires auth)
- **POST** `/api/sessions` - Book new session (requires auth)
- **PATCH** `/api/sessions/:id` - Update session status (requires auth)
- **DELETE** `/api/sessions/:id` - Delete session (requires auth)

### Example Requests

**Register User:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Book Session:**
```json
POST /api/sessions
Headers: { "Authorization": "Bearer YOUR_JWT_TOKEN" }
{
  "mentor": "65f8abc123def456789",
  "datetime": "2026-03-01T10:00:00",
  "mode": "Online",
  "topic": "Career guidance for ML engineer role",
  "priority": "High"
}
```

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

**Quick Deploy:**
1. Push code to GitHub
2. Deploy backend to [Render](https://render.com)
3. Deploy frontend to [Vercel](https://vercel.com)
4. Update environment variables on each platform

Or use the deployment scripts:
```bash
# Windows
.\deploy.ps1

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

## 📊 Project Progress

```
Phase 1-3: Setup & Backend           ✅ 100%
Phase 4: Session Booking             ✅ 100%
Phase 5: Frontend Integration        ✅ 100%
Phase 6: Polish & Validation         ✅ 100%
Phase 7: JWT Authentication          ✅ 100%
Phase 8: Deployment Preparation      ✅ 95%
```

**Overall Progress: 95% Complete** 🎉

Remaining: Deploy to live servers (follow DEPLOYMENT.md)

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## 🧪 Testing

The project includes test scripts for API validation:

```bash
cd backend

# Test authentication
node test-auth.js

# Test session booking
node test-session.js

# Test improvements (validation, error handling)
node test-improvements.js
```

## 📂 Key Files

| File | Purpose |
|------|---------|
| `DEPLOYMENT.md` | Complete deployment guide |
| `API_DOCUMENTATION.md` | Detailed API documentation |
| `backend/server.js` | Express server entry point |
| `backend/models/User.js` | User authentication schema |
| `frontend/src/App.jsx` | Main React application |
| `frontend/src/lib/AuthContext.jsx` | Authentication context provider |
| `frontend/src/services/api.js` | API integration layer |

## 🛡️ Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- Protected API routes with middleware
- CORS configuration for production
- Environment-based configuration
- Input validation and sanitization

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack development with MERN stack
- RESTful API design principles
- JWT authentication implementation
- State management with React Context
- Database modeling with MongoDB
- Production deployment workflow
- Git version control
- Environment configuration management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request  

## 👨‍💻 Author

B. Gnaneshwar  
SR University

## 📝 License

MIT
