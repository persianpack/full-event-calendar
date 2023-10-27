import { createMemo, mergeProps } from 'solid-js'
import './DailyHeader.scss'
import type { FComponent } from '@full-event-calendar/shared-ts'

export interface DailyHeaderProps {
  headerDate: Date
  onDateChange: (d: Date) => void
  calendar: string
  timeZone: string
  locale: string
}
// the dates pass throw here are assumed that is not converted by timezone so we convert it here
export const DailyHeader: FComponent<DailyHeaderProps> = (props) => {
  function formatWeekDays(date: Date) {
    const D = new Date(date)
    return new Intl.DateTimeFormat(props.locale, {
      weekday: 'short',
      calendar: props.calendar,
      timeZone: props.timeZone
    }).format(D)
  }
  const formatDayNumber = createMemo(() => {
    const dateTimeFormat = Intl.DateTimeFormat(props.locale, {
      calendar: props.calendar,
      timeZone: props.timeZone
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
