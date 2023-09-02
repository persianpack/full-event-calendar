import type { JSX, Component } from 'solid-js'

declare global {
  type Component<P = {}> = (props: P & { children?: JSX.Element }) => JSX.Element

  type PickTypeFromField<T, K extends keyof T> = T[K]

  interface SourceEvent {
    start: Date
    end: Date
    id: any
  }

  interface EventCalendarOptions {
    events: SourceEvent[]
    initialDate?: Date
    timeZone?: string
    // timeZone ?: string;
    // dailyGridOptions : dailyGridOptions;
    // calnedarMode : CalnedarMode
  }
}
