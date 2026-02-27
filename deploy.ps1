# MentorConnect - Quick Deployment Script (Windows)

Write-Host "MentorConnect Deployment Preparation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
Write-Host "Step 1: Checking Git repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Gray
    git init
    Write-Host "Git initialized" -ForegroundColor Green
} else {
    Write-Host "Git repository found" -ForegroundColor Green
}

# Add all files
Write-Host ""
Write-Host "Step 2: Staging all files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host ""
Write-Host "Step 3: Committing changes..." -ForegroundColor Yellow
$commitMsg = Read-Host "Enter commit message (default: 'Prepare for deployment')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Prepare for deployment"
}
git commit -m $commitMsg
Write-Host "Changes committed" -ForegroundColor Green

# Check for remote
Write-Host ""
Write-Host "Step 4: Checking remote repository..." -ForegroundColor Yellow
$remotes = git remote
if ($remotes -contains "origin") {
    Write-Host "Remote 'origin' found" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Gray
    try {
        git push origin main
    } catch {
        try {
            git push origin master
        } catch {
            Write-Host "Push failed. Please check your remote settings." -ForegroundColor Red
        }
    }
} else {
    Write-Host "No remote repository found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please create a GitHub repository and run:" -ForegroundColor Yellow
    Write-Host "git remote add origin https://github.com/YOUR_USERNAME/mentorconnect.git" -ForegroundColor White
    Write-Host "git branch -M main" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Preparation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Deploy backend to Render (see DEPLOYMENT.md)" -ForegroundColor White
Write-Host "2. Deploy frontend to Vercel (see DEPLOYMENT.md)" -ForegroundColor White
Write-Host "3. Update environment variables" -ForegroundColor White
Write-Host ""
Write-Host "Full guide: See DEPLOYMENT.md" -ForegroundColor Cyan
