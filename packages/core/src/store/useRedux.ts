import { onCleanup } from 'solid-js'
import { createStore, reconcile } from 'solid-js/store'
import { CalendarState ,createReducer} from './store'
import { legacy_createStore as createReduxStore } from 'redux'

export default function useRedux(defaultState:CalendarState) {

  const store =createReduxStore(createReducer(defaultState))
  const [state, setState] = createStore(store.getState())

  const unsubscribe = store.subscribe(() => setState(reconcile(store.getState())))

  onCleanup(() => unsubscribe())

  return { store: state, dispatch: mapDispatch(store) }
}
export type UseRedux = typeof useRedux

function mapDispatch(store: any) {
  return store.dispatch
}
