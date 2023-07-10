import { ShiftDao } from "@/daos/ShiftDao"
import { startOfWeek, startOfToday, startOfMonth, endOfMonth, differenceInHours, compareAsc } from 'date-fns'
export class ShiftService {
    private shiftDao: ShiftDao
    constructor() {
        this.shiftDao = new ShiftDao() 
    }
    async getSumOfHours(workPlacesIdsArray: string[], shiftOrBreak: 'shift' | 'break') {
        /**
         * This function has the top level responsibility for generating totals and durations for the WorkPlaceCard component.
         * for each workPlace it fetches the all shifts from DB, sums up the total hours of work and on the way 
         * filters the hours of the past month and week.
         * @returns { { total, totalPastMonth, totalPastWeek } } - total times in Hours.
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

    calculateTimeMultipleDates(events: any[], shiftOrBreak: 'shift' | 'break', firstDayOfThisWeek: Date, firstDayOfThisMonth: Date) {
        /**
         * This function receives an array of objects which contain 4 properties shiftStart, shiftEnd, breakStart, breakEnd,
         *  calculate the time difference between start-end for each pair, and returns the sum of all.
         * @returns {sting} - time in hours/hours+minutes.
         */
        let totalPastMonth = 0
        let totalPastWeek = 0
        let total = 0
        if (shiftOrBreak === 'shift') {
            for (const event of events) {
                const start = new Date(event[`${shiftOrBreak}Start`])
                const end = new Date(event[`${shiftOrBreak}End`])
                const hoursDifference = differenceInHours(end, start)
                total += hoursDifference
                // check if the current shift is from the past week
                if (compareAsc(start, firstDayOfThisWeek) >= 0) totalPastWeek += hoursDifference
                // check if the current shift is from the past week
                if (compareAsc(start, firstDayOfThisMonth) >= 0) totalPastMonth += hoursDifference
            }
        }
        return { total, totalPastMonth, totalPastWeek }
    }
    async getAllShifts(workPlaceId: string) {
        /**
         * Gets all shifts by work place id
         * @returns {Shift[]}.
         */
        try {
            const shifts = await this.shiftDao.getAllShiftsByWorkPlaceId(workPlaceId)
            return shifts
        } catch (err) {
            console.log(err)
        }
    }
}

export const shiftService = new ShiftService