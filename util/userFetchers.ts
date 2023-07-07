const BASE_URL = process.env.BASE_URL
export async function fetchSignIn(userInfo: any) {
    const response = await fetch(
        '/api/user/google',
         {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userInfo)
        }
    )
    const res = await response.json()
    return res
}
