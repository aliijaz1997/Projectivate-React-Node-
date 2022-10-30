import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import membersReducer from "./slices/membersSlice";
import authReducer from "./slices/auth.slice";
import payment from "./payment-subscription.slice";
import { authApi } from "./services/auth.service";
import { tenantsApi } from "./services/tenants.service";
import { paymentApi } from "./services/payment.service";
import { inviteApi } from "./services/invite.service";
import { detailsTaskSlice } from "./slices/detailsTask.slice";
import { baseApi } from "./services/base.service";
import { boardViewSlice } from "./slices/boardLayOutSlice";
import { views } from "./slices/views.slice";

export function makeStore() {
  return configureStore({
    reducer: {
      boardView: boardViewSlice.reducer,
      views: views.reducer,
      members: membersReducer,
      auth: authReducer,
      payment: payment,
      detailsTask: detailsTaskSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [baseApi.reducerPath]: baseApi.reducer,
      [tenantsApi.reducerPath]: tenantsApi.reducer,
      [paymentApi.reducerPath]: paymentApi.reducer,
      [inviteApi.reducerPath]: inviteApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        baseApi.middleware,
        tenantsApi.middleware,
        paymentApi.middleware,
        inviteApi.middleware
      ),
  });
}

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
