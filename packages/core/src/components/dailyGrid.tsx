import './dailyGrid.scss'

export function DailyGrid(props: any) {
  console.log(props)

  return (
    <>
      <div class="fec-daily-grid">
        <div class="time-range">
          <div class="events-wraper">
            <div class="ec-event" style="top: 5%;height: 25%;"></div>
            <div class="ec-event" style="top: 20%;height: 20%;"></div>
            <div class="ec-event" style="top: 30%;height: 45%;">
              <div class="back-events" style="top:200px">
                {/* <div class='events-wraper' >
                                    <div class='ec-event' style="top: 5%;height: 215%;"></div>
                                    <div class='ec-event' style="top: 20%;height: 210%;"></div>
                                    <div class='ec-event' style="top: 30%;height: 415%;">
                                        <div class='back-events' style="top:200px">




                                        </div>
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
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
