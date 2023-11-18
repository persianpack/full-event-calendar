import { expect, test } from 'vitest'
import { sortEventByStart, areDatesInTheSameDate, EventImpl, getEventsInDate } from '../src'

const date = {
  start: new Date(' Aug 01 2001 01:00:20'),
  end: new Date(' Aug 02 2001 03:00:00'),
  id: 1,
  name: 'this is amir kian adl'
}

const date2 = {
  start: new Date(' Aug 01 2001 01:00:00'),
  end: new Date(' Aug 02 2001 01:00:00'),
  id: 2,
  name: 'this is amir kian adl'
}

const date3 = {
  start: new Date(' Aug 01 2001 00:00:00'),
  end: new Date(' Aug 01 2001 23:59:59'),
  id: 3,
  name: 'this is amir kian adl'
}

const date4 = {
  start: new Date(' Aug 01 2001 04:00:00'),
  end: new Date(' Aug 02 2001 01:59:59'),
  id: 4,
  name: 'this is amir kian adl'
}

const date5 = {
  start: new Date(' Aug 01 2001 06:00:00'),
  end: new Date(' Aug 01 2001 10:59:59'),
  id: 5,
  name: 'this is amir kian adl'
}
const date6 = {
  start: new Date(' Aug 01 2001 10:00:00'),
  end: new Date(' Aug 04 2001 00:00:00'),
  id: 6,
  name: 'this is amir kian adl'
}
const date7 = {
  start: new Date(' Aug 01 2001 23:59:35'),
  end: new Date(' Aug 04 2001 00:00:00'),
  id: 8,
  name: 'this is amir kian adl'
}
const date8 = {
  start: new Date(' Aug 02 2001 19:00:00'),
  end: new Date(' Aug 04 2001 00:00:00'),
  id: 7,
  name: 'this is amir kian adl'
}

const eventC1 = new EventImpl(date)
const eventC2 = new EventImpl(date2)
const eventC3 = new EventImpl(date3)
const eventC4 = new EventImpl(date4)
const eventC5 = new EventImpl(date5)
const eventC6 = new EventImpl(date6)
const eventC7 = new EventImpl(date7)
const eventC8 = new EventImpl(date8)
const eventList = [eventC1, eventC2, eventC3, eventC4, eventC5, eventC6, eventC7, eventC8]

test('sorEvents by start', () => {
  const listIds = sortEventByStart(eventList).map((item) => item.id)
  expect(listIds).toStrictEqual([3, 2, 1, 4, 5, 6, 8, 7])
})

test('areDatesInTheSameDate', () => {
  const date1 = new Date(' Aug 01 2001 01:00:20')
  const date2 = new Date(' Aug 01 2001 01:00:20')

  const date3 = new Date(' Aug 01 2001 01:00:20')
  const date4 = new Date(' Aug 02 2001 01:00:20')

  expect(areDatesInTheSameDate(date1, date2)).toBeTruthy()
  expect(areDatesInTheSameDate(date3, date4)).toBeFalsy()
})

test('getEventsInDate', () => {
  const listIds = getEventsInDate(eventList, new Date(' Aug 02 2001 19:00:00')).map((item) => item.id)
  expect(listIds).toStrictEqual([2, 1, 4, 6, 8, 7])
})
