// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { MonthDateObject } from '../MonthGrid'
// Utils
import { formatToShortTime, getEventsInDate, rightOrLeftInDate, useCalenderContainerState } from '@full-event-calendar/utils'
// Solid.js
import { For, Show, createSignal, onCleanup } from 'solid-js'
// Styles
import './MonthModal.scss'

interface ModalData {
  bottom: string
  left: string
  events: EventClass[]
  show: boolean
  somDate: Date
}

 

interface ModalProps {
  onDragStart: (draggingOnStartDate: Date,e:MouseEvent, event: EventClass) => void
  onDragEnd: () => void
  locale: string
  openEvSlotModalOnElement: any
  setEvModalElement: any
  setModalData: any
  modalData: any
}

export const EventModal: FComponent<ModalProps> = (props) => {
  //move this to utils
  //@ts-ignore
  function ClickOutSide(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.()
    document.addEventListener('click', onClick)
    onCleanup(() => document.removeEventListener('click', onClick))
  }

  function modalClickOutSide() {
    const modalDataCopy = { ...props.modalData }
    modalDataCopy.show = false
    props.setModalData(modalDataCopy)
  }
  let draggingEvent: EventClass | null = null
  const container = useCalenderContainerState()

  function handelMouseUp() {
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    container?.querySelector('#month-wrapper-id')?.classList.remove('month-is-dragging')
    props.onDragEnd()
    draggingEvent = null
  }

  function mouseMove(e:MouseEvent) {
    if (draggingEvent) {
      props.onDragStart(props.modalData.somDate,e, draggingEvent)
    }
  }

  function modalDragStart(event: EventClass) {
    draggingEvent = event
    document.addEventListener('mouseup', handelMouseUp)
    document.addEventListener('mousemove', mouseMove)
    container?.querySelector('#month-wrapper-id')?.classList.add('month-is-dragging')
  }

  function isNotAllDay(event: EventClass) {
    if (event?.isAllDay) {
      return !event?.isAllDay() ? 'month-item-no-all-day' : ''
    }
    return ''
  }

  function itemClick(eve:EventClass,e:MouseEvent){
    // console.log(e.target,eve)
    e.stopPropagation()
    e.preventDefault()
    props.setEvModalElement(eve)
    props.openEvSlotModalOnElement(e.target)
  }

  return (
    <Show when={props.modalData.show}>
      {/* 
      //@ts-ignore */}
      <div use:ClickOutSide={modalClickOutSide}
        class="modal-event-list custome-scroll-bar "
        style={`left:${props.modalData.left};top:${props.modalData.bottom};`}
      
      >
        <For each={props.modalData.events}>
          {(event) => (
            <div
              onclick={[itemClick,event]}
              class={`modal-event ${isNotAllDay(event)} ${rightOrLeftInDate(event, props.modalData.somDate)}`}
              onmousedown={[modalDragStart, event]}
              style={`background:${event.color};--ca-color:${event.color}`}
            >
              <div class="event-time-month">{`${
                isNotAllDay(event) ? formatToShortTime(event.start, props.locale) : ''
              } `}</div>
              <div class="event-name-month">{isNotAllDay(event) ? `(${event.name})` : event.name}</div>
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}
