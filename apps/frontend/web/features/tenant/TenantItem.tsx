import React, { useEffect } from "react";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";
import { useTenantDetailsMutation } from "~/web/store/services/tenants.service";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Tenant } from "~/web/common/types";
import useStyles from "./tenantItem.styles";

export interface TenantItemProps {
  tenant: Tenant;
}

export function TenantItem({ tenant }: TenantItemProps) {
  const [tenantDetails, { data, isError, isSuccess, isLoading }] =
    useTenantDetailsMutation();
  const styles = useStyles({});
  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Box
      onClick={() => tenantDetails(tenant.id)}
      sx={styles.tenantItemFlexContainer}
    >
      <Box sx={styles.tenantItemFirstAlphabet}>
        <Typography sx={styles.tenantItemFirstAlphabetTypography}>
          {tenant.name.at(0)?.toUpperCase()}
        </Typography>
      </Box>
      <Box sx={styles.tenantNamePrimaryFlexContainer}>
        <Box sx={styles.tenantNameSecondaryFlexContainer}>
          <Typography>{tenant.name}</Typography>
          <FaArrowRight />
        </Box>
      </Box>
    </Box>
  );
}
