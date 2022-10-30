import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, socketBaseQuery } from "~/store/common/baseQuery";
import { Project, ProjectCreate } from "~/common/types";
import { socketManager } from "~/web/common/socket-io";
import { useTenantId } from "~/web/common/hooks/useTenantId";
import { getCookie } from "~/web/common/utils/get-cookie";
import { baseApi } from "./base.service";

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    projectList: builder.query<Project[], void>({
      queryFn: async (projectId, api, extraOptions, baseQueryWithReauth) => {
        try {
          await socketBaseQuery({
            event: "projects:list",
          });
          const result = await baseQueryWithReauth({
            url: "/projects",
            method: "GET",
          });

          return { data: result.data as Project[] };
        } catch (error) {
          return { error: { status: 500, data: {} } };
        }
      },
      providesTags: ["ProjectList"],
      async onCacheEntryAdded(
        projectId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = socketManager.client;
        try {
          const tenantId = getCookie("tenantId");

          await cacheDataLoaded;
          const listener = (data: any) => {
            if (data && data.channel !== tenantId) return;

            updateCachedData((draft) => {
              return data.projects as Project[];
            });
          };

          socket.on("projects", listener);
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    projectDetails: builder.query<Project, string>({
      queryFn: async (projectId, api, extraOptions, baseQueryWithReauth) => {
        try {
          await socketBaseQuery({
            event: "projects:detail",
            data: { projectId },
          });
          const result = await baseQueryWithReauth({
            url: `/projects/${projectId}`,
            method: "GET",
          });
          return { data: result.data as Project };
        } catch (error) {
          return { error: { status: 500, data: {} } };
        }
      },
      providesTags: ["ProjectDetails"],
      async onCacheEntryAdded(
        projectId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = socketManager.client;
        try {
          await cacheDataLoaded;
          const listener = (data: any) => {
            if (data && data.channel !== projectId) return;
            updateCachedData((draft) => {
              return data.project as Project;
            });
          };

          socket.on("projectDetails", listener);
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    projectCreate: builder.mutation<Project, ProjectCreate>({
      query: (body) => ({
        url: `/projects`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectList"],
    }),
    updateProjectViewPreferences: builder.mutation<
      Project,
      {
        projectId: string;
        viewName: "board" | "list" | "timeline" | "calendar";
        body: Partial<{
          horizontalField: string;
          verticalField: string;
        }>;
      }
    >({
      query: ({ projectId, body, viewName }) => ({
        url: `/projects/${projectId}/preferences/views/${viewName}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["ProjectList", "ProjectDetails"],
    }),
    projectDelete: builder.mutation<Project, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectList"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useProjectListQuery,
  useProjectCreateMutation,
  useProjectDetailsQuery,
  useUpdateProjectViewPreferencesMutation,
} = projectsApi;
