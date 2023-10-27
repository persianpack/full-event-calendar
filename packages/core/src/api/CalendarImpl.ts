import useRedux from '../store/useRedux'
import { CalendarApi } from './CalendarApi'
import chatStore from '../store/store'
import { SourceEvent } from '@full-event-calendar/shared-ts'

export interface CalendarSourceOptions {
  events: SourceEvent[]
  initialDate?: Date | string
  timeZone?: string
  calendar?: string
  locale?: string
  // timeZone ?: string;
  // dailyGridOptions : dailyGridOptions;
  // calnedarMode : CalnedarMode
}

export class CalendarImpl implements CalendarApi {
  storeManager
  storeDispatch

  constructor(eventCalendarOptions: CalendarSourceOptions) {
    const { store, dispatch } = useRedux(chatStore)
    this.storeManager = store
    this.storeDispatch = dispatch
    this.resetOptions(eventCalendarOptions)
  }

  setEventList(events: SourceEvent[]) {
    this.storeDispatch({ type: 'SET_ALL_EVENTS', events })
  }

  updateEvent(id: SourceEvent['id'], event: SourceEvent): void {
    this.storeDispatch({ type: 'UPDATE_EVENT', id, event })
  }
  changeTimeZone(tz: string) {
    this.storeDispatch({ type: 'SET_TIMEZONE', tz })
  }
  changeInitialDate(date: string) {
    this.storeDispatch({ type: 'SET_INITIAL_DATE', date })
  }
  changeLocale(locale: string) {
    this.storeDispatch({ type: 'UPDATE_LOCALE', locale })
  }

  resetOptions(options: CalendarSourceOptions) {
    if (options.timeZone) {
      this.changeTimeZone(options.timeZone)
    }
    if (options.initialDate) {
      this.changeInitialDate(new Date(options.initialDate).toISOString())
    }
    if (options.locale) {
      this.changeLocale(options.locale)
    }
    this.setEventList(options.events)
  }

  prevDay() {}
  nextDay() {}
  getDate() {
    return new Date()
  }

  today() {}
}
