import type { FComponent } from '@full-event-calendar/shared-ts'
import './DailyHeader.scss'
import { formatDayNumber, formatWeekDays, isDateToday } from '@full-event-calendar/utils'
import { createEffect } from 'solid-js'

export interface DailyHeaderProps {
  headerDate: Date
  onDateChange: (d: Date) => void
  calendar: string
  timeZone: string
  locale: string
}
// the dates pass throw here are assumed that is not converted by timezone so we convert it here
export const DailyHeader: FComponent<DailyHeaderProps> = (props) => {
  return (
    <div
      onClick={() => props.onDateChange(props.headerDate)}
      class={`daily-header ${isDateToday(props.headerDate) ? 'daily-header-today' : ' '}`}
    >
      {formatWeekDays(props.headerDate, props.calendar, props.timeZone, props.locale)}
      <div class="week-day">{formatDayNumber(props.locale, props.calendar, props.timeZone, props.headerDate)}</div>
    </div>
  )
}
