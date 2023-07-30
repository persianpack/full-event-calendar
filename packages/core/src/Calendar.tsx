import { CalendarApi } from './api/CalendarApi.js'
import { createSignal } from 'solid-js'
import { CounterProvider } from './contex-injector/contex.jsx'

import { render } from 'solid-js/web'

function App() {
  const [count, setCount] = createSignal(0)

  return (
    <>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count()}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">Click on the Vite and Solid logos to learn more</p>
      <div></div>
    </>
  )
}

function CalendarRoot() {
  return (
    <CounterProvider>
      <App />
    </CounterProvider>
  )
}

export class EventCalendar implements CalendarApi {
  private targetElement: HTMLElement
  private calendaerEventList: PickType<EventCalendarOptions, 'events'>
  //   private timeZone : PickType<EventCalendarOptions,'timeZone'>;
  //   private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;

  constructor(targetElement: HTMLElement, eventCalendarOptions: EventCalendarOptions) {
    // super()
    this.targetElement = targetElement
    this.calendaerEventList = eventCalendarOptions.events
    // this.dailyGridOptions = eventCalendarOptions.dailyGridOptions
    // this.timeZone = eventCalendarOptions.timeZone
  }
  prevDay(): void {
    // dispatch to store manager
  }
  nextDay(): void {
    // dispatch to store manager
  }
  getDate(): Date {
    return new Date()
  }
  today(): void {}
  render() {
    render(() => <CalendarRoot />, this.targetElement)
    // function hydrate(fn: () => JSX.Element, node: MountableElement): () => void;
  }
}

interface InputeEvent {
  start: Date
  end: Date
  name: string
}
interface dailyGridOptions {
  selectedDate: Date
}
type CalnedarMode = 'daily'
interface EventCalendarOptions {
  events: InputeEvent[]
  // timeZone ?: string;
  // dailyGridOptions : dailyGridOptions;
  // calnedarMode : CalnedarMode
}

type PickType<T, K extends keyof T> = T[K]
