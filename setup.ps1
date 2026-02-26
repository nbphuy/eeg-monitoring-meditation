# EEG Meditation Monitoring Application - Setup Script
# This script helps you set up the project environment

Write-Host "================================" -ForegroundColor Cyan
Write-Host "EEG Meditation Monitor - Setup" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check Python
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Python not found. Please install Python 3.9+." -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "`nChecking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+." -ForegroundColor Red
    exit 1
}

# Setup Backend
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Set-Location backend

# Create virtual environment
Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
python -m venv venv
Write-Host "✓ Virtual environment created" -ForegroundColor Green

# Activate virtual environment
Write-Host "`nActivating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1
Write-Host "✓ Virtual environment activated" -ForegroundColor Green

# Install dependencies
Write-Host "`nInstalling Python dependencies..." -ForegroundColor Yellow
pip install --upgrade pip
pip install -r requirements.txt
Write-Host "✓ Python dependencies installed" -ForegroundColor Green

# Create .env file
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file from template" -ForegroundColor Green
}

# Initialize database
Write-Host "`nInitializing database..." -ForegroundColor Yellow
python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
Write-Host "✓ Database initialized" -ForegroundColor Green

Set-Location ..

# Setup Frontend
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Set-Location frontend

# Install dependencies
Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
npm install
Write-Host "✓ Node.js dependencies installed" -ForegroundColor Green

# Create .env file
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file from template" -ForegroundColor Green
}

Set-Location ..

# Final message
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

Write-Host "To start the application:`n" -ForegroundColor Yellow

Write-Host "Backend (in a terminal):" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor White
Write-Host "  uvicorn main:app --reload`n" -ForegroundColor White

Write-Host "Frontend (in another terminal):" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev`n" -ForegroundColor White

Write-Host "Then open your browser to:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "  Backend API Docs: http://localhost:8000/docs`n" -ForegroundColor White
