import type { Event } from '../api/EventApi'

declare global {
  interface CalendarState {
    events: Event[]
  }
  interface SetAllChatsAction {
    type: 'SET_ALL_EVENTS'
    events: InputEvent[]
  }

  interface SetAllChatsAction {
    type: 'UPDATE_EVENT'
    events: Event
  }

  type Action = SetAllChatsAction
}
