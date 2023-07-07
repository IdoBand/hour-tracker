import { WorkPlaceDao } from "@/daos/WorkPlaceDao"
import { ShiftService } from "./ShiftService"
import { WorkPlace } from "@/types/types"
export class WorkPlaceService {
    private dao: WorkPlaceDao
    private shiftService: ShiftService
    constructor() {
        this.dao = new WorkPlaceDao()
        this.shiftService = new ShiftService()
    }
    async getAllWorkPlacesById(userId: string) {
        const workPlaces = await this.dao.getAllWorkPlacesById(userId)
        return workPlaces
    }

}