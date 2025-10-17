import { useEffect, useRef, useState } from "react";
import { connectEEG } from "../services/websocket.ts";
import { useEEGStore } from "../store/eeg.ts";
import EEGChart from "../components/EEGChart.tsx";
import BandPowerChart from "../components/BandPowerChart.tsx";
import MeditationStateIndicator from "../components/MeditationStateIndicator.tsx";

export default function LiveSession() {
    const { frames, latest, push, reset } = useEEGStore();
    const wsRef = useRef<WebSocket|null>(null);
    const [status, setStatus] = useState<"connecting" | "connected" | "error">("connecting");

    useEffect(()=>{
        reset();
        const ws = connectEEG((f)=>{
            push(f);
            if (status !== "connected") setStatus("connected");
        });
        wsRef.current = ws;

        ws.onopen = () => setStatus("connected");
        ws.onerror = () => setStatus("error");
        ws.onclose = () => setStatus("error");

        return ()=> {
            ws.close();
        }
    }, [push, reset]);

    return (
        <div className="p-4 space-y-4" style={{ padding: "2rem", minHeight: "100vh" }}>
            <div style={{ marginBottom: "2rem" }}>
                <h1 className="text-xl font-semibold" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                    Live EEG Session
                </h1>
                <div style={{ padding: "0.5rem 1rem", borderRadius: "8px", background: status === "connected" ? "#10b981" : status === "error" ? "#ef4444" : "#f59e0b", color: "white", display: "inline-block" }}>
                    {status === "connecting" && "⏳ Connecting to backend..."}
                    {status === "connected" && "✓ Connected"}
                    {status === "error" && "⚠ Connection failed - Make sure backend is running on port 8000"}
                </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Meditation State</h2>
                <MeditationStateIndicator idx={latest?.meditation_index}/>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Band Power</h2>
                <BandPowerChart frame={latest}/>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>EEG Signal (Channel 0)</h2>
                <EEGChart frames={frames} channel={0}/>
            </div>

            {frames.length === 0 && status === "connected" && (
                <div style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
                    Waiting for EEG data...
                </div>
            )}
        </div>
    );
}
