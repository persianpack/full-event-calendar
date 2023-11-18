// Types
import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import { MonthDateObject } from '../MonthGrid'
// Utils
import { getEventsInDate, isEventRightOrLeftOrNone } from '@full-event-calendar/utils'
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

const [modalData, setModalData] = createSignal<ModalData>({
  bottom: '0px',
  left: '0px',
  events: [],
  show: false,
  somDate: new Date()
})

export function openModal(data: MonthDateObject, e: MouseEvent, events: EventClass[]) {
  const eventsModal = getEventsInDate(events, data.date)
  const target = e.target as HTMLElement
  const targetRect = target.getBoundingClientRect()
  const containerRect = document.getElementById('month-wrapper-id')?.getBoundingClientRect() as DOMRect
  const modalDataCopy = { ...modalData() }

  modalDataCopy.left = targetRect.left + 'px'
  modalDataCopy.bottom = targetRect.top - containerRect.top + 'px'
  modalDataCopy.show = true
  modalDataCopy.events = eventsModal
  modalDataCopy.somDate = data.date

  setModalData(modalDataCopy)
}

interface ModalProps {
  onDragStart: (draggingOnStartDate: Date, event: EventClass) => void
  onDragEnd: () => void
}

export const EventModal: FComponent<ModalProps> = (props) => {
  //move this to utils
  //@ts-ignore
  function ClickOutSide(el: any, accessor: any) {
    const onClick = (e: any) => !el.contains(e.target) && accessor()?.()
    document.body.addEventListener('click', onClick)
    onCleanup(() => document.body.removeEventListener('click', onClick))
  }

  function modalClickOutSide() {
    const modalDataCopy = { ...modalData() }
    modalDataCopy.show = false
    setModalData(modalDataCopy)
  }
  let draggingEvent: EventClass | null = null

  function handelMouseUp() {
    document.removeEventListener('mouseup', handelMouseUp)
    document.removeEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.remove('month-is-dragging')
    props.onDragEnd()
    draggingEvent = null
  }

  function mouseMove() {
    if (draggingEvent) {
      props.onDragStart(modalData().somDate, draggingEvent)
    }
  }

  function modalDragStart(event: EventClass) {
    draggingEvent = event
    document.addEventListener('mouseup', handelMouseUp)
    document.addEventListener('mousemove', mouseMove)
    document.getElementById('month-wrapper-id')?.classList.add('month-is-dragging')
  }

  return (
    <Show when={modalData().show}>
      {/* 
      //@ts-ignore */}
      <div
        use:ClickOutSide={modalClickOutSide}
        class="modal-event-list"
        style={`left:${modalData().left};top:${modalData().bottom}`}
      >
        <For each={modalData().events}>
          {(event) => (
            <div
              class={`modal-event ${isEventRightOrLeftOrNone(event, modalData().somDate)}`}
              onmousedown={[modalDragStart, event]}
            >
              {event.id}
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}
