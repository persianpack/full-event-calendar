import { legacy_createStore as createStore, Reducer } from 'redux'
import { EventImpl, SourceEvent } from '../api/EventImpl'
import { EventCalendarOptions } from '../api/CalendarImpl'

const defaultState: CalendarState = {
  events: [],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  initialDate: new Date().toISOString()
}

interface SetAllChatsAction {
  type: 'SET_ALL_EVENTS'
  events: SourceEvent[]
}
interface ChangeTimeZoneOnEvent {
  type: 'UPDATE_TIMEZONE'
  tz: CalendarState['timeZone']
}
interface changeTimeZone {
  type: 'SET_TIMEZONE'
  tz: CalendarState['timeZone']
}
interface ChaageInitialDate {
  type: 'SET_INITIAL_DATE'
  date: string
}
interface UpdateEvent {
  type: 'UPDATE_EVENT'
  id: PickTypeFromField<SourceEvent, 'id'>
  event: SourceEvent
}

// To Do: use better names for set and update

export type StoreActions = SetAllChatsAction | UpdateEvent | ChangeTimeZoneOnEvent | ChaageInitialDate | changeTimeZone
export interface CalendarState extends EventCalendarOptions {
  // timeZone: PickTypeFromField<EventCalendarOptions, 'timeZone'>
  // initialDate: PickTypeFromField<EventCalendarOptions, 'initialDate'>
  events: EventImpl[]
}

const calendarReducer: Reducer<CalendarState, StoreActions> = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_INITIAL_DATE':
      return { ...state, initialDate: action.date }

    case 'SET_ALL_EVENTS':
      const data: EventImpl[] = []
      for (let i = 0; i < action.events.length; i++) {
        const ev = new EventImpl(action.events[i])
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
      let Cevents = [...state.events]
      for (let index = 0; index < Cevents.length; index++) {
        Cevents[index].convertDateByTimeZone(action.tz)
      }
      return { ...state, timeZone: action.tz, events: Cevents }

    default:
      return state
  }
}

const store = createStore(calendarReducer)

export type CalendarStore = typeof store
export default store
