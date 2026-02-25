<<<<<<< HEAD
import { MeditationState } from '@/types'

interface MeditationStateIndicatorProps {
  state: MeditationState
  qualityScore: number
}

export const MeditationStateIndicator = ({ state, qualityScore }: MeditationStateIndicatorProps) => {
  const stateConfig = {
    deep_meditation: {
      label: 'Deep Meditation',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Excellent! You are in a deep meditative state.',
    },
    relaxed: {
      label: 'Relaxed',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Great! You are relaxed and calm.',
    },
    focused: {
      label: 'Focused',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'You are alert and focused.',
    },
    distracted: {
      label: 'Distracted',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Your mind is wandering. Try to refocus.',
    },
    transitional: {
      label: 'Transitional',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      description: 'Transitioning between states.',
    },
  }

  const config = stateConfig[state] || stateConfig.transitional

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
          <span className="text-3xl font-bold text-gray-700">
            {qualityScore.toFixed(1)}/10
          </span>
        </div>
        <p className="text-sm text-gray-600">{config.description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Quality Score</span>
          <span>{qualityScore.toFixed(1)}/10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(qualityScore / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
=======
export default function MeditationStateIndicator({ idx }: { idx?: number }) {
    const v = idx ?? 0;
    const label = v > 1.2 ? "Relaxed" : v > 0.8 ? "Neutral" : "Tense";
    return (
        <div className="p-3 rounded-xl border">
            <div className="text-sm opacity-70">Meditation Index</div>
            <div className="text-2xl font-semibold">{v.toFixed(2)}</div>
            <div className="opacity-80">{label}</div>
        </div>
    );
>>>>>>> origin/main
}
