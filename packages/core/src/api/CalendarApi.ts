import type { DateInput } from './structs'
import useRedux from '../store/useRedux'
import reduxStore from '../store/store'
import { CalendarApi } from './CalendarImpl'
import { BaseCalendar } from './abstrac'

interface EventCalendarOptions {
  events: any[]
  // timeZone ?: string;
  // dailyGridOptions : dailyGridOptions;
  // calnedarMode : CalnedarMode
}
export class EventCalendar extends BaseCalendar implements CalendarApi {
  //   private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;
  constructor(eventCalendarOptions: EventCalendarOptions) {
    super(eventCalendarOptions)
    // this.targetElement = targetElement
    // this.dailyGridOptions = eventCalendarOptions.dailyGridOptions
    // this.timeZone = eventCalendarOptions.timeZone

    // this.storeManager = useRedux(reduxStore)
    // const self = this
    // setTimeout(() => {
    //   self.storeManager[1].setLists(eventCalendarOptions.events)
    // }, 1233);
    // this.setLists(eventCalendarOptions.events)
  }
  prevDay(): void {
    // dispatch to store manager
  }
  nextDay(): void {
    // dispatch to store manager
  }
  getDate(): Date {
    return new Date()
  }

  today(): void {}
}
