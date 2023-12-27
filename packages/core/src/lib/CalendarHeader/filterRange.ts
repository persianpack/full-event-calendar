import { EventClass } from "@full-event-calendar/shared-ts"
import { CalendarState } from "../../store/store"
import { getCalendarMonthDays, getWeekDates } from "@full-event-calendar/utils"


interface Formater {
    proccess: (calendarState: CalendarState) => string
}

class DailyFormat implements Formater {
    proccess(calendarState: CalendarState) {
        const options: any = {
            month: 'long',
            year: 'numeric',
            day: 'numeric',
            calendar: calendarState.calendar,
            timeZone: calendarState.timeZone
        }
        // return getEventsInDate(eventList, initDate)
        return new Intl.DateTimeFormat(calendarState.locale, options).format(new Date(calendarState.initialDate))
    }
}

class WeeklyFormat implements Formater {
    proccess(calendarState: CalendarState) {
        const listWeekOptions: any = {
            year: "numeric",
            month: "short",
            day: "numeric",
        }
        const weekends = getWeekDates(new Date(calendarState.initialDate))
        //@ts-ignore
        return new Intl.DateTimeFormat(calendarState.locale, listWeekOptions).formatRange(weekends[0], weekends[weekends.length - 1]) as string
    }
}
 
class MonthFormat implements Formater {
    proccess(calendarState: CalendarState) {
        const options: any = {
            month: 'long',
            year: 'numeric',
            calendar: calendarState.calendar,
            timeZone: calendarState.timeZone
        }
        // return getEventsInDate(eventList, initDate)
        return new Intl.DateTimeFormat(calendarState.locale, options).format(new Date(calendarState.initialDate))
    }
}

class ListFormat implements Formater {
    proccess(calendarState: CalendarState) {
        if (calendarState.listMode === 'week') {
            return new WeeklyFormat().proccess(calendarState)
        }
        if (calendarState.listMode === 'month') {
            return new MonthFormat().proccess(calendarState)
        }
        return new DailyFormat().proccess(calendarState)
    }
}

export class HeaderFormat {
    protected handle: Formater
    private calendarSate: CalendarState
    constructor(calendarState: CalendarState) {
        this.calendarSate = calendarState
        switch (calendarState.grid) {
            case 'daily':
                this.handle = new DailyFormat()
                break
            case 'weekly':
                this.handle = new WeeklyFormat()
                break
            case 'month':
                this.handle = new MonthFormat()
                break
            case 'list':
                this.handle = new ListFormat()
                break
            default:
                this.handle = new DailyFormat()
                break;
        }
    }

    format(): string {
        return this.handle.proccess(this.calendarSate)
    }
}
