import {
  CurrentSprintRes,
  PreviousSprint,
  Sprint,
  SprintCreate,
} from "~/web/common/types/sprint";
import { baseApi } from "./base.service";

export const sprintsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentSprint: builder.query<CurrentSprintRes | null, string>({
      query: (projectId: string) => ({
        url: `/projects/${projectId}/sprints/current`,
        method: "GET",
      }),
      providesTags: ["CurrentSprint"],
    }),
    previousSprints: builder.query<PreviousSprint[], string>({
      query: (projectId) => ({
        url: `/projects/${projectId}/sprints/previous`,
        method: "GET",
      }),
      providesTags: ["PreviousSprints"],
    }),
    createSprint: builder.mutation<
      Sprint,
      {
        projectId: string;
        body: SprintCreate;
      }
    >({
      query: ({ projectId, body }) => ({
        url: `/projects/${projectId}/sprints`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CurrentSprint", "PreviousSprints"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateSprintMutation,
  useCurrentSprintQuery,
  usePreviousSprintsQuery,
} = sprintsApi;
