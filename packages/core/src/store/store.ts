import { legacy_createStore as createStore, Reducer } from 'redux'
import { EventImpl } from '../api/EventImpl'

const defaultState: CalendarState = {
  events: [],
  timeZone: '',
  initialDate: new Date()
}

const calendarReducer: Reducer<CalendarState, StoreActions> = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      const data: EventImpl[] = []
      for (let i = 0; i < action.events.length; i++) {
        data.push(new EventImpl(action.events[i]))
      }
      return { ...state, events: data }
    case 'UPDATE_EVENT':
      const events = [...state.events]
      const eventIndex = events.findIndex((item) => item.id === action.id)
      events[eventIndex] = new EventImpl(action.event)
      return { ...state, events: events }
    default:
      return state
  }
}

const store = createStore(calendarReducer)

export type CalendarStore = typeof store
export default store
