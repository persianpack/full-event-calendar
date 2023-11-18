import { describe, expect, test } from 'vitest'
import { EventImpl } from '../src'

test('eventimple creation ', () => {
  const s1 = new Date(' Aug 01 2001 01:00:00')
  const e1 = new Date(' Aug 01 2001 03:00:00')
  const date = {
    start: s1,
    end: e1,
    id: 8,
    name: 'this is amir kian adl'
  }
  const eventC = new EventImpl(date)
  expect(eventC.id).toBe(8)
  expect(eventC.start.getTime()).toBe(s1.getTime())
  expect(eventC.end.getTime()).toBe(e1.getTime())
  expect(eventC.name).toBe('this is amir kian adl')
  expect(eventC.duration).toBe(120)
  expect(eventC.sourceEvent).toStrictEqual(date)
})

describe('test event class methodes', () => {
  const date = {
    start: new Date(' Aug 01 2001 01:00:00'),
    end: new Date(' Aug 02 2001 03:00:00'),
    id: 8,
    name: 'this is amir kian adl'
  }

  const date2 = {
    start: new Date(' Aug 01 2001 01:00:00'),
    end: new Date(' Aug 02 2001 01:00:00'),
    id: 8,
    name: 'this is amir kian adl'
  }

  const date3 = {
    start: new Date(' Aug 01 2001 00:00:00'),
    end: new Date(' Aug 01 2001 23:59:59'),
    id: 8,
    name: 'this is amir kian adl'
  }

  const date4 = {
    start: new Date(' Aug 01 2001 04:00:00'),
    end: new Date(' Aug 02 2001 01:59:59'),
    id: 8,
    name: 'this is amir kian adl'
  }

  const date5 = {
    start: new Date(' Aug 01 2001 00:00:00'),
    end: new Date(' Aug 01 2001 10:59:59'),
    id: 8,
    name: 'this is amir kian adl'
  }
  const date6 = {
    start: new Date(' Aug 01 2001 00:00:00'),
    end: new Date(' Aug 04 2001 00:00:00'),
    id: 8,
    name: 'this is amir kian adl'
  }
  const date7 = {
    start: new Date(' Aug 01 2001 23:59:35'),
    end: new Date(' Aug 04 2001 00:00:00'),
    id: 8,
    name: 'this is amir kian adl'
  }
  const date8 = {
    start: new Date(' Aug 02 2001 00:00:00'),
    end: new Date(' Aug 04 2001 00:00:00'),
    id: 8,
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

  test('test isAllDay', () => {
    expect(eventC1.isAllDay()).toBeTruthy()
    expect(eventC2.isAllDay()).toBeTruthy()
    expect(eventC3.isAllDay()).toBeTruthy()
    expect(eventC4.isAllDay()).toBeFalsy()
    expect(eventC5.isAllDay()).toBeFalsy()
  })

  test('countDays', () => {
    expect(eventC2.countDays()).toBe(1)
    expect(eventC3.countDays()).toBe(1)
    expect(eventC6.countDays()).toBe(3)
  })

  test('doesEventStartOn', () => {
    expect(eventC2.doesEventStartOn(new Date(' Aug 01 2001 00:00:00'))).toBeTruthy()
    expect(eventC3.doesEventStartOn(new Date(' Aug 04 2001 00:00:00'))).toBeFalsy()
  })
  test('doesEventStartOn', () => {
    expect(eventC2.doesEventEndOn(new Date(' Aug 02 2001 00:00:00'))).toBeTruthy()
    expect(eventC3.doesEventEndOn(new Date(' Aug 04 2001 00:00:00'))).toBeFalsy()
  })

  test('calculateHeight', () => {
    expect(eventC1.calculateHeight()).toContain('height:2600%')
    expect(eventC2.calculateHeight()).toContain('height:2400%')
    expect(eventC6.calculateHeight(true)).toContain('height:0%')
    expect(eventC2.calculateHeight(true)).toContain('height:100%')
  })

  test('calculateHeight', () => {
    expect(eventC1.calculatePositionTop()).toContain('top:100%')
    expect(eventC4.calculatePositionTop()).toContain('top:400%')
    expect(eventC6.calculatePositionTop()).toContain('top:0%')
    expect(eventC7.calculatePositionTop()).toContain('top:2358%')
  })

  test('isIncludedInaRange', () => {
    // start: new Date(' Aug 02 2001 00:00:00'),
    // end: new Date(' Aug 04 2001 00:00:00'),
    const range1 = new Date(' Aug 08 2001 00:00:00')
    const range2 = new Date(' Aug 10 2001 00:00:00')

    const range3 = new Date(' Aug 01 2001 00:00:00')
    const range4 = new Date(' Aug 08 2001 00:00:00')

    const range5 = new Date(' Aug 03 2001 00:00:00')
    const range6 = new Date(' Aug 08 2001 00:00:00')

    const range7 = new Date(' Aug 01 2001 00:00:00')
    const range8 = new Date(' Aug 03 2001 00:00:00')

    expect(eventC8.isIncludedInaRange(range1, range2)).toBeFalsy()
    expect(eventC8.isIncludedInaRange(range3, range4)).toBeTruthy()

    expect(eventC8.isIncludedInaRange(range5, range6)).toBeTruthy()
    expect(eventC8.isIncludedInaRange(range7, range8)).toBeTruthy()
  })

  test('checkOverLap', () => {
    const date70 = {
      start: new Date(' Aug 02 2001 02:00:00'),
      end: new Date(' Aug 02 2001 08:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }
    const date90 = {
      start: new Date(' Aug 02 2001 06:00:00'),
      end: new Date(' Aug 02 2001 09:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }
    const date80 = {
      start: new Date(' Aug 02 2001 05:00:00'),
      end: new Date(' Aug 02 2001 06:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }
    const date60 = {
      start: new Date(' Aug 02 2001 01:00:00'),
      end: new Date(' Aug 02 2001 05:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }

    const eventC60 = new EventImpl(date60)
    const eventC70 = new EventImpl(date70)
    const eventC80 = new EventImpl(date80)
    const eventC90 = new EventImpl(date90)

    expect(eventC80.checkOverLap(eventC70)).toBeTruthy()
    expect(eventC90.checkOverLap(eventC80)).toBeFalsy()
    expect(eventC80.checkOverLap(eventC70)).toBeTruthy()
    expect(eventC60.checkOverLap(eventC80)).toBeFalsy()
  })

  test('checkAllDayOverLap', () => {
    const date70 = {
      start: new Date(' Aug 02 2001 02:00:00'),
      end: new Date(' Aug 02 2001 03:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }
    const date90 = {
      start: new Date(' Aug 02 2001 06:00:00'),
      end: new Date(' Aug 02 2001 09:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }
    // const date80 = {
    //     start: new Date(' Aug 02 2001 05:00:00'),
    //     end: new Date(' Aug 02 2001 06:00:00'),
    //     id: 8,
    //     name : 'this is amir kian adl'
    // }
    const date60 = {
      start: new Date(' Aug 06 2001 01:00:00'),
      end: new Date(' Aug 06 2001 05:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }

    const eventC60 = new EventImpl(date60)
    const eventC70 = new EventImpl(date70)
    // const eventC80 = new EventImpl(date80)
    const eventC90 = new EventImpl(date90)

    expect(eventC70.checkAllDayOverLap(eventC90)).toBeTruthy()
    expect(eventC60.checkAllDayOverLap(eventC70)).toBeFalsy()
  })
  test('convertDateByTimeZone', () => {
    const date60 = {
      start: new Date(' Aug 06 2001 01:00:00'),
      end: new Date(' Aug 06 2001 05:00:00'),
      id: 8,
      name: 'this is amir kian adl'
    }

    const eventC60 = new EventImpl(date60)
    eventC60.convertDateByTimeZone('Africa/Abidjan')
    expect(eventC60.start.getTime()).toBe(997027200000)
    expect(eventC60.end.getTime()).toBe(997041600000)
  })
})
