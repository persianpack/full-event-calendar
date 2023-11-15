export function floorDate(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0)
  return newDate
}

export function ceilDate(date: Date) {
  const newDate = new Date(date)
  newDate.setHours(23, 59, 59)
  return newDate
}
