import { EventClass } from "@full-event-calendar/shared-ts";
import { extractMonthDates, formatDDMMYYYY, getWeekDates } from "@full-event-calendar/utils";


type Modes = 'day' | 'week' | 'month'

interface handel {
    process: (eventList: EventClass[], initDate: Date) => GroupingCollection
}
abstract class CollectionGenerator {
    protected collection: GroupingCollection = {}

    generateCollection(eventList: EventClass[]) {
        for (let index = 0; index < eventList.length; index++) {
            const event = eventList[index];
            event.getIncludedDays().forEach((days) => {
                let foramtedDate = formatDDMMYYYY(days)
                if (foramtedDate in this.collection) {
                    this.collection[foramtedDate].push(event)
                }
            })
        }
    }
}

class DayGroup extends CollectionGenerator implements handel {
    process(eventList: EventClass[], initDatE: Date) {
        this.collection[formatDDMMYYYY(initDatE)] = []
        this.generateCollection(eventList)
        return this.collection
    }
}

class WeekGroup extends CollectionGenerator implements handel {
    process(eventList: EventClass[], initDatE: Date) {
        getWeekDates(initDatE).forEach(date => {
            this.collection[formatDDMMYYYY(date)] = []
        })
        this.generateCollection(eventList)
        return this.collection
    }
}

class MonthGroup extends CollectionGenerator implements handel {
    private calendar:string
    constructor(calendar:string){
        super()
        this.calendar = calendar
    }
    process(eventList: EventClass[], initDatE: Date) {
        extractMonthDates(initDatE, this.calendar).forEach(date => {
            this.collection[formatDDMMYYYY(date.date)] = []
        })
        this.generateCollection(eventList)
        return this.collection
    }
}




export class GroupEventList implements GroupEventListImpl {
    private handel: handel
    private initDate: Date
 
    constructor(mode: Modes, initDate: Date,calendar:string = 'gregory') {
        this.initDate = initDate
        switch (mode) {
            case 'day':
                this.handel = new DayGroup()
                break;
            case 'week':
                this.handel = new WeekGroup()
                break;
            case 'month':
                this.handel = new MonthGroup(calendar)
                break;

        }
    }
    group(eventList: EventClass[]) {
        return this.handel.process(eventList, this.initDate)
    }
}

interface GroupEventListImpl {
    group: (eventList: EventClass[]) => GroupingCollection
}


interface GroupingCollection {
    [key: string]: EventClass[]
}