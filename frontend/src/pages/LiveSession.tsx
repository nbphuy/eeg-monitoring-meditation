<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { Play, Square } from 'lucide-react'
import { wsService } from '@/services/websocket'
import { sessionAPI } from '@/services/api'
import { EEGData, BandPowers } from '@/types'
import { EEGChart } from '@/components/EEGChart'
import { BandPowerChart } from '@/components/BandPowerChart'
import { MeditationStateIndicator } from '@/components/MeditationStateIndicator'

export const LiveSession = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [sessionId, setSessionId] = useState<number | null>(null)
  const [eegData, setEegData] = useState<number[][]>([[], [], [], []])
  const [timestamps, setTimestamps] = useState<string[]>([])
  const [currentBandPowers, setCurrentBandPowers] = useState<BandPowers>({
    delta: 0,
    theta: 0,
    alpha: 0,
    beta: 0,
    gamma: 0,
  })
  const [meditationState, setMeditationState] = useState<any>('transitional')
  const [qualityScore, setQualityScore] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')

  const maxDataPoints = 100 // Keep last 100 data points

  useEffect(() => {
    // Connect WebSocket
    wsService.connect().catch(console.error)

    wsService.onMessage(handleEEGData)
    wsService.onStatus((msg) => setStatusMessage(msg))

    return () => {
      wsService.disconnect()
    }
  }, [])

  const handleEEGData = (data: EEGData) => {
    // Update EEG channel data
    setEegData((prev) => {
      const newData = prev.map((channel, idx) => {
        const updated = [...channel, data.raw[idx] || 0]
        return updated.slice(-maxDataPoints)
      })
      return newData
    })

    // Update timestamps
    setTimestamps((prev) => {
      const time = new Date(data.timestamp * 1000).toLocaleTimeString()
      const updated = [...prev, time]
      return updated.slice(-maxDataPoints)
    })

    // Update band powers and state
    setCurrentBandPowers(data.band_powers)
    setMeditationState(data.meditation_state)
    setQualityScore(data.quality_score)
  }

  const handleStartRecording = async () => {
    try {
      // Create session in backend
      const session = await sessionAPI.create({
        user_id: 'user_' + Date.now(),
        notes: 'Live meditation session',
      })
      setSessionId(session.id)

      // Start WebSocket streaming
      wsService.startStream('relaxed')
      setIsRecording(true)
      setStatusMessage('Recording started')
    } catch (error) {
      console.error('Error starting session:', error)
      setStatusMessage('Error starting session')
    }
  }

  const handleStopRecording = async () => {
    try {
      // Stop WebSocket streaming
      wsService.stopStream()

      // End session in backend
      if (sessionId) {
        await sessionAPI.end(sessionId)
      }

      setIsRecording(false)
      setStatusMessage('Recording stopped')
    } catch (error) {
      console.error('Error stopping session:', error)
      setStatusMessage('Error stopping session')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Live Meditation Session
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Real-time EEG monitoring and analysis
          </p>
        </div>

        <button
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isRecording ? (
            <>
              <Square className="h-5 w-5" />
              <span>Stop Session</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              <span>Start Session</span>
            </>
          )}
        </button>
      </div>

      {statusMessage && (
        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* EEG Waveform */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-96">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              EEG Waveforms
            </h3>
            <EEGChart data={eegData} labels={timestamps} title="Real-time EEG Signals" />
          </div>

          {/* Band Powers */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 h-96">
            <BandPowerChart bandPowers={currentBandPowers} />
          </div>
        </div>

        <div className="space-y-6">
          {/* Meditation State */}
          <MeditationStateIndicator state={meditationState} qualityScore={qualityScore} />

          {/* Session Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Session Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className={`font-medium ${isRecording ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                  {isRecording ? 'Recording' : 'Idle'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Data Points:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {timestamps.length}
                </span>
              </div>
              {sessionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Session ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    #{sessionId}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
=======
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
>>>>>>> origin/main
}
