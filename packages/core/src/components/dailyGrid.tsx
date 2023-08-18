import './dailyGrid.scss'
import { For, createEffect, getOwner, mergeProps } from 'solid-js'
import { Event } from '../api/EventImpl'

interface ColList {
  [key: number]: Event[]
}

function createLinesOfColome(eventList: Event[]) {
  const eventListCopy = [...eventList]

  eventListCopy.sort(function (a, b) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })

  const colList: ColList = {
    1: []
  }

  function findAvalibaleCol(colNumber: number, event: Event): number {
    if (!colList[colNumber]) {
      colList[colNumber] = []
    }

    const colEvents = colList[colNumber]
    let isColAvalibale = true

    for (let i = 0; i < colEvents.length; i++) {
      if (event.checkOverLap(colEvents[i])) {
        isColAvalibale = false
        break
      }
    }

    if (!isColAvalibale) {
      return findAvalibaleCol(colNumber + 1, event)
    }

    return colNumber
  }

  for (let i = 0; i < eventListCopy.length; i++) {
    const num = findAvalibaleCol(1, eventListCopy[i])
    colList[num].push(eventListCopy[i])
  }

  return colList
}

export const DailyGrid: Component<{ events: Event[] }> = (props) => {
  const ColList = () => {
    const finalData = createLinesOfColome(props.events)
    return Object.values(finalData)
  }

  return (
    <>
      <div class="fec-daily-grid">
        <div class="time-range">
          <For each={ColList()}>
            {(key: Event[]) => {
              return (
                <div class="event-colom">
                  <For each={key}>
                    {(item) => {
                      return (
                        <div class="ec-event" style={item.calculatePositionAndHeight()}>
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
        <div class="time-range"></div>
      </div>
    </>
  )
}
