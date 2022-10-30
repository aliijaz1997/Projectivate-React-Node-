import React from "react";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";
import { OverView } from "~/web/features/overview/OverView";

function OverviewPage() {
  return <OverView />;
}
export default withAuthAndTenant(OverviewPage);
