import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { WorkPlace, PLACES_OF_WORK } from '@/app/dashboard/WorkPlace'
import { Shift } from '@/app/dashboard/workPlaceStats/Shift'
interface PlacesState {
    places: any[],
    currentWorkPlace: null | WorkPlace
}


const initialState: PlacesState = {
    places: PLACES_OF_WORK,
    currentWorkPlace: null
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setWorkPlaceCheckbox: {
            reducer: (state, action: PayloadAction<string>) => {
                state.places! = state.places!.map((place: WorkPlace) => {
                    if (place.placeId === action.payload) {
                        place.checked = !place.checked
                    }
                    return place
                })
            },
            prepare: (placeId: string) => {
                return { payload: placeId }
            }
        },
        checkboxAll: {
            reducer: (state, action: PayloadAction<boolean>) => {
                if (action.payload) {
                    state.places! = state.places!.map((place: WorkPlace) => {
                        place.checked = !place.checked
                        return place
                    })
                } else {
                    state.places! = state.places!.map((place: WorkPlace) => {
                        place.checked = true
                        return place
                    })
                }
            },
            prepare: (isFirstSelectAllClick: boolean) => {
                return { payload: isFirstSelectAllClick }
            }
        },
        setWorkPlaces: {
            reducer: (state, action: PayloadAction<WorkPlace[]>) => {
                state.places! = action.payload
            },
            prepare: (newPlaces: WorkPlace[]) => {
                return { payload: newPlaces }
            }
        },
        addWorkPlace: {
            reducer: (state, action: PayloadAction<WorkPlace>) => {
                state.places?.push(action.payload)
            },
            prepare: (newWorkPlace: WorkPlace) => {
                return { payload: newWorkPlace }
            }
        },
        removeWorkPlaces (state) {
            state.places! = state.places!.filter((workPlace: WorkPlace) => {
                    if (!workPlace.checked) {
                        return workPlace
                    }
                })
            },
        setCurrentWorkPlace: {
            reducer: (state, action: PayloadAction<string>) => {
                console.log(action.payload);
                
                for (const place of state.places) {
                    if (action.payload === place.placeId) {
                        state.currentWorkPlace = place
                        break
                    }
                }
            },
            prepare: (placeId: string) => {
                return { payload: placeId }
            }
        },
    }
})

export const { 
    setWorkPlaceCheckbox,
    checkboxAll,
    setWorkPlaces, 
    addWorkPlace, 
    removeWorkPlaces,
    setCurrentWorkPlace,

    } = placesSlice.actions
export default placesSlice.reducer