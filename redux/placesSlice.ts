import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { WorkPlace } from '@/app/dashboard/WorkPlace'
import { PLACES_OF_WORK } from './dummyUser'
import { Shift } from '@/app/dashboard/workPlaceStats/Shift'
import { parseISO, compareAsc } from 'date-fns'
interface PlacesState {
    places: any[],
    currentWorkPlace: null | WorkPlace
}

const initialState: PlacesState = {
    places: PLACES_OF_WORK,
    currentWorkPlace: PLACES_OF_WORK[0]
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
        addShiftToCurrentWorkPlace: {
            reducer: (state, action: PayloadAction<Shift>) => {
                state.currentWorkPlace?.shifts.push(action.payload)
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.sort((a, b) => compareAsc(parseISO(a.shiftStart), parseISO(b.shiftStart)));
                
            },
            prepare: (placeId: Shift) => {
                return { payload: placeId }
            }
        },
        removeShifts: {
            reducer: (state, action: PayloadAction<Array<string>>) => {
                const shiftIdsSet = new Set(action.payload)
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.filter((shift: Shift) => {
                    return !shiftIdsSet.has(shift.shiftId) && shift
                })
            },
            prepare: (shiftIdMap: Array<string>) => {
                return { payload: shiftIdMap }
            }
        },
        editShift: {
            reducer: (state, action: PayloadAction<Shift>) => {
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.map((shift: Shift) => {
                    return shift.shiftId === action.payload.shiftId ? action.payload : shift
                })
            },
            prepare: (shift: Shift) => {
                return { payload: shift }
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
    addShiftToCurrentWorkPlace,
    removeShifts,
    editShift,
    } = placesSlice.actions
export default placesSlice.reducer