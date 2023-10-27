import { Calendar } from './Calendar'

const el = document.getElementById('app') as HTMLElement

const events = [
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
    id: 17
  }
]

console.log('page init')
const EventCalendar = new Calendar(el, {
  events: events,
  // timeZone: 'Africa/Abidjan',
  calendar: 'persian',
  locale: 'fa-IR',
  initialDate: new Date('Thu Aug 10 2023 15:00:0')
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
