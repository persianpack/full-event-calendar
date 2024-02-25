import type { JSX } from 'solid-js'

export type FComponent<P = {}> = (props: P & { children?: JSX.Element }) => JSX.Element

export interface EventClass {
  start: Date
  end: Date
  name: string
  id: any
  duration: number
  sourceEvent: SourceEvent
  color: string
  groups: number[] | string[]
  getEventLength(): any
  isAllDay(): any
  countDays(): number
  doesEventStartOn(date: Date): boolean
  doesEventEndOn(date: Date): boolean
  isIncludedInaRange(date1: Date, date2: Date): boolean
  calculatePositionTop(): string
  getEventTopPositionIng(): number
  calculateHeightPersentage(calcFromZero: boolean): number
  calculateHeight(calcFromZero: boolean): string
  checkOverLap(event: EventClass): Boolean
  updateEventDetails(event: SourceEvent): void
  checkAllDayOverLap(event: EventClass): Boolean
  convertDateByTimeZone(tz: string): void
  getIncludedDays(): Date[]
}
export interface Group {
  id: string | number
  name: string
  image?: any
}

export interface SourceEvent {
  start: Date
  end: Date
  name: string
  id: any
  color?: string
  groups?: number[] | string[]
}

export interface DraggedData {
  width: string
  height: string
  left: string
  top: string
  duration: number
  item: EventClass | null
  animation: string
  dragedStartDate: Date
  dragedEndDate: Date
  itemRect: DOMRect | null
  mouseX: number
  eventSourceStart: Date
  eventSourceEnd: Date
}
