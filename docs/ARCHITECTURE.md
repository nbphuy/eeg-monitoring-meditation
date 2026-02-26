# System Architecture Diagram

## Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Web Browser                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Port 5173)                   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │  Dashboard  │  │ Live Session│  │   History   │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  │                                                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │   Charts    │  │  WebSocket  │  │   API       │      │  │
│  │  │  (Chart.js) │  │   Client    │  │  Service    │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          │                      │
                          │ WebSocket            │ HTTP REST
                          │                      │
┌─────────────────────────────────────────────────────────────────┐
│              FastAPI Backend (Port 8000)                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    API Layer                              │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │   REST API  │  │  WebSocket  │  │    CORS     │      │  │
│  │  │  Endpoints  │  │   Manager   │  │  Middleware │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Signal Processing Layer                      │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │   Filters   │  │  Feature    │  │Classifier   │      │  │
│  │  │ (Bandpass,  │  │ Extraction  │  │ (Meditation │      │  │
│  │  │  Notch)     │  │   (PSD)     │  │   State)    │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                      │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  Data Layer                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │   Models    │  │   Schemas   │  │  Database   │      │  │
│  │  │ (SQLAlchemy)│  │  (Pydantic) │  │  (SQLite)   │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow - Live Session

```
┌──────────────┐
│ User clicks  │
│"Start Session"│
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ Frontend: LiveSession Component            │
│  1. Create session via API                 │
│  2. Connect WebSocket                      │
│  3. Send "start_stream" message            │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ Backend: WebSocket Manager                 │
│  1. Accept connection                      │
│  2. Start streaming task                   │
│  3. Generate EEG data (simulated)          │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ Backend: EEG Processor                     │
│  1. Process raw signals                    │
│  2. Apply filters                          │
│  3. Extract band powers                    │
│  4. Classify meditation state              │
│  5. Calculate quality score                │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ Backend: Send via WebSocket                │
│  {                                         │
│    type: "eeg_data",                       │
│    data: {                                 │
│      raw: [...],                           │
│      band_powers: {...},                   │
│      meditation_state: "...",              │
│      quality_score: X.X                    │
│    }                                       │
│  }                                         │
└──────┬──────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────┐
│ Frontend: Update UI                        │
│  1. Update EEG waveform chart              │
│  2. Update band power chart                │
│  3. Update meditation state indicator      │
│  4. Update quality score                   │
└─────────────────────────────────────────────┘
```

## Signal Processing Pipeline

```
Raw EEG Data
     │
     ▼
┌─────────────────┐
│ Bandpass Filter │  (0.5-50 Hz)
│  (Butterworth)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Notch Filter   │  (50/60 Hz powerline)
│   (IIR Notch)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Normalization  │  (Z-score)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PSD Analysis   │  (Welch method)
│  (FFT-based)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│     Band Power Extraction       │
│  ┌─────────────────────────┐    │
│  │ Delta:  0.5-4 Hz        │    │
│  │ Theta:  4-8 Hz          │    │
│  │ Alpha:  8-13 Hz         │    │
│  │ Beta:   13-30 Hz        │    │
│  │ Gamma:  30-50 Hz        │    │
│  └─────────────────────────┘    │
└───────────────┬─────────────────┘
                │
                ▼
┌───────────────────────────────┐
│  Feature-based Classification │
│  - Alpha/Theta ratio          │
│  - Beta/Alpha ratio           │
│  - Absolute band powers       │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│    Meditation State Output    │
│  - Deep Meditation            │
│  - Relaxed                    │
│  - Focused                    │
│  - Distracted                 │
│  - Transitional               │
└───────────────────────────────┘
```

## Database Schema

```
┌─────────────────────────────────────┐
│           sessions                  │
├─────────────────────────────────────┤
│ id (PK)                             │
│ user_id                             │
│ start_time                          │
│ end_time                            │
│ duration                            │
│ meditation_quality_score            │
│ notes                               │
└──────────────┬──────────────────────┘
               │
               │ 1:N
               ▼
┌─────────────────────────────────────┐
│         eeg_records                 │
├─────────────────────────────────────┤
│ id (PK)                             │
│ session_id (FK)                     │
│ timestamp                           │
│ channel_data (JSON)                 │
│ processed_features (JSON)           │
└─────────────────────────────────────┘

               │ 1:1
               ▼
┌─────────────────────────────────────┐
│      session_analytics              │
├─────────────────────────────────────┤
│ id (PK)                             │
│ session_id (FK)                     │
│ avg_delta_power                     │
│ avg_theta_power                     │
│ avg_alpha_power                     │
│ avg_beta_power                      │
│ avg_gamma_power                     │
│ focus_percentage                    │
│ relaxation_percentage               │
│ distraction_percentage              │
│ alpha_theta_ratio                   │
│ meditation_depth_score              │
│ created_at                          │
└─────────────────────────────────────┘
```

## Component Hierarchy (Frontend)

```
App
 │
 ├─── Layout
 │     ├─── Header
 │     ├─── Navigation
 │     │     ├─── Dashboard Link
 │     │     ├─── Live Session Link
 │     │     ├─── History Link
 │     │     └─── About Link
 │     ├─── Main Content
 │     │     └─── {children}
 │     └─── Footer
 │
 ├─── Routes
 │     ├─── Dashboard
 │     │     ├─── Stats Cards
 │     │     ├─── Quick Actions
 │     │     └─── Recent Sessions List
 │     │
 │     ├─── LiveSession
 │     │     ├─── Control Buttons
 │     │     ├─── Status Message
 │     │     ├─── EEGChart
 │     │     ├─── BandPowerChart
 │     │     ├─── MeditationStateIndicator
 │     │     └─── Session Info
 │     │
 │     ├─── History
 │     │     └─── Session Cards List
 │     │
 │     └─── About
 │           └─── Information Sections
 │
 └─── Services
       ├─── API Service (HTTP)
       └─── WebSocket Service
```

## Technology Stack Layers

```
┌─────────────────────────────────────┐
│        Presentation Layer           │
│  React + TypeScript + TailwindCSS   │
│  Chart.js, Lucide Icons             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│       Application Layer             │
│  React Router, Zustand              │
│  Custom Hooks, Services             │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Communication Layer            │
│  Axios (HTTP), WebSocket            │
│  REST API, Real-time Streaming      │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Backend Layer               │
│  FastAPI, Uvicorn                   │
│  Pydantic, SQLAlchemy               │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Processing Layer               │
│  NumPy, SciPy, MNE-Python           │
│  Signal Processing Algorithms       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│         Data Layer                  │
│  SQLite (Dev), PostgreSQL (Prod)    │
│  SQLAlchemy ORM                     │
└─────────────────────────────────────┘
```

## Request Flow Examples

### GET /api/v1/sessions

```
Browser → Frontend → Axios → Backend API → Database → Response
```

### WebSocket Connection

```
Browser → Frontend → WebSocket Client → Backend WebSocket Manager
                                              ↓
                                         EEG Processor
                                              ↓
                                        Simulator/Device
                                              ↓
                                     Streaming Loop (10 Hz)
                                              ↓
Frontend ← WebSocket Client ← Backend WebSocket Manager
```

### Session Creation

```
User Action → Frontend Component → API Service → Backend Endpoint
                                                       ↓
                                                  Validation
                                                       ↓
                                                Database Insert
                                                       ↓
Frontend ← JSON Response ← Backend ← Database
```

This architecture provides:

- ✅ Separation of concerns
- ✅ Scalability
- ✅ Real-time capabilities
- ✅ Maintainability
- ✅ Testability

```

```
