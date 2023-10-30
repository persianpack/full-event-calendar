export function convertTZ(date: Date, tzString: string) {
  // throw an error in Etc/Unknown
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }))
}
