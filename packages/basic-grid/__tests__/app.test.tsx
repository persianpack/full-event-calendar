import { createRoot, createSignal } from 'solid-js'
import { isServer } from 'solid-js/web'
import { describe, expect, it, test } from 'vitest'
import { Hello, createHello, createLinesOfColum } from '../src'
import { render } from '@solidjs/testing-library'
import { events } from '@full-event-calendar/test-events'

import { ArraySplitIntoChunks, sortEventByStart, EventImpl, getCalendarMonthDays } from '@full-event-calendar/utils'

test('col line test', () => {
  const arrList = events.map((ev) => new EventImpl(ev))
  const filteredEvents = sortEventByStart(arrList)
  const cols = createLinesOfColum(filteredEvents)
  expect(cols).toMatchSnapshot()
})
// describe('environment', () => {
//   it('runs on server', () => {
//     expect(typeof window).toBe('object')
//     expect(isServer).toBe(false)
//   })
// })

// describe('createHello', () => {
//   it('Returns a Hello World signal', () =>
//     createRoot((dispose) => {
//       const [hello] = createHello()
//       expect(hello()).toBe('Hello World!')
//       dispose()
//     }))

//   it('Changes the hello target', () =>
//     createRoot((dispose) => {
//       const [hello, setHello] = createHello()
//       setHello('Solid')
//       expect(hello()).toBe('Hello Solid!')
//       dispose()
//     }))
// })

// describe('Hello', () => {
//   it('renders a hello component', () => {
//     createRoot(() => {
//       const results = render(() => <Hello />)
//       console.log(results)
//       const container = (<Hello />) as HTMLDivElement
//       expect(container.outerHTML).toBe('<div>Hello World!</div>')
//     })
//   })

// it('changes the hello target', () =>
//   createRoot((dispose) => {
//     const [to, setTo] = createSignal('Solid')
//     const container = (<Hello to={to()} />) as HTMLDivElement
//     expect(container.outerHTML).toBe('<div>Hello Solid!</div>')
//     setTo('Tests')

//     // rendering is async
//     queueMicrotask(() => {
//       expect(container.outerHTML).toBe('<div>Hello Tests!</div>')
//       dispose()
//     })
//   }))
// })
