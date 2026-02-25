import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface EEGChartProps {
  data: number[][]
  labels: string[]
  title: string
}

export const EEGChart = ({ data, labels, title }: EEGChartProps) => {
  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
  ]

  const chartData = {
    labels,
    datasets: data.map((channelData, index) => ({
      label: `Channel ${index + 1}`,
      data: channelData,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('rgb', 'rgba').replace(')', ', 0.1)'),
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
    })),
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Amplitude (µV)',
        },
      },
    },
    animation: {
      duration: 0,
    },
  }

  return (
    <div className="h-full w-full">
      <Line options={options} data={chartData} />
    </div>
  )
}
