import { useEffect, useState } from 'react'
import { sessionAPI } from '@/services/api'
import { Session } from '@/types'
import { Trash2, Calendar, Clock } from 'lucide-react'

export const History = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      setLoading(true)
      const data = await sessionAPI.getAll()
      setSessions(data)
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this session?')) {
      try {
        await sessionAPI.delete(id)
        await loadSessions()
      } catch (error) {
        console.error('Error deleting session:', error)
      }
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading sessions...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Session History
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          View and manage your past meditation sessions
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No sessions recorded yet. Start your first meditation session!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Session #{session.id}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(session.start_time).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Clock className="h-5 w-5" />
                      <div>
                        <p className="text-sm">Duration</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {session.duration
                            ? formatDuration(session.duration)
                            : 'In progress'}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Quality Score</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {session.meditation_quality_score
                          ? `${session.meditation_quality_score.toFixed(1)}/10`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {session.notes && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Notes:</p>
                      <p className="text-gray-900 dark:text-white">{session.notes}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(session.id)}
                  className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete session"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
