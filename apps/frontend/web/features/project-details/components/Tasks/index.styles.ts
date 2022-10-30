import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  addTaskContainer: {
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
  windowCloseButton: {
    bgcolor: "transparent",
    p: "0rem",
    ml: "0.5rem",
    "&:Hover": {
      bgcolor: "transparent",
    },
  },
  windowCloseIcon: {
    height: "1.5rem",
    width: "1.5rem",
    color: "rgb(75 85 99)",
    borderRadius: "0.375rem",
  },
}));

export default useStyles;
