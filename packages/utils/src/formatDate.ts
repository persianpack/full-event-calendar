export function formatDDMMYYYY(date: Date, calendar: string = 'gregory') {
  return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', calendar }).format(date)
}
export function formatDM(date: Date, calendar: string) {
  // return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric',calendar }).format(date)
  return new Intl.DateTimeFormat('en-US', { month: 'short', weekday: 'short', calendar }).format(date)
}

export function formatDD(date: Date, calendar: string) {
  // return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric',calendar }).format(date)
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', calendar }).format(date)
}
