import './dailyGrid.scss'
import { For, Show, createEffect, createSignal, getOwner, mergeProps } from 'solid-js'
import { EventImpl } from '../api/EventImpl'
import {createLinesOfColome} from "./coleLine"
import { userDrager} from "./hooks/eventDraging"


export const DailyGrid: Component<{ events: EventImpl[] }> = (props) => {


  const ColList = () => {
    const finalData = createLinesOfColome(props.events)
    return Object.values(finalData)
  }

  const {draggedData,isDragging,itemDragstart}= userDrager()

  function getDragingStyle() {
    return `width : ${draggedData().width};height : ${draggedData().height};left:${draggedData().left} ; transition : ${draggedData().animation} ;
    top:${
      draggedData().top
    };position:fixed `
  }

  function draggingStatus(){
    return  isDragging() ? " drag-element-grabbiing" : " not-grabbing"
  }


  return (
    <>
      <div class="fec-daily-grid"  style="margin-top:200px">
        <div class="time-range">
          <For each={ColList()}>
            {(key: EventImpl[]) => {
              return (
                <div class="event-colom">
                  <For each={key}>
                    {(item) => {
                   
                      return (
                        <div
                          onMouseDown={[itemDragstart, item]}
                          id={'event-' + item.id}
                          class={`drag-element ec-event`}
                          style={item.calculatePositionAndHeight()}
                        >
                          <div> id : {item.id}</div>
                          <div>start :{item.start.toString()}</div>
                          <div>end :{item.end.toString()}</div>
                        </div>
                      )
                    }}
                  </For>
                </div>
              )
            }}
          </For>
        </div>

        <div class="time-range">123</div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="time-range"></div>
        <div class="wrapper-container">
          <Show when={isDragging()}>
            <div
              id={'draging-event-' + draggedData().item?.id}
              class={`drag-element ec-event drag-element-grabbiing`  }
              style={ getDragingStyle() }
            >
       
              <div> id : { getDragingStyle()}</div>
              <div>start :{draggedData().startHour.toString() + ' : ' + draggedData().startMin.toString()}</div>
              <div>end ::{draggedData().endHour.toString() + ' : ' + draggedData().endMin.toString()}</div>
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
