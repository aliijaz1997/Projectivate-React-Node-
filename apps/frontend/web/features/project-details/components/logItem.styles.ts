import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  taskLogItemsContainer: {
    bgcolor: "white",
    m: "0.5rem",
    borderRadius: "0.375rem",
    borderStyle: "dashed",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  },
  logItemFieldTypography: {
    color: " rgb(17 24 39)",
    fontWeight: 700,
    fontSize: " 0.875rem",
    lineHeight: "1.25rem",
  },
  logItemFieldItemTypography: {
    fontSize: " 0.875rem",
    lineHeight: "1.25rem",
    color: " rgb(17 24 39)",
    ml: "0.5rem",
    fontWeight: 500,
  },
  timeDurationTypography: {
    fontSize: " 0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 700,
    color: " rgb(17 24 39)",
  },
  taskLogTime: {
    fontSize: " 0.875rem",
    lineHeight: "1.25rem",
    fontWeight: 500,
    color: " rgb(17 24 39)",
    ml: "0.5rem",
  },
  dateStartDateEnd: {
    display: "flex",
    justifyContent: "space-between",
    ml: "0.5rem",
    alignItems: "baseline",
  },
  dateStart: {
    fontSize: " 0.875rem",
    lineHeight: "1.25rem",
    color: "rgb(75 85 99)",
  },
  dateEnd: {
    fontSize: " 0.875rem",
    lineHeight: "1.25rem",
    color: "rgb(75 85 99)",
  },
}));

export default useStyles;
