import { createPortal, flushSync } from 'react-dom'
import React, { Component, createRef, PureComponent, useEffect, useReducer, useRef, useState } from 'react'

import { Calendar, CalendarSourceOptions } from '@full-event-calendar/core/dist/index.js'

const reactMajorVersion = parseInt(String(React.version).split('.')[0])
const syncRenderingByDefault = reactMajorVersion < 18


interface dsadAS{
  dailyHeader:any
  eventClick:any
  addModal:any
  [key :string]: any
}
export function MyFullCalendar(props:CalendarSourceOptions & dsadAS){
  const elRef = createRef<HTMLDivElement>()
  const [calendar,setCalendat] = useState<any>()
  const [customRenderingMap,setCustomRenderingMap] = useState<any>( new Map<any, any>())
  const initialized = useRef(false)
  // console.log('render component')
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  let isUpdating = false
  let isUnmounting = false
   
  useEffect(()=>{
    const hasMoundted = !!calendar
    if(hasMoundted){
      console.log('')
      setTimeout(() => {
        console.log('reset props',props.events)
      }, 1000);
      calendar.resetOptions({
        ...props})
    }
  },[props])



  useEffect(() => {
    // if (initialized.current) return
    // initialized.current = true
    const hasMoundted = !!calendar
    if(hasMoundted) return
    const calendars = new Calendar(elRef.current!, {
      events: props.events,
      gridHeight: props.gridHeight,
      timeZone: props.timeZone,
      calendar: props.calendar,
      locale: props.locale,
      initialDate: props.initialDate,
      plugins: props.plugins,
      stopAddEvent: props.stopAddEvent,
      autoUpdateEventOnChange: props.autoUpdateEventOnChange,
      grid: props.grid,
      listMode: props.listMode,
      groups: props.groups,
      editable: props.editable,
      theme: props.theme,
      containerHeight: props.containerHeight
    })
    
    let lastRequestTimestamp: number | undefined
    const requestTimestamp = Date.now()
    const isMounting = !lastRequestTimestamp
    const runFunc =
      // don't call flushSync if React version already does sync rendering by default
      // guards against fatal errors:
      syncRenderingByDefault ||
      //
      isMounting ||
      isUpdating ||
      isUnmounting ||
      requestTimestamp - lastRequestTimestamp! < 100 // rerendering frequently
        ? runNow // either sync rendering (first-time or React 16/17) or async (React 18)
        : flushSync // guaranteed sync rendering
    

    calendars.renderStore.subscribe(() => {
      runFunc(() => {
        setCustomRenderingMap(calendars.renderStore.getState())
        forceUpdate()
      })

    })
    calendars.setAvalibleSlots(Object.keys(kebabToCamelKeys(props)))

    calendars.render()

    function emit(name:any,data:any){
      const f = props[name]
      if(f)props[name](data)
    }

    calendars.on('eventClicked',(payload:any)=>{
      emit('eventClicked',payload)
      // console.log(props.events)

    })
    
    calendars.on('eventUpdate',(payload:any)=>{
       emit('eventUpdate',payload)
    })

    runFunc(()=>{
     setCalendat(calendars)
    })
  }, []);

  const customRenderingNodes: JSX.Element[] = []
    
  for (const customRendering of customRenderingMap.values()) {
    
      if(!props[customRendering.name] ||  !customRendering.target.el) continue
       const vnode = props[customRendering.name]
       customRenderingNodes.push(<CustomRenderingComponent
       key={customRendering.id}
       data={customRendering.data}
       target={customRendering.target}
       customRendering={vnode} />)
  }

  return <div ref={elRef}>{customRenderingNodes}</div>
}

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
