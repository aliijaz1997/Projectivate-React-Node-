// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../common/baseQuery";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "CommentList",
    "CommentDetails",
    "ProjectList",
    "ProjectDetails",
    "CategoriesList",
    "TaskList",
    "TaskDetails",
    "CustomFieldList",
    "CustomFieldListItemList",
    "CurrentSprint",
    "TaskLogList",
    "TimerList",
    "PreviousSprints",
    "ViewList",
  ],
  endpoints: () => ({}),
});
