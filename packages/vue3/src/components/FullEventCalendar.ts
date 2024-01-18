import { PropType, defineComponent, h, Fragment, Teleport, VNode } from 'vue'
import { Calendar } from '@full-event-calendar/core'
// import '@full-event-calendar/core/dist/index.css'
// import '@full-event-calendar/core/node_modules/@full-event-calendar/basic-grid/dist/index.css'
// import '@full-event-calendar/month-grid/dist/index.css'
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
      renderId: 0,
      customRenderingMap: new Map<string, any>(),
    }
  },
  methods: {},
  render() {
    // console.log('render')
    const customRenderingNodes: VNode[] = []
    for (const customRendering of this.customRenderingMap.values()) {
      // console.log(customRendering,this.$slots[customRendering.name])
     if(!this.$slots[customRendering.name]) continue
      // console.log(customRendering,customRenderingNodes)
      customRenderingNodes.push(
        h(CustomRenderingComponent, {
          innerContext:this.$slots[customRendering.name],
          targetContainer:customRendering.target.el,
          data:customRendering.data
        })
      )
    }
    // @ts-ignore
    return h('div', { id: `data-fc-render-id-${this.renderId}` },h(Fragment, customRenderingNodes))
    //  return h('div',  { 'id': `data-fc-render-id-${this.renderId}` },h(this.$slots.testslot,{ 'data-fc-render-id': 1 }))
  },
  
  mounted() {
 
    
    // use ref insted
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
    EventCalendar.renderStore.subscribe(()=>{
      this.customRenderingMap = EventCalendar.renderStore.getState()
      // console.log(EventCalendar.renderStore.getState())
  
      this.renderId++
    })
    // console.log(EventCalendar)
    EventCalendar.setAvalibleSlots(Object.keys(kebabToCamelKeys(this.$slots)))
    EventCalendar.render()
    // this.customRenderingMap.set('sometarget','somevalue')
    
    console.timeEnd('rendered in vue')
  }
})

const CustomRenderingComponent = defineComponent({
  props: ['targetContainer','innerContext','data'],

  render() {
    return h(Teleport, { to: this.targetContainer }, h(this.innerContext,{'data': this.data }))
  }
})

function kebabToCamelKeys<V>(map: { [key: string]: V }): { [key: string]: V } {
  const newMap: { [key: string]: V } = {}

  for (const key in map) {
    newMap[kebabToCamel(key)] = map[key]
  }

  return newMap
}

function kebabToCamel(s: string): string {
  return s
    .split('-')
    .map((word, index) => index ? capitalize(word) : word)
    .join('')
}
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default FullEventCalendar
