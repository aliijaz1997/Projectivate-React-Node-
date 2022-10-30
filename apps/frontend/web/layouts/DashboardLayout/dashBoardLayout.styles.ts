import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  sidebarMainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    pt: "1rem",
    pb: "1.8rem",
  },
  sidebarFlexContainer: {
    display: "flex",
    flexDirection: "column",
  },
  sidebarLogoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  chevronLeftIconButton: {
    display: { xs: "block", md: "none" },
  },
  organizationContainer: {
    display: "flex",
    alignItems: "center",
    p: "0.75rem",
    borderBottom: "1px solid rgb(107 114 128)",
    ml: "1rem",
    my: "0.75rem",
  },
  organizationIconBorderContainer: {
    display: "flex",
    justifyContent: "center",
    border: "1px solid rgb(107 114 128)",
    width: "3rem",
    height: "3rem",
  },
  organizationTypography: {
    p: "0.5rem",
    fontSize: "1.5rem",
    lineHeight: " 2rem",
    fontWeight: 900,
  },
  oranizationFlexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ml: "0.5rem",
  },
  tenantNameTypography: {
    fontWeight: 700,
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    cursor: "pointer",
  },
}));

export default useStyles;
