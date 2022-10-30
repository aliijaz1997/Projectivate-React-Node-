import React from "react";
import { Home } from "~/web/features/home/Home";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";

function HomePage() {
  return <Home />;
}

export default withAuthAndTenant(HomePage);
