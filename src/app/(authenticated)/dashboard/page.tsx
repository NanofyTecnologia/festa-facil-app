'use client'

import { Bar, BarChart } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-4xl">
        <div className="rounded-md border bg-white py-4">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <Bar dataKey="desktop" fill="#000" radius={4} />
              <Bar dataKey="mobile" fill="#666" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </>
  )
}
