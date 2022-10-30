import React from "react";
import { AuthLayout } from "./AuthLayout/AuthLayout";
import { DashboardLayout } from "./DashboardLayout/DashboardLayout";

export type LayoutType = "DashboardLayout" | "AuthLayout" | "None";

interface MainLayoutProps {
  children: React.ReactNode;
  layout: LayoutType;
}

export function MainLayout(props: MainLayoutProps) {
  switch (props.layout) {
    case "DashboardLayout":
      return <DashboardLayout>{props.children}</DashboardLayout>;
    case "None":
      return <>{props.children}</>;
    default:
      return <>{props.children}</>;
  }
}
