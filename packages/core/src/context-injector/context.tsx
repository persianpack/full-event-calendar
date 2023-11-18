// import { createContext, useContext } from 'solid-js'

// const CalendarContext = createContext()

// export function CounterProvider(props: any) {
//   console.log(props.store)
//   return <CalendarContext.Provider value={props.store}>{props.children}</CalendarContext.Provider>
// }

// export function useCounter() {
//   return useContext(CalendarContext)
// }
import { Calendar } from '../Calendar'
import { createContext, useContext } from 'solid-js'
import type { Context } from 'solid-js'
import { CalendarState } from '../store/store'
import { FComponent } from '@full-event-calendar/shared-ts'

const ChatContext = createContext() as Context<ContextProvider>

interface ContextProvider {
  store: CalendarState
  instance: Calendar
}

export const CounterProvider: FComponent<{ store: CalendarState; instance: Calendar }> = (props) => {
  const data = {
    store: props.store,
    instance: props.instance
  }
  return <ChatContext.Provider value={data}>{props.children}</ChatContext.Provider>
}

export function useCounter() {
  return useContext(ChatContext)
}
