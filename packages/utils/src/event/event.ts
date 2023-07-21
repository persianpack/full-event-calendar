class CalendarEvent {
  private startDate: Date
  private endDate: Date
  private eventName: string

  constructor(start: Date, end: Date, name: string) {
    this.startDate = start
    this.endDate = end
    this.eventName = name
  }

  getEventLength() {}
  isAllDay() {}
  doesEndAfterDate(selectedDate: Date) {}
  doesStartBeforeDate(selectedDate: Date) {
    console.log('')
  }
}
