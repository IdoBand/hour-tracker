import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WorkPlace } from '@/types/types'

interface PlacesState {
    currentWorkPlace: null | WorkPlace
    removeButtons: boolean
    checkboxAll: boolean
    removePlacesIdArray: string[]
    checkedArray: string[]
}

const initialState: PlacesState = {
    currentWorkPlace: null,
    removeButtons: false,
    checkboxAll: false,
    removePlacesIdArray: [],
    checkedArray: [],
}

const workPlaceSlice = createSlice({
    name: 'workPlaces',
    initialState,
    reducers: {
        setCurrentWorkPlace: {
            reducer: (state, action: PayloadAction<WorkPlace>) => {
                state.currentWorkPlace = action.payload
            },
            prepare: (workPlace: WorkPlace) => {
                return { payload: workPlace }
            }
        },
        setCheckboxAll(state) {
           state.checkboxAll = !state.checkboxAll
        },
        setRemoveButtons(state) {
           state.removeButtons = !state.removeButtons
        },
        addIdToRemoveArray: {
            reducer: (state, action: PayloadAction<string>) => {
                state.removePlacesIdArray.push(action.payload)
            },
            prepare: (workPlaceId: string) => {
                return { payload: workPlaceId }
            }
        },
        deleteIdFromRemoveArray: {
            reducer: (state, action: PayloadAction<string>) => {
                const idx = state.removePlacesIdArray.indexOf(action.payload)
                state.removePlacesIdArray.splice(idx, 1)
            },
            prepare: (workPlaceId: string) => {
                return { payload: workPlaceId }
            }
        },
        clearIdToRemoveArray(state) {
            state.removePlacesIdArray = []
        },
    }
})

export const { 
    setCurrentWorkPlace,
    setCheckboxAll,
    setRemoveButtons,
    addIdToRemoveArray,
    deleteIdFromRemoveArray,
    clearIdToRemoveArray,
    } = workPlaceSlice.actions
export default workPlaceSlice.reducer