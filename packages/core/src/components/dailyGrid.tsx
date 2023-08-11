import './dailyGrid.scss'
import { For, mergeProps } from 'solid-js'
import { unwrap } from 'solid-js/store'
function doEventsOverlap(event1: any, event2: any) {
  const start1 = event1.start
  const end1 = event1.end
  const start2 = event2.start
  const end2 = event2.end

  return start1 < end2 && end1 > start2
}

function createLinesOFGraph(mainEventList: any) {
  const eventList = mainEventList.sort(function (a: any, b: any) {
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

  console.log(lineList)
  return lineList
}

export function DailyGrid(props: any) {
  // console.log(props)

  const newProps = mergeProps(props)
  console.log(unwrap(newProps.events))
  const finalData = createLinesOFGraph(unwrap(newProps.events))

  let genders = Object.values(finalData)
  const topMargin = 'top: calc(5 * 80px);'
  function getTooop(top: any) {
    const top2 = top.start.getHours() * 60 + top.start.getMinutes()
    const persanm = top2 / 60
    return `top: calc(${persanm} * 80px);${getHouersss(top.start, top.end)}`
  }

  function getHouersss(start: Date, end: Date) {
    const top2 = start.getHours() * 60 + start.getMinutes()
    const t3 = end.getHours() * 60 + end.getMinutes()
    const gg = t3 - top2
    const persanm = gg / 60
    return `height: calc(${persanm} * 80px);`
  }
  return (
    <>
      <div class="fec-daily-grid">
        <div class="time-range">
          <For each={genders}>
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
        <div class="time-range">
          {/* <div class="test1">
              <div class='test2'></div>
            </div>
            <div class="test1">s</div>
            <div class="test1">s</div>
            <div class="test1">s</div> */}
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
      </div>
    </>
  )
}
