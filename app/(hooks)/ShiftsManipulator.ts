import { startOfToday, isSameWeek, isSameMonth } from 'date-fns';
import { Shift } from '../dashboard/[workPlacecId]/Shift';
import { TimeHelper } from './TimeHelper';
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
  calculateSalary(shifts: Shift[]): number {
    let salary = 0
    if (shifts.length) {
      for (const shift of shifts) {
      salary += TimeHelper.calculateHoursTwoDates(shift.shiftStart, shift.shiftEnd) * shift.wagePerHour + shift.tipBonus
    }
}
return salary
  }
}

export const ShiftsManipulator = new ShiftsManipulatorClass()