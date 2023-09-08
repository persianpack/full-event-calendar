import type { Event } from '../api/EventApi'

declare global {
  interface CalendarState extends EventCalendarOptions {
    // timeZone: PickTypeFromField<EventCalendarOptions, 'timeZone'>
    // initialDate: PickTypeFromField<EventCalendarOptions, 'initialDate'>
    events : Events
  }
  interface SetAllChatsAction {
    type: 'SET_ALL_EVENTS'
    events: SourceEvent[]
  }

  interface UpdateEvent {
    type: 'UPDATE_EVENT'
    events: Event
  }

  type StoreActions = SetAllChatsAction | UpdateEvent
}
