interface SetAllChatsAction {
  type: 'SET_ALL_EVENTS'
  events: InputEvent[]
}

interface CalendarState {
  events: InputEvent[]
}

type Action = SetAllChatsAction
