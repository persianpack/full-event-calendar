
# Full Event Calendar

<img src="https://github.com/amirkian007/vue-awesome-sidebar/blob/main/assets/demo.gif" alt="vue-wesome-sidebar">

## About
Full Event Calendar is a simple, lightweight, and fast event calendar that renders in any framework or library. It supports 18 calendars and 100 locales, powered by [Solid.js](https://solidjs.com/) and [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

Inspired by [FullCalendar](https://fullcalendar.io/) and [ClickUp](https://clickup.com/).
## Demo
Check out Live demo at [**_amirkian007.github.io/vasmenu_**](https://amirkian007.github.io/vasmenu/) and full Docs at [**_amirkian007.github.io/vasmenu_**](https://amirkian007.github.io/vasmenu/)
<!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types -->
Connectors:

- [React](https://github.com/persianpack/full-event-calendar/tree/main/packages/react)
- [Vue 3](https://github.com/persianpack/full-event-calendar/tree/main/packages/vue3)

## Features
- ✔️ Built with typescript and [**_solid.js_**](https://www.solidjs.com/).
- ✔️ Support for Vue.js(3x) and React.js.
- ✔️ Mulitple Calendar type support like `chinese` , `gregory` , `persian` and ...
- ✔️ Timezone converstion suppourt.
- ✔️ Customization support for every component slots , CSS and SASS.
- ✔️ Reduce your project's bundle size by using FullEventCalendar's modular plugins.
- ✔️ 100 locales support with intL.
- ✔️ Fast and light weight(40kb - 80kb).
- ✔️ Capable with Vanilla js.
- ✔️ Dark and White mode support.
- ✔️ Responsive design.

# Table of Contents

- [**_Demo_**](#demo)
- [**_Installation_**](#installation)
- [**_Basic Usage_**](#basic-usage)
- [**_Api_**](#Api)
  - [**__Calendar Class__**](#calendar-class)
  - [**_Options_**](#options)
  - [**_Methods_**](#methods)
- [**_Styling_**](#styling)
  - [**_Css varibales_**](#css-varibles)
- [**_Author_**](#author)
- [**_License_**](#license)


# Installation

```
npm i @full-event-calendar/core @full-event-calendar/daily-grid
```
or
```
pnpm i @full-event-calendar/core @full-event-calendar/daily-grid
```
NOTE : <ins> atleast 1 plugin must be provided </ins> available grid plugins:
  - `@full-event-calendar/daily-grid` - daily view
  - `@full-event-calendar/weekly-grid` - weekly view
  - `@full-event-calendar/month-grid` - month view
  - `Cale@full-event-calendar/list` - list view

# Basic Usage

A simple vanill example would be like this :

Check out [**__Options__**](#props) for properites

[**__Vue usage__**](#props)

[**__React usage__**](#props)

Vanilla JS:
```js
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

const options = {
  events: events,
  gridHeight: 60 * 24,
  initialDate: new Date('Thu Aug 10 2023 15:00:0'),
  plugins: [ DailyGridPlugin],
  grid: 'daily',
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
const fullEventCalendar = new Calendar(el,options)

fullEventCalendar.render()

fullEventCalendar.on('eventUpdate', ({prev,next,id}) => {
  console.log('updated event : ' ,prev)
  console.log('to event : ' ,next)
  console.log('with id : ' ,id)
})

```
```html
<!-- index.html -->
<!doctype html>
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
# Api

## Calendar Class

The `Calendar` class represents a calendar component that can be rendered in a specified HTML element.
  ### Parameters
  #### targetElement
  - `targetElement`: HTMLElement - The HTML element where the calendar will be rendered.

#### options
  - `options`: CalendarSourceOptions - Options for configuring the calendar.

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
  - `@full-event-calendar/list` - list view

  ```js
  import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
  import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
  import { MonthGridPlugin } from '@full-event-calendar/month-grid'
  import { ListPlugin } from '@full-event-calendar/list'
  // ...
   plugins: [DailyGridPlugin, WeeklyGridPlugin, MonthGridPlugin, ListPlugin],
  // ..
  ```
   <!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types -->
  <!-- [**_Groups_**](#css-class) -->

### `calendar`
  - Type : String
  - Default : gregory

   The type of calendar to be used . the Calendar formatting is done with javascript [**_Intl_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types) avalible calendars : 
   `buddhist`,`chinese`,`coptic`,`dangi`,`ethioaa`,`ethiopic`,`gregory`,`hebrew`,`indian`,`islamic`,`islamic-umalqura`,`islamic-umalqura`,`islamic-tbla`,`islamic-civil`,`islamic-rgsa`,`iso8601`,`iso8601`,`japanese`,`persian`,`roc`,`islamicc`
  
   ```js
     // ...
     calendar: `persian`,
     // ..
   ```
### `locale`
  - Type : String
  - Default : 'en-US'

    The BCP 47 language tag for the locale actually used. If any Unicode extension values were requested in the input BCP 47 language tag that led to this locale, the key-value pairs that were requested and are supported for this locale are included in locale.
  
   ```js
     // ...
     locale: `fa-IR`,
     // ..
   ```
### `locale`
  - Type : String
  - Default : 'daily'

    which grid plugin to show. options are : 
    `daily`,`weekly`,`month`,`list`
   <!-- ```js
     // ...
     grid: `weekly`,
     // ..
   ``` -->
### `gridHeight`
  - Type : Number
  - Default : 1920

    height of the daily and weekly grid(not the container). for example if we consider every hour 60px then th grid hieght will be 60 * 24
   ```js
     // ...
     gridHeight: 60 * 24,
     // ..
   ```
### `containerHeight`
  - Type : Number
  - Default : 600

    height of the entire container.
   ```js
     // ...
     containerHeight: 700,
     // ..
   ```
### `editable`
  - Type : Boolean
  - Default : true

    can add or update event with dragging
   <!-- ```js
     // ...
     editable: false,
     // ..
   ``` -->
### `groups`
  - Type : Array
  - Default : []

     An array of resource objects. If provided, the daily grid will be divided into grouped resources, and only events containing the group ID property will be displayed on the corresponding grid resource.
      ```js
      const events = [
          {
            name: 'some name',
            start: new Date('Aug 10 2023 08:00:0'),
            end: new Date('Aug 10 2023 10:00:00'),
            id: 16123,
            color: '#BF51F9',
            // groups: [2]
          },
          {
            name: 'some name',
            start: new Date('Aug 10 2023 10:00:0'),
            color: '#31B5F7',
            end: new Date('Aug 10 2023 11:00:00'),
            id: 18123,
            // groups: [1]
          },
      ]
      const options = {
       events: events,
       initialDate: new Date('Thu Aug 10 2023 15:00:0'),
       plugins: [ DailyGridPlugin],
       // ... 
       groups : [{ id:1, name:'resource 1' },{ id:2, name:'resource 2' }],
       // ... 
      }
    ```
    ```ts
      interface Group {
         id:string[] | number[]
         name:string
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
    console.log(Intl.supportedValuesOf('calendar'));
    ```
       <!-- ```js
        // ...
       timeZone: 'Africa/Abidjan',
       // ..
       ``` -->
### `autoUpdateEventOnChange`
  - Type : boolean
  - Default : true
  If set to false, all event dragging, editing, and additions will not be updated on the grid and instead will have to be handled with event listeners.
  ```js
     // ...
     autoUpdateEventOnChange: false,
     // ..
     EventCalendar.on('eventUpdate',({next,prev,id})=>{
       //sourceEvent is the base event without timezone convertion
        EventCalendar.updateEvent(id,next.sourceEvent)
     })

     EventCalendar.on('eventAdd',({event})=>{
      EventCalendar.addEvent(event)
     })
  ```
### `stopAddEvent`
  - Type : boolean
  - Default : false
  If stopAddEvent is set to true, adding an event will be frozen on the grid to display a modal or perform another action, and it will be handled in event listeners. It's better to use it with Vue or React."
  ```js
     // ...
     stopAddEvent: true,
     // ..
     EventCalendar.on('eventAdd',({event})=>{
       EventCalendar.addEvent(event)
     })
  ```
## Methods

### `EventCalendar.render()`
  rendar calendar in the target element.
   ```js
    const EventCalendar = new Calendar(el,options)
    EventCalendar.render()
   ```
### `EventCalendar.setEventList(events: SourceEvent[]))`
 sets list of events in calendar. events must fallow the below structure : 
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
 ```js
 const events = [
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
  EventCalendar.setEventList(events)
 ```
### `EventCalendar.updateEvent(id: SourceEvent['id'], event: SourceEvent)`
  updates single event in calendars provided event list.
   ```js
    const updatedEvent = {
        name: 'some name',
        start: new Date(' Aug 10 2023 17:00:0'),
        color: '#31B5F7',
        end: new Date(' Aug 10 2023 18:00:00'),
        id: 18123,
        // groups: [1]
     }

    EventCalendar.updateEvent(updatedEvent.id,updatedEvent)
   ```
### `EventCalendar.addEvent(event: SourceEvent)`
  updates single event in calendars provided event list.
   ```js
    const updatedEvent = {
        name: 'some name',
        start: new Date(' Aug 10 2023 17:00:0'),
        color: '#31B5F7',
        end: new Date(' Aug 10 2023 18:00:00'),
        id: 18123,
        // groups: [1]
     }

    EventCalendar.addEvent(updatedEvent.id,updatedEvent)
   ```
### `EventCalendar.deleteEvent(id: string | number)`
  deletes an event from calendar.
   ```js
    EventCalendar.deleteEvent(updatedEvent.id)
   ```
### `EventCalendar.on(eventType: 'eventUpdate' | 'eventAdd', handler: Function)`
  fiers a callback function when an event happens.
   ```js
    fullEventCalendar.on('eventUpdate', ({prev,next,id}) => {
      console.log('updated event : ' ,prev)
      console.log('to event : ' ,next)
      console.log('with id : ' ,id)
    })
   ```
### `EventCalendar.setGridHeight(height: number)`
   height of the daily and weekly grid(not the container)
   ```js
    EventCalendar.setGridHeight(60 * 24)
   ```
### `EventCalendar.changeContainerHeight(val: number)`
   height of the entire container.
   ```js
    EventCalendar.changeContainerHeight(1000)
   ```
### `EventCalendar.changeCalendar(calendar: string)`
Changes the calendar type to the specified one.
```javascript
EventCalendar.changeCalendar('gregorian'); // Change to the Gregorian calendar
```

### `EventCalendar.setPlugins(plugins: Plugins[])`
```javascript
EventCalendar.setPlugins([plugin1, plugin2, plugin3]);
```

### `EventCalendar.changeTimeZone(tz: string)`
Changes the time zone of the calendar.
```javascript
EventCalendar.changeTimeZone('America/New_York'); // Change to Eastern Time
```

### `EventCalendar.changeInitialDate(date: string)`
Changes the initial date of the calendar view.
```javascript
EventCalendar.changeInitialDate('2024-02-17'); // Set initial date to February 17, 2024
```

### `EventCalendar.changeLocale(locale: string)`
Changes the locale of the calendar.
```javascript
EventCalendar.changeLocale('en_US'); // Change to English (United States)
```

### `EventCalendar.changeGrid(grid: 'daily' | 'weekly' | 'month' | 'list')`
Changes the grid mode of the calendar.
```javascript
EventCalendar.changeGrid('weekly'); // Change to weekly grid
```

### `EventCalendar.updateGroups(groups: Group[])`
Updates the groups in the calendar.
```ts
const group1 = {
  id:1
  name :'name 1'
}
EventCalendar.updateGroups([group1]);
```

### `EventCalendar.addGroup(group: Group)`
Adds a new group to the calendar.
```javascript
const group1 = {
  id:string[] | number[]
  name :string
  image?:any
}
EventCalendar.addGroup(group1);
```

### `EventCalendar.updateEditable(val: boolean)`
Updates the editable state of the calendar events.
```javascript
EventCalendar.updateEditable(true); 
```
### `EventCalendar.changeTheme(val: string)`
Changes the theme of the calendar.
```javascript
EventCalendar.changeTheme('dark'); 
```
### `EventCalendar.setStopAddEvent(val: boolean)`
Sets whether to stop adding events to the calendar.
```javascript
EventCalendar.setStopAddEvent(true); 
```
### `EventCalendar.resetOptions<T extends CalendarSourceOptions>(options: T, catchErrors?: boolean)`
Resets the options of the calendar with the provided options
```javascript
EventCalendar.resetOptions(newOptions); // Reset options and catch errors
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
#### Events

```ts
export type EventTypes ='eventUpdate' | 'eventAdd '

export interface EventPayLoads {
  eventUpdate: { prev: SourceEvent; next: SourceEvent,id:any }
  eventAdd:{ event: EventClass }
}
```

## Styling

### Css varibles
to use sass varibles import the SCSS file insted of Css, then import custom varibles,
example:
```scss
//style.scss
@import "custom-var.scss";
@import "vue-awesome-sidebar/src/scss/vue-awesome-sidebar.scss";
```
```js
//main.js
import vueAwesomeSidebar from 'vue-awesome-sidebar'
//import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'
import './style.scss'
```
Sass varibles:
```scss
.calendar-theme-light {
  --shadow: 0px 4px 4px 0px rgba(60, 64, 67, 0.3), 0px 8px 12px 6px rgba(60, 64, 67, 0.15);
  --now: rgb(234, 67, 53);
  --primary: #31b5f7;
  --hairline: rgb(218, 220, 224);
  --on-surface-variant-agm: #70757a;
  --on-surface-variant: rgb(95, 99, 104);
  --textfield-surface: rgb(32, 33, 36);
  --bg-color:white;
  --bg-hover:rgba(208, 208, 208, 0.38);
  --shawdow:inset 0 0 0.5px 1px hsla(0, 0%,   100%, 0.075),  0 0 0 1px hsla(0, 0%, 0%, 0.05),
  0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
  0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
  0 3.5px 6px hsla(0, 0%, 0%, 0.09);
}

.calendar-theme-dark {
  --now: rgb(234, 67, 53);
  --primary: #3499F5;
  --hairline: #3a536b;
  --on-surface-variant-agm: #BBBBBB;
  --on-surface-variant: #FFFFFF;
  --textfield-surface: #E6E6E6;
  --bg-color:#243443;
  --bg-hover:#3f4d5a;
  --shawdow:inset 0 0 0.5px 1px hsla(0, 0%,   100%, 0.075),  0 0 0 1px hsla(0, 0%, 0%, 0.05),
  0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
  0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
  0 3.5px 6px hsla(0, 0%, 0%, 0.09);
}

```

## Contributing

``` bash
$ pnpm i
# dev server
$ pnpm run dev
```
`vanilla-examples:dev:   ➜  Local:   http://localhost:5174`
## License

full-event-calendar is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).