import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
import { startOfWeek, startOfToday, startOfMonth, endOfMonth  } from 'date-fns'
export class ShiftDao {
  private client: PrismaClient
  constructor() {
    this.client = prisma
  }
  async getAllShiftsByWorkPlaceId(workPlaceId: string) {
    try {
      const shifts = await this.client.shift.findMany({
        where: {
          workPlaceId: workPlaceId
        }
      })
      return shifts
    } catch(err) {
      console.log('Failed to get all shifts from DB')
      console.log(err)
    }
  }
  async getShiftsByMonthAndYear(month: number, year: number, workPlaceId: string) {
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

  
  async getShiftsByWorkPlaceIdLimitEarliestDate(earliest: Date, workPlaceId: string) {
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
      const lastShift = await this.client.$queryRaw`
      SELECT shiftEnd
      FROM shift
      WHERE shift."workPlaceId" = ${workPlaceId}::uuid
      ORDER BY shiftEnd DESC
      LIMIT 1
    `;
    console.log(lastShift);
    
    } catch (e) {

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