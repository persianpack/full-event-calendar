import { BasicGrid } from '@full-event-calendar/basid-grid'
import { useCounter } from '../contex-injector/contex.jsx'
import { CalendarHeader } from './CalendarHeader/CalendarHeader.jsx'
import { For, createMemo } from 'solid-js'
import { DailyGrid } from '@full-event-calendar/daily-grid'
import { GroupGrid } from '@full-event-calendar/group-grid'
// import { DailyHeader } from './DailyHeader/DailyHeader.jsx'
import { FComponent, SourceEvent } from '@full-event-calendar/shared-ts'
import { Dynamic } from 'solid-js/web'
export function App() {
  const data = useCounter()

  function onEventUpdate(event: SourceEvent) {
    data.inctence.updateEvent(event.id, event)
    // console.log('easujdoiai');
  }

  function onDateChange(d: Date) {
    data.inctence.changeInitialDate(d.toISOString())
  }

  const filteredEvents = createMemo(() =>
    data.inctence.getEventForAdate(data.store.events, new Date(data.store.initialDate))
  )

  // function onHeaderDateClick() {
  //   console.log('dayClick')
  // }

  // const mappedArr = arr.map((it)=>{

  //   return (
  //         <Dynamic component={DailyGrid}  onEventUpdate={onEventUpdate}
  //              initialDate={new Date(data.store.initialDate)}
  //              events={filteredEvents()}>
  //         </Dynamic>
  //   )

  // })

  return (
    <>
      <div style="margin-top:200px;margin-bottom:200px">
        <div>
          <CalendarHeader
            headerDate={new Date(data.store.initialDate)}
            timeZone={data.store.timeZone}
            calendar="persian"
            onDateChange={onDateChange}
          />
          <GroupGrid
            columes={[
              { events: [] },
              { events: [] },
              { events: [] },
              { events: [] },
              { events: [] },
              { events: [] },
              { events: [] }
            ]}
            onEventUpdate={onEventUpdate}
            initialDate={new Date(data.store.initialDate)}
            events={filteredEvents()}
          />
          {/* {mappedArr} */}

          {/* <DailyGrid
               onEventUpdate={onEventUpdate}
               initialDate={new Date(data.store.initialDate)}
               events={filteredEvents()}
            /> */}
          {/* <DailyGrid
           
             initialDate={new Date(data.store.initialDate)}
             events={filteredEvents()}
        />
        <DailyGrid
          
          initialDate={new Date(data.store.initialDate)}
          events={filteredEvents()}
        /> */}
          {/* <DailyGrid
          onEventUpdate={onEventUpdate}
          initialDate={new Date(data.store.initialDate)}
          events={filteredEvents()}
        />
        <DailyGrid
          onEventUpdate={onEventUpdate}
          initialDate={new Date(data.store.initialDate)}
          events={filteredEvents()}
        /> */}
        </div>
      </div>
    </>
  )
}

const WhyC: FComponent<{ gruops: any }> = (props) => {
  console.log(props.children)

  // const mapdedGroup = .map(item=>{
  //   return (
  //     <Dynamic component={DailyGrid}  onEventUpdate={onEventUpdate}
  //          initialDate={new Date(data.store.initialDate)}
  //          events={filteredEvents()}>

  //       </Dynamic>
  //   )
  // })

  return <>{/* {props.children} */}</>
}
