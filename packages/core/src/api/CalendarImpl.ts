import useRedux from '../store/useRedux'
import chatStore from '../store/store'
import type { Dispatch } from 'redux'
import { CalendarState, StoreActions } from '../store/store'
import { SourceEvent } from '@full-event-calendar/shared-ts'
interface CalendarApi {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  storeManager: CalendarState
  storeDispatch: Dispatch<StoreActions>
  setEventList(events: SourceEvent[]): any
  updateEvent(id: SourceEvent['id'], event: SourceEvent): void
  prevDay(): any
  nextDay(): any
  getDate(): any
  today(): any
}

export interface CalendarSourceOptions {
  events: SourceEvent[]
  plugins: Plugins[]
  initialDate?: Date | string
  timeZone?: string
  calendar?: string
  locale?: string
  grid?: GridModes
  gridHeight?: number
  autoUpdateEventOnChange?: boolean
  listMode?: listModeTypes
  groups?:number[]
  // dailyGridOptions : dailyGridOptions;
}

export interface Plugins {
  type: 'grid'
  name: string
  code: any
}

export type GridModes = 'daily' | 'weekly' | 'month' | 'list'
type listModeTypes ='day' | 'month' | 'week'

export class CalendarImpl implements CalendarApi {
  readonly storeManager
  readonly storeDispatch

  constructor(eventCalendarOptions: CalendarSourceOptions) {
    const { store, dispatch } = useRedux(chatStore)
    this.storeManager = store
    this.storeDispatch = dispatch
    this.resetOptions(eventCalendarOptions)
  }

  public setEventList(events: SourceEvent[]) {
    this.storeDispatch({ type: 'SET_ALL_EVENTS', events })
  }
  public setPlugins(plugins: Plugins[]) {
    this.storeDispatch({ type: 'SET_PLUGINS', plugins })
  }
  public setGridHeight(height: number) {
    this.storeDispatch({ type: 'SET_GRID_HEIGHT', height })
  }
  public updateEvent(id: SourceEvent['id'], event: SourceEvent): void {
    this.storeDispatch({ type: 'UPDATE_EVENT', id, event })
  }
  public changeTimeZone(tz: string) {
    this.storeDispatch({ type: 'SET_TIMEZONE', tz })
  }
  public changeInitialDate(date: string) {
    this.storeDispatch({ type: 'SET_INITIAL_DATE', date })
  }
  public changeLocale(locale: string) {
    this.storeDispatch({ type: 'UPDATE_LOCALE', locale })
  }
  public changeCalendar(calendar: string) {
    this.storeDispatch({ type: 'UPDATE_CALENDAR', calendar })
  }
  public changeGrid(grid: GridModes) {
    this.storeDispatch({ type: 'UPDATE_GRID', grid })
  }
  public changeEventAutoUpdate(val: boolean) {
    this.storeDispatch({ type: 'AUTO_UPADTE_EVENT', val })
  }
  public updateListMode(val: listModeTypes) {
    this.storeDispatch({ type: 'UPDATE_LIST_MODE',val})
  }
  public updateGroups(groups:number[]) {
    this.storeDispatch({ type: 'UPDATE_GROUPS',groups})
  }

  public resetOptions(options: CalendarSourceOptions) {
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
    if (options.autoUpdateEventOnChange === false) {
      this.changeEventAutoUpdate(options.autoUpdateEventOnChange)
    }
    if (options.plugins.length > 0) {
      this.setPlugins(options.plugins)
    }
    if(options.listMode){
      this.updateListMode(options.listMode)
    }
    if(options.groups){
      this.updateGroups(options.groups)
    }
    
    this.setEventList(options.events)
  }

  prevDay() {}

  nextDay() {}

  getDate() {
    return new Date()
  }

  today() {}

  public getEventById(id: number | string) {
    return this.storeManager.events.find((ev) => ev.id === id)
  }

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
  getOptions() {
    return this.storeManager.plugins.map((item) => {
      if (item.type === 'grid') {
        return item.name
      }
    })
  }
}
