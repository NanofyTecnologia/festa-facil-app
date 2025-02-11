import * as React from 'react'
import { format, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { ptBR } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Popover } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

import { cn } from '@/lib/shadcn'

interface DatePickerProps {
  date?: Date | undefined
  setDate: (date: Date | undefined) => void
}

function Root({ date, setDate }: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date>()

  const [month, setMonth] = React.useState<number>(
    date ? date.getMonth() : new Date().getMonth(),
  )
  const [year, setYear] = React.useState<number>(
    date ? date.getFullYear() : new Date().getFullYear(),
  )

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from(
      { length: currentYear - 1900 + 1 },
      (_, i) => currentYear - i,
    )
  }, [])

  const months = React.useMemo(() => {
    if (year) {
      return eachMonthOfInterval({
        start: startOfYear(new Date(year, 0, 1)),
        end: endOfYear(new Date(year, 0, 1)),
      })
    }
    return []
  }, [year])

  React.useEffect(() => {
    if (date) {
      setMonth(date.getMonth())
      setYear(date.getFullYear())
      setSelectedDate(date)
    }
  }, [date])

  const handleYearChange = (selectedYear: string) => {
    const newYear = parseInt(selectedYear, 10)
    setYear(newYear)
    if (date) {
      const newDate = new Date(date)
      newDate.setFullYear(newYear)
      setDate(newDate)
      setSelectedDate(newDate)
    }
  }

  const handleMonthChange = (selectedMonth: string) => {
    const newMonth = parseInt(selectedMonth, 10)
    setMonth(newMonth)
    if (date) {
      const newDate = new Date(date)
      newDate.setMonth(newMonth)
      setDate(newDate)
      setSelectedDate(newDate)
    } else {
      setDate(new Date(year, newMonth, 1))
      setSelectedDate(new Date(year, newMonth, 1))
    }
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button.Root
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            format(selectedDate, 'PPP', { locale: ptBR })
          ) : (
            <span>Selecionar data</span>
          )}
        </Button.Root>
      </Popover.Trigger>
      <Popover.Content className="w-auto p-0" align="start">
        <div className="flex justify-between space-x-1 p-2">
          <Select.Root onValueChange={handleYearChange} value={year.toString()}>
            <Select.Trigger className="h-9 w-[120px]">
              <Select.Value placeholder="Year" />
            </Select.Trigger>
            <Select.Content>
              {years.map((y) => (
                <Select.Item key={y} value={y.toString()}>
                  {y}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Select.Root
            onValueChange={handleMonthChange}
            value={month.toString()}
          >
            <Select.Trigger className="h-9 w-[120px] capitalize">
              <Select.Value placeholder="Month" />
            </Select.Trigger>
            <Select.Content>
              {months.map((m, index) => (
                <Select.Item
                  key={index}
                  className="capitalize"
                  value={index.toString()}
                >
                  {format(m, 'MMMM', { locale: ptBR })}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
        <Calendar.Root
          mode="single"
          selected={date}
          onSelect={setDate}
          month={new Date(year, month)}
          onMonthChange={(newMonth) => {
            setMonth(newMonth.getMonth())
            setYear(newMonth.getFullYear())
          }}
          initialFocus
        />
      </Popover.Content>
    </Popover.Root>
  )
}

export { Root }
