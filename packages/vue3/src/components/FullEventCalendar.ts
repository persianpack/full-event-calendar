import { PropType, defineComponent, h, Fragment, Teleport, VNode } from 'vue'
import { Calendar, CalendarSourceOptions } from '@full-event-calendar/core'

type CalendaropptioNS = keyof CalendarSourceOptions
const options: CalendaropptioNS[] = [
  'events',
  'initialDate',
  'timeZone',
  'calendar',
  'locale',
  'grid',
  'gridHeight',
  'plugins',
  'autoUpdateEventOnChange',
  'listMode',
  'groups',
  'editable',
  'theme',
  'avalibalSots',
  'stopAddEvent',
  'containerHeight'
]
interface DateComponent {
  EventCalendar: Calendar | null
  customRenderingMap: Map<string, any>
  renderId: number
}
//@ts-ignore
export const FullEventCalendar = defineComponent({
  props: {
    events: {
      type: Array as unknown as PropType<CalendarSourceOptions['events']>,
      required: true
    },
    plugins: {
      type: Array as any,
      required: true
    },
    initialDate: Date as unknown as PropType<CalendarSourceOptions['initialDate']>,
    timeZone: String as unknown as PropType<CalendarSourceOptions['timeZone']>,
    calendar: String as unknown as PropType<CalendarSourceOptions['calendar']>,
    locale: String as unknown as PropType<CalendarSourceOptions['locale']>,
    grid: String as unknown as PropType<CalendarSourceOptions['grid']>,
    groups: Array as unknown as PropType<CalendarSourceOptions['groups']>,
    gridHeight: Number as unknown as PropType<CalendarSourceOptions['gridHeight']>,
    autoUpdateEventOnChange: Boolean as unknown as PropType<CalendarSourceOptions['autoUpdateEventOnChange']>,
    editable: Boolean as unknown as PropType<CalendarSourceOptions['editable']>,
    theme: String as unknown as PropType<CalendarSourceOptions['theme']>,
    avalibalSots: Array as unknown as PropType<CalendarSourceOptions['avalibalSots']>,
    stopAddEvent: Boolean as unknown as PropType<CalendarSourceOptions['stopAddEvent']>,
    listMode: Object as unknown as PropType<CalendarSourceOptions['listMode']>,
    containerHeight: Object as unknown as PropType<CalendarSourceOptions['containerHeight']>
  },
  data(): DateComponent {
    return {
      renderId: 0,
      customRenderingMap: new Map<string, any>(),
      EventCalendar: null
    }
  },

  render() {
    const customRenderingNodes: VNode[] = []

    for (const customRendering of this.customRenderingMap.values()) {
      if (!this.$slots[customRendering.name]) continue
      customRenderingNodes.push(
        h(CustomRenderingComponent, {
          innerContext: this.$slots[customRendering.name],
          targetContainer: customRendering.target.el,
          data: customRendering.data
        })
      )
    }
    return h('div', { id: `data-fc-render-id-${this.renderId}` }, h(Fragment, customRenderingNodes))
  },

  mounted() {
    const EventCalendar = new Calendar(this.$el, {
      events: this.events,
      gridHeight: this.gridHeight,
      timeZone: this.timeZone,
      calendar: this.calendar,
      locale: this.locale,
      initialDate: this.initialDate,
      plugins: this.plugins,
      stopAddEvent: this.stopAddEvent,
      autoUpdateEventOnChange: this.autoUpdateEventOnChange,
      grid: this.grid,
      listMode: this.listMode,
      groups: this.groups,
      editable: this.editable,
      theme: this.theme,
      containerHeight: this.containerHeight
    })

    this.EventCalendar = EventCalendar
    EventCalendar.renderStore.subscribe(() => {
      this.customRenderingMap = EventCalendar.renderStore.getState()
      this.renderRequest()
    })
    EventCalendar.setAvalibleSlots(Object.keys(kebabToCamelKeys(this.$slots)))
    EventCalendar.render()
    this.registerListenrs()
  },
  methods: {
    registerListenrs() {
      const self = this

      if (!this.EventCalendar) return

      this.EventCalendar.on('eventClicked', (data: any) => {
        self.$emit('eventClicked', data)
      })
      this.EventCalendar.on('eventAdd', (data: any) => {
        self.$emit('eventAdd', data)
      })

      this.EventCalendar.on('addEventStoped', (data: any) => {
        self.$emit('addEventStoped', data)
      })

      this.EventCalendar.on('eventUpdate', (data: any) => {
        const eventsCopy = [...this.events]
        let ind = eventsCopy.findIndex((item) => item.id === data.id)
        eventsCopy[ind] = data.next.sourceEvent
        self.$emit('update:events', eventsCopy)
      })

      this.EventCalendar.on('dateUpdate', (data: any) => {
        self.$emit('update:initial-date', data.date)
      })
      this.EventCalendar.on('gridUpdate', (data: any) => {
        self.$emit('update:grid', data.grid)
      })
    },
    renderRequest() {
      this.renderId++
    }
  },
  watch: buildWatchers()
})
function buildWatchers() {
  const wacthers = {} as any

  for (let index = 0; index < options.length; index++) {
    const option = options[index]
    wacthers[option] = {
      deep: true,
      handler(val: any) {
        //@ts-ignore
        this.EventCalendar.resetOptions({ [option]: val })
      }
    }
  }
  return wacthers
}
const CustomRenderingComponent = defineComponent({
  props: ['targetContainer', 'innerContext', 'data'],
  render() {
    return h(Teleport, { to: this.targetContainer }, h(this.innerContext, { data: this.data }))
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
    .map((word, index) => (index ? capitalize(word) : word))
    .join('')
}
function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
