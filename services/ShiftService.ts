import { ShiftDao } from "@/daos/ShiftDao"
import { duration } from "@mui/material"
import { startOfWeek, startOfToday, startOfMonth, endOfMonth, differenceInHours, compareAsc  } from 'date-fns'
export class ShiftService {
    private shiftDao: ShiftDao
    constructor() {
        this.shiftDao = new ShiftDao() 
    }
    async getSumOfHours(workPlacesIdsArray: string[], shiftOrBreak: 'shift' | 'break') {
        /**
         * This function has the top level responsibility for generating totals and durations for the WorkPlaceCard component.
         * @returns { { total, totalPastMonth, totalPastWeek }} - total times in Hours.
         */
        const today = startOfToday()
        const firstDayOfThisMonth = startOfMonth(today)
        const firstDayOfThisWeek = startOfWeek(today)
        
        const workPlacesDurations = await Promise.all( workPlacesIdsArray.map( async (id) =>{
            const shifts = await this.shiftDao.getShiftsByWorkPlaceIdLimitEarliestDate(firstDayOfThisMonth, id)
            const duration = this.calculateTimeMultipleDates(shifts, 'shift', firstDayOfThisWeek, firstDayOfThisMonth)
            return duration
            })
        )
        
        return workPlacesDurations
        
    }
    calculateTimeBetweenTwoDates() {

    }

    calculateTimeMultipleDates(events: any[], shiftOrBreak: 'shift' | 'break', firstDayOfThisWeek: Date, firstDayOfThisMonth: Date) {
        /**
         * This function receives an array of objects which contain 4 properties shift_start, shift_end, break_start, break_end,
         *  calculate the time for each, and returns the sum of all.
         * @returns {sting} - time in hours/hours+minutes.
         */
        let totalPastMonth = 0
        let totalPastWeek = 0
        let total = 0
        if (shiftOrBreak === 'shift') {
            for (const event of events) {
                const start = new Date(event[`${shiftOrBreak}_start`])
                const end = new Date(event[`${shiftOrBreak}_end`])
                const hoursDifference = differenceInHours(end, start)
                total += hoursDifference
                // check if the current shift is from the last week
                if (compareAsc(start, firstDayOfThisWeek) >= 0) totalPastWeek += hoursDifference
                if (compareAsc(start, firstDayOfThisMonth) >= 0) totalPastMonth += hoursDifference
            }
        }
        return { total, totalPastMonth, totalPastWeek }
    }

}

export const shiftService = new ShiftService