import * as langs from './locales/index'

export function calendarLocale(locale: string, key: string) {
  //@ts-ignore
  const resolvedlocale = new Intl.Locale(locale).language
  //@ts-ignore
  return langs[resolvedlocale][key]
}
