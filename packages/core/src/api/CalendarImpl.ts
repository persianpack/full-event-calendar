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
  grid?: GridModes
  gridHeight?: number
  plugins: Plugins[]
  // dailyGridOptions : dailyGridOptions;
}

export interface Plugins {
  type: 'grid'
  name: string
  code: any
}

export type GridModes = 'daily' | 'weekly' | 'month'

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
  setPlugins(plugins: Plugins[]) {
    this.storeDispatch({ type: 'SET_PLUGINS', plugins })
  }
  setGridHeight(height: number) {
    this.storeDispatch({ type: 'SET_GRID_HEIGHT', height })
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
  changeCalendar(calendar: string) {
    this.storeDispatch({ type: 'UPDATE_CALENDAR', calendar })
  }
  changeGrid(grid: GridModes) {
    this.storeDispatch({ type: 'UPDATE_GRID', grid })
  }

  resetOptions(options: CalendarSourceOptions) {
    if (options.timeZone) {
      this.changeTimeZone(options.timeZone)
    }
    if (options.calendar) {
      this.changeCalendar(options.calendar)
    }
    if (options.grid) {
      this.changeGrid(options.grid)
    }
    if (options.initialDate) {
      this.changeInitialDate(new Date(options.initialDate).toISOString())
    }
    if (options.locale) {
      this.changeLocale(options.locale)
    }
    if (options.gridHeight) {
      this.setGridHeight(options.gridHeight)
    }
    if (options.plugins.length > 0) {
      this.setPlugins(options.plugins)
    }
    this.setEventList(options.events)
  }

  prevDay() {}

  nextDay() {}

  getDate() {
    return new Date()
  }

  today() {}

  getcurrentGridCode() {
    let res = null
    const plugins = this.storeManager.plugins
    for (let index = 0; index < plugins.length; index++) {
      const plugin = plugins[index]
      if (plugin?.type === 'grid' && plugin.name === this.storeManager.grid) {
        res = plugin.code
      }
    }
    return res
  }
}
