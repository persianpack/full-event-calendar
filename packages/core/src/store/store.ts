import { legacy_createStore as createStore, Reducer } from 'redux'
// import { Event } from '../api/EventImpl'
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

// export type AppStore = typeof store
// type AddSingleChatAction = {
//   type: 'ADD_SINGLE_ROOMS';
//   chat: ChatMessage;
// };

const defaultState: CalendarState = {
  events: []
}

const calendarReducer: Reducer<CalendarState, SetAllChatsAction> = (state = defaultState, action: Action) => {
  switch (action.type) {
    case 'SET_ALL_EVENTS':
      for (let i = 0; i < action.events.length; i++) {
        //   data.push( (action.rooms[i]))
      }
      return state
    default:
      return state
  }
}

const store = createStore(calendarReducer)

export type CalendarStore = typeof store

export default store
