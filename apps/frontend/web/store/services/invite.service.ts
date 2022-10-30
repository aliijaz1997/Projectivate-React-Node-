import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { InviteForm } from "~/web/common/types";
import { baseQueryWithReauth } from "../common/baseQuery";
export const inviteApi = createApi({
  reducerPath: "inviteApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    invite: builder.mutation<null, InviteForm>({
      query: (body) => ({
        url: `/invite`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useInviteMutation } = inviteApi;
