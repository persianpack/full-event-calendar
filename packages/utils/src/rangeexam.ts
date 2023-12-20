import { EventClass } from '@full-event-calendar/shared-ts'
import { areDatesInTheSameDate, ceilDate, floorDate } from '.'

// export const filterEventsByDateRange = (events: EventClass[], startDate: Date, endDate: Date) => {
//     const flooredStartDate = floorDate(startDate)
//     const CeilStartDate = ceilDate(endDate)
//     return events.filter((event) => {
//         const condition =
//             (event.start >= flooredStartDate && event.start <= CeilStartDate) ||
//             (event.end >= flooredStartDate && event.end <= CeilStartDate) ||
//             (event.end >= CeilStartDate && event.start <= flooredStartDate)
//         return condition
//     })
// }

// export function getEventsInDate(events: EventClass[], targetDate: Date) {
//     const filteredERvents = events.filter((event) => {
//         return (
//             areDatesInTheSameDate(event.start, targetDate) ||
//             areDatesInTheSameDate(event.end, targetDate) ||
//             (event.start < targetDate && event.end > targetDate)
//         )
//     })
//     return filteredERvents
// }

// class Day {

//     filter(events: EventClass[], targetDate: Date) {
//         const filteredERvents = events.filter((event) => {
//             return (
//                 areDatesInTheSameDate(event.start, targetDate) ||
//                 areDatesInTheSameDate(event.end, targetDate) ||
//                 (event.start < targetDate && event.end > targetDate)
//             )
//         })
//         return filteredERvents
//     }
// }
// class Week {
//     filter(events: EventClass[], startDate: Date, endDate: Date) {
//         const flooredStartDate = floorDate(startDate)
//         const CeilStartDate = ceilDate(endDate)
//         return events.filter((event) => {
//             const condition =
//                 (event.start >= flooredStartDate && event.start <= CeilStartDate) ||
//                 (event.end >= flooredStartDate && event.end <= CeilStartDate) ||
//                 (event.end >= CeilStartDate && event.start <= flooredStartDate)
//             return condition
//         })
//     }
// }

// class EventFilter {
//     private handelFilter: Week | Day
//     private type: 'day' | 'week'
//     constructor(type: 'day' | 'week',initDate:Date) {
//         this.type = type
//         switch (type) {
//             case 'day':

//                 this.handelFilter = new Day()

//                 break;
//             case 'week':
//                 this.handelFilter = new Week()

//                 break;

//         }
//     }

// }

interface EventFilter {
  execute(events: EventClass[], ...args: any[]): void
}

interface DailyFilter extends EventFilter {
  execute(events: EventClass[], date: Date): void
}

interface WeeklyFilter extends EventFilter {
  execute(events: EventClass[], startDate: Date, endDate: Date): void
}
class Day implements DailyFilter {
  execute(events: EventClass[], targetDate: Date) {
    const filteredERvents = events.filter((event) => {
      return (
        areDatesInTheSameDate(event.start, targetDate) ||
        areDatesInTheSameDate(event.end, targetDate) ||
        (event.start < targetDate && event.end > targetDate)
      )
    })
    return filteredERvents
  }
}
class Week implements WeeklyFilter {
  execute(events: EventClass[], startDate: Date, endDate: Date) {
    const flooredStartDate = floorDate(startDate)
    const CeilStartDate = ceilDate(endDate)
    return events.filter((event) => {
      const condition =
        (event.start >= flooredStartDate && event.start <= CeilStartDate) ||
        (event.end >= flooredStartDate && event.end <= CeilStartDate) ||
        (event.end >= CeilStartDate && event.start <= flooredStartDate)
      return condition
    })
  }
}
class FilterClient {
  // private mode: 'day' | 'week';
  private events: EventClass[]
  constructor(eventList: EventClass[]) {
    // this.mode = mode;
    this.events = eventList
  }

  // run(events: EventClass[]) {
  //     let filter: EventFilter;

  //     switch (this.mode) {
  //         case 'day':
  //             filter = new Day();
  //             const currentDate = new Date();
  //             (filter as DailyFilter).execute(events, currentDate);
  //             break;
  //         case 'week':
  //             filter = new Week();
  //             const currentDateWeek = new Date();
  //             const endDate = new Date();
  //             endDate.setDate(currentDateWeek.getDate() + 7);
  //             (filter as WeeklyFilter).execute(events, currentDateWeek, endDate);
  //             break;
  //         default:
  //             throw new Error('Invalid mode');
  //     }
  // }

  dailyFilter(initdate: Date) {
    filter = new Day()
    const currentDate = new Date()
    ;(filter as DailyFilter).execute(events, currentDate)
  }
  weekFilter(s: Date, e: Date) {
    filter = new Week()
    const currentDateWeek = new Date()
    const endDate = new Date()
    endDate.setDate(currentDateWeek.getDate() + 7)
    ;(filter as WeeklyFilter).execute(events, currentDateWeek, endDate)
  }
}
const events: EventClass[] = [
  new EventClass(new Date('2023-01-01'), new Date('2023-01-05')),
  new EventClass(new Date('2023-01-03'), new Date('2023-01-07'))
  // Add more events as needed
]

const dayFilterClient = new FilterClient('day')
dayFilterClient.run(events)

const weekFilterClient = new FilterClient('week')
weekFilterClient.run(events)
