## Installation

::: code-group

```bash [npm]
npm i @full-event-calendar/core @full-event-calendar/daily-grid
```

```bash [pnpm]
pnpm i @full-event-calendar/core @full-event-calendar/daily-grid
```

:::
NOTE : <ins> atleast 1 plugin must be provided </ins>
available grid plugins:

- `@full-event-calendar/daily-grid` - daily view
- `@full-event-calendar/weekly-grid` - weekly view
- `@full-event-calendar/month-grid` - month view
- `@full-event-calendar/list` - list view

## Basic Usage

A simple vanill example would be like this :

Check out [****Options****](#props) for properites

[****Vue usage****](#https://github.com/persianpack/full-event-calendar/tree/main/packages/vue3#basic-usage)

[****React usage****](#https://github.com/persianpack/full-event-calendar/tree/main/packages/react#basic-usage)

::: code-group

```js [Vanilla]
//main.js
import { Calendar } from '@full-event-calendar/core'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'

const el = document.getElementById('app')

const events = [
  {
    name: 'some name',
    start: new Date(' Aug 10 2023 08:00:0'),
    end: new Date(' Aug 10 2023 10:00:00'),
    id: 16123,
    color: '#BF51F9'
    // groups: [2]
  },
  {
    name: 'some name',
    start: new Date(' Aug 10 2023 10:00:0'),
    color: '#31B5F7',
    end: new Date(' Aug 10 2023 11:00:00'),
    id: 18123
    // groups: [1]
  }
]

const options = {
  events: events,
  gridHeight: 60 * 24,
  initialDate: new Date('Thu Aug 10 2023 15:00:0'),
  plugins: [DailyGridPlugin],
  grid: 'daily'
  // calendar: 'gregory',
  // locale: 'fa-IR',
  // autoUpdateEventOnChange:false,
  // timeZone: 'Africa/Abidjan',
  // calendar: 'persian',
  // groups:[]
  // editable: true,
  // theme: 'light',
  // listMode: 'week',
  // stopAddEvent: 'week',
}

const fullEventCalendar = new Calendar(el, options)

fullEventCalendar.render()

fullEventCalendar.on('eventUpdate', ({ prev, next, id }) => {
  console.log('updated event : ', prev)
  console.log('to event : ', next)
  console.log('with id : ', id)
})
```

```jsx [React]

import { useEffect, useState } from 'react'
import { FullEventCalendar } from '@full-event-calendar/react'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import '@full-event-calendar/core/dist/main.css' // this must be imported
// import { MonthGridPlugin } from '@full-event-calendar/month-grid'
// import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
// import { ListPlugin } from '@full-event-calendar/list'

const eventsList = [
  {
    name: 'some name',
    start: new Date(' Aug 10 2023 08:00:0'),
    end: new Date(' Aug 10 2023 10:00:00'),
    id: 16123,
    color: '#BF51F9',
    // groups: [2]
  },
  {
    name: 'some name',
    start: new Date(' Aug 10 2023 10:00:0'),
    color: '#31B5F7',
    end: new Date(' Aug 10 2023 11:00:00'),
    id: 18123,
    // groups: [1]
  },
]


function App() {
  const [initialDate, setInitialDate] = useState(new Date('Thu Aug 10 2023 15:00:0'))
  const [events, setEvents] = useState(eventsList)

  function eventUpdate({prev,next,id}) {
    console.log('updated event : ' ,prev)
    console.log('to event : ' ,next)
    console.log('with id : ' ,id)
    // eventsList.value.push(data.next.sourceEvent)
  }

  return (
      <FullEventCalendar
         plugins={[DailyGridPlugin]}
         events={eventsR}
         initialDate={count}
         eventUpdate={onEveUpdate}

         {/* eventClick={<EventClickSlot someProp={asaveEv}/>}
         addModal={<EventaddModalSlot someProp={asaveEv}/>}
         dailyHeader={<AddModalSlot />}
         headerDateSlot={<AddModalSlot />}
         gridDropDown={<TestSlot/>}
         goForwardDate={<TestSlot/>}
         goBackDate={<TestSlot/>}
         todayBtn={<TestSlot/>} */}

        ></FullEventCalendar>
  )

}

```

```html [Vue]
<script setup>
  import { ref } from 'vue'
  import { FullEventCalendar } from '@full-event-calendar/vue'
  import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
  import '@full-event-calendar/core/dist/main.css' // this must be imported
  // import { MonthGridPlugin } from '@full-event-calendar/month-grid'
  // import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
  // import { ListPlugin } from '@full-event-calendar/list'

  const eventsList = ref([
    {
      name: 'some name',
      start: new Date(' Aug 10 2023 08:00:0'),
      end: new Date(' Aug 10 2023 10:00:00'),
      id: 16123,
      color: '#BF51F9'
      // groups: [2]
    },
    {
      name: 'some name',
      start: new Date(' Aug 10 2023 10:00:0'),
      color: '#31B5F7',
      end: new Date(' Aug 10 2023 11:00:00'),
      id: 18123
      // groups: [1]
    }
  ])

  function eventUpdate({ prev, next, id }) {
    console.log('updated event : ', prev)
    console.log('to event : ', next)
    console.log('with id : ', id)
    // eventsList.value.push(data.next.sourceEvent)
  }

  const initialDate = ref(new Date('Thu Aug 10 2023 15:00:0'))
</script>

<template>
  <FullEventCalendar
    v-model:events="eventsList"
    v-model:initial-date="initialDate"
    :plugins="[ DailyGridPlugin ]"
    @eventUpdate="eventUpdate"
  >
  </FullEventCalendar>
</template>
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

:::
