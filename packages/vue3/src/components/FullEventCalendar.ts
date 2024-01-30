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

const FullEventCalendar = defineComponent({
  props: {
    events: Array
  },
  data() {
    return {
      renderId: 0,
      customRenderingMap: new Map<string, any>(),
      EventClalendar:null
    }
  },
  methods: {},
  render() {
    const customRenderingNodes: VNode[] = []
    for (const customRendering of this.customRenderingMap.values()) {
     if(!this.$slots[customRendering.name]) continue
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
 
    // this.$emit('')
    // use ref insted
    const el = document.getElementById(`data-fc-render-id-${this.renderId}`) as HTMLElement
    const EventCalendar = new Calendar(el, {
      // @ts-ignore
      events: this.events,
      // @ts-ignore
      gridHeight: 65 * 24,
      timeZone: 'Africa/Abidjan',
      calendar: 'persian',
      locale: 'fa-IR',
      initialDate: new Date('Thu Aug 10 2023 15:00:0'),
      //@ts-ignore
      plugins: [DailyGridPlugin, WeeklyGridPlugin, MonthGridPlugin],
      stopAddEvent:true,
      grid: 'daily'
    })
      //@ts-ignore
    this.EventClalendar = EventCalendar
    console.time('rendered in vue')
    EventCalendar.renderStore.subscribe(()=>{
      this.customRenderingMap = EventCalendar.renderStore.getState()
      this.renderId++
    })
    EventCalendar.setAvalibleSlots(Object.keys(kebabToCamelKeys(this.$slots)))
    EventCalendar.render()
    // this.customRenderingMap.set('sometarget','somevalue')
    const self = this

    EventCalendar.on('eventClicked',(data:any)=>{
      self.$emit('eventClicked',data)
    })

    EventCalendar.on('eventUpdate',(data:any)=>{
      // update:firstName
      
      //@ts-ignore
      const eventsCopy = [...this.events] as EventSource[]

      let ind = eventsCopy.findIndex(item=>item.id === data.id)
      eventsCopy[ind] = data.next.sourceEvent
      self.$emit('update:events',eventsCopy)
      setTimeout(() => {
      }, 500);
      // self.$emit('eventUpdate',data)
    })
    
    console.timeEnd('rendered in vue')
  },
  watch:{
    'events':{
      deep: true,
      handler(val: any) {
        const calendar =  this.EventClalendar as any as Calendar
        //@ts-ignore
        calendar.resetOptions({events:val})
      }
    }
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
