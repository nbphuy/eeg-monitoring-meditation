import { MeditationState } from '@/types'
import './MeditationStateIndicator.css'

interface MeditationStateIndicatorProps {
  state: MeditationState
  qualityScore: number
}

interface StateConfig {
  label: string
  color: string
  bgColor: string
  description: string
}

export const MeditationStateIndicator = ({ state, qualityScore }: MeditationStateIndicatorProps) => {
  const stateConfig: Record<MeditationState, StateConfig> = {
    deep_meditation: {
      label: 'Deep Meditation',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Excellent! You are in a deep meditative state.',
    },
    relaxed: {
      label: 'Relaxed',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'Great! You are relaxed and calm.',
    },
    focused: {
      label: 'Focused',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'You are alert and focused.',
    },
    distracted: {
      label: 'Distracted',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      description: 'Your mind is wandering. Try to refocus.',
    },
    transitional: {
      label: 'Transitional',
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-700/30',
      description: 'Transitioning between states.',
    },
  }

  const config = stateConfig[state] ?? stateConfig.transitional
  const progressPercentage = Math.min((qualityScore / 10) * 100, 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Current State
      </h3>
      
      <div className={`${config.bgColor} rounded-lg p-4 mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-2xl font-bold ${config.color}`}>
            {config.label}
          </span>
          <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">
            {qualityScore.toFixed(1)}/10
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Quality Score</span>
          <span>{qualityScore.toFixed(1)}/10</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment, react/forbid-dom-props */}
          {/* @ts-ignore - CSS custom property required for dynamic progress bar */}
          <div
            className="progress-bar bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ '--progress-width': `${progressPercentage}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  )
}