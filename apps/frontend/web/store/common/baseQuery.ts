import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { auth } from "~/web/common/firebase/app";
import { socketManager } from "~/web/common/socket-io";
import { getCookie } from "~/web/common/utils/get-cookie";
import { RootState } from "..";
import { authApi } from "../services/auth.service";
import { updateToken } from "../slices/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const currentUser = auth.currentUser;

    const refreshToken = await currentUser?.getIdToken(true);
    if (refreshToken) {
      // store the new token
      api.dispatch(updateToken(refreshToken));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authApi.endpoints.logout.initiate());
    }
  }
  return result;
};

export const socketBaseQuery = async <T, R>({
  event,
  data,
  initialData = {} as R,
}: {
  event: string;
  data?: T;
  initialData?: R;
}) => {
  const tenantId = getCookie("tenantId");

  socketManager.client.emit(event, { ...data, tenantId });
  return { data: initialData };
};
