import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ErrorResponse } from "~/web/common/types";
import { useTenantCreateMutation } from "~/web/store/services/tenants.service";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import useStyles from "./tenantCreate.styles";

export function TenantCreate() {
  const [name, setName] = useState("");
  const [tenantCreate, { isLoading, isError, isSuccess, error }] =
    useTenantCreateMutation();

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/organisations/list");
    }
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isSuccess, router, isError, error]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    tenantCreate({
      name,
    });
  };
  const styles = useStyles({});

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={styles.tenantCreateBackground}>
      <Box sx={styles.tenantCreateContainer}>
        <Box className="space-y-1">
          <TextField
            label="Enter Organization Name"
            fullWidth
            value={name}
            onChange={handleNameChange}
            sx={styles.tenantTextField}
          />
        </Box>
        <Box sx={styles.tenantCreateButtonContainer}>
          <Button variant="outlined" onClick={handleSubmit}>
            Create Tenant
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
