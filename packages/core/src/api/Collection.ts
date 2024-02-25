import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'
import { GridModes } from './CalendarImpl'

export type EventTypes = 'eventClicked' | 'eventUpdate' | 'eventAdd' | 'dateUpdate' | 'gridUpdate'

export interface EventPayLoads {
  eventClicked: { event: EventClass }
  eventUpdate: { prev: SourceEvent; next: SourceEvent; id: any }
  eventAdd: { event: SourceEvent }
  dateUpdate: { date: Date }
  gridUpdate: { grid: GridModes }
}

export default class EventCollection {
  [key: string]: any[]

  constructor() {
    return new Proxy(this, {
      get(target, key: string, receiver: any) {
        if (!(key in target)) {
          target[key] = []
          return target[key]
        }
        return Reflect.get(target, key, receiver)
      }
    })
  }
}
