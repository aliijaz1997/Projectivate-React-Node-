import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { PaymentInfo } from "~/web/common/types";
import { baseQueryWithReauth } from "../common/baseQuery";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    paymentCreate: builder.mutation<string, PaymentInfo>({
      query: (body) => ({
        url: `payment/subscription`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { usePaymentCreateMutation } = paymentApi;
