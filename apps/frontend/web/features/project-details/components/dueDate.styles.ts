import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  dueDateTypography: {
    p: "0.5rem",
    disppaly: "flex",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: "2px",
    mb: "0.25rem",
  },
}));

export default useStyles;
