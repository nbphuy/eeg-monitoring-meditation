export interface Session {
  id: number
  user_id: string
  start_time: string
  end_time?: string
  duration?: number
  meditation_quality_score?: number
  notes?: string
}

export interface BandPowers {
  delta: number
  theta: number
  alpha: number
  beta: number
  gamma: number
}

export interface EEGData {
  timestamp: number
  raw: number[]
  band_powers: BandPowers
  meditation_state: string
  quality_score: number
}

export interface WSMessage {
  type: string
  timestamp?: number
  message?: string
  data?: EEGData
}

export type MeditationState = 'relaxed' | 'focused' | 'deep_meditation' | 'distracted' | 'transitional'
