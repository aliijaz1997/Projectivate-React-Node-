import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  dateTypography: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
    color: "rgb(75 85 99)",
  },
}));

export default useStyles;
