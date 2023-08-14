import useRedux from '../store/useRedux'
import chatStore from '../store/store'
export abstract class BaseCalendar {
  storeManager
  storeDispatch

  constructor(calendarOptions: EventCalendarOptions) {
    const { store, dispatch } = useRedux(chatStore)
    this.storeManager = store
    this.storeDispatch = dispatch
    // this.storeDispatch({type:'SET_ALL_ROOMS',rooms:[]})
  }
}
