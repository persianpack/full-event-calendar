# Full Event Calendar

<img src="https://github.com/persianpack/full-event-calendar/blob/main/docs/public/video1.gif" alt="full-event-calendar">

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

## Installation

::: code-group
```bash [npm]
npm i @full-event-calendar/core @full-event-calendar/daily-grid
```

```bash [pnpm]
pnpm i @full-event-calendar/core @full-event-calendar/daily-grid
```
:::
NOTE : <ins> atleast 1 plugin must be provided </ins> available grid plugins:
  - `@full-event-calendar/daily-grid` - daily view
  - `@full-event-calendar/weekly-grid` - weekly view
  - `@full-event-calendar/month-grid` - month view
  - `@full-event-calendar/list` - list view
 
## Basic Usage
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

  ```html
  <script setup>

  import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
  import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
  import { MonthGridPlugin } from '@full-event-calendar/month-grid'
  import { ListPlugin } from '@full-event-calendar/list'
  </script>
  <template>
    <FullEventCalendar 
      // ...
      :plugins=[DailyGridPlugin, WeeklyGridPlugin, MonthGridPlugin, ListPlugin]
      // ..
    />
  </template>
  ```
   <!-- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types -->
  <!-- [**_Groups_**](#css-class) -->

### `calendar`
  - Type : String
  - Default : gregory

   The type of calendar to be used . the Calendar formatting is done with javascript [**_Intl_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars#supported_calendar_types) avalible calendars : 
   `buddhist`,`chinese`,`coptic`,`dangi`,`ethioaa`,`ethiopic`,`gregory`,`hebrew`,`indian`,`islamic`,`islamic-umalqura`,`islamic-umalqura`,`islamic-tbla`,`islamic-civil`,`islamic-rgsa`,`iso8601`,`iso8601`,`japanese`,`persian`,`roc`,`islamicc`
   ```html
    <FullEventCalendar 
      // ...
      :calendar="persian",
      // ..
    />
   ```
### `locale`
  - Type : String
  - Default : 'en-US'

    The BCP 47 language tag for the locale actually used. If any Unicode extension values were requested in the input BCP 47 language tag that led to this locale, the key-value pairs that were requested and are supported for this locale are included in locale.
    [**_Intl Locales_**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument)
  
   ```js
     // ...
     locale: `fa-IR`,
     // ..
   ```
### `grid`
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
   ```html
     // ...
     :gridHeight="60 * 24",
     // ..
   ```
### `containerHeight`
  - Type : Number
  - Default : 600

    height of the entire container.
   ```js
     // ...
     containerHeight="700",
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
      ```html
      <script>
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
          },
      ]
      const groups = [{ id:1, name:'resource 1' },{ id:2, name:'resource 2' }]
      </script>
      <template>
       <FullEventCalendar
           ...
          :events="events"
           ...
          :groups="groups"
        >
       </FullEventCalendar>
      </template>
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
  If set to false, all event dragging, editing, and additions will not be updated on the grid and instead will have to be handled with event listeners or modals.
 
  ```html
  <script setup>
    const eventsList = ref([])

    function eventAdd({event}) {
      eventsList.value.push(event.sourceEvent)
       console.log(event)
    }
    function eventUpdate({next,prev,id}) {
      eventsList.value.push(next.sourceEvent)
    }
  </script>
  <template>
   <FullEventCalendar
      :autoUpdateEventOnChange="false"
      v-model:events="eventsList"
      ...
      @eventUpdate="eventUpdate"
      @eventAdd="eventAdd">
    </FullEventCalendar>
   </template>
  ```
### `stopAddEvent`
  - Type : boolean
  - Default : false
  If stopAddEvent is set to true, adding an event will be frozen on the grid to display a modal or perform another action,a modal should be provided with [**_Slots_**](#slots)"
  ```js
     // ...
     stopAddEvent: true,
     // ..
     EventCalendar.on('addEventStoped',({event})=>{
       EventCalendar.addEvent(event)
     })
  ```
  ```html

  <script setup>

    const eventsList = ref([])

    function AddEvent(calendarEvent) {
      //sourceEvent is the base event data without any timeZone conversion
      // calendarEvent.start and calendarEvent.end is with timeZone conversion
      eventsList.value.push(calendarEvent.sourceEvent)
    }

  </script>

  <template>

   <FullEventCalendar
    stop-add-event
    :auto-update-event-on-change="false"
    :editable="true"
    v-model:events="eventsList"
    :plugins="[DailyGridPlugin]"
   >
     <template #addModal="{ data }">
       <div >
          from {{ data?.eventData?.start?.toString() }} --- to {{ data?.eventData?.end?. toString() }}
          <div @click="data.saveModal"> <!-- Call this to close the modal-->
            <button @click="AddEvent(data.eventData)">save</button>
          </div>
       </div>
     </template>
    </FullEventCalendar>

    </template>
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

| Event Name                         | Description                                                            |
|------------------------------------|:-----------------------------------------------------------------------|
| `@eventClicked({event})`           | fired when a event is clicked on a grid                                |
| `@eventUpdate({ prev, next, id })` | fired when menu collapse state changes - should be used with "v-model" |
| `@eventAdd({event})`               | fired when mini menu state changes - should be used with "v-model"     |
| `@dateUpdate({date})`              | fired when mini menu state changes - should be used with "v-model"     |
| `@gridUpdate({grid})`              | fired when mini menu state changes - should be used with "v-model"     |
| `@update:events(Array[])`          | fired when mini menu state changes - should be used with "v-model"     |
| `@update:initial-date(date)`       | fired when mini menu state changes - should be used with "v-model"     |
| `@update:grid(string)`             | fired when mini menu state changes - should be used with "v-model"     |

## Slots

```html
<!--modal to show on event when the event is clicked -->
 <template #eventClick="{ data }">
   <div class="eventClickModal">{{ data }}</div>
 </template>
 
<!--modal to show on event when an event is added with draging -->
 <template #addModal="{ data }">
   <div>
       this is a vue modal slot {{ data?.eventData?.start?.toString() }} --- {{ data?.eventData?.end?.toString() }}
      <div @click="data.saveModal"> <!--call this to close the modal-->
        <button @click="AddEvent(data.eventData)">save</button>
      </div>
    </div>
 </template>

<!--header date slot-->
<template #headerDateSlot="data"> daily header slot {{ data.date }} </template>

<!--menu header item-->
<template #headerItem="{ header }"></template>

<!--today btn in header-->
<template #todayBtn>
  <button>go to today</button>
</template>

<!-- move date back buttun in header-->
<template #goBackDate>
  <button>go back</button>
</template>

<!-- move date forward buttun in header-->
<template #goForwardDate>
  <button>go forward</button>
</template>

<!--group container header , for when a group item is added -->
<template #groupContainer="{data}">
  <div>{{data.group}}</div>
</template>

<!-- grid drop down  -->
<template #gridDropDown="data">
 {{ data.data }}
</template>


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

## License

@full-event-calendar/vue is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).