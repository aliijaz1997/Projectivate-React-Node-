import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  planingTopbarModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: "29.3rem",
    overflowY: "auto",
  },
  createSprintButtonFlexContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mt: "0.75rem",
  },
  textFieldMainContainer: {
    px: "2rem",
    py: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  textFieldVerticalSpacing: { mt: "0.7rem" },
  createButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mt: "1.4rem",
  },
}));

export default useStyles;
