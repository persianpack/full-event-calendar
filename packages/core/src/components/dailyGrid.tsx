import './dailyGrid.scss'
import { For, createEffect, getOwner, mergeProps } from 'solid-js'
import { unwrap } from 'solid-js/store'
function doEventsOverlap(event1: any, event2: any) {
  const start1 = event1.start
  const end1 = event1.end
  const start2 = event2.start
  const end2 = event2.end

  return start1 < end2 && end1 > start2
}

function createLinesOfColome(mainEventList: any) {
  const eventList = [...mainEventList]

  eventList.sort(function (a: any, b: any) {
    return new Date(a.start).valueOf() - new Date(b.start).valueOf()
  })

  const lineList: any = {
    1: []
  }

  function checkList(num: any, event: any) {
    if (!lineList[num]) {
      lineList[num] = []
    }
    const arr = lineList[num]
    let hasFound = false
    for (let i = 0; i < arr.length; i++) {
      const ev = arr[i]
      const res = doEventsOverlap(event, ev)
      if (res) {
        hasFound = true
        break
      }
    }
    if (hasFound) {
      return checkList(num + 1, event)
    }
    return num
  }

  for (let i = 0; i < eventList.length; i++) {
    const num = checkList(1, eventList[i])
    lineList[num].push(eventList[i])
  }

  return lineList
}

export const DailyGrid: Component<{ events: InputEvent[] }> = (props) => {
  // console.log(props)

  // let genders = Object.values(finalData)
  const LinsList = () => {
    const finalData = createLinesOfColome(props.events)
    return Object.values(finalData)
  }

  function getTooop(top: any) {
    const top2 = top.start.getHours() + top.start.getMinutes() / 60
    const persanm = top2 * 100
    return `top: ${persanm}%;${getHouersss(top.start, top.end)}`
  }

  function getHouersss(start: Date, end: Date) {
    const top2 = start.getHours() * 60 + start.getMinutes()
    const t3 = end.getHours() * 60 + end.getMinutes()
    const gg = t3 - top2
    const persanm = (gg / 60) * 100
    return `height:  ${persanm}%;`
  }

  return (
    <>
      <div class="fec-daily-grid">
        <div class="time-range">
          <For each={LinsList()}>
            {(key: any, personIdx: any) => {
              return (
                <div class="test1">
                  <For each={key}>
                    {(item: any, theindex: any) => {
                      return (
                        <div class="test2" style={getTooop(item)}>
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
