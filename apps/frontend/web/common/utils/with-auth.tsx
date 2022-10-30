import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/web/store";
import { useAuth } from "../hooks/useAuth";

const withAuth = <T extends object>(
  ProtectedComponent: React.ComponentType<T>
) => {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { isLoggedIn } = useAuth();

    useEffect(() => {
      setMounted(true);
    }, []);

    if (mounted && !isLoggedIn) {
      router.replace("/auth/login");
      return <div>Redirecting...</div>;
    } else {
      return mounted && <ProtectedComponent {...props} />;
    }
  };

  return ComponentWithAuth;
};

export default withAuth;
