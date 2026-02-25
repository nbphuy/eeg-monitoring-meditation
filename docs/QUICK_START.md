# Quick Start Guide

## Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- PowerShell (for Windows)

## Automated Setup (Recommended)

Run the setup script in PowerShell:

```powershell
.\setup.ps1
```

This will:

1. Check Python and Node.js installations
2. Create Python virtual environment
3. Install all backend dependencies
4. Install all frontend dependencies
5. Create environment files
6. Initialize the database

## Manual Setup

### Backend Setup

1. Navigate to backend directory:

```powershell
cd backend
```

2. Create virtual environment:

```powershell
python -m venv venv
```

3. Activate virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

4. Install dependencies:

```powershell
pip install -r requirements.txt
```

5. Create .env file:

```powershell
Copy-Item .env.example .env
```

6. Initialize database:

```powershell
python init_db.py
```

### Frontend Setup

1. Navigate to frontend directory:

```powershell
cd frontend
```

2. Install dependencies:

```powershell
npm install
```

3. Create .env file:

```powershell
Copy-Item .env.example .env
```

## Running the Application

### Start Backend (Terminal 1)

```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

Backend will be available at:

- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Start Frontend (Terminal 2)

```powershell
cd frontend
npm run dev
```

Frontend will be available at:

- http://localhost:5173

## Using the Application

1. **Dashboard**: View your meditation statistics and recent sessions

2. **Live Session**:

   - Click "Start Session" to begin recording
   - View real-time EEG signals
   - Monitor meditation state and quality score
   - Click "Stop Session" when finished

3. **History**: View and manage past meditation sessions

4. **About**: Learn more about the application and EEG frequency bands

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**

```powershell
uvicorn main:app --reload --port 8001
```

(Update VITE_API_URL in frontend/.env accordingly)

**Database errors:**

```powershell
python init_db.py
```

**Import errors:**
Make sure virtual environment is activated and dependencies are installed:

```powershell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
Edit `vite.config.ts` and change the port number

**Module not found errors:**

```powershell
rm -r node_modules
rm package-lock.json
npm install
```

**WebSocket connection issues:**

- Ensure backend is running
- Check API URL in frontend/.env
- Check browser console for errors

## Development Tips

### Backend Development

**Format code:**

```powershell
black backend/
isort backend/
```

**Run tests:**

```powershell
pytest
```

**Check types:**

```powershell
mypy backend/
```

### Frontend Development

**Format code:**

```powershell
npm run format
```

**Lint code:**

```powershell
npm run lint
```

**Build for production:**

```powershell
npm run build
```

## Project Structure

```
eeg-monitoring-meditation/
├── backend/                # FastAPI backend
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── core/          # Core settings
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   ├── signal_processing/  # EEG processing
│   │   └── websocket/     # WebSocket handlers
│   ├── main.py            # Application entry point
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── package.json       # Node dependencies
├── docs/                  # Documentation
└── README.md             # Project overview
```

## Next Steps

1. Review the code structure
2. Explore the API documentation at http://localhost:8000/docs
3. Try starting a meditation session
4. Customize the signal processing algorithms
5. Add your own features

## Support

For issues or questions:

1. Check the documentation in `/docs`
2. Review the API documentation
3. Check the browser console for errors
4. Review backend logs

## License

MIT License - See LICENSE file for details
