import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";

function Dashboard() {
  return <div>Dashboard</div>;
}

export default withAuthAndTenant(Dashboard);
