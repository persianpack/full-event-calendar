import { MonthEvent, addEventsToRows, useMonthEventDragging } from '@full-event-calendar/month-grid'
import { EventClass, FComponent, Group, SourceEvent } from '@full-event-calendar/shared-ts'
import { For, createEffect, createMemo } from 'solid-js'
import { rowList } from '../WeeklyAllDayHeader'
import { EventImpl } from '@full-event-calendar/utils'
import { DraggerTypes } from '@full-event-calendar/month-grid/src/utils/RowDragger'
import './DateCol.scss'

interface DateColProps {
  filteredEvents: EventClass[]
  onEventUpdate: (event: any) => void
  onAddEvent:(event: SourceEvent,groupId?:Group['id']) =>void
  headerDates:Date[]
  locale: string
  setDraggingDate:any
}

export const DateCol: FComponent<DateColProps> = (props) => {

  const { onDragEnd, onDragStart, onMouseEnter, draggingEventData,changeDraggerType} = useMonthEventDragging(dragEnd)

  createEffect(()=>{
    props.setDraggingDate(draggingEventData)
  })

  const getRowList = createMemo(() => {
    let rowList: rowList = {}
    addEventsToRows(props.filteredEvents, rowList)
    return rowList
  })

  function getRowListArr() {
    return Object.keys(getRowList())
  }

  function dataColMouseDown(date:Date,e:MouseEvent){
    e.stopPropagation()
    e.preventDefault()

    const basdate = new Date(date)
    const endDate = new Date(date)
    basdate.setHours(0, 0)
    endDate.setHours(23,59,59)

    const x = new EventImpl({ start: basdate, end: endDate, name: '(no title)', id: 85 })
    changeDraggerType('addEventRow')
    onDragStart(x,e)
    const handeler = ()=>{
      onDragEnd()
      changeDraggerType('editEventRow')
      document.removeEventListener('mouseup',handeler)
    }
    document.addEventListener('mouseup',handeler)
  }

  function dragEnd(event:EventClass,draggerMode:DraggerTypes)  {
    if(draggerMode === 'editEventRow'){
      props.onEventUpdate(event)
    }else{
      props.onAddEvent(event)
    }
  }

  return (
    <>
      {/* each colum box has a mouse move for handling drag  */}
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="1"
        onmousedown={[dataColMouseDown, props.headerDates[0]]}
        onmousemove={() => onMouseEnter(props.headerDates[0])}
      >
        {/* loop on each row list */}
        <For each={getRowListArr()}>
          {(item) => (
            <div class="week-all-day-container">
              {/* loop on each event in a row list and use monthly grid components for this */}
              <For each={getRowList()[item]}>
                {(item3) => (
                  <MonthEvent
                    locale={props.locale}
                    isFirstRow={true}
                    onDragEnd={onDragEnd}
                    ondragstart={onDragStart}
                    item={item3}
                    startDate={props.headerDates[0]}
                    endDate={props.headerDates[6]}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="2"
        onmousemove={() => onMouseEnter(props.headerDates[1])}
        onmousedown={[dataColMouseDown, props.headerDates[1]]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="3"
        onmousemove={() => onMouseEnter(props.headerDates[2])}
        onmousedown={[dataColMouseDown, props.headerDates[2]]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="4"
        onmousemove={() => onMouseEnter(props.headerDates[3])}
        onmousedown={[dataColMouseDown, props.headerDates[3]]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="5"
        onmousemove={() => onMouseEnter(props.headerDates[4])}
        onmousedown={[dataColMouseDown, props.headerDates[4]]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="6"
        onmousemove={() => onMouseEnter(props.headerDates[5])}
        onmousedown={[dataColMouseDown, props.headerDates[5]]}
      ></div>
      <div
        class="week-all-day-container123"
        data-test-id-all-w-c="7"
        onmousemove={() => onMouseEnter(props.headerDates[6])}
        onmousedown={[dataColMouseDown, props.headerDates[6]]}
      ></div>
    </>
  )
}
