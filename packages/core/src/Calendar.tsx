import { EventCalendar } from './api/CalendarApi.js'
import { createSignal } from 'solid-js'
import { useCounter } from './contex-injector/contex.js'
import { CounterProvider } from './contex-injector/contex.jsx'
import { hydrate, render } from 'solid-js/web'
import useRedux from './store/useRedux'
import reduxStore from './store/store'
import actions from './store/actions'
import { App } from './App.js'

function CalendarRoot(props: any) {
  return (
    <CounterProvider store={props.store}>
      <App />
    </CounterProvider>
  )
}

export class Calendar extends EventCalendar {
  private targetElement: HTMLElement
  // private calendaerEventList: PickType<EventCalendarOptions, 'events'>
  // private timeZone : PickType<EventCalendarOptions,'timeZone'>;
  // private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;
  constructor(targetElement: HTMLElement, eventCalendarOptions: EventCalendarOptions) {
    super(eventCalendarOptions)
    this.targetElement = targetElement
    // this.dailyGridOptions = eventCalendarOptions.dailyGridOptions
    // this.timeZone = eventCalendarOptions.timeZone
  }

  render() {
    render(() => <CalendarRoot store={this.storeManager} />, this.targetElement)
    // function hydrate(fn: () => JSX.Element, node: MountableElement): () => void;
  }
  refresh() {
    hydrate(() => <CalendarRoot store={this.storeManager} />, this.targetElement)
  }
}

interface InputeEvent {
  start: Date
  end: Date
  id: any
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
