import { EventClass, FComponent } from '@full-event-calendar/shared-ts'
import './WeeklyAllDayHeader.scss'
import { For, Show, createMemo } from 'solid-js'
import { filterEventsByDateRange } from '@full-event-calendar/utils'
import { addEventsToRows, MonthEvent, getExtraRows, useMonthEventDragging } from '@full-event-calendar/month-grid'

interface WeeklyAllDayHeaderProps {
  events: EventClass[]
  columes: Date[]
}

interface matrix {
  [key: string]: EventClass[]
}

export const WeeklyAllDayHeader: FComponent<WeeklyAllDayHeaderProps> = (props) => {
  const rangedEvents = createMemo(
    () => filterEventsByDateRange(props.events, props.columes[0], props.columes[6]) as EventClass[]
  )
  const filterdEvents = () =>
    rangedEvents().filter((item) => {
      return item.isAllDay()
    })

  // const y = getMonthRows( props.columes[0], props.columes[6],props.events)

  const getMatrrixx = createMemo(() => {
    let rooo: matrix = {}

    addEventsToRows(filterdEvents(), rooo)

    const lok = getExtraRows(rooo, props.columes[0], props.columes[6], 2)
    console.log(lok)
    return rooo
  })

  const { dragEnd, onEventDrag, mousenedter, draggingEvent } = useMonthEventDragging()

  return (
    <div class="weekly-allDay" id="month-wrapper-id">
      <div class="week-all-day-wrapper" style="width:calc(100% / 7)">
        <Show when={!!draggingEvent()}>
          {/* <MonthEvent onEnd={()=>{}} ondrag={()=>{}} item={draggingEvent() as unknown as EventClass} dateEnd={item1[6].date} date={item1[0].date} /> */}
          <MonthEvent
            onEnd={() => {}}
            ondrag={() => {}}
            item={draggingEvent() as unknown as EventClass}
            dateEnd={props.columes[6]}
            date={props.columes[0]}
          />
        </Show>
      </div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[0])}>
        <For each={Object.keys(getMatrrixx())}>
          {(item) => (
            <div class="alld-con">
              <For each={getMatrrixx()[item]}>
                {(item3) => (
                  // <div></div>
                  <MonthEvent
                    onEnd={dragEnd}
                    ondrag={onEventDrag}
                    item={item3}
                    date={props.columes[0]}
                    dateEnd={props.columes[6]}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[1])}></div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[2])}></div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[3])}></div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[4])}></div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[5])}></div>
      <div class="week-allday-container" onmousemove={(e) => mousenedter(props.columes[6])}></div>
    </div>
  )
}

{
  /* <MonthEvent onEnd={()=>{}} ondrag={()=>{}} item={rooo[item]} date={props.columes[0]} dateEnd={props.columes[6]}/> */
}
