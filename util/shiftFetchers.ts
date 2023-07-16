import { Shift } from "@/types/types"
const errorObject = {success: false}

export async function fetchShifts(month: string) {
    try {
        const response = await fetch(
            `/api/shift`,
            {
                method: 'GET'
            }
        )
        const result = await response.json()
        return result
    } catch (err) {
        console.log(err)
        return errorObject
    }
}
export async function fetchAddShift(shift: Shift) {
    try {
        const response = await fetch(
            `/api/shift`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(shift)
            }
        )
        const result = await response.json()
        return result
    } catch (err) {
        console.log(err)
        return errorObject
    }
}
export async function fetchRemoveShifts(ids: string[], workPlaceId: string) {
    try {
        const response = await fetch(
            `/api/shift/delete?workPlaceId=${workPlaceId}`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ ids })
            }
        )
        const result = await response.json()
        return result
    } catch (err) {
        console.log(err)
        return errorObject
    }
    
}
export async function fetchEditShift(shift: Shift) {
    try {
        const response = await fetch(
            `/api/shift`,
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(shift)
            }
        )
        const result = await response.json()
        return result
    } catch (err) {
        console.log(err)
        return errorObject 
    }
}