# Pre-Thesis Project Documentation

## Real-Time EEG Signal Processing and Visualization in a Meditation Monitoring Application

### Student Information

- **Institution**: International University - Vietnam National University HCMC
- **Program**: Computer Science
- **Project Type**: Pre-Thesis

### Project Objectives

1. Develop a web application for real-time EEG signal processing
2. Implement visualization of EEG data and meditation states
3. Create algorithms for meditation quality assessment
4. Provide user-friendly interface for meditation monitoring

### Technical Architecture

#### Backend (FastAPI)

- **Framework**: FastAPI (Python)
- **Database**: SQLite (development), PostgreSQL (production)
- **Signal Processing**: MNE-Python, NumPy, SciPy
- **Real-time Communication**: WebSocket
- **API Documentation**: Auto-generated Swagger UI

#### Frontend (React + TypeScript)

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Charts**: Chart.js, React-Chartjs-2
- **State Management**: Zustand
- **Routing**: React Router v6

### Key Features

#### 1. Real-time EEG Signal Processing

- Bandpass filtering (0.5-50 Hz)
- Notch filtering (50/60 Hz powerline interference)
- Artifact detection and removal
- Power spectral density analysis

#### 2. Frequency Band Analysis

- **Delta (0.5-4 Hz)**: Deep sleep states
- **Theta (4-8 Hz)**: Deep meditation, creativity
- **Alpha (8-13 Hz)**: Relaxation, calmness
- **Beta (13-30 Hz)**: Active thinking, focus
- **Gamma (30-50 Hz)**: High cognitive function

#### 3. Meditation State Classification

- Deep Meditation
- Relaxed
- Focused
- Distracted
- Transitional

#### 4. Session Management

- Start/stop recording sessions
- Real-time visualization
- Session history and analytics
- Quality score calculation

### Implementation Details

#### Signal Processing Pipeline

```
Raw EEG Data → Preprocessing → Feature Extraction → Classification → Visualization
```

1. **Preprocessing**

   - Bandpass filtering
   - Notch filtering
   - Normalization

2. **Feature Extraction**

   - Power spectral density
   - Band power calculation
   - Statistical features

3. **Classification**

   - Rule-based classification
   - Alpha/Theta ratio analysis
   - Beta/Alpha ratio analysis

4. **Visualization**
   - Real-time waveform display
   - Band power bar charts
   - Meditation state indicators
   - Quality scores

### Database Schema

#### Sessions Table

- id (Primary Key)
- user_id
- start_time
- end_time
- duration
- meditation_quality_score
- notes

#### EEG Records Table

- id (Primary Key)
- session_id (Foreign Key)
- timestamp
- channel_data (JSON)
- processed_features (JSON)

#### Session Analytics Table

- id (Primary Key)
- session_id (Foreign Key)
- avg_delta_power
- avg_theta_power
- avg_alpha_power
- avg_beta_power
- avg_gamma_power
- focus_percentage
- relaxation_percentage
- distraction_percentage

### API Endpoints

#### REST API

- `GET /api/v1/sessions` - List all sessions
- `GET /api/v1/sessions/{id}` - Get session details
- `POST /api/v1/sessions` - Create new session
- `PUT /api/v1/sessions/{id}` - Update session
- `DELETE /api/v1/sessions/{id}` - Delete session
- `POST /api/v1/sessions/{id}/end` - End session

#### WebSocket

- `ws://localhost:8000/api/v1/ws/eeg/{client_id}` - Real-time data stream

### Testing Strategy

#### Unit Tests

- Signal processing functions
- Data validation
- API endpoints

#### Integration Tests

- WebSocket communication
- Database operations
- End-to-end workflows

### Deployment Considerations

#### Backend

- Docker containerization
- Environment variables
- Database migrations
- Logging and monitoring

#### Frontend

- Build optimization
- Code splitting
- Asset optimization
- Environment configuration

### Future Enhancements

1. **Machine Learning Integration**

   - Deep learning models for better classification
   - Personalized meditation recommendations
   - Anomaly detection

2. **Additional Features**

   - Multiple EEG device support
   - Cloud storage
   - Social features
   - Mobile application

3. **Advanced Analytics**
   - Long-term trend analysis
   - Comparative studies
   - Export functionality

### References

1. MNE-Python: https://mne.tools/
2. EEG Signal Processing: Various research papers
3. FastAPI Documentation: https://fastapi.tiangolo.com/
4. React Documentation: https://react.dev/

### Conclusion

This Pre-Thesis project demonstrates the practical application of signal processing, web development, and real-time communication technologies to create a meaningful tool for meditation monitoring and assessment.
