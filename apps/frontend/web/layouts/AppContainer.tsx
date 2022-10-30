import { useRouter } from "next/router";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";

import { LayoutType, MainLayout } from "./MainLayout";
import theme from "Theme/Theme";

interface AppContainerProps {
  children: React.ReactNode;
}

export function AppContainer(props: AppContainerProps) {
  const router = useRouter();

  const layout: LayoutType = router.pathname.includes("/auth")
    ? "AuthLayout"
    : router.pathname.includes("/organisations")
    ? "None"
    : "DashboardLayout";

  return (
    <ThemeProvider theme={theme}>
      <MainLayout layout={layout}>{props.children}</MainLayout>
    </ThemeProvider>
  );
}
