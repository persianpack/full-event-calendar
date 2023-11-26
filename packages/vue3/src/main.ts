import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { PropType, defineComponent, h, Fragment, Teleport, VNode } from 'vue'
import  {Calendar}  from '@full-event-calendar/core'
// import '@full-event-calendar/core/dist/index.css'
// import '@full-event-calendar/core/node_modules/@full-event-calendar/basic-grid/dist/index.css'
import '@full-event-calendar/month-grid/dist/index.css'
import '@full-event-calendar2122'
import  {DailyGridPlugin}  from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { events } from '@full-event-calendar/test-events'
// createApp(App).mount('#app')

console.log(Calendar)
const el = document.getElementById(`app`) as HTMLElement


const EventCalendar = new Calendar(el, {
    events: events,
    // @ts-ignore
    gridHeight: 65 * 24,
    // timeZone: 'Africa/Abidjan',
    // calendar: 'persian',
    // locale: 'fa-IR',
    initialDate: new Date('Thu Aug 10 2023 15:00:0'),
    //@ts-ignore
      plugins: [DailyGridPlugin],
    grid: 'daily'
  })
  console.time('rendered in vue')
  setTimeout(() => {
   
    EventCalendar.render()
  }, 1234);
  console.timeEnd('rendered in vue')