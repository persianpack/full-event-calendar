import { legacy_createStore as createStore, Reducer } from 'redux'
import { Event } from '../api/EventImpl'

export interface CalendarState {
  events: Event[]
}

const defaultState: CalendarState = {
  events: []
}

const calendarReducer: Reducer<CalendarState, SetAllChatsAction> = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      const data: Event[] = []
      for (let i = 0; i < action.events.length; i++) {
        data.push(new Event(action.events[i]))
      }
      return { ...state, events: data }
    default:
      return state
  }
}

const store = createStore(calendarReducer)

export type CalendarStore = typeof store
export default store
