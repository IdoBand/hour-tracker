import { workPlaceDao, WorkPlaceDao } from "@/daos/WorkPlaceDao"
import { ShiftService, shiftService } from "./ShiftService"
import { ShiftDao, shiftDao } from "@/daos/ShiftDao"

export class WorkPlaceService {
    private workPlaceDao: WorkPlaceDao
    private shiftDao: ShiftDao

    constructor() {
        this.workPlaceDao = workPlaceDao
        this.shiftDao = shiftDao
    }
    async getAllWorkPlacesById(userId: string) {
        const workPlaces = await this.workPlaceDao.getAllWorkPlacesById(userId)
        return workPlaces
    }
    async deleteWorkPlaces(ids: string[]) {
        const result = await Promise.all(
            ids.map(async (id) => {
                const shiftDaoResponse = await this.shiftDao.deleteAllShifts(id)
                if (shiftDaoResponse) {
                    const workPlaceDaoResponse = await this.workPlaceDao.deleteWorkPlace(id)
                }
            })
        )
        return result
    }
}
export const workPlaceService = new WorkPlaceService()