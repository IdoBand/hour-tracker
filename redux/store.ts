import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import windowSlice from './windowSlice'
import workPlaceSlice from './workPlaceSlice'
import shiftSlice from './shiftSlice'
export const store = configureStore({
  reducer: {
    userSlice,
    windowSlice,
    workPlaceSlice,
    shiftSlice,
  }
})

// using TypeScript inference to figure out as much possible without declaring it myself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>