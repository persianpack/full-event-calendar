import type { Event } from '../api/CalendarImpl'

declare global {
  interface SetAllChatsAction {
    type: 'SET_ALL_EVENTS'
    events: InputEvent[]
  }

  type Action = SetAllChatsAction
}
