"""
Initialize the database with tables
Run this script to create all database tables
"""
from app.core.database import Base, engine
from app.models import Session, EEGRecord, SessionAnalytics

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("✓ Database tables created successfully!")
print("\nTables created:")
print("  - sessions")
print("  - eeg_records")
print("  - session_analytics")
