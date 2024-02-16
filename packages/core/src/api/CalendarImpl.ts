import useRedux from '../store/useRedux'
import type { Dispatch } from 'redux'
import { CalendarState, StoreActions } from '../store/store'
import { EventClass, Group, SourceEvent } from '@full-event-calendar/shared-ts'
import { RenderStore } from './RenderStore.ts'
import EventCollection, { EventPayLoads, EventTypes } from './Collection.ts'
interface CalendarApi {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  storeManager: CalendarState
  renderStore: any
  setEventList(events: SourceEvent[]): any
  updateEvent(id: SourceEvent['id'], event: SourceEvent): void
  prevDay(): any
  nextDay(): any
  getDate(): any
  today(): any
}
export type AppSlots = string
export interface CalendarSourceOptions {
  events: SourceEvent[]
  plugins: any[]
  initialDate?: Date | string
  timeZone?: string
  calendar?: string
  locale?: string
  grid?: GridModes
  gridHeight?: number
  containerHeight?: number
  autoUpdateEventOnChange?: boolean
  listMode?: listModeTypes
  groups?: Group[]
  editable?: boolean
  theme?: string
  avalibalSots?: AppSlots[]
  stopAddEvent?: boolean
}

export interface Plugins {
  type: 'grid'
  name: string
  code: any
}

export type GridModes = 'daily' | 'weekly' | 'month' | 'list'
type listModeTypes = 'day' | 'month' | 'week'

// const slots = ['timeRange','dailyHeader','eventClick','addModal','headerDateSlot','todayBtn']

export class CalendarImpl implements CalendarApi {
  readonly storeManager
  readonly renderStore = new RenderStore()
  private EventListenrsStorage: EventCollection
  private readonly storeDispatch: Dispatch<StoreActions>

  constructor(eventCalendarOptions: CalendarSourceOptions) {
    const defaultState: CalendarState = {
      events: [],
      initialDate: new Date(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      calendar: 'gregory',
      locale: 'en-US',
      grid: 'daily',
      gridHeight: 1920,
      plugins: [],
      autoUpdateEventOnChange: true,
      listMode: 'day',
      groups: [],
      editable: true,
      theme: 'light',
      avalibalSots: [],
      stopAddEvent: false,
      containerHeight: 900
    }

    const { store, dispatch } = useRedux(defaultState)
    this.storeManager = store
    this.storeDispatch = dispatch
    this.resetOptions(eventCalendarOptions,true)
    this.EventListenrsStorage = new EventCollection()
  }
  public emitEvent(eventType: EventTypes, payload: EventPayLoads[EventTypes]) {
    this.EventListenrsStorage[eventType].forEach((f) => f(payload))
  }
  public on(eventType: EventTypes, handler: Function) {
    this.EventListenrsStorage[eventType].push(handler)
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
    this.storeDispatch({ type: 'UPDATE_LIST_MODE', val })
  }
  public updateGroups(groups: Group[]) {
    this.storeDispatch({ type: 'UPDATE_GROUPS', groups })
  }
  public addGroup(group: Group) {
    this.storeDispatch({ type: 'ADD_GROUP', group })
  }
  public addEvent(event: EventClass) {
    this.storeDispatch({ type: 'ADD_EVENT', event })
  }
  public updateEditable(val: boolean) {
    this.storeDispatch({ type: 'UPDATE_EDITABLE', val })
  }
  public changeTheme(val: string) {
    this.storeDispatch({ type: 'CHANGE_THEME', val })
  }
  public setAvalibleSlots(AppSlots: AppSlots[]) {
    this.storeDispatch({ type: 'SET_AVALIBLE_SLOTS', avalibalSots: AppSlots })
  }
  public setStopAddEvent(val: boolean) {
    this.storeDispatch({ type: 'SET_STOP_ADD_EVENT', val })
  }
  public changeContainerHeight(val: number) {
    this.storeDispatch({ type: 'CHANGE_CONTAINER_HEIGHT', val })
  }
  public deleteEvent(id: string | number) {
    this.storeDispatch({ type: 'DELETE_EVENT', id })
  }
  public resetOptions<T extends CalendarSourceOptions>(options: T,catchErrors:boolean) {
    if (options?.plugins?.length > 0) {
      this.setPlugins(options.plugins)
    }else if(catchErrors){
      throw Error('full-event-calendat --> must provide atleast 1 grid plugin')
    }
    if (options.timeZone) {
      this.changeTimeZone(options.timeZone)
    }
    if (options.calendar) {
      this.changeCalendar(options.calendar)
    }
    if (options.grid) {
      if(this.isPluginAvalible(options.grid)){
        this.changeGrid(options.grid)
      }else{
        this.changeGrid(options?.plugins[0].name)
      }
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
    if (options.listMode) {
      this.updateListMode(options.listMode)
    }
    if (options.groups) {
      this.updateGroups(options.groups)
    }
    if (options.theme) {
      this.changeTheme(options.theme)
    }
    if (options.stopAddEvent) {
      this.setStopAddEvent(options.stopAddEvent)
    }
    if (options.events) {
      this.setEventList(options.events)
    }
    if (Object.keys(options).includes('editable')) {
      this.updateEditable(Boolean(options.editable))
    }
    
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
    return res ?? plugins[0]?.code
  }
  isPluginAvalible(name:string) {
    return this.storeManager.plugins.some(plugin=>plugin.name === name)
  }
  getOptions() {
    return this.storeManager.plugins.map((item) => {
      if (item.type === 'grid') {
        return item.name
      }
    })
  }
}
