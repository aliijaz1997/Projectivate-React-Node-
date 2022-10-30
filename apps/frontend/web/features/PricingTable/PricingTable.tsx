import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FaCheck } from "react-icons/fa";
import CheckIcon from "@mui/icons-material/Check";
import { useAppDispatch } from "~/web/store";
import {
  changeToBusiness,
  changeToPremium,
} from "~/web/store/payment-subscription.slice";
import Link from "next/link";

const tiers = [
  {
    title: "Basic",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: "30",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Business",
    price: "60",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Get started",
    buttonVariant: "outlined",
  },
];

export default function PricingTable() {
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={4} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card sx={{ p: { md: "1rem" } }}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 5,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>

                  {tier.description.map((line) => (
                    <Box
                      sx={{
                        display: "flex",
                        listStyleType: "none",
                        alignItems: "center",
                        mx: "1.5rem",
                        my: "0.2rem",
                      }}
                      key={line}
                    >
                      <CheckIcon sx={{ mr: "0.8rem" }} />
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        {line}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                <CardActions>
                  <Link
                    href={
                      tier.title === "Basic" ? "/auth/register" : "/payment"
                    }
                  >
                    <a style={{ textDecoration: "none", width: "100%" }}>
                      <Button
                        fullWidth
                        variant={tier.buttonVariant as "outlined" | "contained"}
                        sx={{
                          color:
                            tier.buttonVariant === "contained" ? "white" : "",
                        }}
                        onClick={
                          tier.buttonText === "Premium"
                            ? () => dispatch(changeToBusiness())
                            : () => dispatch(changeToPremium())
                        }
                      >
                        {tier.buttonText}
                      </Button>
                    </a>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
