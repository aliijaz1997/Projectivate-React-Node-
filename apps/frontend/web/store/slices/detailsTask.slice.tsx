import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../common/types";
import { customFieldApi } from "../services/customfield.service";
import { tasksApi } from "../services/tasks.service";

type InitialState = {
  selectedTask: Task | null;
  modalOpen: boolean;
};

export const detailsTaskSlice = createSlice({
  name: "detailTask",
  initialState: {
    selectedTask: null,
    modalOpen: false,
  } as InitialState,
  reducers: {
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload;
      state.modalOpen = true;
    },
    unSelectTask: (state) => {
      state.selectedTask = null;
      state.modalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tasksApi.endpoints.taskUpdate.matchFulfilled,
      (state, action: PayloadAction<Task>) => {
        state.selectedTask = action.payload;
      }
    );
    builder.addMatcher(
      customFieldApi.endpoints.addFieldItemToTask.matchFulfilled,
      (state, action: PayloadAction<Task>) => {
        state.selectedTask = action.payload;
      }
    );
    builder.addMatcher(
      customFieldApi.endpoints.removeFieldItemToTask.matchFulfilled,
      (state, action: PayloadAction<Task>) => {
        state.selectedTask = action.payload;
      }
    );
  },
});

export const { selectTask, unSelectTask } = detailsTaskSlice.actions;
