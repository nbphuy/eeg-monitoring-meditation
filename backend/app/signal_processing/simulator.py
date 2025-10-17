import numpy as np
from time import perf_counter

class EEGSimulator:
    """
    Tạo tín hiệu giả lập gồm các band alpha/beta/theta/gamma.
    Xuất frame theo dạng dict {timestamp, samples[], bands{alpha,beta,...}}.
    """
    def __init__(self, fs:int=128, n_channels:int=4):
        self.fs = fs
        self.n_channels = n_channels
        self.t0 = perf_counter()
        self.phase = 0.0

    def next_frame(self, samples:int=16):
        t = perf_counter() - self.t0
        # simple sine mix
        tvec = (np.arange(samples) + self.phase) / self.fs
        self.phase += samples

        # mỗi kênh một chút nhiễu khác nhau
        data = []
        for ch in range(self.n_channels):
            alpha = np.sin(2*np.pi*10*tvec + 0.1*ch)  # ~10 Hz
            beta  = np.sin(2*np.pi*20*tvec + 0.2*ch)
            theta = np.sin(2*np.pi*6*tvec  + 0.3*ch)
            noise = 0.2*np.random.randn(samples)
            x = 20*alpha + 10*beta + 15*theta + noise
            data.append(x.tolist())

        # band power rất thô (demo)
        bands = {
            "alpha": float(np.mean(np.square(20*np.sin(2*np.pi*10*tvec)))),
            "beta":  float(np.mean(np.square(10*np.sin(2*np.pi*20*tvec)))),
            "theta": float(np.mean(np.square(15*np.sin(2*np.pi*6*tvec)))),
        }
        return {
            "timestamp": t,
            "fs": self.fs,
            "n_channels": self.n_channels,
            "samples": samples,
            "data": data,  # shape: n_channels x samples
            "bands": bands
        }
