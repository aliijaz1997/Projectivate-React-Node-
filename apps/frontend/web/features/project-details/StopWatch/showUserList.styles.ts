import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  userListContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  userListTypography: {
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    cursor: "pointer",
  },
  secondaryFlexContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: "0.3rem",
  },
  userListTime: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default useStyles;
