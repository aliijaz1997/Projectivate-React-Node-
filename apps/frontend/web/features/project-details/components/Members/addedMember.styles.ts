import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  assigneeTypography: {
    color: "rgb(75 85 99)",
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
  },
}));

export default useStyles;
