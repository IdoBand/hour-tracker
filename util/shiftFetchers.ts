export async function fetchShifts(month: string) {
    const response = await fetch(
        '/api/shift',
        {
            method: 'GET'
        }
    )
    const result = await response.json()
}