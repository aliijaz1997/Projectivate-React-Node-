import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { Tenant, TenantForm, Member, User } from "~/web/common/types";
import { baseQueryWithReauth } from "../common/baseQuery";

export const tenantsApi = createApi({
  reducerPath: "tenantsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Tenants"],
  endpoints: (builder) => ({
    tenantCreate: builder.mutation<Tenant, TenantForm>({
      query: (body) => ({
        url: `/tenants`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tenants"],
    }),
    Assignee: builder.query<Member | undefined, string | undefined>({
      query: (assigneeId) => ({
        url: `/tenants/${assigneeId}/user`,
        method: "GET",
      }),
    }),
    tenantsList: builder.query<Tenant[], void>({
      query: () => ({
        url: `/tenants`,
        method: "GET",
      }),
      providesTags: ["Tenants"],
    }),
    tenantDetails: builder.mutation<Tenant, string>({
      query: (tenantId) => ({
        url: `/tenants/${tenantId}`,
        method: "GET",
      }),
    }),
    tenantMembers: builder.query<Member[], string>({
      query: (tenantId) => ({
        url: `/tenants/${tenantId}/users`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useTenantCreateMutation,
  useTenantsListQuery,
  useTenantDetailsMutation,
  useTenantMembersQuery,
  useAssigneeQuery,
} = tenantsApi;
