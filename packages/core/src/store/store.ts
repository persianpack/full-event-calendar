import { legacy_createStore as createStore, Reducer } from 'redux'
import { EventImpl } from '@full-event-calendar/utils'
import { AppSlots, CalendarSourceOptions, GridModes, Plugins } from '../api/CalendarImpl'
import { EventClass, Group, SourceEvent } from '@full-event-calendar/shared-ts'

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
  editable: false,
  theme: 'light',
  avalibalSots: [],
  stopAddEvent: false,
  containerHeight: 900
}

interface SetAllChatsAction {
  type: 'SET_ALL_EVENTS'
  events: SourceEvent[]
}
interface SetStopAddEvent {
  type: 'SET_STOP_ADD_EVENT'
  val: boolean
}
interface SetAvalibleSlots {
  type: 'SET_AVALIBLE_SLOTS'
  avalibalSots: AppSlots[]
}
interface AddEvent {
  type: 'ADD_EVENT'
  event: SourceEvent
  convertTz?: boolean
}
interface DeleteEvent {
  type: 'DELETE_EVENT'
  id: number | string
}
interface SetGridHeight {
  type: 'SET_GRID_HEIGHT'
  height: CalendarState['gridHeight']
}
interface ChangeTimeZoneOnEvent {
  type: 'UPDATE_TIMEZONE'
  tz: CalendarState['timeZone']
}
interface changeTimeZone {
  type: 'SET_TIMEZONE'
  tz: CalendarState['timeZone']
}
interface ChangeInitialDate {
  type: 'SET_INITIAL_DATE'
  date: string
}
interface UpdateLocale {
  type: 'UPDATE_LOCALE'
  locale: string
}
interface UpdateEvent {
  type: 'UPDATE_EVENT'
  id: SourceEvent['id']
  event: SourceEvent
}
interface UpdateCalendar {
  type: 'UPDATE_CALENDAR'
  calendar: string
}
interface UpdateGrid {
  type: 'UPDATE_GRID'
  grid: GridModes
}
interface SetPlugins {
  type: 'SET_PLUGINS'
  plugins: Array<Plugins>
}
interface AutoUpdateEvent {
  type: 'AUTO_UPADTE_EVENT'
  val: boolean
}
interface UpdateListMode {
  type: 'UPDATE_LIST_MODE'
  val: CalendarState['listMode']
}
interface UpdateGroups {
  type: 'UPDATE_GROUPS'
  groups: CalendarState['groups']
}
interface AddGroup {
  type: 'ADD_GROUP'
  group: Group
}
interface UpdateEditabel {
  type: 'UPDATE_EDITABLE'
  val: boolean
}
interface ChangeTheme {
  type: 'CHANGE_THEME'
  val: string
}
interface ChangeContainerHeight {
  type: 'CHANGE_CONTAINER_HEIGHT'
  val: number
}

// To Do: use better names for set and update

export type StoreActions =
  | SetAllChatsAction
  | UpdateEvent
  | ChangeTimeZoneOnEvent
  | ChangeInitialDate
  | changeTimeZone
  | UpdateLocale
  | UpdateCalendar
  | UpdateGrid
  | SetGridHeight
  | SetPlugins
  | AutoUpdateEvent
  | UpdateListMode
  | UpdateGroups
  | DeleteEvent
  | AddEvent
  | AddGroup
  | UpdateEditabel
  | ChangeTheme
  | SetAvalibleSlots
  | SetStopAddEvent
  | ChangeContainerHeight

export type EventCalendarOptions = { [K in keyof CalendarSourceOptions]-?: CalendarSourceOptions[K] }
export interface CalendarState extends EventCalendarOptions {
  events: EventClass[]
}

const calendarReducer: Reducer<CalendarState, StoreActions> = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CONTAINER_HEIGHT':
      return { ...state, containerHeight: action.val }
    case 'DELETE_EVENT':
      const events12 = [...state.events].filter((ev) => ev.id != action.id)
      return { ...state, events: events12 }
    case 'SET_STOP_ADD_EVENT':
      return { ...state, stopAddEvent: action.val }
    case 'SET_AVALIBLE_SLOTS':
      return { ...state, avalibalSots: action.avalibalSots }
    case 'CHANGE_THEME':
      return { ...state, theme: action.val }
    case 'UPDATE_EDITABLE':
      return { ...state, editable: action.val }
    case 'ADD_EVENT':
      const events1 = [...state.events]
      let eve = new EventImpl(action.event)
      eve.convertDateByTimeZone(state.timeZone)
      events1.push(eve)
      return { ...state, events: events1 }
    case 'UPDATE_GROUPS':
      return { ...state, groups: action.groups }
    case 'ADD_GROUP':
      const groups = [...state.groups, action.group]
      return { ...state, groups }
    case 'UPDATE_LIST_MODE':
      return { ...state, listMode: action.val }
    case 'AUTO_UPADTE_EVENT':
      return { ...state, autoUpdateEventOnChange: action.val }
    case 'SET_GRID_HEIGHT':
      return { ...state, gridHeight: action.height }
    case 'SET_PLUGINS':
      return { ...state, plugins: action.plugins }
    case 'UPDATE_GRID':
      return { ...state, grid: action.grid }
    case 'UPDATE_CALENDAR':
      return { ...state, calendar: action.calendar }
    case 'UPDATE_LOCALE':
      return { ...state, locale: action.locale }
    case 'SET_INITIAL_DATE':
      return { ...state, initialDate: action.date }

    case 'SET_ALL_EVENTS':
      const data: EventImpl[] = []
      for (let i = 0; i < action.events.length; i++) {
        const ev = new EventImpl(action.events[i] as SourceEvent)
        ev.convertDateByTimeZone(state.timeZone)
        data.push(ev)
      }

      return { ...state, events: data }

    case 'UPDATE_EVENT':
      const events = [...state.events]
      const eventIndex = events.findIndex((item) => item.id === action.id)
      const eventss = new EventImpl(action.event)
      eventss.convertDateByTimeZone(state.timeZone)
      events[eventIndex] = eventss
      // const events = [...state.events]
      // const eventIndex = events.findIndex((item) => item.id === action.id)
      // const eventss = new EventImpl(events[eventIndex].sourceEvent)
      // eventss.updateEventDetails(action.event)
      // events[eventIndex] = eventss

      return { ...state, events: events }

    case 'SET_TIMEZONE':
      return { ...state, timeZone: action.tz }

    case 'UPDATE_TIMEZONE':
      let calendar_events = [...state.events]
      for (let index = 0; index < calendar_events.length; index++) {
        calendar_events[index]?.convertDateByTimeZone(action.tz)
      }
      return { ...state, timeZone: action.tz, events: calendar_events }

    default:
      return state
  }
}

const store = createStore(calendarReducer)

export type CalendarStore = typeof store
export default store
