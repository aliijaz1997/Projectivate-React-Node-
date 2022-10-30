import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  subTaskFlexContainer: {
    bgcolor: "white",
    borderRadius: "0.4rem",
    display: "flex",
    flexDirection: "column",
    width: "17rem",
  },
  subTaskPaddingContainer: {
    paddingBottom: "1.25rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  secondaryFlexContainer: {
    display: "flex",
    justifyContent: "space-between",
    mt: "0.3rem",
  },
  taskTitleTypogrphy: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: "rgb(17, 24, 39, 1)",
  },
  timeTypography: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: " rgb(75, 85, 99,1)",
  },
}));

export default useStyles;
