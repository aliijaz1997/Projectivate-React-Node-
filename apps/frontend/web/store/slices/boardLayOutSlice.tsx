import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface viewState {
  isGroupView: boolean;
  fieldSelectPopOver: boolean;
}
const initialState: viewState = {
  isGroupView: false,
  fieldSelectPopOver: false,
};

export const boardViewSlice = createSlice({
  name: "boardView",
  initialState,
  reducers: {
    changeView: (state) => {
      state.isGroupView = !state.isGroupView;
    },
    openFieldSelectPopOver: (state) => {
      state.fieldSelectPopOver = !state.fieldSelectPopOver;
    },
  },
  extraReducers: (builder) => {},
});

export const { changeView, openFieldSelectPopOver } = boardViewSlice.actions;
