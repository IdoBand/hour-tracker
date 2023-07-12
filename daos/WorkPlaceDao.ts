import { WorkPlace } from "@/types/types";
import prisma from "@/prisma/client";
import { PrismaClient } from "@prisma/client";
export class WorkPlaceDao {
  private client: PrismaClient
  constructor() {
    this.client = prisma
  }
  async getAllWorkPlacesById(userId: string) {

    const workPlaces = await this.client.workplace.findMany({
      where: {
        userId: userId
      }}
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
      console.log(`Failed to update last shift for ${workPlaceId}`);
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
}
export const workPlaceDao = new WorkPlaceDao()
