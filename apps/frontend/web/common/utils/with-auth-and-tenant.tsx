import { compose } from "redux";
import withAuth from "./with-auth";
import withTenant from "./with-tenant";

export const withAuthAndTenant = compose<JSX.Element>(withTenant, withAuth);
