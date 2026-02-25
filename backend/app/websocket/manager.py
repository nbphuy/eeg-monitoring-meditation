from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List
import asyncio
import json
import time
import numpy as np
from app.signal_processing.processor import EEGProcessor
from app.signal_processing.simulator import EEGSimulator


class ConnectionManager:
    """Manage WebSocket connections and real-time EEG data streaming"""
    
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
        self.processor = EEGProcessor()
        self.simulator = EEGSimulator()
        self.streaming_tasks: Dict[str, asyncio.Task] = {}
        
    async def connect(self, websocket: WebSocket, client_id: str):
        """Accept and store new WebSocket connection"""
        await websocket.accept()
        self.active_connections[client_id] = websocket
        print(f"Client {client_id} connected. Total connections: {len(self.active_connections)}")
        
    def disconnect(self, client_id: str):
        """Remove WebSocket connection"""
        if client_id in self.active_connections:
            del self.active_connections[client_id]
        if client_id in self.streaming_tasks:
            self.streaming_tasks[client_id].cancel()
            del self.streaming_tasks[client_id]
        print(f"Client {client_id} disconnected. Total connections: {len(self.active_connections)}")
        
    async def send_personal_message(self, message: dict, client_id: str):
        """Send message to specific client"""
        if client_id in self.active_connections:
            websocket = self.active_connections[client_id]
            await websocket.send_json(message)
            
    async def broadcast(self, message: dict):
        """Broadcast message to all connected clients"""
        disconnected_clients = []
        for client_id, websocket in self.active_connections.items():
            try:
                await websocket.send_json(message)
            except:
                disconnected_clients.append(client_id)
        
        # Clean up disconnected clients
        for client_id in disconnected_clients:
            self.disconnect(client_id)
    
    async def stream_eeg_data(self, client_id: str, state: str = "relaxed"):
        """Stream simulated EEG data to client"""
        try:
            while client_id in self.active_connections:
                # Generate simulated EEG sample
                sample = self.simulator.generate_realtime_sample(state)
                
                # Process the sample (simulate processing on accumulated data)
                # In real scenario, you'd accumulate samples and process in windows
                sample_array = np.array(sample)
                
                # For demo, generate band powers from random walk
                band_powers = {
                    'delta': float(np.random.uniform(10, 30)),
                    'theta': float(np.random.uniform(20, 50)),
                    'alpha': float(np.random.uniform(40, 100)),
                    'beta': float(np.random.uniform(15, 60)),
                    'gamma': float(np.random.uniform(5, 25))
                }
                
                meditation_state = self.processor.classify_meditation_state(band_powers)
                quality_score = self.processor.calculate_meditation_quality(band_powers)
                
                # Prepare message
                message = {
                    "type": "eeg_data",
                    "timestamp": time.time(),
                    "data": {
                        "raw": sample,
                        "band_powers": band_powers,
                        "meditation_state": meditation_state,
                        "quality_score": round(quality_score, 2)
                    }
                }
                
                await self.send_personal_message(message, client_id)
                
                # Control streaming rate (e.g., 10 Hz)
                await asyncio.sleep(0.1)
                
        except WebSocketDisconnect:
            self.disconnect(client_id)
        except Exception as e:
            print(f"Error streaming to {client_id}: {e}")
            self.disconnect(client_id)
    
    def start_streaming(self, client_id: str, state: str = "relaxed"):
        """Start streaming task for client"""
        if client_id not in self.streaming_tasks:
            task = asyncio.create_task(self.stream_eeg_data(client_id, state))
            self.streaming_tasks[client_id] = task
    
    def stop_streaming(self, client_id: str):
        """Stop streaming task for client"""
        if client_id in self.streaming_tasks:
            self.streaming_tasks[client_id].cancel()
            del self.streaming_tasks[client_id]


# Global connection manager instance
manager = ConnectionManager()
