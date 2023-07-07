import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WorkPlace } from '@/app/dashboard/WorkPlace'
import { Shift } from '@/app/dashboard/[workPlaceId]/Shift'
import { parseISO, compareAsc } from 'date-fns'
interface PlacesState {
    places: WorkPlace[],
    currentWorkPlace: null | WorkPlace
}

const initialState: PlacesState = {
    places: [],
    currentWorkPlace: null
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setWorkPlaceCheckbox: {
            reducer: (state, action: PayloadAction<string>) => {
                state.places! = state.places!.map((place: WorkPlace) => {
                    if (place.id === action.payload) {
                        place.checked = !place.checked
                    }
                    return place
                })
            },
            prepare: (id: string) => {
                return { payload: id }
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
                for (const place of state.places!) {
                    if (action.payload === place.id) {
                        state.currentWorkPlace = place
                        break
                    }
                }
            },
            prepare: (id: string) => {
                return { payload: id }
            }
        },
        editAWorkPlace: {
            reducer: (state, action: PayloadAction<WorkPlace>) => {
                for (let workPlace of state.places!) {
                    if (action.payload.id === workPlace.id) {
                        workPlace = action.payload
                        break
                    }
                    state.currentWorkPlace = action.payload
                }
            },
            prepare: (newWorkPlaceData: WorkPlace) => {
                return { payload: newWorkPlaceData }
            }
        },
        addShiftToCurrentWorkPlace: {
            reducer: (state, action: PayloadAction<Shift>) => {
                state.currentWorkPlace?.shifts.push(action.payload)
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.sort((a, b) => compareAsc(parseISO(a.shiftStart), parseISO(b.shiftStart)));
                let idx: number = -1
                for (let i = 0 ; i < state.places!.length ; i ++) {
                    if (state.places![i].id === action.payload.id) {
                        idx = i
                        break
                    }
                }
                state.places![idx!] = state.currentWorkPlace as WorkPlace

            },
            prepare: (shift: Shift) => {
                return { payload: shift }
            }
        },
        removeShifts: {
            reducer: (state, action: PayloadAction<Array<string>>) => {
                const idsSet = new Set(action.payload)
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.filter((shift: Shift) => {
                    if (!idsSet.has(shift.id)) {return shift}
                })
            },
            prepare: (idsArray: Array<string>) => {
                return { payload: idsArray }
            }
        },
        editShift: {
            reducer: (state, action: PayloadAction<Shift>) => {
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.map((shift: Shift) => {
                    return shift.id === action.payload.id ? action.payload : shift
                })
            },
            prepare: (shift: Shift) => {
                return { payload: shift }
            }
        },
        setShiftCheckBox: {
            reducer: (state, action: PayloadAction<string>) => {
                state.currentWorkPlace!.shifts = state.currentWorkPlace!.shifts.map((shift: Shift) => {
                    if (shift.id === action.payload) {
                        shift.checked = !shift.checked
                    }
                    return shift
                })
            },
            prepare: (id: string) => {
                return { payload: id }
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
        signOutPlaces(state) {
            state.currentWorkPlace = null
            state.places = []
        }
        
    }
})

export const { 
    setWorkPlaceCheckbox,
    checkboxAll,
    setWorkPlaces, 
    addWorkPlace, 
    removeWorkPlaces,
    editAWorkPlace,
    setCurrentWorkPlace,
    addShiftToCurrentWorkPlace,
    removeShifts,
    editShift,
    setShiftCheckBox,
    checkBoxAllShifts,
    signOutPlaces,
    } = placesSlice.actions
export default placesSlice.reducer