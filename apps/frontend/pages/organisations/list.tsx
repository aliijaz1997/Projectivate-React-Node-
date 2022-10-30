import withAuth from "~/web/common/utils/with-auth";
import { TenantList } from "~/web/features/tenant/TenantList";

function List() {
  return <TenantList />;
}

export default withAuth(List);
