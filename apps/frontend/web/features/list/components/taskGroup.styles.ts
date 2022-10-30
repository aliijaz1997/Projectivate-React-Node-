import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  innerGroupFieldContainer: {
    display: "flex",
    ml: "5rem",
    mt: "0.625rem",
    alignItems: "center",
    bgcolor: "rgb(243 244 246)",
    borderRadius: "0.5rem",
  },
  innerGroupFieldTypography: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    ml: "1rem",
  },
  arrowDropIcon: {
    color: "rgb(107,114,128)",
  },
  listTaskCreateContainer: {
    mt: "1rem",
    "&:hover": {
      bgcolor: "rgb(243 244 246)",
    },
    mx: "3rem",
  },
}));

export default useStyles;
