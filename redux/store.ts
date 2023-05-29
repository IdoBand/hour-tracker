import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import placesSlice from './placesSlice'

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    placesSlice,
  }
})

// using TypeScript inference to figure out as much possible without declaring it myself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>