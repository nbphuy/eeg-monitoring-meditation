import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sessionAPI } from '@/services/api'
import { Session } from '@/types'
import { Activity, Clock, TrendingUp } from 'lucide-react'

export const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalMinutes: 0,
    averageQuality: 0,
  })

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      const data = await sessionAPI.getAll()
      setSessions(data.slice(0, 5)) // Get last 5 sessions
      
      // Calculate stats
      const total = data.length
      const minutes = data.reduce((sum, s) => sum + (s.duration || 0), 0) / 60
      const avgQuality = data.reduce((sum, s) => sum + (s.meditation_quality_score || 0), 0) / total || 0
      
      setStats({
        totalSessions: total,
        totalMinutes: Math.round(minutes),
        averageQuality: Number(avgQuality.toFixed(1)),
      })
    } catch (error) {
      console.error('Error loading sessions:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome to your meditation monitoring dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalSessions}
              </p>
            </div>
            <Activity className="h-12 w-12 text-primary-500 opacity-80" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Minutes</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalMinutes}
              </p>
            </div>
            <Clock className="h-12 w-12 text-green-500 opacity-80" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Quality</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.averageQuality}/10
              </p>
            </div>
            <TrendingUp className="h-12 w-12 text-blue-500 opacity-80" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/live"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Start New Session
          </Link>
          <Link
            to="/history"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            View History
          </Link>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Recent Sessions
        </h3>
        {sessions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No sessions yet. Start your first meditation session!</p>
        ) : (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Session #{session.id}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(session.start_time).toLocaleDateString()} at{' '}
                    {new Date(session.start_time).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {session.duration ? `${Math.round(session.duration / 60)} min` : 'In progress'}
                  </p>
                  {session.meditation_quality_score && (
                    <p className="text-sm font-medium text-primary-600">
                      Quality: {session.meditation_quality_score.toFixed(1)}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
