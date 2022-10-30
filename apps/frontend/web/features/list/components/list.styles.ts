import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  listContainer: {
    bgcolor: "white",
    ml: "0.5rem",
  },
  outerFieldNameContainer: {
    display: "flex",
    alignItems: "center",
  },
  outerFieldNameTypography: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
  },
  arrowDropIcon: {
    color: "rgb(107,114,128)",
  },
}));

export default useStyles;
