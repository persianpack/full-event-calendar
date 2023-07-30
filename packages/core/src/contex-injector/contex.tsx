import { createContext, useContext } from 'solid-js'

const CalendarContext = createContext()

export function CounterProvider(props: any) {
  return <CalendarContext.Provider value={props.state}>{props.children}</CalendarContext.Provider>
}

export function useCounter() {
  return useContext(CalendarContext)
}
