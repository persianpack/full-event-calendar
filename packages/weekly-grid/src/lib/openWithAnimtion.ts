import { createSignal } from "solid-js"

export function useContainerAnimtion(container:any){

    let cachecH = 0
    const [isOpen, setIsOpen] = createSignal(false)
    function openAllD() {
      const el = container.value as HTMLElement
      if (!isOpen()) {
        cachecH = el.clientHeight
        el.style.height = el.clientHeight + 'px'
        el.style.maxHeight = 'initial'
        setTimeout(() => {
          el.style.height = el.scrollHeight + 5 + 'px'
        }, 0)
        setTimeout(() => {
          el.style.height = 'fit-content'
        }, 500)
        setIsOpen(true)
      } else {
        el.style.height = el.clientHeight + 'px'
  
        setTimeout(() => {
          el.style.height = cachecH + 'px'
        }, 0)
        setTimeout(() => {
          el.style.height = 'fit-content'
          el.style.maxHeight = '112px'
        }, 500)
        setIsOpen(false)
      }
    }
    return {isOpen,openAllD}
}