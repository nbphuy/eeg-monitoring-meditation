import { WSMessage, EEGData } from '@/types'

class WebSocketService {
  private ws: WebSocket | null = null
  private clientId: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private messageHandlers: ((data: EEGData) => void)[] = []
  private statusHandlers: ((message: string) => void)[] = []

  constructor() {
    this.clientId = this.generateClientId()
  }

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const wsUrl = `ws://localhost:8000/api/v1/ws/eeg/${this.clientId}`
      
      try {
        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {
          console.log('WebSocket connected')
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const message: WSMessage = JSON.parse(event.data)
            this.handleMessage(message)
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log('WebSocket disconnected')
          this.attemptReconnect()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleMessage(message: WSMessage) {
    if (message.type === 'eeg_data' && message.data) {
      this.messageHandlers.forEach(handler => handler(message.data!))
    } else if (message.type === 'status' && message.message) {
      this.statusHandlers.forEach(handler => handler(message.message!))
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      
      setTimeout(() => {
        this.connect().catch(console.error)
      }, this.reconnectDelay)
    }
  }

  startStream(state: string = 'relaxed') {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'start_stream', state }))
    }
  }

  stopStream() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'stop_stream' }))
    }
  }

  changeState(state: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'change_state', state }))
    }
  }

  onMessage(handler: (data: EEGData) => void) {
    this.messageHandlers.push(handler)
  }

  onStatus(handler: (message: string) => void) {
    this.statusHandlers.push(handler)
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.messageHandlers = []
    this.statusHandlers = []
  }
}

export const wsService = new WebSocketService()
