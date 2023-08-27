import { EventCalendar } from './api/CalendarApi.js'

import { CounterProvider } from './contex-injector/contex.jsx'
import { hydrate, render } from 'solid-js/web'
import { CalendarState } from './store/store'
import { App } from './lib/App.jsx'

const CalendarRoot: Component<{ store: CalendarState }> = (props) => {
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
    this.storeDispatch({ type: 'SET_ALL_EVENTS', events: eventCalendarOptions.events })
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
