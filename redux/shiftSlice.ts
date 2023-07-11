import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Shift } from '@/types/types'
import { formatISO, startOfToday } from 'date-fns'

interface PlacesState {
    removeButtons: boolean
    checkboxAll: boolean
    removeShiftsIdArray: string[]
    checkedArray: string[]
    currentDate: string
}

const initialState: PlacesState = {
    removeButtons: false,
    checkboxAll: false,
    removeShiftsIdArray: [],
    checkedArray: [],
    currentDate: formatISO(startOfToday()),
}

const shiftSlice = createSlice({
    name: 'workPlaces',
    initialState,
    reducers: {
        setCheckboxAll(state) {
           state.checkboxAll = !state.checkboxAll
        },
        setRemoveButtons(state) {
           state.removeButtons = !state.removeButtons
        },
        addIdToRemoveArray: {
            reducer: (state, action: PayloadAction<string>) => {
                state.removeShiftsIdArray.push(action.payload)
            },
            prepare: (workPlaceId: string) => {
                return { payload: workPlaceId }
            }
        },
        deleteIdFromRemoveArray: {
            reducer: (state, action: PayloadAction<string>) => {
                const idx = state.removeShiftsIdArray.indexOf(action.payload)
                state.removeShiftsIdArray.splice(idx, 1)
            },
            prepare: (workPlaceId: string) => {
                return { payload: workPlaceId }
            }
        },
        clearIdToRemoveArray(state) {
            state.removeShiftsIdArray = []
        },
        addAllShiftsIdsToRemoveArray: {
            reducer: (state, action: PayloadAction<string[]>) => {
                state.removeShiftsIdArray = action.payload
            },
            prepare: (shiftsIds: string[]) => {
                return { payload: shiftsIds }
            }
        },
    }
})

export const { 
    setCheckboxAll,
    setRemoveButtons,
    addIdToRemoveArray,
    deleteIdFromRemoveArray,
    clearIdToRemoveArray,
    addAllShiftsIdsToRemoveArray,
    } = shiftSlice.actions
export default shiftSlice.reducer