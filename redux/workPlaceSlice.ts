import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkPlace } from "@/types/types";
import { formatISO, startOfToday } from "date-fns";

interface PlacesState {
  currentWorkPlace: null | WorkPlace;
  workPlaceRemoveButtons: boolean;
  checkboxAll: boolean;
  removePlacesIdArray: string[];
  checkedArray: string[];
  currentDate: string;
}

const initialState: PlacesState = {
  currentWorkPlace: null,
  workPlaceRemoveButtons: false,
  checkboxAll: false,
  removePlacesIdArray: [],
  checkedArray: [],
  currentDate: formatISO(startOfToday()),
};

const workPlaceSlice = createSlice({
  name: "workPlaces",
  initialState,
  reducers: {
    setCurrentWorkPlace: {
      reducer: (state, action: PayloadAction<WorkPlace>) => {
        state.currentWorkPlace = action.payload;
      },
      prepare: (workPlace: WorkPlace) => {
        return { payload: workPlace };
      },
    },
    setCheckboxAll(state) {
      state.checkboxAll = !state.checkboxAll;
    },
    setWorkPlaceRemoveButtons(state) {
      state.workPlaceRemoveButtons = !state.workPlaceRemoveButtons;
    },
    addIdToRemoveArray: {
      reducer: (state, action: PayloadAction<string>) => {
        state.removePlacesIdArray.push(action.payload);
      },
      prepare: (workPlaceId: string) => {
        return { payload: workPlaceId };
      },
    },
    deleteIdFromRemoveArray: {
      reducer: (state, action: PayloadAction<string>) => {
        const idx = state.removePlacesIdArray.indexOf(action.payload);
        state.removePlacesIdArray.splice(idx, 1);
      },
      prepare: (workPlaceId: string) => {
        return { payload: workPlaceId };
      },
    },
    clearIdToRemoveArray(state) {
      state.removePlacesIdArray = [];
    },
    setCurrentDate: {
      reducer: (state, action: PayloadAction<string>) => {
        state.currentDate = action.payload;
      },
      prepare: (date: string) => {
        return { payload: date };
      },
    },
  },
});

export const {
  setCurrentWorkPlace,
  setCheckboxAll,
  setWorkPlaceRemoveButtons,
  addIdToRemoveArray,
  deleteIdFromRemoveArray,
  clearIdToRemoveArray,
  setCurrentDate,
} = workPlaceSlice.actions;
export default workPlaceSlice.reducer;
