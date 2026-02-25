import numpy as np
from typing import List
from app.core.config import settings


class EEGSimulator:
    """Simulate EEG data for testing purposes"""
    
    def __init__(self, sampling_rate: int = settings.SAMPLING_RATE, 
                 num_channels: int = settings.NUM_CHANNELS):
        self.sampling_rate = sampling_rate
        self.num_channels = num_channels
        self.time = 0.0
        
    def generate_band_signal(self, duration: float, freq_range: tuple, 
                            amplitude: float = 1.0) -> np.ndarray:
        """Generate signal in specific frequency band"""
        t = np.linspace(0, duration, int(self.sampling_rate * duration))
        freq = np.random.uniform(freq_range[0], freq_range[1])
        phase = np.random.uniform(0, 2 * np.pi)
        return amplitude * np.sin(2 * np.pi * freq * t + phase)
    
    def generate_meditation_eeg(self, duration: float = 1.0, 
                               state: str = "relaxed") -> List[List[float]]:
        """Generate simulated EEG data for different meditation states"""
        t = np.linspace(0, duration, int(self.sampling_rate * duration))
        channels_data = []
        
        # Define amplitude profiles for different states
        state_profiles = {
            "relaxed": {"alpha": 2.0, "theta": 1.5, "beta": 0.5, "delta": 0.8, "gamma": 0.3},
            "focused": {"alpha": 1.0, "theta": 0.8, "beta": 2.0, "delta": 0.5, "gamma": 0.8},
            "deep_meditation": {"alpha": 2.5, "theta": 2.0, "beta": 0.3, "delta": 1.0, "gamma": 0.2},
            "distracted": {"alpha": 0.5, "theta": 0.5, "beta": 2.5, "delta": 0.4, "gamma": 1.0}
        }
        
        profile = state_profiles.get(state, state_profiles["relaxed"])
        
        for channel in range(self.num_channels):
            signal = np.zeros_like(t)
            
            # Add different frequency bands
            signal += self.generate_band_signal(duration, settings.DELTA_BAND, profile["delta"])
            signal += self.generate_band_signal(duration, settings.THETA_BAND, profile["theta"])
            signal += self.generate_band_signal(duration, settings.ALPHA_BAND, profile["alpha"])
            signal += self.generate_band_signal(duration, settings.BETA_BAND, profile["beta"])
            signal += self.generate_band_signal(duration, settings.GAMMA_BAND, profile["gamma"])
            
            # Add some noise
            noise = np.random.normal(0, 0.1, len(t))
            signal += noise
            
            channels_data.append(signal.tolist())
        
        return channels_data
    
    def generate_realtime_sample(self, state: str = "relaxed") -> List[float]:
        """Generate a single sample point for all channels"""
        samples = []
        state_profiles = {
            "relaxed": {"alpha": 2.0, "theta": 1.5, "beta": 0.5},
            "focused": {"alpha": 1.0, "theta": 0.8, "beta": 2.0},
            "deep_meditation": {"alpha": 2.5, "theta": 2.0, "beta": 0.3},
            "distracted": {"alpha": 0.5, "theta": 0.5, "beta": 2.5}
        }
        
        profile = state_profiles.get(state, state_profiles["relaxed"])
        
        for channel in range(self.num_channels):
            value = 0.0
            # Add dominant frequencies
            value += profile["alpha"] * np.sin(2 * np.pi * 10 * self.time)
            value += profile["theta"] * np.sin(2 * np.pi * 6 * self.time)
            value += profile["beta"] * np.sin(2 * np.pi * 20 * self.time)
            value += np.random.normal(0, 0.1)  # Noise
            samples.append(float(value))
        
        self.time += 1.0 / self.sampling_rate
        return samples
