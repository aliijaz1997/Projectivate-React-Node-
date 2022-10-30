import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  taskGroupMainContainer: {
    ml: "0.7rem",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flexShrink: 0,
    bgcolor: "rgb(243 244 246)",
    borderRadius: "0.375rem",
    width: "20rem",
  },
}));

export default useStyles;
