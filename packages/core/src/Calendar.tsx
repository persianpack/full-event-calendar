import { CalendarImpl, CalendarSourceOptions } from './api/CalendarImpl'
import { CounterProvider } from './context-injector/context.jsx'
import { hydrate, render } from 'solid-js/web'
import { App } from './lib/App.jsx'
import { CalendarState } from './store/store.js'
import { FComponent } from '@full-event-calendar/shared-ts'
import EventCollection, { EventPayLoads, EventTypes } from './api/Collection.js'

import './themes/clickDown.scss'
import { SlotProvider } from '@full-event-calendar/utils'

const CalendarRoot: FComponent<{ store: CalendarState; instance: Calendar }> = (props) => {

  return (
    <CounterProvider store={props.store} instance={props.instance}>
      <SlotProvider slotRenderer={props.instance.renderStore} 
      avalibalSots={props.store.avalibalSots}>
         <App />
      </SlotProvider>
    </CounterProvider>
  )
}

export class Calendar extends CalendarImpl {
  private targetElement: HTMLElement
  private EventListenrsStorage: EventCollection

  constructor(targetElement: HTMLElement, eventCalendarOptions: CalendarSourceOptions) {
    super(eventCalendarOptions)
    this.targetElement = targetElement
    this.EventListenrsStorage = new EventCollection()
  }

  emitEvent(eventType: EventTypes, payload: EventPayLoads[EventTypes]) {
    this.EventListenrsStorage[eventType].forEach((f) => f(payload))
  }

  on(eventType: EventTypes, handler: Function) {
    this.EventListenrsStorage[eventType].push(handler)
  }

  render() {
    render(() => <CalendarRoot store={this.storeManager} instance={this} />, this.targetElement)
    // function hydrate(fn: () => JSX.Element, node: MountableElement): () => void;
  }

  refresh() {
    hydrate(() => <CalendarRoot store={this.storeManager} instance={this} />, this.targetElement)
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
