import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  timeTrackedContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    bgcolor: "rgb(31 41 55)",
    height: "4rem",
  },
  totalTime: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "rgb(156 163 175)",
    color: "white",
    height: "3.5rem",
    px: "0.5rem",
  },
  pauseAndPlayButtonContainer: {
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    mx: "1rem",
  },
  listOfTimeManualRange: {
    my: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  showRangeContainer: {
    mt: "1rem",
    py: "0.75rem",
    px: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  showListTime: { color: "rgb(55 65 81)", py: "0.75rem", px: "0.5rem" },
}));

export default useStyles;
