import { onAuthStateChanged, User } from "@firebase/auth";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { auth } from "~/web/common/firebase/app";

export function Profile() {
  const [user, setUser] = useState<null | User>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  if (!user) return null;

  return (
    <Box sx={{ mx: "5rem", mt: "4rem" }}>
      <Box sx={{ p: "1.25rem" }}>
        <Box sx={{ display: "flex", alignItem: "center", p: "0.25rem" }}>
          <Avatar
            sx={{ height: "1.5rem", width: "1.5rem" }}
            src={user.photoURL ?? ""}
            alt={user.displayName ?? ""}
          />

          <Box>
            <Button>Upload your photo</Button>
            <Typography>
              Photos help your teammates recongnize you in asana
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: "1.25rem" }}>
          <TextField
            label="Your full name"
            variant="outlined"
            disabled
            value={user.displayName ?? ""}
          />
          <TextField
            label="Your email"
            variant="outlined"
            value={user.email ?? ""}
            disabled
          />
          <TextField label="About me" type="text" variant="outlined" />
        </Box>
      </Box>
    </Box>
  );
}
