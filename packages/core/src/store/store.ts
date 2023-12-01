import { legacy_createStore as createStore, Reducer } from 'redux'
import { EventImpl } from '@full-event-calendar/utils'
import { CalendarSourceOptions, GridModes, Plugins } from '../api/CalendarImpl'
import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'

const defaultState: CalendarState = {
  events: [],
  initialDate: new Date(),
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  calendar: 'gregory',
  locale: 'en-US',
  grid: 'daily',
  gridHeight: 1920,
  plugins: [],
  autoUpdateEventOnChange: true
}

interface SetAllChatsAction {
  type: 'SET_ALL_EVENTS'
  events: SourceEvent[]
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

export type EventCalendarOptions = { [K in keyof CalendarSourceOptions]-?: CalendarSourceOptions[K] }
export interface CalendarState extends EventCalendarOptions {
  events: EventClass[]
}

const calendarReducer: Reducer<CalendarState, StoreActions> = (state = defaultState, action) => {
  switch (action.type) {
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

      events[eventIndex] = new EventImpl(action.event)

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
