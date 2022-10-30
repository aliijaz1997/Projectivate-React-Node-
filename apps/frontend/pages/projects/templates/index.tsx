import React from "react";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";
import TemplateView from "~/web/features/project-create/components/TemplateView";

function Templates() {
  return <TemplateView />;
}

export default withAuthAndTenant(Templates);
