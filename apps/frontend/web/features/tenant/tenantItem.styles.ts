import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  tenantItemFlexContainer: {
    display: "flex",
    alignItems: "center",
    p: "0.75rem",
    cursor: "pointer",
    my: "0.75rem",
  },
  tenantItemFirstAlphabet: {
    display: "flex",
    justifyContent: "center",
    border: "1px solid rgb(107 114 128)",
    width: "3rem",
    height: "3rem",
    borderRadius: "0.2rem",
  },

  tenantItemFirstAlphabetTypography: {
    p: "0.5rem",
    fontSize: "1.5rem",
    lineHeight: " 2rem",
    fontWeight: 900,
  },
  tenantNamePrimaryFlexContainer: {
    flex: "1 1 auto",
    boxSizing: "border-box",
  },
  tenantNameSecondaryFlexContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    ml: "0.5rem",
  },
}));

export default useStyles;
