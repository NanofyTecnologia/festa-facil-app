'use client'

import { Eye, Group, MonitorCog, MonitorSmartphone, Users } from 'lucide-react'

import { Bar, BarChart } from 'recharts'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Chart } from '@/components/ui/chart'
import { ChartConfig } from '@/components/ui/chart/root'
import { Tooltip } from '@/components/ui/tooltip'

import { useGetDashboardData } from './hooks/use-get-dashboard-data'

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
  const { data } = useGetDashboardData()

  console.log(data)

  return (
    <>
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      <div className="mt-5 grid grid-cols-4 gap-4">
        <Card.Root>
          <Card.Header className="flex flex-row items-center justify-between space-y-0">
            <span className="font-bold">Serviços ativos</span> <MonitorCog />
          </Card.Header>
          <Card.Content>
            <h2 className="text-4xl font-bold">{data?.services?.total}</h2>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header className="flex flex-row items-center justify-between space-y-0">
            <span className="font-bold">Total de usuários</span> <Users />
          </Card.Header>
          <Card.Content>
            <h2 className="text-4xl font-bold">{data?.users?.total}</h2>
            <p className="text-muted-foreground">
              Inclui{' '}
              <span className="font-bold">{data?.users?.totalSuppliers}</span>{' '}
              fornecedore(s)
            </p>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header className="flex flex-row items-center justify-between space-y-0">
            <span className="font-bold">Total de visualizações</span> <Eye />
          </Card.Header>
          <Card.Content>
            <h2 className="text-4xl font-bold">{data?.visits?.total}</h2>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header className="flex flex-row items-center justify-between space-y-0">
            <span className="font-bold">Página mais visitada</span>{' '}
            <MonitorSmartphone />
          </Card.Header>
          <Card.Content>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <h2 className="line-clamp-1 text-start text-2xl font-bold">
                    {data?.visits?.moreVisited?.pathname}
                  </h2>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  {data?.visits?.moreVisited?.pathname}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            <p className="text-muted-foreground">
              Total de acessos{' '}
              <span className="font-bold">
                {data?.visits?.moreVisited?._count?.pathname}
              </span>
            </p>
          </Card.Content>
        </Card.Root>
      </div>
    </>
  )
}
