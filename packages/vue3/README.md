 
# Vue Awesome Sidebar

<img src="https://github.com/amirkian007/vue-awesome-sidebar/blob/main/assets/demo.gif" alt="vue-wesome-sidebar">

## About
Vue Awesome Sidbar is a powerfull, fast vue js(3x) sidbar navigation library with a set of components and slots that are flexible and customizable using sass and css which is very easy to use.

## Demo
Check out Live demo at [**_amirkian007.github.io/vasmenu_**](https://amirkian007.github.io/vasmenu/)

## Features
- Built with typescript and vite with 0 dependants.
- Support for vue.js (3x) and nuxt.js (3x).
- Customization support for every component slots , CSS and SASS.
- Capable with Vue-router.
- Multiple Menu types(more will be added in the future).
- Complete RTL support.
- Dark and White mode support.
- Responsive design.

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
npm i vue-awesome-sidebar --save
```
or
```
yarn add vue-awesome-sidebar --save
```

Install the component globally.
# Basic Usage
Vue js 3:
```html
<script setup lang="ts">
import { ref } from 'vue'
import { FullEventCalendar } from './components/FullEventCalendar'
import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { ListPlugin } from '@full-event-calendar/list'
import '@full-event-calendar/core/dist/main.css' // this must be imported

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
const count = ref(0)
 
function eventUpdate(data: any) {
  console.log('on event update ', data)
  // eventsList.value.push(data.next.sourceEvent)
}
 
const initialDate = ref(new Date('Thu Aug 10 2023 15:00:0'))
 
</script>

<template>
 
  <FullEventCalendar
    v-model:events="eventsList"
    @eventUpdate="eventUpdate"
    :initial-date="initialDate"
    :plugins="[DailyGridPlugin, MonthGridPlugin, WeeklyGridPlugin, ListPlugin]"
  >
  
  </FullEventCalendar>
</template>
```

## Api

### Props

| Prop                  |  Type   |Default|                             Description                                                                 |
|-----------------------|:-------:|:-----:|:--------------------------------------------------------------------------------------------------------|
| menu                  | Array   |  null | required - Array list of [**_item properties_**](#menu-properties)                                      |
| menuType              | string  | simple| style of the menu can be either "fully" or "simple"                                                     |
| collapsed             | Boolean | false | sets menus collapsed state - should be used with v-model                                                |
| miniMenu              | boolean | false | sets mini menus state - should be used with v-model                                                     |
| width                 | string  | 290px | sets width for menu                                                                                     |
| widthMiniMenu         | string  | 65px  | sets width for miniMenu                                                                                 |
| autoCollapse          | number  | null  | adds event listner to collapse menu when the given value(in px) is lower than the viewport width        |
| closeOnClickOutSide   | Boolean | false | Adds event listner to collapse Menu when outside is clicked                                             |
| overLayerOnOpen       | Boolean | false | Adds overlayer under the Menu when the menu is open - usefull on mobile                                 |
| childrenOpenAnimation | Boolean | true  | opens menu items children with animation                                                                |
| keepChildrenOpen      | Boolean | flase | keeps children items opened when parent item is closed                                                  |
| position              | string  | fixed | sets menu positiong - by default menu is fixed on viewport                                              |
|ChildrenOpenActiveRoute| Boolean | true  |opens meneitem children on page-load if an item with active "href" inside and miniActive class is applied|
| checkButtonActive     | Boolean | true  | checks if menuitems href is active, if so activeClass is added to it and miniActive class to the parent |
| vueRouterEnabel       | Boolean | true  | when a meueitem is clicked vue-router will pushe the route to the items "href" property                 |
| BottomMiniMenuBtn     | Boolean | true  | Adds mini menu toggle bottom to bottom of menu                                                          |
| paddingTop            | String  | 0px   | Adds padding to top of menu - usefull when using with app bar with higher z-index                       |
| dark                  | Boolean | false | makes the theme of menu dark - color can be customized with sass vars                                   |
| rtl                   | Boolean | false | Makes the entire menu right to left align                                                               |
|closeOpenMenuOnHrefPush| Boolean | false | close MenuItems with children that are expanded on router/herf push                                     |

### source event properties

```ts
interface MenuItem {
  href: string | object // vue-router Object
  name: string
  icon?: MenuItemIcon
  children?: Array< MenuItem | MenuHeaderItem >
  class?: string
  collapseOnClick?: boolean //collapses menu when clicked - this behavior can also be achieved with Events
  activeClass?: boolean
  miniActiveClass?: boolean
}

interface MenuItemIcon {
  text: string
  class?: string
  element?: string //defualt is <i>
  attributes?: object
}

interface MenuHeaderItem {
  title: string
  class?: string
  attributes?: object
}

interface MenuLine {
  LineShow: boolean
  class?: string
  attributes?: object
  element?: string
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
<!--menu items Append icon-->
<template #itemApendIcon="{ icon,isChildrenMenuOpen, active,miniActive }"></template>
<!--menu items label -->
<template #menuItemLabel="{labelName ,isChildrenMenuOpen, active,miniActive}"></template>
<!--menu items Preppend icon-->
<template #itemPrepandIcon="{ icon,isChildrenMenuOpen, active,miniActive }"></template>
<!--menu header item-->
<template #headerItem="{ header }"></template>
<!--menu header at the top of the menu-->
<template #header></template>
<!--menu footer -->
<template #footer></template>
<!--menus bottom toggle btn -->
<template #BottomMiniMenuBtn></template>
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