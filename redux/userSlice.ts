import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
    userId: string
    email: string
    firstName: string
    lastName: string
    lastLogin?: string
}
    
interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: {
            reducer: (state, action: PayloadAction<User>) => {
                state.user = action.payload
            },
            prepare: (newUser) => {
                return { payload: newUser }
            }
        },
        signOutUser(state) {
            state.user = null
        }
    }
})

export const { signInUser, signOutUser } = userSlice.actions
export default userSlice.reducer