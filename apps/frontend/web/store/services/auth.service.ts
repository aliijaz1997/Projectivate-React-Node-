import { createApi } from "@reduxjs/toolkit/query/react";
import { Register } from "~/web/common/types";

import { baseQueryWithReauth } from "../common/baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Register"],
  endpoints: (builder) => ({
    register: builder.mutation<Register, Register & { tenantId?: string }>({
      query(body) {
        if (!body.tenantId) {
          return {
            url: `/auth/register`,
            method: "POST",
            body,
          };
        }
        return {
          url: `/auth/register?tenantId=${body.tenantId}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Register"],
    }),
    logout: builder.mutation<null, void>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLogoutMutation } = authApi;
