import {
  createTimer,
  TimeTrack,
  TimeTrackWithAllUsers,
} from "~/web/common/types/timeTrack";
import { baseApi } from "./base.service";

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listTimeTrack: builder.query<TimeTrackWithAllUsers, string>({
      query: (taskId) => ({
        url: `/time-track/task/${taskId}`,
        method: "GET",
      }),
      providesTags: ["TimerList"],
    }),
    startTimer: builder.mutation<
      TimeTrack,
      { body: Partial<createTimer>; taskId: string }
    >({
      query: ({ body, taskId }) => ({
        url: `/time-track/task/${taskId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TimerList"],
    }),
    createTimer: builder.mutation<
      TimeTrack,
      { body: createTimer; taskId: string }
    >({
      query: ({ body, taskId }) => ({
        url: `/time-track/task/${taskId}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TimerList"],
    }),
    stopTimer: builder.mutation<
      TimeTrack,
      { body: Partial<createTimer>; taskId: string }
    >({
      query: ({ body, taskId }) => ({
        url: `/time-track/task/${taskId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TimerList"],
    }),
    updateTimer: builder.mutation<
      TimeTrack,
      { body: Partial<TimeTrack>; timerId: string }
    >({
      query: ({ body, timerId }) => ({
        url: `/time-track/${timerId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TimerList"],
    }),
    deleteTimer: builder.mutation<TimeTrack, string>({
      query: (timerId) => ({
        url: `/time-track/${timerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimerList"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListTimeTrackQuery,
  useStartTimerMutation,
  useStopTimerMutation,
  useUpdateTimerMutation,
  useDeleteTimerMutation,
  useCreateTimerMutation,
} = commentsApi;
