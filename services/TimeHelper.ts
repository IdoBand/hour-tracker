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
    calculateHoursTwoDates(start: Date, end: Date) {
        /**
         * This function receives 2 Date instances and calculates the hours difference between them.
         * @returns {number} - time unit in hours.
         */
        const totalHours = differenceInMinutes(end, start) / 60
        return totalHours
    }
    calculateTimeTwoDates(start: Date, end: Date) {
        /**
         * This function receives 2 Date instances and calculates the difference in time between them.
         * @returns {sting} - time in hours/hours+minutes.
         */
        const minutesDifference = differenceInMinutes(end, start)
        return this.generateHourlyDurationString(minutesDifference)
    }
    calculateTimeMultipleDates(events: any[]) {
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
        return this.generateHourlyDurationString(total)
    }
    generateHourlyDurationString(minutes: number): string {
        /**
         * This function receives a number that represents minutes and returns time in hours/hours+minutes.
         * for example: '1 Hr 30 mins', '7Hr' .
         * @returns {sting} - time in hours/hours+minutes.
         */
        if (minutes === 0) {
            return '0'
        } else if (minutes % 60 === 0) {
            return `${minutes / 60} Hr`
        } else if (minutes / 60 < 1) {
            return `${minutes} mins`
        } else {
            return `${Math.floor(minutes / 60)} Hr ${minutes % 60} mins`
        }
    }
    calculateYearlyDuration(start: Date, end: Date) {
        /**
         * This function receives 2 Date instances and calculates the time difference between them in days,
         * then returns a string description in years / days.
         * @returns {string} - time unit in years / days.
         */

        const daysDifference = differenceInDays(end, start)
        if (daysDifference < 365){
            return `${daysDifference.toString()} days`
        } else if (daysDifference > 365 && daysDifference % 365 !== 0) {
            const yearsDifference = differenceInYears(end, start)
            const remainingDays = daysDifference - yearsDifference * 365
            return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''} and ${remainingDays} Days`
        } else {
            const yearsDifference = differenceInYears(end, start)
            return `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''}`
        }
    }
    validateShiftTimes(shiftStartDate: Date, shiftEndDate: Date, breakStartDate: Date, breakEndDate: Date) {
        /**
         * This function receives 4 date strings and compares them.
         * constrains covered:
         * 1. Shift duration cannot be <= 0.
         * 2. Shift start date cannot occur after shift end.
         * 3. Break start date cannot occur before shift start or after.
         * 4. Break end date cannot occur after shift end.
         * 5. Break start date cannot occur after break end.
         *  
         * If all dates follow these constraints the function returns true
         * @returns {isDataValid: boolean, issues: string[]}.
         */
        interface validationResultObjectProps{
            isDataValid: boolean
            issues: string[]
        }
        let validationResultObject: validationResultObjectProps = {
            isDataValid: true,
            issues: []
        }

        const shiftDuration = this.calculateHoursTwoDates(shiftStartDate, shiftEndDate)
        if (!shiftDuration) {
            validationResultObject.isDataValid = false
            validationResultObject.issues.push('Shift duration cannot be 0.')
        }
        if (shiftDuration < 0) {
          validationResultObject.isDataValid = false
          validationResultObject.issues.push('Shift starting hour must be before ending hour.')
        }

        const breakDuration = this.calculateHoursTwoDates(breakStartDate, breakEndDate)
        if (breakDuration) {
            
            const shiftBreakStartHoursDifference = this.calculateHoursTwoDates(shiftStartDate, breakStartDate)
            const shiftBreakEndHoursDifference = this.calculateHoursTwoDates( breakEndDate, shiftEndDate)

            if (breakDuration < 0) {
                validationResultObject.isDataValid = false
                validationResultObject.issues.push('Break starting hour cannot occur after Break ending hour.')
            }
            if (shiftBreakStartHoursDifference < 0) {
                validationResultObject.isDataValid = false
                validationResultObject.issues.push('Break starting hour cannot occur before shift starting hour.')
                
            }
            if (shiftBreakEndHoursDifference < 0) {
                validationResultObject.isDataValid = false
                validationResultObject.issues.push('Break ending hour cannot occur after shift ending hour.')
            }
        }
        return validationResultObject
    }
    serializeDate(date: Date): string {
        return formatISO(date)
    }
    deserializeDate(date: string): Date {
        return parseISO(date)
    }
    
}

export const TimeHelper = new TimeHelperClass()