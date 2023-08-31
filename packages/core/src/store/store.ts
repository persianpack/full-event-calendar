import { legacy_createStore as createStore, Reducer } from 'redux'
import { EventImpl } from '../api/EventImpl'

const defaultState: CalendarState = {
  events: [],
  // timeZone: createSignal("tehran")
}

const calendarReducer: Reducer<CalendarState, SetAllChatsAction> = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
            const data: EventImpl[] = []
      for (let i = 0; i < action.events.length; i++) {
        data.push(new EventImpl(action.events[i]))
      }
      return { ...state, events: data }
    default:
      return state
  }
}

const store = createStore(calendarReducer)

export type CalendarStore = typeof store
export default store
