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

const ChatContext = createContext() as Context<ContextPorvoder>

interface ContextPorvoder {
  store: CalendarState
  inctence: Calendar
}

export const CounterProvider: Component<{ store: CalendarState; inctence: Calendar }> = (props) => {
  const data = {
    store: props.store,
    inctence: props.inctence
  }
  return <ChatContext.Provider value={data}>{props.children}</ChatContext.Provider>
}

export function useCounter() {
  return useContext(ChatContext)
}
