import { EventCalendar } from './Calendar'

const el = document.getElementById('app') as HTMLElement

const Calendar = new EventCalendar(el, {
  events: []
})

Calendar.render()
