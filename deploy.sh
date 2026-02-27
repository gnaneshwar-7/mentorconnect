#!/bin/bash

# MentorConnect - Quick Deployment Script

echo "🚀 MentorConnect Deployment Preparation"
echo "========================================"
echo ""

# Check if git is initialized
echo "📦  Step 1: Checking Git repository..."
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository found"
fi

# Add all files
echo ""
echo "📝 Step 2: Staging all files..."
git add .

# Commit
echo ""
echo "💾 Step 3: Committing changes..."
read -p "Enter commit message (default: 'Prepare for deployment'): " commit_msg
commit_msg=${commit_msg:-"Prepare for deployment"}
git commit -m "$commit_msg"
echo "✅ Changes committed"

# Check for remote
echo ""
echo "🔗 Step 4: Checking remote repository..."
if git remote | grep -q 'origin'; then
    echo "✅ Remote 'origin' found"
    echo ""
    echo "Pushing to GitHub..."
    git push origin main || git push origin master
else
    echo "⚠️  No remote repository found"
    echo ""
    echo "Please create a GitHub repository and run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/mentorconnect.git"
    echo "git branch -M main"
    echo "git push -u origin main"
fi

echo ""
echo "✅ Preparation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Render (see DEPLOYMENT.md)"
echo "2. Deploy frontend to Vercel (see DEPLOYMENT.md)"
echo "3. Update environment variables"
echo ""
echo "📖 Full guide: See DEPLOYMENT.md"
