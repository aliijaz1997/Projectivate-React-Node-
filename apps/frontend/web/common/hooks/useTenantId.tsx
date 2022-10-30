import { useCookies } from "react-cookie";

export function useTenantId(): string | null {
  const [cookies] = useCookies(["tenantId"]);
  const tenantId = cookies.tenantId;

  return tenantId;
}
