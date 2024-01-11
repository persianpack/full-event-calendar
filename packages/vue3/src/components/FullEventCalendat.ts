import { PropType, defineComponent, h, Fragment, Teleport, VNode } from 'vue'
import { Calendar } from '@full-event-calendar/core'
import '@full-event-calendar/core/dist/index.css'
import '@full-event-calendar/core/node_modules/@full-event-calendar/basic-grid/dist/index.css'
import '@full-event-calendar/month-grid/dist/index.css'
import '@full-event-css-daily'
import '@full-event-css-basic'
import '@full-event-css-core'
import '@full-event-css-month'
import '@full-event-css-week'

import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { events } from '@full-event-calendar/test-events'

const FullEventCalendar = defineComponent({
  props: {
    options: Object as PropType<any>
  },
  data() {
    return {
      renderId: 0
    }
  },
  methods: {},
  render() {
    // const customRenderingNodes: VNode[] = []

    // for (const customRendering of this.customRenderingMap.values()) {
    //   customRenderingNodes.push(
    //     h(CustomRenderingComponent, {
    //       key: customRendering.id,
    //       customRendering,
    //     })
    //   )
    // }
    //  this.renderId++
    // @ts-ignore
    return h('div', { id: `data-fc-render-id-${this.renderId}` })
    //  return h('div',  { 'id': `data-fc-render-id-${this.renderId}` },h(this.$slots.testslot,{ 'data-fc-render-id': 1 }))
  },
  mounted() {
    console.log(this)
    const el = document.getElementById(`data-fc-render-id-${this.renderId}`) as HTMLElement

    const EventCalendar = new Calendar(el, {
      events: events,
      // @ts-ignore
      gridHeight: 65 * 24,
      // timeZone: 'Africa/Abidjan',
      // calendar: 'persian',
      // locale: 'fa-IR',
      initialDate: new Date('Thu Aug 10 2023 15:00:0'),
      //@ts-ignore
      plugins: [DailyGridPlugin, WeeklyGridPlugin, MonthGridPlugin],
      grid: 'daily'
    })
    console.time('rendered in vue')
    setTimeout(() => {}, 1234)
    EventCalendar.render()
    console.timeEnd('rendered in vue')
  }
})

export default FullEventCalendar

// console.log(this)
//  const el = document.getElementById(`data-fc-render-id-${this.renderId}`) as HTMLElement

//  const EventCalendar = new Calendar(el, {
//      events: events,
//      // @ts-ignore
//      gridHeight: 65 * 24,
//      // timeZone: 'Africa/Abidjan',
//      // calendar: 'persian',
//      // locale: 'fa-IR',
//      initialDate: new Date('Thu Aug 10 2023 15:00:0'),
//        plugins: [DailyGridPlugin],
//      grid: 'daily'
//    })
//    console.time('rendered in ')
//    console.log(EventCalendar)
