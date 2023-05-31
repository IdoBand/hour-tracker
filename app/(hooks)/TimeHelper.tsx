import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    getYear,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    formatISO,
    startOfToday,
    differenceInDays,
    differenceInYears,
    differenceInMinutes,
    differenceInHours
  } from 'date-fns'
class TimeHelperClass {
    calculateHoursTwoDates(start: string, end: string) {
        /**
         * This function receives 2 ISO 8601 string and calculates the hours difference between them.
         * @returns {number} - time unit in hours.
         */
        const startDate = new Date(start)
        const endDate = new Date(end)
        const totalHours = differenceInMinutes(endDate, startDate) / 60
        return totalHours
        
    }
    calculateTimeTwoDatesString(start: string, end: string) {
        /**
         * This function receives 2 ISO 8601 string and calculates the difference in time between them.
         * @returns {sting} - time in hours/hours+minutes.
         */
        const startDate = new Date(start)
        const endDate = new Date(end)
        const minutesDifference = differenceInMinutes(endDate, startDate)
        return this.generateTimeDescriptionString(minutesDifference)
    }
    calculateTimeMultipleDate(events: any[]) {
        /**
         * This function receives an array of objects which contain 2 properties start and end ISO 8601 strings,
         *  calculate the time for each, and returns the sum of all.
         * @returns {sting} - time in hours/hours+minutes.
         */
        let total = 0
        for (const event of events) {
            const start = new Date(event.start)
            const end = new Date(event.end)
            total += differenceInMinutes(end ,start)
        }
        return this.generateTimeDescriptionString(total)
    }
    generateTimeDescriptionString(minutes: number): string {
        /**
         * This function receives a number that represents minutes and returns time in hours/hours+minutes.
         * for example: '1 Hr 30 mins', '7Hr' .
         * @returns {sting} - time in hours/hours+minutes.
         */
        if (minutes === 0) {
            return '0'
        } else if (minutes % 60 === 0) {
            return `${minutes / 60} Hr`
        } else if(minutes / 60 < 1) {
            return `${minutes} mins`
        } else {
            return `${Math.floor(minutes / 60)} Hr ${minutes % 60} mins`
        }
    }
    calculateYearlyDuration(start: string, end: string) {
        if (!end) {
            end = formatISO(new Date())
        } 
        const startDate = new Date(start)
        const endDate = new Date(end)
        const daysDifference = differenceInDays(endDate, startDate)
        if (daysDifference < 365){
            return daysDifference.toString()
        } else if (daysDifference > 365 && daysDifference % 365 !== 0) {
            const yearsDifference = differenceInYears(endDate, startDate)
            const remainingDays = daysDifference - yearsDifference * 365
            return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''} and ${remainingDays} Days`
        } else {
            const yearsDifference = differenceInYears(endDate, startDate)
            return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''}`
        }
    }
    
}

export const TimeHelper = new TimeHelperClass()