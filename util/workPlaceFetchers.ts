const BASE_URL = process.env.BASE_URL
export async function fetchWorkPlaces() {
    const response = await fetch(
        `/api/workPlace`,
        {
            method: 'GET'
        }
    )
    console.log(response);
    
    const result = await response.json()
    return result
}
export async function fetchAddWorkPlace(workPlaceInfo: any) {
    const response = await fetch(
        `/api/workPlace`,
         {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(workPlaceInfo)
        }
    )
    const res = await response.json()
    return res
}
export async function fetchRemoveWorkPlaces(ids: string[]) {
        const response = await fetch(
            `/api/workPlace/delete`, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ ids })
            }
        )
  }