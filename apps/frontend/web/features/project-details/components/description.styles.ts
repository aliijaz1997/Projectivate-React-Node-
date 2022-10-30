import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  flexContainer: {
    display: "flex",
    p: "0.75rem",
    mt: "1.25rem",
  },
  FaBars: { width: "1.25rem", height: "1.25rem", color: "rgb(75 85 99)" },
  descriptionTypography: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
    color: " rgb(75 85 99)",
  },
  descriptionToggleContainer: {
    py: "1rem",
    px: "0.5rem",
    mt: "0.75rem",
    borderRadius: "0.25rem",
    color: "rgb(107 114 128)",
    fontSize: " 0.875rem",
    lineHeight: " 1.25rem",
    bgcolor: "rgb(229 231 235)",

    "&:hover": {
      color: "rgb(107 114 128)",
      bgcolor: "rgb(229 231 235)",
    },
    width: "17rem",
  },
}));

export default useStyles;
