import type { Event } from '../api/EventApi'

declare global {
  interface CalendarState {
    events: Event[],
    timeZone: any
  }
  interface SetAllChatsAction {
    type: 'SET_ALL_EVENTS'
    events: SourceEvent[]
  }

  interface SetAllChatsAction {
    type: 'UPDATE_EVENT'
    events: Event
  }

  type Action = SetAllChatsAction
}
