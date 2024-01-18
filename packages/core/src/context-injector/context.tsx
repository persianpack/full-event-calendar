import { Calendar } from '../Calendar'
import { createContext, useContext } from 'solid-js'
import type { Context } from 'solid-js'
import { CalendarState } from '../store/store'
import { FComponent } from '@full-event-calendar/shared-ts'

const CalendarContext = createContext() as Context<ContextProvider>
interface ContextProvider {
  store: CalendarState
  instance: Calendar
}

export const CounterProvider: FComponent<ContextProvider> = (props) => {
  const data = {
    store: props.store,
    instance: props.instance
  }
  return <CalendarContext.Provider value={data}>{props.children}</CalendarContext.Provider>
}

export function useGlobalState() {
  return useContext(CalendarContext)
}
