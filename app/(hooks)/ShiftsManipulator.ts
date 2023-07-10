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
  prepareShiftsDatesForTotalCalculation(shifts: Shift[]): {start: string, end: string}[] {
    const startAndEndTimes = shifts.map((shift) => {
        const startAndEnd = { 
          start: shift.shiftStart,
          end: shift.shiftEnd
        }
        return startAndEnd
      })
    return startAndEndTimes
  }
  prepareBreakDatesForTotalCalculation(shifts: Shift[]): {start: string, end: string}[] {
    const startAndEndTimes = shifts.filter((shift) => shift.breakStart && shift.breakEnd)
      .map((shift) => ({
        start: shift.breakStart,
        end: shift.breakEnd,
      }));
  
    return startAndEndTimes;
    }
  calculateSalary(shifts: Shift[]): string {
    let salary = 0
    let salaryString = ''
    if (shifts.length) {
      for (const shift of shifts) {
        let currentShiftSalary = TimeHelper.calculateHoursTwoDates(shift.shiftStart, shift.shiftEnd) * shift.wagePerHour + shift.tipBonus
        if (!shift.isBreakPaid) {
          currentShiftSalary -= TimeHelper.calculateHoursTwoDates(shift.breakStart, shift.breakEnd) * shift.wagePerHour
        }
        salary += currentShiftSalary
      }
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
        return salaryString.split('').reverse().join('');
      }
    }
    return salary.toString()
  }
}

export const ShiftsManipulator = new ShiftsManipulatorClass()