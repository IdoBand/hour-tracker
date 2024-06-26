import { workPlaceDao, WorkPlaceDao } from "@/daos/WorkPlaceDao";
import { ShiftService, shiftService } from "./ShiftService";
import { ShiftDao, shiftDao } from "@/daos/ShiftDao";
import { WorkPlace } from "@/types/types";

export class WorkPlaceService {
  private workPlaceDao: WorkPlaceDao;
  private shiftDao: ShiftDao;

  constructor() {
    this.workPlaceDao = workPlaceDao;
    this.shiftDao = shiftDao;
  }
  async getAllWorkPlacesById(userId: string) {
    /**
     * Gets all workPlaces that belongs to the 'userId' ordered by 'employmentStartDate' in descending order.
     * @param {string} workPlaceId string in uuid format.
     */
    const workPlaces = await this.workPlaceDao.getAllWorkPlacesById(userId);
    return workPlaces;
  }
  async deleteWorkPlaces(ids: string[]) {
    const result = await Promise.all(
      ids.map(async (id) => {
        const shiftDaoResponse = await this.shiftDao.deleteAllShifts(id);
        if (shiftDaoResponse) {
          const workPlaceDaoResponse =
            await this.workPlaceDao.deleteWorkPlace(id);
        }
      }),
    );
    return result;
  }
  async editWorkPlace(workPlace: WorkPlace) {
    const response = await this.workPlaceDao.editWorkPlace(workPlace);
    return response;
  }
}
export const workPlaceService = new WorkPlaceService();
