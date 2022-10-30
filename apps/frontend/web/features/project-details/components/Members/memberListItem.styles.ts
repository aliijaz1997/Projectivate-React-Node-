import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  memberListItems: {
    px: "0.75rem",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    mt: "0.5rem",
    py: "0.5rem",
    "&:Hover": {
      bgcolor: "rgb(243 244 246)",
    },
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
