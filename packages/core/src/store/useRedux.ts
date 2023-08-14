// import { onCleanup } from 'solid-js'
// import { createStore, reconcile } from 'solid-js/store'

// export default function useRedux(store: any, actions: any) {
//   const [state, setState] = createStore(store.getState())

//   const unsubscribe = store.subscribe(() => setState(reconcile(store.getState())))

//   onCleanup(() => unsubscribe())

//   return [state, mapActions(store, actions)]
// }

// function mapActions(store: any, actions: any) {
//   const mapped: any = {}
//   for (const key in actions) {
//     mapped[key] = (...args: any) => store.dispatch(actions[key](...args))
//   }
//   return mapped
// }

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

import { onCleanup } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { CalendarStore } from './store'

export default function useRedux(store: CalendarStore) {
  const [state, setState] = createStore(store.getState())

  const unsubscribe = store.subscribe(() => setState(reconcile(store.getState())))

  onCleanup(() => unsubscribe())

  return { store: state, dispatch: mapDispatch(store) }
}
export type UseRedux = typeof useRedux
function mapDispatch(store: CalendarStore) {
  return store.dispatch
}
