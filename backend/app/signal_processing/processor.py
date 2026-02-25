import numpy as np
from scipy import signal
from scipy.signal import butter, filtfilt, iirnotch
from typing import Tuple, Dict
from app.core.config import settings


class EEGProcessor:
    """EEG signal processing utilities"""
    
    def __init__(self, sampling_rate: int = settings.SAMPLING_RATE):
        self.sampling_rate = sampling_rate
        self.nyquist = sampling_rate / 2
        
    def bandpass_filter(self, data: np.ndarray, lowcut: float = settings.LOWCUT, 
                       highcut: float = settings.HIGHCUT, order: int = 4) -> np.ndarray:
        """Apply bandpass filter to EEG signal"""
        low = lowcut / self.nyquist
        high = highcut / self.nyquist
        b, a = butter(order, [low, high], btype='band')
        filtered_data = filtfilt(b, a, data)
        return filtered_data
    
    def notch_filter(self, data: np.ndarray, freq: float = settings.NOTCH_FREQ, 
                    quality_factor: float = 30.0) -> np.ndarray:
        """Apply notch filter to remove powerline interference"""
        b, a = iirnotch(freq, quality_factor, self.sampling_rate)
        filtered_data = filtfilt(b, a, data)
        return filtered_data
    
    def compute_psd(self, data: np.ndarray, nperseg: int = 256) -> Tuple[np.ndarray, np.ndarray]:
        """Compute Power Spectral Density"""
        freqs, psd = signal.welch(data, self.sampling_rate, nperseg=nperseg)
        return freqs, psd
    
    def extract_band_power(self, data: np.ndarray) -> Dict[str, float]:
        """Extract power in different frequency bands"""
        freqs, psd = self.compute_psd(data)
        
        # Define frequency bands
        bands = {
            'delta': settings.DELTA_BAND,
            'theta': settings.THETA_BAND,
            'alpha': settings.ALPHA_BAND,
            'beta': settings.BETA_BAND,
            'gamma': settings.GAMMA_BAND
        }
        
        band_powers = {}
        for band_name, (low_freq, high_freq) in bands.items():
            # Find indices for the frequency range
            idx = np.logical_and(freqs >= low_freq, freqs <= high_freq)
            # Calculate mean power in the band
            band_powers[band_name] = np.trapz(psd[idx], freqs[idx])
        
        return band_powers
    
    def preprocess_signal(self, data: np.ndarray) -> np.ndarray:
        """Complete preprocessing pipeline"""
        # Apply bandpass filter
        filtered = self.bandpass_filter(data)
        # Apply notch filter
        filtered = self.notch_filter(filtered)
        # Normalize
        filtered = (filtered - np.mean(filtered)) / np.std(filtered)
        return filtered
    
    def detect_artifacts(self, data: np.ndarray, threshold: float = 3.0) -> bool:
        """Simple artifact detection based on amplitude threshold"""
        z_scores = np.abs((data - np.mean(data)) / np.std(data))
        return np.any(z_scores > threshold)
    
    def classify_meditation_state(self, band_powers: Dict[str, float]) -> str:
        """Classify meditation state based on band powers"""
        alpha_theta_ratio = band_powers['alpha'] / (band_powers['theta'] + 1e-10)
        beta_alpha_ratio = band_powers['beta'] / (band_powers['alpha'] + 1e-10)
        
        # Simple classification rules
        if alpha_theta_ratio > 1.5 and beta_alpha_ratio < 1.0:
            return "deep_meditation"
        elif alpha_theta_ratio > 1.0:
            return "relaxed"
        elif beta_alpha_ratio > 1.5:
            return "focused"
        elif band_powers['beta'] > band_powers['alpha']:
            return "distracted"
        else:
            return "transitional"
    
    def calculate_meditation_quality(self, band_powers: Dict[str, float]) -> float:
        """Calculate meditation quality score (0-10)"""
        # Higher alpha and theta, lower beta indicates better meditation
        alpha_score = min(band_powers['alpha'] / 100.0, 5.0)
        theta_score = min(band_powers['theta'] / 50.0, 3.0)
        beta_penalty = min(band_powers['beta'] / 100.0, 3.0)
        
        quality = alpha_score + theta_score - beta_penalty
        # Normalize to 0-10 scale
        quality = max(0, min(10, quality + 5))
        return quality
