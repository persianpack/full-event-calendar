import './DailyHeader.scss'

interface DailyHeaderProps {
  headerDate: Date
  onDateChange: (d: Date) => void
  timeZone: string
  calendar: string
}

export const DailyHeader: Component<DailyHeaderProps> = (props) => {
  const date = new Date()

  const options = {
    dateStyle: 'full',
    calendar: props.calendar,
    timeZone: props.timeZone
  }

  return <div class="daily-header"></div>
}
