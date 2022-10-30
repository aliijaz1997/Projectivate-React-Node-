import React from "react";
import { FaUserCircle } from "react-icons/fa";
import NextLink from "next/link";
import { Tenant } from "~/web/common/types";
import { useTenantsListQuery } from "~/web/store/services/tenants.service";
import { Alert, Box, Link, Typography } from "@mui/material";
import { TenantItem } from "./TenantItem";
import useStyles from "./tenantList.styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export function TenantList() {
  const { isLoading, isError, isSuccess, data, error } = useTenantsListQuery();
  const styles = useStyles({});

  if (isLoading) return <div>Loading</div>;

  if (isError) return <Alert severity="error">Error occurred</Alert>;

  return (
    <Box sx={styles.tenantMainContainer}>
      <Box sx={styles.tenantListborderContainer}>
        <Typography
          sx={styles.tenantOrganizatonTypography}
          fontSize="bold"
          variant="h5"
        >
          Organizations
        </Typography>

        <Box sx={{ px: "0.75rem" }}>
          {!data ? (
            <Typography>No Tenants Found</Typography>
          ) : (
            data.map((tenant) => {
              return <TenantItem key={tenant.id} tenant={tenant} />;
            })
          )}
        </Box>
      </Box>
      <Box sx={styles.tenantFooter}>
        <Box sx={styles.oranizationFlexContainer}>
          <AccountCircleIcon sx={styles.accountCircleIcon} />
          <Box>
            <Typography>
              Want to use it with different organization.
              <NextLink href="/organisations/create">
                <Link sx={styles.createAnotherOrganization}>
                  &nbsp; Create another organization
                </Link>
              </NextLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
