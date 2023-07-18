import prisma from "@/prisma/client";
import { Shift } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import { startOfWeek, startOfToday, startOfMonth, endOfMonth  } from 'date-fns'
import { workPlaceDao } from "./WorkPlaceDao";
export class ShiftDao {
  private client: PrismaClient
  constructor() {
    this.client = prisma
  }
  async getAllShifts(workPlaceId: string) {
     /**
    * Gets all shifts that belongs to the 'workPlaceId' ordered by 'shiftStart' date in descending order.
    * @param {string} workPlaceId string in uuid format.
    */
    try {
      const shifts = await this.client.shift.findMany({
        where: {
          workPlaceId: workPlaceId
        },
        orderBy: {
          shiftStart: 'desc'
        }
      })
      return shifts
    } catch(err) {
      console.log('Failed to get all shifts from DB')
      console.log(err)
    }
  }
  async getShiftsByMonthAndYear(month: number, year: number, workPlaceId: string) {
   /**
    * Gets all shifts that belongs to the 'workPlaceId' and that their 'shiftStart' date falls under the Date created by 'month' and 'year'.
    * @param {string} workPlaceId string in uuid format.
    * @param {number} month       example July --> 07.
    * @param {number} year        1990 / 2009 / 2018 and so on.
    */
    const startDayOfMonth: Date = new Date(year, month - 1, 1)
    const endDayOfMonth: Date = endOfMonth(startDayOfMonth)
    const shifts = await prisma.shift.findMany({
        where: {
          workPlaceId: workPlaceId,
          shiftStart: {
            gte: startDayOfMonth, // Set the start of the month
            lt: endDayOfMonth, // Set the start of the next month
          },
        },
      });
    
    return shifts;
  }

  async findFirstAndLastShift(workPlaceId: string) {
    const shifts = await prisma.shift.findMany({
        where: { workPlaceId: workPlaceId },
        orderBy: { shiftStart: 'asc' },
      });
    if (shifts.length) {
        const earliest = shifts[0]
        const latest = shifts[shifts.length - 1]
        return [earliest, latest]
    } 
    return shifts
  }

  
  async totalShiftsDuration(workPlacesIdsArray: string[]) {
    const result = await Promise.all(
      workPlacesIdsArray.map(async (workPlaceId) => {
        const decimalDuration: { totalHours: number }[] = await this.client.$queryRaw`
          SELECT SUM(EXTRACT(EPOCH FROM (shift."shiftEnd" - shift."shiftStart"))) / 3600 AS "totalHours"
          FROM shift
          WHERE shift."workPlaceId" = ${workPlaceId}::uuid
        `;
        const duration = Math.floor(decimalDuration[0].totalHours);
        return duration;
      })
    );
    return result;
  }

  
  async getShifts(earliest: Date, workPlaceId: string) {/**
    * Gets all shifts that belongs to the 'workPlaceId' and that their 'shiftStart' is AFTER the Date created by 'month' and 'year'.
    * @param {string} workPlaceId string in uuid format.
    * @param {Date}   earliest
    */
      const shifts = await this.client.shift.findMany({
        where: {
          workPlaceId: workPlaceId,
          shiftStart: {
            gte: earliest,
          },
        },
        select: {
          shiftStart: true,
          shiftEnd: true,
          breakStart: true,
          breakEnd: true
        }
      });
      return shifts

  }
  async getLastShiftByWorkPlaceId(workPlaceId: string) {
    try {
      const lastShift = await this.client.shift.findMany({
        where: {
          workPlaceId: workPlaceId
        },
        select: {
          shiftStart: true
        },
        orderBy: [{shiftStart: 'desc'}],
        take: 1
      })
      if (lastShift.length > 0) {
        return lastShift[0]
      } else {
        return { shiftStart: null }
      }
    } catch (err) {
      console.log('-----------> Failed to get last shift');
      console.log(err);
    }
  }
  async addShift(shift: Shift) {
    try {
      const response = await this.client.shift.create({
        data: {
            // id: "uuid_generate_v4()" is automatically invoked by Prisma!,
            userId: shift.userId,
            workPlaceId: shift.workPlaceId,
            shiftStart: shift.shiftStart,
            shiftEnd: shift.shiftEnd,
            breakStart: shift.breakStart as Date,
            breakEnd: shift.breakEnd as Date,
            iWorkedOn: shift.iWorkedOn,
            notes: shift.notes,
            wagePerHour: +shift.wagePerHour,
            tipBonus: +shift.tipBonus,
            isBreakPaid: shift.isBreakPaid,
        },
      })
      return {success: true}
    } catch (err) {
      console.log(err);
      return {
        success: false
      }
    }
  }
  async deleteShifts(ids: string[]) {
    try {
  
      const response = await this.client.shift.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return response
    } catch(err) {
      console.log('-----------> Failed to delete shifts');
      console.log(err);
    }
  }
  async editShift(shift: Shift) {
    try {
      const response = await this.client.shift.update({
        where: {
          id: shift.id
        },
        data: {
            // id: "uuid_generate_v4()" is automatically invoked by Prisma!,
            userId: shift.userId,
            workPlaceId: shift.workPlaceId,
            shiftStart: shift.shiftStart,
            shiftEnd: shift.shiftEnd,
            breakStart: shift.breakStart as Date,
            breakEnd: shift.breakEnd as Date,
            iWorkedOn: shift.iWorkedOn,
            notes: shift.notes,
            wagePerHour: +shift.wagePerHour,
            tipBonus: +shift.tipBonus,
            isBreakPaid: shift.isBreakPaid,
        },
      })
      return {
        success: true
      }
    } catch (err) {
      console.log('-----------> Failed to update shift');
      console.log(`-----------> shift id: ${shift.id}`);
      console.log(err);
      return {
        success: false
      }
    }
  }
  async deleteAllShifts(workPlaceId: string) {
    try {
      const response = await this.client.shift.deleteMany({
        where: {
          workPlaceId: workPlaceId
        }
      })
      return response
    } catch (err) {
      console.log('-----------> Failed to delete all shifts');
      console.log(`-----------> shift id: ${workPlaceId}`);
      console.log(err);
    }
  }
  
  // async sumOfHours(workPlacesIdsArray: string[], timeBackwards: 'past week' | 'past month', shiftOrBreak: 'shift' | 'break') {
  //   const today = startOfToday()
  //   const earliest = timeBackwards === 'past month' ? startOfMonth(today) : startOfWeek(today)
  //   const start = shiftOrBreak === 'shift' ? 'shift_start' : `break_start`
  //   const end = shiftOrBreak === 'shift' ? 'shift_end' : `break_end`
  //   console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2@@@@@@@@@@@@@@@`);
  //   console.log(end, start , earliest);
  //   console.log(workPlacesIdsArray);
  //   console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2@@@@@@@@@@@@@@@`);
    
  //   const result = await Promise.all(
  //     workPlacesIdsArray.map(async (workPlaceId) => {
  //       const decimalDuration: { totalDuration: number }[] = await this.client.$queryRawUnsafe(`
  //         SELECT SUM(EXTRACT(EPOCH FROM (CAST($1 AS TIMESTAMP) - CAST($2 AS TIMESTAMP)))) / 3600 AS "totalDuration"
  //         FROM shift
  //         WHERE $2::timestamp > $3::timestamp
  //         AND 'workPlaceId' = $4::uuid
  //       `,
  //       end,
  //       start,
  //       earliest,
  //       workPlaceId
  //       )
  //       const duration = Math.floor(decimalDuration[0].totalDuration)
  //       console.log(duration);
        
  //       return duration;
  //     })
  //   );
  //   return result
  // }
}


export const shiftDao = new ShiftDao()