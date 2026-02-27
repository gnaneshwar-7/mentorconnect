# 🚀 MentorConnect Deployment Guide

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:
- ✅ MongoDB Atlas cluster created and running
- ✅ MongoDB connection string ready
- ✅ GitHub account (for deployment)
- ✅ All code committed to GitHub repository

---

## 🗄️ Part 1: MongoDB Atlas (Already Done ✓)

Your MongoDB Atlas is already configured with:
- Database: `mentorconnect`
- Connection string in `backend/.env`

---

## 🔧 Part 2: Backend Deployment (Render)

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Prepare for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/mentorconnect.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)** and sign up/login

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**
   - Select the `mentorconnect` repository

4. **Configure the service:**
   ```
   Name: mentorconnect-api
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   MONGO_URI = mongodb+srv://mentorconnect:mentorconnect%401@cluster0.3oz5lgz.mongodb.net/mentorconnect?retryWrites=true&w=majority
   
   JWT_SECRET = mentorconnect-super-secret-jwt-key-2026-change-in-production
   
   NODE_ENV = production
   
   PORT = 5000
   ```

6. **Click "Create Web Service"**
   - Wait 3-5 minutes for deployment
   - Copy your backend URL: `https://mentorconnect-api-xxxx.onrender.com`

### Step 3: Test Backend API

Visit: `https://your-backend-url.onrender.com/`

You should see: **"MentorConnect API is running 🚀"**

---

## 🎨 Part 3: Frontend Deployment (Vercel)

### Step 1: Update Frontend Environment

1. **Update `frontend/.env`:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up/login with GitHub

2. **Click "Add New" → "Project"**

3. **Import your repository:**
   - Select `mentorconnect` from your GitHub repos
   - Click "Import"

4. **Configure project:**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Add Environment Variables:**
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```

6. **Click "Deploy"**
   - Wait 2-3 minutes
   - Your site will be live at: `https://your-app.vercel.app`

### Step 3: Update Backend CORS

1. **Go back to Render dashboard**

2. **Add new environment variable:**
   ```
   FRONTEND_URL = https://your-app.vercel.app
   ```

3. **Wait for automatic redeploy**

---

## ✅ Part 4: Verification

### Test Your Live Application:

1. **Visit your frontend URL:** `https://your-app.vercel.app`

2. **Register a new account:**
   - Email: test@example.com
   - Password: test123

3. **Test features:**
   - ✓ Login/Logout
   - ✓ View mentors
   - ✓ Book a session
   - ✓ View sessions
   - ✓ Add a mentor (if admin)

---

## 🔐 Part 5: Post-Deployment Security

### Important: Change JWT Secret

1. Generate a strong secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. Update `JWT_SECRET` in Render environment variables

3. Save and redeploy

---

## 📊 Your Deployment URLs

After deployment, you'll have:

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | `https://your-app.vercel.app` | Main application |
| **Backend API** | `https://your-api.onrender.com` | REST API |
| **Database** | MongoDB Atlas | Data storage |

---

## 🎯 Resume-Ready Project

Add this to your resume:

**MentorConnect** - Full Stack Mentorship Platform
- Built with React, Node.js, Express, MongoDB, JWT authentication
- Deployed on Vercel (frontend) and Render (backend)
- Features: Session booking, user authentication, role-based access
- Live Demo: [https://your-app.vercel.app]
- GitHub: [https://github.com/YOUR_USERNAME/mentorconnect]

---

## 🐛 Troubleshooting

### Backend not connecting to MongoDB:
- Verify MongoDB IP whitelist includes `0.0.0.0/0`
- Check connection string is correct in Render env vars

### CORS errors:
- Ensure `FRONTEND_URL` is set correctly in backend
- Verify frontend is using correct `VITE_API_URL`

### Frontend shows blank page:
- Check browser console for errors
- Verify API URL is correct in Vercel env vars

### Auth not working:
- Confirm `JWT_SECRET` is set in backend
- Check token is being stored in browser localStorage

---

## 🔄 Updating Your Deployment

Whenever you make changes:

```bash
# Commit your changes
git add .
git commit -m "Your change description"
git push

# Render and Vercel will auto-deploy!
```

---

## 🎉 Congratulations!

Your full-stack application is now live and production-ready!

**Next Steps:**
1. Share your live URL on LinkedIn
2. Add it to your resume
3. Show it in interviews
4. Keep building and improving!

---

## 📞 Important Notes

- **Free tier limitations:**
  - Render: May sleep after 15 min of inactivity
  - First request might be slow (cold start)
  - Vercel: No such limitations

- **Database:**
  - MongoDB Atlas free tier: 512MB storage
  - Sufficient for portfolio projects

- **Custom Domain (Optional):**
  - You can add custom domains on both Vercel and Render
  - Example: `mentorconnect.yourdomain.com`

---

**Made with ❤️ by [Your Name]**
