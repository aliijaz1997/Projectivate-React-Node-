import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTenantId } from "../hooks/useTenantId";

const withTenant = <T extends object>(
  ProtectedComponent: React.ComponentType<T>
) => {
  const ComponentWithTenant = (props: T) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const tenantId = useTenantId();
    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted && !tenantId) {
      router.replace("/organisations/list");
      return null;
    } else {
      return mounted && <ProtectedComponent {...props} />;
    }
  };

  return ComponentWithTenant;
};

export default withTenant;
