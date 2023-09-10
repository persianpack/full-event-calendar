import type { Event } from '../api/EventApi'
import { EventImpl } from '../api/EventImpl'

declare global {
  interface CalendarState extends EventCalendarOptions {
    // timeZone: PickTypeFromField<EventCalendarOptions, 'timeZone'>
    // initialDate: PickTypeFromField<EventCalendarOptions, 'initialDate'>
    events: Events
  }
  interface SetAllChatsAction {
    type: 'SET_ALL_EVENTS'
    events: SourceEvent[]
  }

  interface UpdateEvent {
    type: 'UPDATE_EVENT'
    id: PickTypeFromField<SourceEvent, 'id'>
    event: SourceEvent
  }

  type StoreActions = SetAllChatsAction | UpdateEvent
}
