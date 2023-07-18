import { startOfToday, isSameWeek, isSameMonth, isSameYear } from 'date-fns';
import { Shift } from '@/types/types';
import { TimeHelper } from '../../services/TimeHelper';

class ShiftsManipulatorClass {
  filterPastWeekShifts(shifts: Shift[]): Shift[] {
    const today = startOfToday()
      return (shifts.filter(shift => {
          const startingDate = new Date(shift.shiftStart)
            if (isSameWeek(startingDate, today)) {
                return shift
            }
      }))
  }
  filterPastMonthShifts(shifts: Shift[]): Shift[] {
      const today = startOfToday()
      return (shifts.filter(shift => {
          const startingDate = new Date(shift.shiftStart)
          if (isSameMonth(startingDate, today)) {
              return shift
          }
      }))
  }
  filterShiftsByMonthAndYear(shifts: Shift[], date: Date) {
    return (shifts.filter(shift => {
      if (isSameMonth(shift.shiftStart as Date, date) && isSameYear(shift.shiftStart as Date, date)) {
          return shift
      }
  }))
  }
  prepareShiftsDatesForTotalCalculation(shifts: Shift[]): {start: Date, end: Date}[] {
    const startAndEndTimes = shifts.map((shift) => {
        const startAndEnd = { 
          start: shift.shiftStart,
          end: shift.shiftEnd
        }
        return startAndEnd
      })
    return startAndEndTimes
  }
  prepareBreakDatesForTotalCalculation(shifts: Shift[]): {start: Date, end: Date}[] {
    const startAndEndTimes = shifts.filter((shift) => shift.breakStart && shift.breakEnd)
      .map((shift) => ({
        start: shift.breakStart,
        end: shift.breakEnd,
      }));
  
    return startAndEndTimes as {start: Date, end: Date}[];
    }
  calculateSalary(shifts: Shift[]): string {
    let salary = 0
    let salaryString = ''

    if (shifts.length) {
      for (const shift of shifts) {
        let currentShiftSalary = TimeHelper.calculateHoursTwoDates(shift.shiftStart as Date, shift.shiftEnd  as Date) * shift.wagePerHour + shift.tipBonus
        if (!shift.isBreakPaid) {
          currentShiftSalary -= TimeHelper.calculateHoursTwoDates(shift.breakStart as Date, shift.breakEnd  as Date) * shift.wagePerHour
        }
        salary += currentShiftSalary
      }
      const agorot = (salary % 1).toFixed(2)
      salary = Math.floor(salary / 1)
      if (salary > 999) {
        let counter = 0
        while (salary > 0) {
          salaryString += (salary % 10).toString()
          salary = Math.floor(salary / 10)
          counter += 1
          if (counter % 3 === 0) {
            salaryString += ','
          }
        }
        salaryString = salaryString.split('').reverse().join('');
      } else {
        salaryString = salary.toString()
      }
      salaryString += agorot.toString().slice(1)
    }
    return salaryString ? salaryString : '0'
  }
}

export const ShiftsManipulator = new ShiftsManipulatorClass()