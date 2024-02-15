import React, { Component, createRef, PureComponent } from 'react'
import { createPortal, flushSync } from 'react-dom'
import { Calendar, CalendarSourceOptions } from '@full-event-calendar/core/dist/index.js'
import equal from 'fast-deep-equal'

const reactMajorVersion = parseInt(String(React.version).split('.')[0])
const syncRenderingByDefault = reactMajorVersion < 18

interface CalendarState {
  customRenderingMap: Map<string, any>
}
interface FullEventCalendarProps{
  dailyHeader:any
  eventClick:any
  addModal:any
  [key :string]: any
}
export default class FullEventCalendar extends Component<CalendarSourceOptions & FullEventCalendarProps, CalendarState> {
  static act = runNow // DEPRECATED. Not leveraged anymore

  private elRef = createRef<HTMLDivElement>()
  private calendar!: Calendar
 
  private isUpdating = false
  private isUnmounting = false

  state: CalendarState = {
    customRenderingMap: new Map<any, any>()
  }

  render() {
    const customRenderingNodes: JSX.Element[] = []
    
    for (const customRendering of this.state.customRenderingMap.values()) {
        if(!this.props[customRendering.name] ||  !customRendering.target.el) continue
        const vnode = this.props[customRendering.name]
        
         customRenderingNodes.push(<CustomRenderingComponent
         key={customRendering.id}
         data={customRendering.data}
         target={customRendering.target}
         customRendering={vnode} />)
    }

    return <div ref={this.elRef}>{customRenderingNodes}</div>

  }

  componentDidMount() {
    const hasMoundted = !!this.calendar
    if(hasMoundted) return
    this.calendar = new Calendar(this.elRef.current!, {
      events: this.props.events,
      gridHeight: this.props.gridHeight,
      timeZone: this.props.timeZone,
      calendar: this.props.calendar,
      locale: this.props.locale,
      initialDate: this.props.initialDate,
      plugins: this.props.plugins,
      stopAddEvent: this.props.stopAddEvent,
      autoUpdateEventOnChange: this.props.autoUpdateEventOnChange,
      grid: this.props.grid,
      listMode: this.props.listMode,
      groups: this.props.groups,
      editable: this.props.editable,
      theme: this.props.theme,
      containerHeight: this.props.containerHeight
    })
    let lastRequestTimestamp: number | undefined

    this.calendar.renderStore.subscribe(() => {
      const requestTimestamp = Date.now()
      const isMounting = !lastRequestTimestamp
      const runFunc =
        // don't call flushSync if React version already does sync rendering by default
        // guards against fatal errors:
        // https://github.com/fullcalendar/fullcalendar/issues/7448
        syncRenderingByDefault ||
        //
        isMounting ||
        this.isUpdating ||
        this.isUnmounting ||
        requestTimestamp - lastRequestTimestamp! < 100 // rerendering frequently
          ? runNow // either sync rendering (first-time or React 16/17) or async (React 18)
          : flushSync // guaranteed sync rendering
          this.calendar.renderStore.getState()
      
      runFunc(() => {
        this.setState({ customRenderingMap: this.calendar.renderStore.getState() }, () => {
          lastRequestTimestamp = requestTimestamp
        }) 
      })

    })

    this.registerListenrs()
    
    this.calendar.setAvalibleSlots(Object.keys(kebabToCamelKeys(this.props)))
    this.calendar.render()

  }

  componentDidUpdate(preProps:any) {
    if(!equal(this.props, preProps)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.isUpdating = true
      this.calendar.resetOptions({
        ...this.props})
      this.isUpdating = false
    }
  }
  registerListenrs(){

    this.calendar.on('eventUpdate',(data:any)=>{
      this.props.eventUpdate(data)
    })

  }
 
}
// Custom Rendering
// -------------------------------------------------------------------------------------------------

interface CustomRenderingComponentProps {
  customRendering: any
  target:any
  data:any
}

class CustomRenderingComponent extends PureComponent<CustomRenderingComponentProps> {
  render() {
    const { customRendering,data,target } = this.props
    const ndoe = React.cloneElement(customRendering, { additionalProp: 'value',...data })
    return createPortal(ndoe, target.el)
  }
}
// Util
// -------------------------------------------------------------------------------------------------
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

function runNow(f: () => void): void {
  f()
}
