import { WorkPlace } from "@/types/types";
import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
export class WorkPlaceDao {
  private client: PrismaClient
  constructor() {
    this.client = prisma
  }
  async getAllWorkPlacesById(userId: string) {
  /**
  * Gets all workPlaces that belongs to the 'userId' ordered by 'employmentStartDate' descending order.
  * @param {string} workPlaceId string in uuid format.
  */
    const workPlaces = await this.client.workplace.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        employmentStartDate: 'desc'
      }
    },
    )
    return workPlaces
  }
  
  async addWorkPlace(newData: any)  {
    try {
      const response = await this.client.workplace.create({
        data: {
            // id: "uuid_generate_v4()" is automatically invoked by Prisma!,
            userId: newData.userId,
            name: newData.name,
            employmentStartDate: newData.employmentStartDate,
            employmentEndDate: newData.employmentEndDate,
            isCurrent: newData.isCurrent,
            wagePerHour: +newData.wagePerHour,
            isBreakPaid: newData.isBreakPaid,
            lastShift: null
        },
        include: {
            users: true,
        },
      })
      return response
    } catch(err) {
      console.log('-----------> Failed to create a new workplace');
      console.log(err);
    }
  }
  async deleteWorkPlace(workPlaceId: string) {

    try {
  
      const response = await this.client.workplace.delete({
        where: {
          id: workPlaceId
        }
      })
      return response
    } catch(err) {
      console.log('-----------> Failed to delete workplaces');
      console.log(err);
    }
  }

  async updateLastShift(date: Date, workPlaceId: string) {
    try {
      const response = await prisma.workplace.update({
        where: { id: workPlaceId },
        data: { 
          lastShift: date 
        },
      });
      return
    } catch (err) {
      console.log(`-----------> Failed to update last shift for ${workPlaceId}`);
      console.log(err);
    }
  }
  async getLastShift(workPlaceId: string) {
    try {
      const response = await this.client.workplace.findUnique({
        where: {
          id: workPlaceId
        },
        select: {
          lastShift: true
        }
      })
      return response
    } catch (err) {
      console.log('-----------> Failed to get lastShift');
      console.log(err);
    }
  }
  async editWorkPlace(workPlace: WorkPlace) {
    try {
      const response = await this.client.workplace.update({
        where: {
          id: workPlace.id
        },
        data: {
          name: workPlace.name,
          employmentStartDate: workPlace.employmentStartDate,
          employmentEndDate: workPlace.employmentEndDate,
          isCurrent: workPlace.isCurrent,
          wagePerHour: +workPlace.wagePerHour,
          isBreakPaid: workPlace.isBreakPaid,
          lastShift: null
        }
      })
      if (response) {
        return { success: true }
      }
    } catch (err) {
      console.log('-----------> Failed to update Work Place');
      console.log(err);
      return { success: false }
    }
  }
}
export const workPlaceDao = new WorkPlaceDao()
