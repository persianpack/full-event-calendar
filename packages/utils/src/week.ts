export function getWeekDates(date: Date) {
  let weekend = []
  let iniDay = new Date(date)
  iniDay.setDate(iniDay.getDate() - iniDay.getDay())
  console.log(iniDay)
  for (let i = 0; i < 7; i++) {
    weekend.push(new Date(iniDay))
    iniDay.setDate(iniDay.getDate() + 1)
  }
  return weekend
}
