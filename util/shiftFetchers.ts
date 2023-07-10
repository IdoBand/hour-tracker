import { Shift } from "@/types/types"

export async function fetchShifts(month: string) {
    const response = await fetch(
        '/api/shift',
        {
            method: 'GET'
        }
    )
    const result = await response.json()
    return result
}
export async function fetchAddShift(shift: Shift) {
    try {
        const response = await fetch(
            'http://localhost:3000/api/shift',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(shift)
            }
        )
        const result = await response.json()
        return result
    } catch (err) {
        console.log(err);  
    }
}
export async function fetchEditShift(shift: Shift) {
    try {
        const response = await fetch(
            'http://localhost:3000/api/shift',
            {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(shift)
            }
        )
        const result = await response.json()
        return result
    } catch (err) {
        console.log(err);  
    }
    
}