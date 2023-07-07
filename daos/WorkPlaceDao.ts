import { WorkPlace } from "@/app/dashboard/WorkPlace";
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
        },
        include: {
            users: true,
        },
      })
      console.log(response);
      
      return response
    } catch(err) {
      console.log('-----------> Failed to create a new workplace');
      console.log(err);
    }
  }
  async deleteWorkPlace(ids: string[]) {
    try {
  
      const response = await prisma.workplace.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      
      return response
    } catch(err) {
      console.log('-----------> Failed to delete workplaces');
      console.log(err);
    }
  }


  getEmploymentStartAndEnd(workPlaceId: string) {
    try {
      const startAndEnd = this.client.workplace.findUnique({
        where: {
          id: workPlaceId
        },
        select: {
          employmentStartDate: true,
          employmentEndDate: true
        }
      })
      console.log(startAndEnd);
      
      return startAndEnd
    } catch (err) {
      console.log('-----------> Failed to get Employment times');
      console.log(err);
    }
  }
}

export const workPlaceDao = new WorkPlaceDao()
