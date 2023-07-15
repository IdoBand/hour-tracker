import { ShiftDao } from "@/daos/ShiftDao"
import { startOfWeek, startOfToday, startOfMonth, endOfMonth, differenceInHours, compareAsc } from 'date-fns'
import { Shift } from "@/types/types"
import { WorkPlaceDao, workPlaceDao } from "@/daos/WorkPlaceDao"
export class ShiftService {
    private shiftDao: ShiftDao
    private workPlaceDao: WorkPlaceDao
    constructor() {
        this.shiftDao = new ShiftDao()
        this.workPlaceDao = workPlaceDao 
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
            const shifts = await this.shiftDao.getShifts(firstDayOfThisMonth, id)
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
         * @param {events} 
         * @param {string} shiftOrBreak        states which pair to calculate.
         * @param {Date}   firstDayOfThisWeek
         * @param {Date}   firstDayOfThisMonth
         * @returns {string} - time in hours/hours+minutes.
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
                // check if the current shift is from the past month
                if (compareAsc(start, firstDayOfThisMonth) >= 0) totalPastMonth += hoursDifference
            }
        }
        return { total, totalPastMonth, totalPastWeek }
    }
    async getAllShifts(workPlaceId: string) {
        /**
         * Gets all shifts by 'workPlaceId' ordered by 'shiftStart' date in descending order.
         * @returns {Shift[]}.
         */
        try {
            const shifts = await this.shiftDao.getAllShifts(workPlaceId)
            return shifts
        } catch (err) {
            console.log(err)
        }
    }
    async addShift(shift: Shift) {
        try {
            const response = await this.shiftDao.addShift(shift)

            return response
        } catch (err) {
            console.log('Service Failed to add shift');
            console.log(err);
        }
    }
    async editShift(shift: Shift) {
        try {
            const response = await this.shiftDao.editShift(shift)

            return response
        } catch (err) {
            console.log('Service Failed to add shift');
            console.log(err);
        }
    }
    async deleteShifts(ids: string[], workPlaceId: string) {
        try {
            const response = await this.shiftDao.deleteShifts(ids)
            if (response!.count > 0) {

                return response
            }
            
        } catch (err) {
            console.log(err);
            
        }
    }
    async determineLastShift(workPlaceId: string) {
        //             NOT IN USE FOR NOW
        /**
         * Every time a shift is added/edited/deleted, this function will determine if the lastShift column in the 'workplace' table
         * needs to be updated or not and act accordingly.
         * lastShiftInShiftTable:     {shiftStart: Date | null}
         * lastShiftInWorkPlaceTable: {lastShift: Date | null}
         * @param {string} workPlaceId string in uuid format.
         * @returns { null }
         */
        const lastShiftInShiftTable = await this.shiftDao.getLastShiftByWorkPlaceId(workPlaceId)
        const lastShiftInWorkPlaceTable = await this.workPlaceDao.getLastShift(workPlaceId)
        console.log('--------------------------------- shit table');
        
        console.log(lastShiftInShiftTable);
        console.log('--------------------------------- workplace table');
        console.log(lastShiftInWorkPlaceTable);

        if (!lastShiftInShiftTable!.shiftStart || !lastShiftInWorkPlaceTable!.lastShift) {
            console.log(' no check has been made');
            
            return
        }
        const check = compareAsc(lastShiftInShiftTable!.shiftStart, lastShiftInWorkPlaceTable!.lastShift)
        console.log(`--------->>>>>>>>>>>>>>>>>>>>>>>>>`);
        console.log(check);
        console.log(`--------->>>>>>>>>>>>>>>>>>>>>>>>>`);
        
        if (check > 0) {
            const update = await this.workPlaceDao.updateLastShift(lastShiftInShiftTable!.shiftStart, workPlaceId)
        }
        return
    }
}

export const shiftService = new ShiftService