import { socketBaseQuery } from "~/store/common/baseQuery";
import { socketManager } from "~/web/common/socket-io";
import { Comment, CommentCreate } from "~/web/common/types";
import { baseApi } from "./base.service";

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listComments: builder.query<Comment[], { taskId: string }>({
      queryFn: async ({ taskId }, api, extraOptions, baseQueryWithReauth) => {
        try {
          await socketBaseQuery({ data: { taskId }, event: "comments:list" });
          const result = await baseQueryWithReauth({
            url: `/tasks/${taskId}/comments`,
            method: "GET",
          });

          return { data: result.data as Comment[] };
        } catch (error) {
          return { error: { status: 500, data: {} } };
        }
      },
      providesTags: ["CommentList"],

      async onCacheEntryAdded(
        { taskId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = socketManager.client;
        try {
          await cacheDataLoaded;
          const listener = (data: any) => {
            if (data && data.channel !== taskId) return;

            updateCachedData((draft) => {
              return data.comments as Comment[];
            });
          };

          socket.on("comments", listener);
        } catch {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    createComment: builder.mutation<
      Comment,
      { body: CommentCreate; taskId: string }
    >({
      query: ({ body, taskId }) => ({
        url: `/tasks/${taskId}/comments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CommentList"],
    }),
    deleteComment: builder.mutation<Partial<Comment>, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/tasks/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CommentList", "CommentDetails"],
    }),
    updateComment: builder.mutation<
      Comment,
      { body: Partial<Comment>; commentId: string }
    >({
      query: ({ body, commentId }) => ({
        url: `/tasks/comments/${commentId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CommentList"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useListCommentsQuery,
} = commentsApi;
