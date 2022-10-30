import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  deleteModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  makeSureTypography: {
    mt: "0.75rem",
    ml: "0.75rem",
    mr: "0.75rem",
    color: "rgb(31 41 55)",
    fontWeight: 500,
  },
  noteTypography: {
    fontWeight: 300,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    ml: "1.25rem",
    fontStyle: "italic",
  },
}));

export default useStyles;
