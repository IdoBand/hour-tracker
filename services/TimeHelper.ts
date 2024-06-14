import {
  parseISO,
  formatISO,
  differenceInDays,
  differenceInYears,
  differenceInMinutes,
} from "date-fns";
class TimeHelperClass {
  calculateHoursTwoDates(start: Date, end: Date) {
    /**
     * This function receives 2 Date instances and calculates the hours difference between them.
     * @returns {number} - time unit in hours.
     */
    const totalHours = differenceInMinutes(end, start) / 60;
    return totalHours;
  }
  hourlyStringFromTwoDatesAndDict(start: Date, end: Date, dict: any) {
    /**
     * This function receives 2 Date instances and calculates the difference in time between them.
     * @returns {string} - time in hours/hours+minutes.
     */
    const minutesDifference = differenceInMinutes(end, start);
    const hourlyObject = this.generateHourlyDurationObject(minutesDifference)
    return this.hourlyStringFromDict(hourlyObject, dict);
  }
  calculateTimeMultipleDates(events: any[]) {
    /**
     * This function receives an array of objects which contain 2 properties start and end ISO 8601 strings,
     *  calculate the time for each, and returns the sum of all.
     * @returns {string} - time in hours/hours+minutes.
     */
    let total = 0;
    for (const event of events) {
      const start = new Date(event.start);
      const end = new Date(event.end);
      total += differenceInMinutes(end, start);
    }
    return this.generateHourlyDurationObject(total);
  }
  hourlyStringFromDict(hourlyObject: {hours: number, minutes: number}, dict: any) {
    if (!hourlyObject.hours && !hourlyObject.minutes) {
      return '0'
    }
    if (!hourlyObject.hours) {
      return `${hourlyObject.minutes} ${dict.timeUnits.minutes}`
    } else if (!hourlyObject.minutes) {
      return `${hourlyObject.hours} ${dict.timeUnits.hours}`
    } else {
      return `${hourlyObject.hours} ${dict.timeUnits.hours} ${dict.timeUnits.and} ${hourlyObject.minutes} ${dict.timeUnits.minutes}` 
    }
  }
  yearlyStringFromDict(yearlyObject: {years: number, days: number}, dict: any) {
    if (!yearlyObject.years && !yearlyObject.days) {
      return '0'
    }
    if (!yearlyObject.years) {
      return `${yearlyObject.days} ${dict.timeUnits.days}`
    } else if (!yearlyObject.days) {
      return `${yearlyObject.years} ${dict.timeUnits.years}`
    } else {
      return `${yearlyObject.years} ${dict.timeUnits.years} ${dict.timeUnits.and} ${yearlyObject.days} ${dict.timeUnits.minutes}` 
    }
  }

  generateHourlyDurationObject(minutes: number) {
    /**
   * receives a number of minuets, and returns an object with two properties: hours and the remaining minutes
   * for example: minutes = 90 ---> {hours: 1, minutes: 30}
   * 
   * @param {number} minutes - Total number of minutes.
   * @returns {Object} - An object with the properties 'hours' and 'minutes' representing 
   *                     the time difference.
   * @returns {number} returns.hours - The number of full hours.
   * @returns {number} returns.minutes - The number of remaining minutes.
   */
    let result = {
      hours: 0,
      minutes: 0
    }
    if (minutes === 0) {
      return result;
    } else if (minutes % 60 === 0) {
      result.hours = minutes / 60
    } else if (minutes < 60) {
      result.minutes = minutes 
    } else {
      result.hours = Math.floor(minutes / 60)
      result.minutes = minutes % 60
    }
    return result
    }

  generateYearlyDurationObject(start: Date, end: Date) {
  /**
 * Calculates the time difference between two Date instances in years and days.
 * 
 * This function receives two Date instances and calculates the time difference 
 * between them in days. It then returns an object with the time difference 
 * described in years and days.
 * 
 * @param {Date} start - The start date.
 * @param {Date} end - The end date.
 * @returns {Object} - An object with the properties 'years' and 'days' representing 
 *                     the time difference.
 * @returns {number} returns.years - The number of full years in the time difference.
 * @returns {number} returns.days - The number of remaining days in the time difference.
 */
    const daysDifference = differenceInDays(end, start);
    
    if (daysDifference < 365) {
      return {
        years: 0,
        days: daysDifference}
    } else if (daysDifference > 365 && daysDifference % 365 !== 0) {
      const yearsDifference = differenceInYears(end, start);
      const remainingDays = daysDifference - yearsDifference * 365;
      return {
        years: yearsDifference,
        days: remainingDays
      }
    } else {
      const yearsDifference = differenceInYears(end, start);
      return {
        years: yearsDifference,
        days: 0
      }
    }
  }
  
  validateShiftTimes(
    shiftStartDate: Date,
    shiftEndDate: Date,
    breakStartDate: Date,
    breakEndDate: Date,
  ) {
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
    interface validationResultObjectProps {
      isDataValid: boolean;
      issues: string[];
    }
    let validationResultObject: validationResultObjectProps = {
      isDataValid: true,
      issues: [],
    };

    const shiftDuration = this.calculateHoursTwoDates(
      shiftStartDate,
      shiftEndDate,
    );
    if (!shiftDuration) {
      validationResultObject.isDataValid = false;
      validationResultObject.issues.push("Shift duration cannot be 0.");
    }
    if (shiftDuration < 0) {
      validationResultObject.isDataValid = false;
      validationResultObject.issues.push(
        "Shift starting hour must be before ending hour.",
      );
    }

    const breakDuration = this.calculateHoursTwoDates(
      breakStartDate,
      breakEndDate,
    );
    if (breakDuration) {
      const shiftBreakStartHoursDifference = this.calculateHoursTwoDates(
        shiftStartDate,
        breakStartDate,
      );
      const shiftBreakEndHoursDifference = this.calculateHoursTwoDates(
        breakEndDate,
        shiftEndDate,
      );

      if (breakDuration < 0) {
        validationResultObject.isDataValid = false;
        validationResultObject.issues.push(
          "Break starting hour cannot occur after Break ending hour.",
        );
      }
      if (shiftBreakStartHoursDifference < 0) {
        validationResultObject.isDataValid = false;
        validationResultObject.issues.push(
          "Break starting hour cannot occur before shift starting hour.",
        );
      }
      if (shiftBreakEndHoursDifference < 0) {
        validationResultObject.isDataValid = false;
        validationResultObject.issues.push(
          "Break ending hour cannot occur after shift ending hour.",
        );
      }
    }
    return validationResultObject;
  }
  serializeDate(date: Date): string {
    return formatISO(date);
  }
  deserializeDate(date: string): Date {
    return parseISO(date);
  }
  serializeWorkPlaceDates(
    employStartDate: Date | null,
    employEndDate: Date | null,
    lShift: Date | null,
  ) {
    /**
     * This function is responsible to serialize all the dates in a WorkPlace instance AT ONCE.
     * 'employmentStartDate' is required to create a WorkPlace instance so it can't be null.
     * @returns {string}        employmentStartDate
     * @returns {string | null} employmentEndDate
     * @returns {string | null} lastShift
     */
    let employmentStartDate = null;
    let employmentEndDate = null;
    let lastShift = null;
    if (typeof employStartDate !== "string") {
      employmentStartDate = this.serializeDate(employStartDate as Date);
    }
    if (employEndDate && typeof employmentEndDate !== "string") {
      employmentEndDate = this.serializeDate(employEndDate as Date);
    }
    if (lShift && typeof lShift !== "string") {
      lastShift = this.serializeDate(lShift as Date);
    }
    return { employmentStartDate, employmentEndDate, lastShift };
  }
  ddmmyyyyDate(date: Date): string {
    /**
     * This function receives a Date instance and converts it to dd-mm-yyy string.
     * @returns {string} - dd-mm-yyy string.
     */
    const ISO8601String = formatISO(date);
    return (
      ISO8601String.slice(8, 10) +
      ISO8601String.slice(4, 8) +
      ISO8601String.slice(0, 4)
    );
  }
  extractHourFromDate(date: Date): string {
    /**
     * This function receives a Date instance and extracts the hour.
     * @returns {string} - hh:mm.
     */
    const ISO8601String = formatISO(date);
    return ISO8601String.slice(11, 16);
  }
}

export const TimeHelper = new TimeHelperClass();
