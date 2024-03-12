## Installation

::: code-group

```bash [npm]
npm i @full-event-calendar/react @full-event-calendar/daily-grid
```

```bash [pnpm]
pnpm i @full-event-calendar/react @full-event-calendar/daily-grid
```

:::
::: warning
NOTE : <ins> atleast 1 plugin must be provided </ins> available grid plugins:
:::

- `@full-event-calendar/daily-grid` - daily view
- `@full-event-calendar/weekly-grid` - weekly view
- `@full-event-calendar/month-grid` - month view
- `@full-event-calendar/list` - list view

## Basic Usage

react js :

```jsx

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

## Api

<!-- # Api

## Calendar Class

The `Calendar` class represents a calendar component that can be rendered in a specified HTML element.
  ### Parameters
  #### targetElement
  - `targetElement`: HTMLElement - The HTML element where the calendar will be rendered.

#### options
  - `options`: CalendarSourceOptions - Options for configuring the calendar. -->

## options

### `events`

- Type : Array
- Default : []
  An array of source events to populate the calendar that fallows the below structure

```ts
interface SourceEvent {
  start: Date
  end: Date
  name: string
  id: any
  color?: string
  groups?: number[] | string[]
}
```

the default color is #31b5f7 for light and #3499F5 for dark.
the group resources id's which the event is part of. for this to work the - [**_Groups_**](#groups) options has to be provided.

### `plugins`

- Type : Array
- Required
  An array of grid plugins for the event calendar different grid views<ins> atleast 1 plugin must be provided </ins> available grid plugins:
- `@full-event-calendar/daily-grid` - daily view
- `@full-event-calendar/weekly-grid` - weekly view
- `@full-event-calendar/month-grid` - month view
- `Cale@full-event-calendar/list` - list view

```jsx
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { ListPlugin } from '@full-event-calendar/list'

function App() {
  return <FullEventCalendar plugins={[DailyGridPlugin, WeeklyGridPlugin, MonthGridPlugin, ListPlugin]} />
}
```

   <!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types -->
  <!-- [**_Groups_**](#css-class) -->

### `calendar`

- Type : String
- Default : gregory

The type of calendar to be used . the Calendar formatting is done with javascript [**_Intl_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types) avalible calendars :
`buddhist`,`chinese`,`coptic`,`dangi`,`ethioaa`,`ethiopic`,`gregory`,`hebrew`,`indian`,`islamic`,`islamic-umalqura`,`islamic-umalqura`,`islamic-tbla`,`islamic-civil`,`islamic-rgsa`,`iso8601`,`iso8601`,`japanese`,`persian`,`roc`,`islamicc`

```jsx
<FullEventCalendar calendar={'persian'} />
```

### `locale`

- Type : String
- Default : 'en-US'

  The BCP 47 language tag for the locale actually used. If any Unicode extension values were requested in the input BCP 47 language tag that led to this locale, the key-value pairs that were requested and are supported for this locale are included in locale.
  [**_Intl Locales_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)

```js
  // ...
  locale="fa-IR",
  // ..
```

### `grid`

- Type : String
- Default : 'daily'

which grid plugin to show. options are :
`daily`,`weekly`,`month`,`list`

### `gridHeight`

- Type : Number
- Default : 1920

height of the daily and weekly grid(not the container). for example if we consider every hour 60px then th grid hieght will be 60 \* 24

```js

  gridHeight={60 * 24}

```

### `containerHeight`

- Type : Number
- Default : 600

  height of the entire container.

```js
  // ...
  containerHeight={700}
  // ..
```

### `editable`

- Type : Boolean
- Default : true

  can add or update event with dragging

```js
   // ...
   editable: false,
   // ..
```

### `groups`

- Type : Array
- Default : []

  An array of resource objects. If provided, the daily grid will be divided into grouped resources, and only events containing the group ID property will be displayed on the corresponding grid resource.

```jsx
import { useEffect, useState } from 'react'
import { FullEventCalendar } from '@full-event-calendar/react'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import '@full-event-calendar/core/dist/main.css' // this must be imported
// import { MonthGridPlugin } from '@full-event-calendar/month-grid'
// import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
// import { ListPlugin } from '@full-event-calendar/list'

const events = [
  {
    name: 'some name',
    start: new Date('Aug 10 2023 08:00:0'),
    end: new Date('Aug 10 2023 10:00:00'),
    id: 16123,
    color: '#BF51F9',
    groups: [2]
  },
  {
    name: 'some name',
    start: new Date('Aug 10 2023 10:00:0'),
    color: '#31B5F7',
    end: new Date('Aug 10 2023 11:00:00'),
    id: 18123,
    groups: [1]
  }
]

const groups = [
  { id: 1, name: 'resource 1' },
  { id: 2, name: 'resource 2' }
]

function App() {
  const [initialDate, setInitialDate] = useState(new Date('Thu Aug 10 2023 15:00:0'))
  const [events, setEvents] = useState(eventsList)

  function eventUpdate({ prev, next, id }) {
    console.log('updated event : ', prev)
    console.log('to event : ', next)
    console.log('with id : ', id)
    // eventsList.value.push(data.next.sourceEvent)
  }

  return (
    <FullEventCalendar
      plugins={[DailyGridPlugin]}
      events={eventsR}
      initialDate={count}
      eventUpdate={onEveUpdate}
      groups={groups}
    ></FullEventCalendar>
  )
}
```

```ts
interface Group {
  id: string[] | number[]
  name: string
}
```

### `theme`

- Type : String
- Default : light

sets the theme of calendar. can be ethier `light` or `dark`.

<!-- ```js
  // ...
  theme: 'dark',
  // ..
``` -->

### `listMode`

- Type : String
- Default : day

sets the `list` grids formatting. avalible
`day`, `week`, `month`

<!-- ```js
// ...
listMode: `week`,
// ..
``` -->

### `timeZone`

- Type : String
- Default : Intl.DateTimeFormat().resolvedOptions().timeZone

The time zone to use. The only value implementations must recognize is "UTC"; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the IANA time zone database, such as `Asia/Shanghai`, `Asia/Kolkata`, `America/New_York`.
or just run this code to see the avalible timeZones :

```js
console.log(Intl.supportedValuesOf('timeZone'))
```

```js
    // ...
   timeZone: 'Africa/Abidjan',
   // ..
```

### `autoUpdateEventOnChange`

- Type : boolean
- Default : true
  If set to false, all event dragging, editing, and additions will not be updated on the grid and instead will have to be handled with event listeners or modals.

```jsx
import { useEffect, useState } from 'react'
import { FullEventCalendar } from '@full-event-calendar/react'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import '@full-event-calendar/core/dist/main.css' // this must be imported

const events = [
  {
    name: 'some name',
    start: new Date('Aug 10 2023 08:00:0'),
    end: new Date('Aug 10 2023 10:00:00'),
    id: 16123,
    color: '#BF51F9'
  },
  {
    name: 'some name',
    start: new Date('Aug 10 2023 10:00:0'),
    color: '#31B5F7',
    end: new Date('Aug 10 2023 11:00:00'),
    id: 18123
  }
]

function App() {
  const [initialDate, setInitialDate] = useState(new Date('Thu Aug 10 2023 15:00:0'))
  const [events, setEvents] = useState(eventsList)

  const onEveUpdate = (data) => {
    const eventsCopy = [...eventsR]
    let ind = eventsCopy.findIndex((item) => item.id === data.id)
    eventsCopy[ind] = data.next.sourceEvent
    setEvents(eventsCopy)
  }
  function eventAdd({ event }) {
    const eventsCopy = [...eventsR]
    eventsCopy.push(event.sourceEvent)
    setEvents(eventsCopy)
  }

  return (
    <FullEventCalendar
      autoUpdateEventOnChange={false}
      plugins={[DailyGridPlugin]}
      events={events}
      eventAdd={eventAdd}
      eventUpdate={onEveUpdate}
      initialDate={initialDate}
      eventUpdate={onEveUpdate}
    ></FullEventCalendar>
  )
}
```

### `stopAddEvent`

- Type : boolean
- Default : false
  If stopAddEvent is set to true, adding an event will be frozen on the grid to display a modal or perform another action,a modal should be provided with [**_Slots_**](#slots)"

```jsx
function App() {
  const [initialDate, setInitialDate] = useState(new Date('Thu Aug 10 2023 15:00:0'))
  const [events, setEvents] = useState(eventsList)

  function eventStoped({ event }) {
    const eventsCopy = [...eventsR]
    eventsCopy.push(event.sourceEvent)
    setEvents(eventsCopy)
  }

  return (
    <FullEventCalendar
      autoUpdateEventOnChange={false}
      plugins={[DailyGridPlugin]}
      events={events}
      addEventStoped={eventStoped}
      eventUpdate={onEveUpdate}
      initialDate={initialDate}
    ></FullEventCalendar>
  )
}
```

or with modal :

```jsx
function EventaddModalSlot(props) {
  function saveBtnClik() {
    props.saveModal() // call this to close the modal
    props.someProp(props.eventData.sourceEvent)
  }
  return (
    <div className="eventAddModal" style={{ background: 'red' }}>
      react modal
      {props?.eventData?.start.toString()} - {props?.eventData?.end.toString()}
      <button className="" onClick={saveBtnClik}>
        SAVE
      </button>
    </div>
  )
}

function App() {
  const [initialDate, setInitialDate] = useState(new Date('Thu Aug 10 2023 15:00:0'))
  const [events, setEvents] = useState(eventsList)

  function addEventModal(ev) {
    let arr = [...eventsR, ev]
    setEvents(arr)
  }

  return (
    <FullEventCalendar
      autoUpdateEventOnChange={false}
      plugins={[DailyGridPlugin]}
      events={events}
      initialDate={initialDate}
      addModal={<EventaddModalSlot someProp={addEventModal} />}
    ></FullEventCalendar>
  )
}
```

#### Source Event properties

```ts
interface SourceEvent {
  start: Date
  end: Date
  name: string
  id: any
  color?: string
  groups?: number[] | string[]
}
```

## Events

| Event Name                        | Description                                                                                        |
| --------------------------------- | :------------------------------------------------------------------------------------------------- |
| `eventClicked({event})`           | fired when a event is clicked on a grid                                                            |
| `eventUpdate({ prev, next, id })` | fired when a event is Updated on a grid with drag n drop                                           |
| `eventAdd({event})`               | fired when a event is Added on a grid with drag n drop                                             |
| `addEventStoped({event})`         | fired when a event is Added on a grid with drag n drop and the stopAddEvent option is set top true |
| `dateUpdate({date})`              | fired when the initial date updates                                                                |
| `gridUpdate({grid})`              | fired when the grid type updates                                                                   |
| `update:events(Array[])`          | fired when event list Updates                                                                      |
| `update:initial-date(date)`       | fired when initial-date changes                                                                    |
| `update:grid(string)`             | fired when grid type changes                                                                       |

## Slots

```jsx
 // modal to show on event when the event is clicked -->
 function eventClick({ data }){
   return <div className='eventClick'> react moda {props?.eventData?.start.toString()} </div>
 }

// modal to show on event when an event is added with draging -->
 function addModal({ data }){

  function saveBtnClik(){
    props.saveModal() // call this to close the modal
  }

  return (
    <div className='eventClick' style={{background:'red'}} > react moda
         {props?.eventData?.start.toString()}
         <button className='' onClick={saveBtnClik}>SAVE</button>
     </div>
   )
 }

 // header date slot-->
 function headerDateSlot({ data }){
  return <div>daily header slot {{ data.date.toString() }}</div>
 }

// menu header item-->
 function headerDateSlot({ header }){
  return <div>daily header slot {{ header.date.toString() }}</div>
 }

// today btn in header-->
 function todayBtn(){
  return <button>go to today</button>
 }

//  move date back buttun in header-->
 function goBackDate(){
  return <button>go back</button>
 }

//  move date forward buttun in header-->
 function goForwardDate(){
  return <button>go forward</button>
 }

// group container header , for when a group item is added -->

 function groupContainer(){
  return <div>{{props.group.name}}</div>
 }

//  grid drop down  -->
 function gridDropDown(props){
  return <div>{{props.grid}}</div>
 }

```

NOTE : use slots like this :

```jsx
<FullEventCalendar
  dailyHeader={<AddModalSlot />}
  eventClick={<EventClickSlot someProp={asaveEv} />}
  addModal={<EventaddModalSlot someProp={asaveEv} />}
></FullEventCalendar>
```

## Styling

### Css varibles

to use sass varibles import the SCSS file insted of Css, then import custom varibles,
example:

Css varibles:

```css
.calendar-theme-light {
  --shadow: 0px 4px 4px 0px rgba(60, 64, 67, 0.3), 0px 8px 12px 6px rgba(60, 64, 67, 0.15);
  --now: rgb(234, 67, 53);
  --primary: #31b5f7;
  --hairline: rgb(218, 220, 224);
  --on-surface-variant-agm: #70757a;
  --on-surface-variant: rgb(95, 99, 104);
  --textfield-surface: rgb(32, 33, 36);
  --bg-color: white;
  --bg-hover: rgba(208, 208, 208, 0.38);
  --shawdow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09);
}

.calendar-theme-dark {
  --now: rgb(234, 67, 53);
  --primary: #3499f5;
  --hairline: #3a536b;
  --on-surface-variant-agm: #bbbbbb;
  --on-surface-variant: #ffffff;
  --textfield-surface: #e6e6e6;
  --bg-color: #243443;
  --bg-hover: #3f4d5a;
  --shawdow: inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09);
}
```
