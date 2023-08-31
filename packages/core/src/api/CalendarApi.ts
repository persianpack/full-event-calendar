import type { DateInput } from './structs'
import useRedux from '../store/useRedux'
import reduxStore from '../store/store'
import { CalendarApi } from './CalendarImpl'
import chatStore from '../store/store'
import { For, Show, createEffect, createSignal, getOwner, mergeProps } from 'solid-js'

interface EventCalendarOptions {
  events: any[]
  // dailyGridOptions : dailyGridOptions;
  // calnedarMode : CalnedarMode
}
export class CalendarImpl implements CalendarApi {
  storeManager
  storeDispatch
  timeZone
  //   private dailyGridOptions : PickType<EventCalendarOptions,'dailyGridOptions'>;
  constructor(eventCalendarOptions: EventCalendarOptions) {
    const { store, dispatch } = useRedux(chatStore)
    this.storeManager = store
    this.storeDispatch = dispatch
    this.timeZone = createSignal('tehrean')
  }
  prevDay(): void {
    // dispatch to store manager
  }
  nextDay(): void {
    // dispatch to store manager
  }
  getDate(): Date {
    return new Date()
  }

  today(): void {}
}
