import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
} from "@firebase/auth";
import React, { useState } from "react";
import { useAppSelector } from "~/web/store";
import { useLogoutMutation } from "~/web/store/services/auth.service";
import { auth } from "../firebase/app";

export function useAuth() {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [logout] = useLogoutMutation();
  const token = useAppSelector((s) => s.auth.token);

  const isLoggedIn = React.useMemo(
    () => (isLoading ? !!token : !!user),
    [isLoading, token, user]
  );

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) setUser(firebaseUser);
      else setUser(null);

      setIsLoading(false);
    });

    return unsub;
  }, []);

  const signOut = () => {
    firebaseSignOut(auth).then(() => {
      logout();
    });
  };

  return {
    user,
    isLoggedIn,
    isLoading,
    signOut,
  };
}
