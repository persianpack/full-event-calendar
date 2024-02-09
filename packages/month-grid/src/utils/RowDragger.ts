import { EventClass } from "@full-event-calendar/shared-ts"
import { NewDraggingController, daysDiffInRange } from "@full-event-calendar/utils"


abstract class DraggerHandeler {

  container:HTMLElement;
  constructor(container:HTMLElement){
    this.container = container
  }

}
class RowEditDragger extends DraggerHandeler implements MonthDraggerss {
    draggingController:NewDraggingController|null = null
    private startingDate: Date | null = null
    private currentDate: number | null = null
    onDragStart(event: EventClass,mouseEvent:MouseEvent, startDate?: Date){
      this.draggingController = new NewDraggingController(mouseEvent, event,this.container)
  
      if (startDate) {
        this.startingDate = startDate
      }
  
    }
    onMouseEnter(date: Date,draggerChange:Function) {
      if (this.startingDate) {
        let dayDifference = daysDiffInRange(this.startingDate, date)
        if (this.currentDate != dayDifference) {
          this.currentDate = dayDifference
  
          this.draggingController?.shiftTimeByDay(dayDifference)
          draggerChange()
        }
      } else {
        this.startingDate = date
      }
    }
    onDragEnd(){
      this.startingDate = null
    }
  }


  class RowAddDragger extends DraggerHandeler implements MonthDraggerss {
    draggingController:NewDraggingController|null = null
    private startingDate: Date | null = null
    private currentDate: number | null = null
    onDragStart(event: EventClass,mouseEvent:MouseEvent, startDate?: Date){
      this.draggingController = new NewDraggingController(mouseEvent, event,this.container)
  
      if (startDate) {
        this.startingDate = startDate
      }
  
    }
    onMouseEnter(date: Date,draggerChange:Function) {
      if (this.startingDate) {
        let dayDifference = daysDiffInRange(this.startingDate, date)
        if (this.currentDate != dayDifference) {
          this.currentDate = dayDifference
          if(dayDifference<0){
              this.draggingController?.shiftStartByDay(dayDifference)
              this.draggingController?.shiftEndByDay(0) 
            }else if(dayDifference>0){
              this.draggingController?.shiftEndByDay(dayDifference)
              this.draggingController?.shiftStartByDay(0)

          }else{
            this.draggingController?.shiftEndByDay(dayDifference)
            this.draggingController?.shiftStartByDay(dayDifference)
          }
          draggerChange()
        }
      } else {
        this.startingDate = date
      }
    }
    onDragEnd(){
      this.startingDate = null
    }
  }
  
  interface  MonthDraggerss {
    draggingController:NewDraggingController|null
    onDragStart:(event: EventClass,mouseEvent:MouseEvent, startDate?: Date)=>void
    onMouseEnter:(date: Date,draggerChange:Function)=>void
    onDragEnd:()=>void
  }
  
  export type DraggerTypes = 'editEventRow' | 'addEventRow'
  export class RowDragger {
    dragger : MonthDraggerss
    draggerMode:DraggerTypes
    constructor(draggerMode:DraggerTypes,container:HTMLElement){
        this.draggerMode = draggerMode
        switch (draggerMode) {
            case 'editEventRow':
                this.dragger = new RowEditDragger(container)
                break;
            case 'addEventRow':
                this.dragger = new RowAddDragger(container)
                break;
            default:
                this.dragger = new RowEditDragger(container)
                break;
        }
    }
  }