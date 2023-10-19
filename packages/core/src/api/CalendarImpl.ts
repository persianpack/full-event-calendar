import useRedux from '../store/useRedux'
import { CalendarApi } from './CalendarApi'
import chatStore from '../store/store'
import { EventApi } from './EventApi'
import { SourceEvent } from './EventImpl'

export interface CalendarSourceOptions {
  events: SourceEvent[]
  initialDate?: Date
  timeZone?: string
  // timeZone ?: string;
  // dailyGridOptions : dailyGridOptions;
  // calnedarMode : CalnedarMode
}

export type EventCalendarOptions = {
  [K in keyof CalendarSourceOptions]-?: CalendarSourceOptions[K]
}
export class CalendarImpl implements CalendarApi {
  storeManager
  storeDispatch

  // private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;
  constructor(eventCalendarOptions: CalendarSourceOptions) {
    const { store, dispatch } = useRedux(chatStore)
    this.storeManager = store
    this.storeDispatch = dispatch
    this.resetOptions(eventCalendarOptions)
  }
  setEventList(events: SourceEvent[]) {
    this.storeDispatch({ type: 'SET_ALL_EVENTS', events })
  }

  updateEvent(id: PickTypeFromField<SourceEvent, 'id'>, event: SourceEvent): void {
    this.storeDispatch({ type: 'UPDATE_EVENT', id, event })
  }
  changeTimeZone(tz: EventCalendarOptions['timeZone']) {
    this.storeDispatch({ type: 'SET_TIMEZONE', tz })
  }
  changeInitialDate(date: Date) {
    this.storeDispatch({ type: 'SET_INITIAL_DATE', date })
  }

  resetOptions(options: CalendarSourceOptions) {
    if (options.timeZone) {
      this.changeTimeZone(options.timeZone)
    }
    if (options.initialDate) {
      this.changeInitialDate(options.initialDate)
    }
    this.setEventList(options.events)
  }

  getEventForAdate(events: typeof this.storeManager.events, targetDate: Date) {
    const filteredERvents = events.filter((event) => {
      const conditain1 =
        event.start.getFullYear() === targetDate.getFullYear() &&
        event.start.getMonth() === targetDate.getMonth() &&
        event.start.getDate() === targetDate.getDate()
      const conditain2 =
        event.end.getFullYear() === targetDate.getFullYear() &&
        event.end.getMonth() === targetDate.getMonth() &&
        event.end.getDate() === event.start.getDate()
      return conditain1 || conditain2
    })
    return filteredERvents
  }

  prevDay() {}
  nextDay() {}
  getDate() {
    return new Date()
  }

  today() {}
}
