import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'

export type EventTypes = 'eventClicked' | 'eventUpdate' | 'eventAdd' | 'evntListUpdate'

export interface EventPayLoads {
  eventClicked: { event: EventClass }
  eventUpdate: { prev: SourceEvent; next: SourceEvent,id:any }
  eventAdd:{ event: EventClass }
  evntListUpdate:{eventList:EventClass[]}
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
