import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowState {
  isFetching: boolean;
  isMobile: boolean;
}

const initialState: WindowState = {
  isFetching: false,
  isMobile: false,
};
const windowSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching(state) {
      state.isFetching = !state.isFetching;
    },
  },
});

export const { setIsFetching } = windowSlice.actions;
export default windowSlice.reducer;
