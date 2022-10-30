import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "~/store/services/auth.service";
import { localStorageService } from "~/web/common/services/LocalStorageService";

type AuthState = {
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: { token: localStorageService.getToken() } as AuthState,
  reducers: {
    login: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
      localStorageService.setToken(payload);
    },
    updateToken: (state, { payload }: PayloadAction<string | null>) => {
      if (!payload) {
        localStorageService.removeToken();
        state.token = null;
      } else {
        state.token = payload;
        localStorageService.setToken(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      localStorageService.removeToken();
      state.token = null;
    });
  },
});

export default authSlice.reducer;

export const { login, updateToken } = authSlice.actions;
