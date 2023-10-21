import { createMemo } from 'solid-js'
import './DailyHeader.scss'
import type { FComponent } from '@full-event-calendar/shared-ts'

interface DailyHeaderProps {
  headerDate: Date
  onDateChange: (d: Date) => void
  calendar: string
}

// const weekDays =[
//   'Sunday',
//   'Monday',
//   'tusday',
//   'wendsday',
//   'thuersday',
//   'friday'
// ]

export const DailyHeader: FComponent<DailyHeaderProps> = (props) => {
  function formatWeekDays(date: Date) {
    const D = new Date(date)
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(D)
  }

  const formatDayNumber = createMemo(() => {
    const dateTimeFormat = Intl.DateTimeFormat('en-US', {
      calendar: props.calendar
    })
    const parts = dateTimeFormat.formatToParts(props.headerDate)
    const partValues = parts.filter((p) => p.type === 'day')
    return partValues[0].value
  })

  return (
    <div class="daily-header">
      {formatWeekDays(props.headerDate)}
      <div class="week-day">{formatDayNumber()}</div>
    </div>
  )
}
