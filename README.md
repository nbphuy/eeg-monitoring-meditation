# Real-Time EEG Signal Processing and Visualization in a Meditation Monitoring Application

## Overview

A full-stack web application for real-time EEG signal processing and visualization to monitor meditation states. This application captures, processes, and visualizes EEG data in real-time, providing insights into meditation effectiveness.

## Features

- 🧠 Real-time EEG signal acquisition and processing
- 📊 Interactive visualization of EEG waveforms
- 🎯 Meditation state classification (focused, relaxed, distracted)
- 📈 Power spectral density analysis (Delta, Theta, Alpha, Beta, Gamma bands)
- 💾 Session recording and playback
- 📱 Responsive web interface
- 🔄 WebSocket-based real-time data streaming

## Tech Stack

### Backend

- **FastAPI** - Modern Python web framework
- **WebSocket** - Real-time bidirectional communication
- **MNE-Python** - EEG signal processing
- **NumPy/SciPy** - Scientific computing
- **SQLAlchemy** - Database ORM
- **Pydantic** - Data validation

### Frontend

- **React** with **TypeScript** - UI framework
- **Vite** - Build tool
- **Chart.js / Plotly.js** - Data visualization
- **TailwindCSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

## Project Structure

```
eeg-monitoring-meditation/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── core/              # Core configurations
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   ├── signal_processing/ # EEG processing algorithms
│   │   └── websocket/         # WebSocket handlers
│   ├── tests/                 # Backend tests
│   ├── requirements.txt
│   └── main.py
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API services
│   │   ├── store/             # State management
│   │   ├── types/             # TypeScript types
│   │   └── utils/             # Utility functions
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── data/                       # Data directory
│   ├── raw/                   # Raw EEG data
│   └── processed/             # Processed data
├── models/                     # ML models
├── docs/                       # Documentation
└── README.md
```

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

## Installation

### Backend Setup

```bash
cd backend
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Unix/MacOS:
source venv/bin/activate

pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Usage

1. **Connect EEG Device**: Connect your EEG headset (e.g., Muse, OpenBCI)
2. **Start Session**: Click "Start Meditation Session" to begin recording
3. **Monitor**: View real-time EEG signals and frequency bands
4. **Analyze**: See meditation state classification in real-time
5. **Review**: Access session history and analytics

## EEG Signal Processing Pipeline

1. **Data Acquisition**: Raw EEG signals from device
2. **Preprocessing**:
   - Bandpass filtering (0.5-50 Hz)
   - Notch filtering (50/60 Hz)
   - Artifact removal
3. **Feature Extraction**:
   - Power spectral density (PSD)
   - Band power (Delta, Theta, Alpha, Beta, Gamma)
   - Statistical features
4. **Classification**: Meditation state detection
5. **Visualization**: Real-time plotting

## API Endpoints

### REST API

- `GET /api/v1/sessions` - List all sessions
- `GET /api/v1/sessions/{id}` - Get session details
- `POST /api/v1/sessions` - Create new session
- `DELETE /api/v1/sessions/{id}` - Delete session

### WebSocket

- `ws://localhost:8000/ws/eeg` - Real-time EEG data stream

## Development

### Run Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm run test
```

### Code Formatting

```bash
# Backend
black backend/
isort backend/

# Frontend
cd frontend
npm run lint
npm run format
```

## Deployment

- Backend: Deploy to Heroku, AWS, or DigitalOcean
- Frontend: Deploy to Vercel, Netlify, or GitHub Pages
- Database: PostgreSQL on cloud provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Author

Pre-Thesis Project - International University - Vietnam National University HCMC

## Acknowledgments

- MNE-Python community
- EEG signal processing research papers
- Open-source EEG datasets

## Contact

For questions or collaboration, please open an issue on GitHub.
