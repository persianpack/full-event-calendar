import { CalendarImpl } from './api/CalendarImpl'

import { CounterProvider } from './contex-injector/contex.jsx'
import { hydrate, render } from 'solid-js/web'
import { App } from './lib/App.jsx'

const CalendarRoot: Component<{ store: CalendarState; inctence: Calendar }> = (props) => {
  return (
    <CounterProvider store={props.store} inctence={props.inctence}>
      <App />
    </CounterProvider>
  )
}

export class Calendar extends CalendarImpl {
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
    render(() => <CalendarRoot store={this.storeManager} inctence={this} />, this.targetElement)
    // function hydrate(fn: () => JSX.Element, node: MountableElement): () => void;
  }
  refresh() {
    hydrate(() => <CalendarRoot store={this.storeManager} inctence={this} />, this.targetElement)
  }
}
// maxRows: 10,
// hideTimeBar: false,
// scrollIntoCurrentTime: true,
// hasModal: false,
// oneHourInPixel: 80,
// minHeightInMinute: 16,
// showIsOngoingText: true

// height: {
//   type: Number,
//   default: 600
// },
// fullCalendarHeight: {
//   type: Number,
//   default: 800
// },
// locale: {
//   type: String,
//   default: 'en-US'
// },
// calendar: {
//   type: String,
//   default: 'gregory'
// },
// timeZone: {
//   type: String,
//   default: Intl.DateTimeFormat().resolvedOptions().timeZone
// },
// hideTimeLine: {
//   type: Boolean
// },
