// import { createContext, useContext } from 'solid-js'

// const CalendarContext = createContext()

// export function CounterProvider(props: any) {
//   console.log(props.store)
//   return <CalendarContext.Provider value={props.store}>{props.children}</CalendarContext.Provider>
// }

// export function useCounter() {
//   return useContext(CalendarContext)
// }

import { createContext, useContext } from 'solid-js'
import type { Context } from 'solid-js'

const ChatContext = createContext() as Context<CalendarState>

export const CounterProvider: Component<{ store: CalendarState }> = (props) => {
  return <ChatContext.Provider value={props.store}>{props.children}</ChatContext.Provider>
}

export function useCounter() {
  return useContext(ChatContext)
}
