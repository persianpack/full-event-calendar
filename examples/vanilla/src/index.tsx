import { Calendar } from '@full-event-calendar/core'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'

const el = document.getElementById('app') as HTMLElement

const events = [
  //all days for wwekly

  {
    name: 'some name',
    start: new Date(' Aug 01 2023 08:00:0'),
    end: new Date(' Aug 03 2023 10:00:00'),
    id: 16123
  },
  {
    name: 'some name',
    start: new Date(' Aug 04 2023 08:00:0'),
    end: new Date(' Aug 07 2023 10:00:00'),
    id: 18123
  },
  {
    name: 'some name',
    start: new Date(' Aug 01 2023 08:00:0'),
    end: new Date(' Aug 02 2023 10:00:00'),
    id: 17123
  },
  {
    name: 'some name',
    start: new Date(' Aug 03 2023 08:00:0'),
    end: new Date(' Aug 05 2023 10:00:00'),
    id: 19123
  },

  {
    name: 'some name',
    start: new Date(' Aug 06 2023 08:00:0'),
    end: new Date(' Aug 09 2023 10:00:00'),
    id: 110
  },
  {
    name: 'some name',
    start: new Date(' Aug 06 2023 08:00:0'),
    end: new Date(' Aug 07 2023 10:00:00'),
    id: 111
  },
  {
    name: 'some name',
    start: new Date(' Aug 08 2023 08:00:0'),
    end: new Date(' Aug 09 2023 10:00:00'),
    id: 112
  },
  {
    name: 'some name',
    start: new Date(' Aug 08 2023 08:00:0'),
    end: new Date(' Aug 09 2023 10:00:00'),
    id: 113
  },
  {
    name: 'some name',
    start: new Date(' Aug 05 2023 08:00:0'),
    end: new Date(' Aug 30 2023 10:00:00'),
    id: 114
  },
  {
    name: 'some name',
    start: new Date(' Aug 11 2023 00:00:00'),
    end: new Date(' Aug 11 2023 23:59:59'),
    id: 117
  },

  {
    name: 'some name',
    start: new Date(' Aug 08 2023 05:00:00'),
    end: new Date(' Aug 08 2023 07:59:59'),
    id: 186
  },
  {
    name: 'some name',
    start: new Date(' Aug 19 2023 05:00:00'),
    end: new Date(' Aug 20 2023 07:59:59'),
    id: 189
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 08:00:0'),
    end: new Date('Thu Aug 13 2023 10:00:00'),
    id: 32
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 05 2023 08:00:0'),
    end: new Date('Thu Aug 08 2023 10:00:00'),
    id: 31
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 01 2023 08:00:0'),
    end: new Date('Thu Aug 20 2023 10:00:00'),
    id: 30
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 01 2023 08:00:0'),
    end: new Date('Thu Aug 4 2023 10:00:00'),
    id: 33
  },

  //all days for daily
  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 08:00:0'),
    end: new Date('Thu Aug 08 2023 10:00:00'),
    id: 23
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 03:00:00'),
    end: new Date('Thu Aug 08 2023 04:00:00'),
    id: 24
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 08 2023 13:30:00'),
    end: new Date('Thu Aug 08 2023 15:00:00'),
    id: 25
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 09 2023 15:00:0'),
    end: new Date('Thu Aug 09 2023 17:00:00'),
    id: 20
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 09 2023 13:00:00'),
    end: new Date('Thu Aug 09 2023 17:00:00'),
    id: 21
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 09 2023 13:30:00'),
    end: new Date('Thu Aug 09 2023 15:00:00'),
    id: 22
  },

  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 15:00:0'),
    end: new Date('Thu Aug 10 2023 17:00:00'),
    id: 7
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 13:00:00'),
    end: new Date('Thu Aug 10 2023 17:00:00'),
    id: 8
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 13:30:00'),
    end: new Date('Thu Aug 10 2023 15:00:00'),
    id: 9
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 14:00:00'),
    end: new Date('Thu Aug 10 2023 16:30:00'),
    id: 10
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 16:00:00'),
    end: new Date('Thu Aug 10 2023 18:00:00'),
    id: 11
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 12:00:00'),
    end: new Date('Thu Aug 10 2023 14:05:00'),
    id: 6
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 16:15:00'),
    end: new Date('Thu Aug 10 2023 22:05:00'),
    id: 12
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 17:30:00'),
    end: new Date('Thu Aug 10 2023 22:05:00'),
    id: 13
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 17:10:00'),
    end: new Date('Thu Aug 10 2023 19:30:00'),
    id: 14
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 17:15:00'),
    end: new Date('Thu Aug 10 2023 20:00:00'),
    id: 15
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 19:00:00'),
    end: new Date('Thu Aug 10 2023 22:05:00'),
    id: 16
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 20:00:00'),
    end: new Date('Thu Aug 10 2023 23:05:00'),
    id: 170
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 00:00:00'),
    end: new Date('Thu Aug 10 2023 23:59:59'),
    id: 18
  },
  {
    name: 'some name',
    start: new Date('Thu Aug 10 2023 00:00:00'),
    end: new Date('Thu Aug 11 2023 15:59:59'),
    id: 19
  }
]

console.log('page init')
const EventCalendar = new Calendar(el, {
  events: events,
  // @ts-ignore
  gridHeight: 65 * 24,
  // autoUpdateEventOnChange:false,
  // timeZone: 'Africa/Abidjan',
  // calendar: 'persian',
  // locale: 'fa-IR',
  initialDate: new Date('Thu Aug 10 2023 15:00:0'),
  //@ts-ignore
  plugins: [DailyGridPlugin, MonthGridPlugin, WeeklyGridPlugin],
  grid: 'daily'
})
console.time('rendered in ')
EventCalendar.render()
console.timeEnd('rendered in ')

// setTimeout(() => {
//   console.log("update uvent")
//   EventCalendar.updateEvent(17, {
//     name: "some name",
//     start: new Date('Thu Aug 10 2023 12:00:00'),
//     end: new Date('Thu Aug 10 2023 14:05:00'),
//     id: 17
//   },)
// }, 2000);
// console.log(Calendar)

// function convertTZ(date, tzString) {
//   return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
// }

// // usage: Asia/Jakarta is GMT+7

// // Resulting value is regular Date() object
// const convertedDate = convertTZ(new Date(), "America/New_York")
// console.log(convertedDate)

// const x = Intl.supportedValuesOf('timeZone')
