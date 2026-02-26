<<<<<<< HEAD
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'
import { BandPowers } from '@/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BandPowerChartProps {
  bandPowers: BandPowers
}

export const BandPowerChart = ({ bandPowers }: BandPowerChartProps) => {
  const data = {
    labels: ['Delta (0.5-4 Hz)', 'Theta (4-8 Hz)', 'Alpha (8-13 Hz)', 'Beta (13-30 Hz)', 'Gamma (30-50 Hz)'],
    datasets: [
      {
        label: 'Power (µV²)',
        data: [
          bandPowers.delta,
          bandPowers.theta,
          bandPowers.alpha,
          bandPowers.beta,
          bandPowers.gamma,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Frequency Band Powers',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Power',
        },
      },
    },
  }

  return (
    <div className="h-full w-full">
      <Bar options={options} data={data} />
    </div>
  )
=======
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { EEGFrame } from "../types";

export default function BandPowerChart({ frame }: { frame?: EEGFrame }) {
    const data = frame ? Object.entries(frame.bands).map(([k,v])=>({ band: k, power: v })) : [];
    return (
        <div className="w-full h-48">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="band" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="power" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
>>>>>>> origin/main
}
