import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  boardTaskGroupContainer: {
    ml: "0.75rem",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    height: "24rem",
    width: "20rem",
    bgcolor: "rgb(243,244,246)",
    borderRadius: "0.375rem",
  },
}));

export default useStyles;
