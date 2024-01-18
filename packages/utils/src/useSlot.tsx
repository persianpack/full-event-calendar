// import { Calendar } from '../Calendar'
import { createContext, createEffect, createUniqueId, on, onCleanup, onMount, useContext } from 'solid-js'
import type { Context } from 'solid-js'
// import { CalendarState } from '../store/store'
import { FComponent } from '@full-event-calendar/shared-ts'

const CustomeRenderContext = createContext() as Context<ContextProvider>
interface ContextProvider {
  slotRenderer: any
  avalibalSots: any
}

export const SlotProvider: FComponent<ContextProvider> = (props) => {
  const data = {
    slotRenderer: props.slotRenderer,
    avalibalSots: props.avalibalSots
  }
  return <CustomeRenderContext.Provider value={data}>{props.children}</CustomeRenderContext.Provider>
}

export function useSlotState() {
  return useContext(CustomeRenderContext)
}

export function useSlot(target:any,data:any,slotName:any,dep:any) {
  const slotId = createUniqueId()
  
  const context = useContext(CustomeRenderContext)

  const isSlotAvalibale = context.avalibalSots.includes(slotName)
  
  context.slotRenderer.dispatch({
    name: slotName,
    target: target,
    data:data(),
    id: slotId
  })

  let mounted = false

  createEffect(on(dep,() => {
    if(!mounted) return
    context.slotRenderer.dispatch({
      name: slotName,
      target: target,
      data:data(),
      id: slotId
    })
  },{'defer':true}))

  onMount(()=>{
    mounted = true
  })
  onCleanup(()=>{
    context.slotRenderer.remove(slotId)
  })

  return {isSlotAvalibale}
}
