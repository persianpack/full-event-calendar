export function formatDDMMYYYY(date: Date, calendar: string = 'gregory') {
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', calendar }).format(date)
  }
  export function formatDM(date: Date, calendar: string) {
    return new Intl.DateTimeFormat('en-US', { month: 'short', weekday: 'short', calendar }).format(date)
  }
  
  export function formatDD(date: Date, calendar: string) {
    return new Intl.DateTimeFormat('en-US', { day: '2-digit', calendar }).format(date)
  }
  export function formatToShortTime(date: Date, locale: string) {
    const shortTime = new Intl.DateTimeFormat(locale, {
      timeStyle: 'short',
      hourCycle: 'h24'
    })
  
    return shortTime.format(date)
  }
  export function formatRange(date1: Date, date2: Date, locale: string) {
    const fmt1 = new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric'
    })
    return `${fmt1.format(date1)} - ${fmt1.format(date2)}`
  }
  