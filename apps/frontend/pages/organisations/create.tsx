import withAuth from "~/web/common/utils/with-auth";
import { TenantCreate } from "~/web/features/tenant/TenantCreate";

function Create() {
  return <TenantCreate />;
}

export default withAuth(Create);
