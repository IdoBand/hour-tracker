import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { dummyUser, User } from './dummyUser'

    
interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: dummyUser
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: {
            reducer: (state, action: PayloadAction<User>) => {
                state.user = action.payload
            },
            prepare: (newUser: User) => {
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