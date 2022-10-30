import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment-subcription",
  initialState: { subcriptionType: "premium" },
  reducers: {
    changeToBusiness: (state) => {
      state.subcriptionType = "business";
    },
    changeToPremium: (state) => {
      state.subcriptionType = "premium";
    },
  },
});

export const { changeToBusiness, changeToPremium } = paymentSlice.actions;

export default paymentSlice.reducer;
