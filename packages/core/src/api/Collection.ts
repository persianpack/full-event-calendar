import { EventClass, SourceEvent } from '@full-event-calendar/shared-ts'

export type EventTypes = 'eventClicked' | 'eventUpdate'

export interface EventPayLoads {
  eventClicked: { event: EventClass }
  eventUpdate: { prev: SourceEvent; next: SourceEvent }
}
type listnerFunction = (eventType: EventTypes, eventPayload: EventPayLoads[EventTypes]) => void

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
