import { FComponent } from '@full-event-calendar/shared-ts'
import { MonthDateObject } from '../MonthGrid'
import { formatWeekDays } from '@full-event-calendar/utils'
import './MonthHeader.scss'

interface ModalHeaderProps {
  headerData: MonthDateObject[]
  timeZone: string
  calendar: string
  locale: string
}

export const MonthHeader: FComponent<ModalHeaderProps> = (props) => {
  function formateWeekDate(date: Date) {
    return formatWeekDays(date, props.calendar, props.timeZone, props.locale)
  }

  return (
    <div class="month-header">
      <div>{formateWeekDate(props.headerData[0].date)}</div>
      <div>{formateWeekDate(props.headerData[1].date)}</div>
      <div>{formateWeekDate(props.headerData[2].date)}</div>
      <div>{formateWeekDate(props.headerData[3].date)}</div>
      <div>{formateWeekDate(props.headerData[4].date)}</div>
      <div>{formateWeekDate(props.headerData[5].date)}</div>
      <div>{formateWeekDate(props.headerData[6].date)}</div>
    </div>
  )
}
