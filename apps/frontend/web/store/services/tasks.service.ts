import { socketBaseQuery } from "~/store/common/baseQuery";
import { socketManager } from "~/web/common/socket-io";
import { Member, Task, TaskCreate, User } from "~/web/common/types";
import { baseApi } from "./base.service";
import {
  FilterTaskDto,
  Operation,
  TaskPositionDto,
} from "@projectivate/common";

const defaultFilters: FilterTaskDto = {
  fields: [],
  op: Operation.AND,
  search: "",
  searchDescription: true,
  searchName: true,
};

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    taskListByProjectId: builder.query<
      Task[],
      { filters?: Partial<FilterTaskDto>; projectId: string }
    >({
      query: ({ filters = {}, projectId }) => ({
        url: `/projects/${projectId}/tasks`,
        method: "POST",
        body: {
          ...defaultFilters,
          ...filters,
        },
      }),
      providesTags: ["TaskList"],
    }),
    taskDetails: builder.query<Task, string>({
      queryFn: async (taskId, api, extraOptions, baseQueryWithReauth) => {
        try {
          await socketBaseQuery({
            event: "tasks:details",
            data: { taskId },
          });
          const result = await baseQueryWithReauth({
            url: `/tasks/${taskId}`,
            method: "GET",
          });
          return { data: result.data as Task };
        } catch (error) {
          return { error: { status: 500, data: {} } };
        }
      },
      providesTags: ["TaskDetails"],
      async onCacheEntryAdded(
        taskId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = socketManager.client;
        try {
          await cacheDataLoaded;
          const listener = (data: any) => {
            if (data && data.channel !== taskId) return;
            updateCachedData((draft) => {
              return data.taskDetails as Task;
            });
          };

          socket.on("taskDetails", listener);
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    taskCreate: builder.mutation<Task, TaskCreate>({
      query: (body) => ({
        url: `/tasks`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TaskList"],
    }),
    addAssigneeToTask: builder.mutation<
      any,
      { taskId: string; assigneeId: string }
    >({
      query: ({ assigneeId, taskId }) => ({
        url: `/tasks/${taskId}/assignee/${assigneeId}`,
        method: "POST",
      }),
      invalidatesTags: ["TaskList", "TaskDetails"],
    }),

    assigneeOfTasks: builder.query<Member[], string>({
      queryFn: async (taskId, api, extraOptions, baseQueryWithReauth) => {
        try {
          await socketBaseQuery({
            event: "taskAssignee:list",
            data: { taskId },
          });
          const result = await baseQueryWithReauth({
            url: `/tasks/${taskId}/assignee`,
            method: "GET",
          });
          return { data: result.data as Member[] };
        } catch (error) {
          return { error: { status: 500, data: {} } };
        }
      },
      providesTags: ["TaskDetails"],
      async onCacheEntryAdded(
        taskId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = socketManager.client;
        try {
          await cacheDataLoaded;
          const listener = (data: any) => {
            if (data && data.channel !== taskId) return;
            updateCachedData((draft) => {
              return data.assignees as Member[];
            });
          };

          socket.on("taskAssignee", listener);
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    taskDelete: builder.mutation<Task, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskList", "TaskDetails"],
    }),
    taskReorder: builder.mutation<Task[], { body: TaskPositionDto[] }>({
      query: ({ body }) => ({
        url: `/tasks/reorder`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TaskList", "TaskDetails"],
    }),
    assigneeDeleteFromTask: builder.mutation<
      Task,
      { taskId: string; assigneeId: string }
    >({
      query: ({ taskId, assigneeId }) => ({
        url: `/tasks/${taskId}/assignee/${assigneeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskList", "TaskDetails"],
    }),
    taskUpdate: builder.mutation<
      Task,
      { taskId: string; body: Partial<Task>; projectId: string }
    >({
      query: ({ body, taskId }) => ({
        url: `/tasks/${taskId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [
        "TaskList",
        "TaskDetails",
        "CurrentSprint",
        "PreviousSprints",
      ],
      onQueryStarted: async (
        { body, taskId, projectId },
        { dispatch, queryFulfilled }
      ) => {
        dispatch(
          tasksApi.util.updateQueryData(
            "taskListByProjectId",
            {
              projectId,
            },
            (draft) => {
              return draft.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    ...body,
                  };
                }
                return task;
              });
            }
          )
        );

        await queryFulfilled.catch(() =>
          tasksApi.util.invalidateTags(["TaskDetails", "TaskList"])
        );
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useTaskCreateMutation,
  useTaskDeleteMutation,
  useTaskUpdateMutation,
  useTaskListByProjectIdQuery,
  useAddAssigneeToTaskMutation,
  useAssigneeOfTasksQuery,
  useAssigneeDeleteFromTaskMutation,
  useLazyTaskDetailsQuery,
  useTaskDetailsQuery,
  useTaskReorderMutation,
} = tasksApi;
