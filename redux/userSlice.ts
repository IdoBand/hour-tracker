import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WorkPlace, Shift, PLACES_OF_WORK } from '@/app/dashboard/WorkPlace'

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
    user: {
        userId: '123456',
        email: 'dummyuser@gmail.com',
        firstName: 'Dummy',
        lastName: 'User',
        lastLogin: 'time string',
    }
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
        },
    }
})

export const { 
    signInUser,
    signOutUser,
    } = userSlice.actions
export default userSlice.reducer