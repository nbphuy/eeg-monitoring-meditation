export const About = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          About EEG Meditation Monitor
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Real-Time EEG Signal Processing and Visualization
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Project Overview
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This application is a Pre-Thesis project developed at the International University - 
            Vietnam National University HCMC. It focuses on real-time EEG signal processing and 
            visualization to monitor meditation states.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Features
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Real-time EEG signal acquisition and processing</li>
            <li>Interactive visualization of EEG waveforms</li>
            <li>Meditation state classification (focused, relaxed, distracted)</li>
            <li>Power spectral density analysis across frequency bands</li>
            <li>Session recording and history tracking</li>
            <li>Quality score calculation for meditation effectiveness</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            EEG Frequency Bands
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Delta (0.5-4 Hz)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deep sleep, unconscious states</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Theta (4-8 Hz)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deep meditation, creativity</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Alpha (8-13 Hz)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Relaxation, calmness</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Beta (13-30 Hz)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active thinking, focus</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Gamma (30-50 Hz)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">High cognitive function</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Technology Stack
          </h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Backend</h4>
              <p className="text-gray-700 dark:text-gray-300">
                FastAPI, Python, MNE-Python, NumPy, SciPy, WebSocket
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Frontend</h4>
              <p className="text-gray-700 dark:text-gray-300">
                React, TypeScript, Vite, TailwindCSS, Chart.js
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            How to Use
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Connect your EEG device (or use simulation mode)</li>
            <li>Navigate to "Live Session" page</li>
            <li>Click "Start Session" to begin recording</li>
            <li>Observe real-time EEG signals and meditation state</li>
            <li>Click "Stop Session" when finished</li>
            <li>View your session history in the "History" page</li>
          </ol>
        </section>
      </div>
    </div>
  )
}
