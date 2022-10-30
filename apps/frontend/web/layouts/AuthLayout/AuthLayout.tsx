import React from "react";
import { Navbar } from "./Navbar/Navbar";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
