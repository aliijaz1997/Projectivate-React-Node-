import { CreateViewDto, CreateViewDtoRes, View } from "@projectivate/common";
import { baseApi } from "./base.service";

export const viewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllViews: builder.query<View[], string>({
      query: (projectId) => ({
        url: `/projects/${projectId}/views`,
        method: "GET",
      }),
      providesTags: ["ViewList"],
    }),

    createView: builder.mutation<
      CreateViewDtoRes,
      { body: CreateViewDto; projectId: string }
    >({
      query: ({ projectId, body }) => ({
        url: `/projects/${projectId}/views`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ViewList"],
    }),
    deleteView: builder.mutation<void, { projectId: string; viewId: string }>({
      query: ({ projectId, viewId }) => ({
        url: `/projects/${projectId}/views/${viewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ViewList", "ProjectDetails"],
    }),
    changeCurrentView: builder.mutation<
      void,
      {
        projectId: string;
        viewId: string;
      }
    >({
      query: ({ projectId, viewId }) => ({
        url: `/projects/${projectId}/views/currentView`,
        method: "PUT",
        body: {
          currentView: viewId,
        },
      }),
      invalidatesTags: ["ProjectDetails"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateViewMutation,
  useGetAllViewsQuery,
  useDeleteViewMutation,
  useChangeCurrentViewMutation,
} = viewsApi;
