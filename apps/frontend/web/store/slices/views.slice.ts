import {
  FilterRule,
  GENERIC_VIEW_CONSTANT,
  Operation,
  View,
} from "@projectivate/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { projectsApi } from "../services/projects.service";

type ViewState = {
  currentView: Omit<View, "projectId">;
  views: View[];
};

const initialState: ViewState = {
  currentView: {
    id: "Default",
    name: GENERIC_VIEW_CONSTANT,
    filters: {
      fields: [],
      op: Operation.AND,
      search: "",
      searchDescription: true,
      searchName: true,
    },
    groupings: {
      field1: "status",
      field2: "priority",
    },
  },
  views: [],
};

export const views = createSlice({
  name: "views",
  initialState,
  reducers: {
    setField1: (state, action: PayloadAction<string>) => {
      state.currentView.groupings.field1 = action.payload;
    },
    setField2: (state, action: PayloadAction<string>) => {
      state.currentView.groupings.field2 = action.payload;
    },
    updateSearch: (state, action: PayloadAction<{ search: string }>) => {
      state.currentView.filters.search = action.payload.search;
    },
    updateOperation: (state, action: PayloadAction<{ op: Operation }>) => {
      state.currentView.filters.op = action.payload.op;
    },
    addFilterField: (state, action: PayloadAction<{ field: FilterRule }>) => {
      state.currentView.filters.fields.push(action.payload.field);
    },
    removeField: (state, action: PayloadAction<{ index: number }>) => {
      state.currentView.filters.fields.splice(action.payload.index, 1);
    },
    updateField: (
      state,
      action: PayloadAction<{ field: FilterRule & { index: number } }>
    ) => {
      const { index, ...otherData } = action.payload.field;

      state.currentView.filters.fields[index] = otherData;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      projectsApi.endpoints.projectDetails.matchFulfilled,
      (state, action) => {
        state.views = action.payload.views;

        state.currentView =
          action.payload.views.find(
            (v) => v.id === action.payload.currentView
          ) ??
          action.payload.views.at(0) ??
          state.currentView;
      }
    );
  },
});

export const {
  setField1,
  setField2,
  addFilterField,
  removeField,
  updateField,
  updateOperation,
  updateSearch,
} = views.actions;
