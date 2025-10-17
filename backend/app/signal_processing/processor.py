from typing import Dict
import numpy as np

def simple_meditation_index(bands: Dict[str, float]) -> float:
    # ví dụ: index = alpha / (beta + theta + 1e-6)
    return float(bands.get("alpha",0.0) / (bands.get("beta",0.0) + bands.get("theta",0.0) + 1e-6))