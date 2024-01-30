import { EventClass } from '@full-event-calendar/shared-ts'

import {   createSignal, onCleanup, onMount } from 'solid-js'
import { useSlot } from '.'

let inctenceCout = 0
let activeInstence = 0
const [isSlotModalOpen, setIsModalOpen] = createSignal<boolean>(false)

export function useSlotModal(modalType: string, clearDataCb?: any) {
  inctenceCout++
  const thisInsctence = inctenceCout
  const [slotModalData, setSlotModalData] = createSignal<EventClass | null>(null)
  const [targetElRef, setTargetElRef] = createSignal<HTMLElement | null>(null)
  const [modalContainerRef, setModalRef] = createSignal<HTMLElement | null>(null)

  const [modalPosition, setModalPosition] = createSignal({
    top: '0px',
    left: '0px'
  })
  // createEffect(on(isSlotModalOpen,()=>{
  //   if(!isSlotModalOpen()){
  //     removeScrollListner()
  //   }
  // }))
  // Function to calculate modal position
  const calculateModalPosition = () => {
    setIsModalOpen(false)
    setTimeout(() => {

      const container = targetElRef()
      const modal = modalContainerRef()
  
      if (!container || !modal) return
  
      const containerRect = container.getBoundingClientRect()
      const modalRect = modal.getBoundingClientRect()
  
      const spaceTop = containerRect.top
      // const spaceRight = window.innerWidth - containerRect.right;
      // const spaceBottom = window.innerHeight - containerRect.bottom;
      // const spaceLeft = containerRect.left;
  
      // Find the side with the most available space
      // const maxSpace = Math.max(spaceTop, spaceRight, spaceBottom, spaceLeft);
      if (modalRect.height < spaceTop) {
        setModalPosition({
          top: containerRect.top - modalRect.height - 10 + 'px',
          left: containerRect.left + containerRect.width / 2 + 'px'
        })
      } else {
        setModalPosition({
          top: containerRect.top + containerRect.height - 10 + 'px',
          left: containerRect.left + containerRect.width / 2 + 'px'
        })
      }

      setTimeout(() => {
        activeInstence = thisInsctence
        // console.log(thisInsctence)
        setIsModalOpen(true)
        
      }, 0)
    }, 0)
  }
    
  function setScrollListner(){
     // scroll-wrapper 
    const scrollWrapper =  document.getElementById('scroll-wrapper')
    scrollWrapper?.addEventListener('scroll',closeModal)
  }
  function removeScrollListner(){
     // scroll-wrapper 
    const scrollWrapper =  document.getElementById('scroll-wrapper')
    scrollWrapper?.removeEventListener('scroll',closeModal)
  }

  onMount(() => {
    document.querySelector('#scroll-wrapper')?.addEventListener('scroll', () => {
      // remove modal
    })
  })
  onCleanup(() => {
    const container = targetElRef()
    container && container.removeEventListener('resize', calculateModalPosition)
    inctenceCout= 0
    const modal = modalContainerRef()
    modal && modal.removeEventListener('resize', calculateModalPosition)
  })

  
  //@ts-ignore
  function ClickOutSide(el: any, accessor: any) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      let someID = targetElRef()?.querySelector('.ec-event')?.id
      //@ts-ignore
      return !el.contains(e.target) && !(e.target?.id === someID) && accessor()?.()
    }
    document.addEventListener('mousedown', onClick)
    onCleanup(() => document.removeEventListener('mousedown', onClick))
  }
  let headerSlot: any = {
    el: null
  }

  function closeModal(){
    setIsModalOpen(false)
    removeScrollListner()
    setSlotModalData(null)
    if (clearDataCb) clearDataCb()
  }
  function modaClickOut() {
   
    if(activeInstence === thisInsctence){
      setTimeout(() => {
        if (isSlotModalOpen()) {
          setIsModalOpen(false)
          removeScrollListner()
          setSlotModalData(null)
          if (clearDataCb) clearDataCb()
        }
      }, 0);
    
    }else{
      if (isSlotModalOpen()) {
        setSlotModalData(null)
        if (clearDataCb) clearDataCb()
      }
 
    }

  }
  function saveModal() {
    setIsModalOpen(false)
    removeScrollListner()
    setSlotModalData(null)

    if (clearDataCb) clearDataCb()
  }

  const slotDependencies = () => {
    return { time: slotModalData(), saveModal: saveModal }
  }

  useSlot(headerSlot, slotDependencies, modalType, slotModalData)

  const modalElementNode = (
    <div ref={setModalRef} style={{ position: 'fixed', ...modalPosition() }} class="modal-container">
      {/* 
     //@ts-ignore */}
      <div use:ClickOutSide={modaClickOut}
        class="modal-wrapper"
        style={isSlotModalOpen() && (activeInstence === thisInsctence) ? 'opacity:1' : 'opacity:0;pointer-events:none'}
        ref={headerSlot.el}
      ></div>
    </div>
  )

  function openSlotModalOnElement(el: any) {
    setTargetElRef(el)
    calculateModalPosition()
    setScrollListner()
  }

  return { modalElementNode, isSlotModalOpen, setTargetElRef, setSlotModalData, setIsModalOpen, slotModalData, openSlotModalOnElement }
}
