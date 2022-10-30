import { Log } from "~/web/common/types";
import { LogItem } from "../../common/types/task";
import { baseApi } from "./base.service";

export const logApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logListOnTask: builder.query<Log[], string>({
      query: (taskId) => ({
        url: `taskLog/tasks/${taskId}`,
        method: "GET",
      }),
      providesTags: ["TaskLogList"],
    }),
    logItemList: builder.query<LogItem[], string>({
      query: (taskLogId) => ({
        url: `taskLog/${taskLogId}/taskLogItems`,
        method: "GET",
      }),
      providesTags: ["TaskLogList"],
    }),
  }),
  overrideExisting: false,
});

export const { useLogListOnTaskQuery, useLogItemListQuery } = logApi;
