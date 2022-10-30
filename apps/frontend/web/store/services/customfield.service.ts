import {
  CustomFieldCreate,
  CustomFieldItem,
  Project,
  ProjectCustomFields,
  Task,
  TaskCustomFields,
} from "~/web/common/types";
import { baseApi } from "./base.service";
import { tasksApi } from "./tasks.service";

export const customFieldApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listProjectCustomField: builder.query<ProjectCustomFields, string>({
      query: (projectId) => ({
        url: `projects/${projectId}/customFields`,
        method: "GET",
      }),
      providesTags: ["CustomFieldList"],
    }),
    listProjectCustomFieldItem: builder.query<
      CustomFieldItem[],
      { projectId: string; field: string }
    >({
      query: ({ projectId, field }) => ({
        url: `projects/${projectId}/customFields/${field}/fieldItems`,
        method: "GET",
      }),
      providesTags: ["CustomFieldListItemList"],
    }),
    listOfTasksCustomFieldItems: builder.query<
      TaskCustomFields,
      { taskId: string; projectId: string }
    >({
      query: ({ taskId, projectId }) => ({
        url: `projects/${projectId}/tasks/${taskId}/customFields`,
        method: "GET",
      }),
      providesTags: ["TaskDetails"],
    }),
    createProjectCustomField: builder.mutation<string, CustomFieldCreate>({
      query: ({ projectId, name, type }) => ({
        url: `projects/${projectId}/customFields`,
        method: "POST",
        body: {
          name,
          type,
        },
      }),
      invalidatesTags: ["CustomFieldList", "ProjectDetails"],
    }),

    updateProjectCustomFieldItem: builder.mutation<
      Project,
      {
        projectId: string;
        field: string;
        fieldItemId: string;
        body: Partial<CustomFieldItem>;
      }
    >({
      query: ({ projectId, body, field, fieldItemId }) => ({
        url: `projects/${projectId}/customFields/${field}/fieldItems/${fieldItemId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CustomFieldListItemList", "ProjectDetails"],
    }),

    deleteProjectCustomFieldItem: builder.mutation<
      Project,
      {
        projectId: string;
        field: string;
        fieldItemId: string;
        body: { keepTasks: boolean };
      }
    >({
      query: ({ projectId, field, fieldItemId, body }) => ({
        url: `projects/${projectId}/customFields/${field}/fieldItems/${fieldItemId}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: [
        "CustomFieldListItemList",
        "ProjectDetails",
        "TaskList",
      ],
    }),

    addCustomFieldItemToProject: builder.mutation<
      Project,
      {
        projectId: string;
        name: string;
        field: string;
        color?: string;
      }
    >({
      query: ({ projectId, name, field, color }) => ({
        url: `projects/${projectId}/customFields/${field}/fieldItems`,
        method: "POST",
        body: {
          name,
          color,
        },
      }),
      invalidatesTags: [
        "CustomFieldListItemList",
        "ProjectDetails",
        "ProjectList",
      ],
    }),
    addFieldItemToTask: builder.mutation<
      string,
      {
        projectId: string;
        taskId: string;
        fieldItemId: string;
        field: string;
      }
    >({
      query: ({ projectId, taskId, field, fieldItemId }) => ({
        url: `projects/${projectId}/tasks/${taskId}/customFields/${field}/fieldItems/${fieldItemId}`,
        method: "POST",
      }),
      invalidatesTags: ["TaskDetails", "TaskList"],
    }),
    updateManyFieldItemOnTask: builder.mutation<
      Task,
      { taskId: string; projectId: string; body: TaskCustomFields }
    >({
      query: ({ body, taskId, projectId }) => ({
        url: `projects/${projectId}/tasks/${taskId}/customFields`,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (
        { body, taskId, projectId },
        { dispatch, queryFulfilled }
      ) => {
        dispatch(
          tasksApi.util.updateQueryData(
            "taskListByProjectId",
            { projectId },
            (draft) => {
              return draft.map((task) => {
                if (task.id === taskId) {
                  return {
                    ...task,
                    ["customFields"]: body,
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
      invalidatesTags: ["TaskList", "TaskLogList"],
    }),
    removeFieldItemToTask: builder.mutation<
      string,
      {
        taskId: string;
        fieldItemId: string;
        field: string;
        projectId: string;
      }
    >({
      query: ({ taskId, field, fieldItemId, projectId }) => ({
        url: `projects/${projectId}/tasks/${taskId}/customFields/${field}/fieldItems/${fieldItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskDetails", "TaskList"],
    }),
    deleteProjectCustomField: builder.mutation<
      string,
      {
        field: string;
        projectId: string;
      }
    >({
      query: ({ field, projectId }) => ({
        url: `projects/${projectId}/customFields/${field}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CustomFieldList", "ProjectDetails"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useListProjectCustomFieldQuery,
  useCreateProjectCustomFieldMutation,
  useListProjectCustomFieldItemQuery,
  useAddCustomFieldItemToProjectMutation,
  useListOfTasksCustomFieldItemsQuery,
  useAddFieldItemToTaskMutation,
  useRemoveFieldItemToTaskMutation,
  useDeleteProjectCustomFieldMutation,
  useUpdateProjectCustomFieldItemMutation,
  useDeleteProjectCustomFieldItemMutation,
  useUpdateManyFieldItemOnTaskMutation,
} = customFieldApi;
