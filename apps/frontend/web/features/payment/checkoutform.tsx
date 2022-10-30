import React, { FormEvent, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { usePaymentCreateMutation } from "~/web/store/services/payment.service";
import { useSelector } from "react-redux";
import { RootState } from "~/web/store/index";
import { ErrorResponse } from "~/web/common/types";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const subscriptionType = useSelector((state: RootState) => {
    return state.payment.subcriptionType;
  });
  const [paymentCreate, { isLoading, isSuccess, isError, error }] =
    usePaymentCreateMutation();

  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isError, error]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardElement)!,
    });

    const stripeTokenId = paymentMethod!.id!;
    if (isLoading)
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    if (!error) {
      await paymentCreate({ stripeTokenId, subcriptionType: subscriptionType });
    } else {
    }
  };

  return (
    <Box>
      <form
        style={{
          margin: "1rem",
          padding: "2.25rem",
          backgroundColor: "white",
          borderRadius: "0.25rem",
          maxWidth: "36rem",
        }}
        onSubmit={handleSubmit}
      >
        <Typography sx={{ color: "rgb(31 41 55)", fontWeight: 500 }}>
          Customer information
        </Typography>
        <Box sx={{ mt: "0.5rem" }}>
          <TextField variant="outlined" label="Name" type="Text" />
        </Box>
        <Box sx={{ mt: "0.5rem" }}>
          <TextField variant="outlined" label="Email" type="Text" />
        </Box>
        <Box sx={{ mt: "0.5rem" }}>
          <TextField variant="outlined" label="Address" type="Text" />
        </Box>
        <Box sx={{ mt: "0.5rem" }}>
          <TextField variant="outlined" label="City" type="Text" />
        </Box>
        <Box
          sx={{
            display: "inline-block",
            mt: "0.5rem",
            width: "50%",
            pr: "0.25rem",
          }}
        >
          <TextField variant="outlined" label="Country" type="Text" />
        </Box>
        <Box
          sx={{
            display: "inline-block",
            mt: "0.5rem",
            mx: "-0.25rem",
            width: "50%",
            pl: "0.25rem",
          }}
        >
          <TextField variant="outlined" label="Zip" type="Text" />
        </Box>
        <Typography
          sx={{ mt: "1rem", color: "rgb(31 41 55)", fontWeight: 500 }}
        >
          Payment information
        </Typography>
        <Box>
          <label
            style={{
              display: "block",
              fontSize: " 0.875rem",
              lineHeight: "1.25rem",
              color: "rgb(75 85 99)",
            }}
            htmlFor="cus_name"
          >
            Card
          </label>
          <CardElement
            options={{
              iconStyle: "solid",
              hidePostalCode: true,
              style: {
                base: {
                  iconColor: "rgb(240, 57, 122)",
                  color: "rgb(240, 57, 122)",
                  fontSize: "16px",
                  fontFamily: '"Open Sans", sans-serif',
                  fontSmoothing: "antialiased",
                },
                invalid: {
                  color: "#e5424d",
                  ":focus": {
                    color: "#303238",
                  },
                },
              },
            }}
          />
        </Box>
        <Button
          sx={{
            px: "1rem",
            py: "0.25rem",
            borderRadius: "0.25rem",
            fontWeight: 300,
          }}
          type="submit"
        >
          PAY
        </Button>
      </form>
    </Box>
  );
};
