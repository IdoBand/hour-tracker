import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import placesSlice from './placesSlice'
import windowSlice from './windowSlice'
import workPlaceSlice from './workPlaceSlice'
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    placesSlice,
    windowSlice,
    workPlaceSlice,
  }
})

// using TypeScript inference to figure out as much possible without declaring it myself
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>