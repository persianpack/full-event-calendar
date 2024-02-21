# Full Event Calendar

<img src="https://github.com/amirkian007/vue-awesome-sidebar/blob/main/assets/demo.gif" alt="vue-wesome-sidebar">

## About
Full Event Calendar is a simple, lightweight, and fast event calendar that renders in any framework or library. It supports 18 calendars and 100 locales, powered by [Solid.js](https://solidjs.com/) and [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

Inspired by [FullCalendar](https://fullcalendar.io/) and [ClickUp](https://clickup.com/).
## Demo
Check out Live demo at [**_amirkian007.github.io/vasmenu_**](https://amirkian007.github.io/vasmenu/) and full Docs at [**_amirkian007.github.io/vasmenu_**](https://amirkian007.github.io/vasmenu/)
<!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types -->

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
  - [**_Props_**](#props)
  - [**_Events_**](#events)
  - [**_Slots_**](#slots)
- [**_Styling_**](#styling)
  - [**_Sass varibales_**](#sass-varibles)
  - [**_Css_**](#css-class)
- [**_Author_**](#author)
- [**_License_**](#license)

# Installation

```
npm i @full-event-calendar/vue @full-event-calendar/daily-grid
```
or
```
yarn add @full-event-calendar/vue @full-event-calendar/daily-grid
```
NOTE : <ins>you have to install atleast 1 plugin</ins> like loading material-icons files with cdn

# Basic Usage
Vue js 3:
```html
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
])
 
function eventUpdate({prev,next,id}) {
  console.log('updated event : ' ,prev)
  console.log('to event : ' ,next)
  console.log('with id : ' ,id)
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

## Api

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
  - `Cale@full-event-calendar/list` - list view

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
  If stopAddEvent is set to true, adding an event will be frozen on the grid to display a modal or perform another action,a modal should be provided with [**_Slots_**](#slots)"
  ```js
     // ...
     stopAddEvent: true,
     // ..
     EventCalendar.on('eventAdd',({event})=>{
       EventCalendar.addEvent(event)
     })
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

### Events

| Event Name                     | Description                                                            |
|--------------------------------|:-----------------------------------------------------------------------|
| `@item-click(MenuItem)`        | fired when a menu item is clicked                                      |
|`@update:collapsed(isCollapsed)`| fired when menu collapse state changes - should be used with "v-model" |
| `@update:miniMenu(isMiniMenu)` | fired when mini menu state changes - should be used with "v-model"     |

### Slots

```html
<!--slot for daily header -->
<template #dailyHeader="{ icon,isChildrenMenuOpen, active,miniActive }"></template>
<!--menu items label -->
<template #headerSlot="{labelName ,isChildrenMenuOpen, active,miniActive}"></template>
<!--menu items Preppend icon-->
<template #headerDateSlot="{ icon,isChildrenMenuOpen, active,miniActive }"></template>
<!--menu header item-->
<template #headerItem="{ header }"></template>
<!--menu header at the top of the menu-->
<template #todayBtn></template>
<!--menu footer -->
<template #goBackDate></template>
<!--menus bottom toggle btn -->
<template #goForwardDate></template>


<template #addModal></template>
<template #eventClick></template>
```

## Styling


## Contributing

``` bash
$ pnpm i
# dev server
$ pnpm run dev
```

## License

vue-awesome-sidebar is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).