import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  tenantMainContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tenantListborderContainer: {
    border: "2px solid rgb(229 231 235)",
    borderRadius: "0.375rem",
    width: { xs: "83%", lg: "40%" },
    p: "0.75rem",
  },
  tenantOrganizatonTypography: {
    textAlign: "center",
    py: "1rem",
    borderTopLeftRadius: "0.375rem",
    borderTopRightRadius: "0.375rem",
    bgcolor: "primary.main",
    color: "white",
  },
  tenantFooter: {
    borderRadius: "0.5rem",
    bgcolor: "rgb(243 244 246)",
    mt: "1.75rem",
    p: "0.5rem",
    width: { xs: "75%", lg: "40%" },
  },

  oranizationFlexContainer: {
    display: "flex",
    alignItems: "center",
  },
  createAnotherOrganization: {
    cursor: "pointer",
    textDecoration: "none",
  },
  accountCircleIcon: {
    mr: ".5rem",
  },
}));

export default useStyles;
