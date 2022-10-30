import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  previousSpriteMainContainer: {
    display: "grid",
    gap: "1.25rem",
    pb: "1.25rem",
    px: "1.25rem",
    mx: "0.75rem",
    bgcolor: "rgb(249 250 251)",
    borderRadius: "0.375rem",
    minWidth: "20rem",
  },
}));

export default useStyles;
