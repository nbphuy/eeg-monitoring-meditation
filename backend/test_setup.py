"""
Test script to verify the backend setup
"""
import sys
import os

print("Testing backend setup...\n")

# Test imports
try:
    import fastapi
    print("✓ FastAPI installed")
except ImportError:
    print("✗ FastAPI not found")
    sys.exit(1)

try:
    import numpy as np
    print("✓ NumPy installed")
except ImportError:
    print("✗ NumPy not found")
    sys.exit(1)

try:
    import scipy
    print("✓ SciPy installed")
except ImportError:
    print("✗ SciPy not found")
    sys.exit(1)

try:
    import mne
    print("✓ MNE-Python installed")
except ImportError:
    print("✗ MNE-Python not found")
    sys.exit(1)

try:
    from app.core.config import settings
    print(f"✓ Configuration loaded (Project: {settings.PROJECT_NAME})")
except Exception as e:
    print(f"✗ Configuration error: {e}")
    sys.exit(1)

try:
    from app.signal_processing.processor import EEGProcessor
    processor = EEGProcessor()
    print("✓ EEG Processor initialized")
except Exception as e:
    print(f"✗ EEG Processor error: {e}")
    sys.exit(1)

try:
    from app.signal_processing.simulator import EEGSimulator
    simulator = EEGSimulator()
    data = simulator.generate_meditation_eeg(duration=1.0, state="relaxed")
    print(f"✓ EEG Simulator working (generated {len(data)} channels)")
except Exception as e:
    print(f"✗ EEG Simulator error: {e}")
    sys.exit(1)

print("\n✓ All backend components are working correctly!")
print("\nYou can now start the backend server with:")
print("  uvicorn main:app --reload")
