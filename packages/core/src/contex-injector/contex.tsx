import { createContext, useContext } from 'solid-js'

const CalendarContext = createContext()

export function CounterProvider(props: any) {
  console.log(props.store)
  return <CalendarContext.Provider value={props.store}>{props.children}</CalendarContext.Provider>
}

export function useCounter() {
  return useContext(CalendarContext)
}
