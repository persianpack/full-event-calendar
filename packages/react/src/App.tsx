import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {FullEventCalendar} from './components/FullEventCalendar'
import { events } from '@full-event-calendar/test-events'

import { DailyGridPlugin } from '@full-event-calendar/daily-grid'
import { MonthGridPlugin } from '@full-event-calendar/month-grid'
import { WeeklyGridPlugin } from '@full-event-calendar/weekly-grid'
import { ListPlugin } from '@full-event-calendar/list/dist/index.js'
import '@full-event-calendar/core/dist/main.css'
import { MyFullCalendar } from './components/FullCalendar'
//@ts-nocheck
function AddModalSlot(props){
  return <div>daily header slot</div>
}
function EventClickSlot(props){
    console.log(props)
  return <div className='eventClick'> i dont like react {props?.time?.start.toString()} </div>
}
function EventaddModalSlot(props){
  
  function saveBtnClik(){
    props.saveModal()
    props.someProp(props.time.sourceEvent)
  }
  return <div className='eventClick' style={{background:'red'}} > i dont like react 
  
  <button className='' onClick={saveBtnClik}>SAVE</button>
   </div>
}
function App() {
  const [count, setCount] = useState(new Date('Thu Aug 10 2023 15:00:0'))
  const [eventsR, setEvents] = useState(events)
// setTimeout(() => {
//   setCount(new Date())
// }, 5000);

function asaveEv(ev){
  console.log('save me')
  let arr = [...eventsR,ev]
  console.log(arr)
  setEvents(arr)
 
}
useEffect(()=>{
  // console.log('download',eventsR)
},[eventsR])

console.log('mount')
const  onEveUpdate = (data)=>{
  console.log(eventsR,data)
  const eventsCopy = [...eventsR] 
  let ind = eventsCopy.findIndex(item=>item.id === data.id)
  eventsCopy[ind] = data.next.sourceEvent
  setEvents(eventsCopy)
  // console.log(eventsR)
  // setTimeout(() => {
  //   console.log(eventsR)
  // }, 2000);
}

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card" style={{width:'1500px'}}>
      
        <FullEventCalendar
         plugins={[DailyGridPlugin,WeeklyGridPlugin,MonthGridPlugin,ListPlugin]}
         dailyHeader={<AddModalSlot />}
         events={eventsR} 
         eventClick={<EventClickSlot someProp={asaveEv}/>}
         autoUpdateEventOnChange={true}
         editable={true}
         addModal={<EventaddModalSlot someProp={asaveEv}/>}
         stopAddEvent={true}
         initialDate={count}
         eventUpdate={onEveUpdate}
        ></FullEventCalendar>
      </div>
     
    </>
  )
}

export default App
