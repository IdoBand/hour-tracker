import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WorkPlace } from '@/app/dashboard/WorkPlace'
import { PLACES_OF_WORK } from './dummyUser'
import { Shift } from '@/app/dashboard/workPlaceStats/Shift'
import { parseISO, compareAsc } from 'date-fns'
interface PlacesState {
    places: WorkPlace[],
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
                let idx: number = -1
                for (let i = 0 ; i < state.places.length ; i ++) {
                    if (state.places[i].placeId === action.payload.placeId) {
                        idx = i
                        break
                    }
                }
                state.places[idx!] = state.currentWorkPlace as WorkPlace

            },
            prepare: (shift: Shift) => {
                return { payload: shift }
            }
        },
        removeShifts: {
            reducer: (state, action: PayloadAction<Array<string>>) => {
                const shiftIdsSet = new Set(action.payload)
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.filter((shift: Shift) => {
                    if (!shiftIdsSet.has(shift.shiftId)) {return shift}
                })
            },
            prepare: (shiftIdsArray: Array<string>) => {
                return { payload: shiftIdsArray }
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
        setShiftCheckBox: {
            reducer: (state, action: PayloadAction<string>) => {
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.map((shift: Shift) => {
                    if (shift.shiftId === action.payload) {
                        shift.checked = !shift.checked
                    }
                    return shift
                })
            },
            prepare: (placeId: string) => {
                return { payload: placeId }
            }
        },
        checkBoxAllShifts: {
            reducer: (state, action: PayloadAction<boolean>) => {
                if (action.payload) {
                    state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.map((shift: Shift) => {
                        shift.checked = !shift.checked
                        return shift
                    })
                } else {
                    state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.map((shift: Shift) => {
                        shift.checked = true
                        return shift
                    })
                }
            },
            prepare: (isFirstSelectAllClick: boolean) => {
                return { payload: isFirstSelectAllClick }
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
    setShiftCheckBox,
    checkBoxAllShifts,

    } = placesSlice.actions
export default placesSlice.reducer