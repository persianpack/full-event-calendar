import type { Dispatch } from 'redux'
import { CalendarState, StoreActions } from '../store/store'
import { SourceEvent } from '@full-event-calendar/shared-ts'
export interface CalendarApi {
  // Current Date
  // -----------------------------------------------------------------------------------------------------------------
  storeManager: CalendarState
  storeDispatch: Dispatch<StoreActions>
  setEventList(events: SourceEvent[]): any
  updateEvent(id: SourceEvent['id'], event: SourceEvent): void
  prevDay(): any
  nextDay(): any
  getDate(): any
  today(): any
}
