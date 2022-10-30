import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  taskListDetailsPageModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "45rem",
    overflowY: "auto",
  },
  innerGroupFieldTaskMainContainer: {
    display: "flex",
    marginTop: "1rem",
    marginLeft: "6rem",
    alignItems: "center",
  },
  innerGroupFieldTaskContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0.25rem",
  },
  innerGroupFieldTitleName: {
    marginLeft: "0.5rem",
    wordBreak: "break-word",
  },
  DropdownAndDetailsButtonContainer: {
    display: "flex",
    alignItems: "center",
    ml: { lg: "auto" },
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    overflowX: "auto",
    border: "0.5rem",
    borderColor: "rgb(229 231 235)",
    backgroundColor: "white",
  },
  noAssigneTypographyPaper: {
    width: "10rem",
    display: "flex",
    alignItems: "center",
    p: "0.4rem",
  },
  upgradeTypographyPaper: {
    width: "9rem",
    p: "0.4rem",
    ml: "0.4rem",
    opacity: 0,
    bgcolor: "transparent",
    "&:hover": {
      opacity: 1,
      bgcolor: "transparent",
    },
    transform: "scale(1)",
    transitionProperty:
      "color, backgroundColor, borderColor, textDecoration-color, fill, stroke, opacity, boxShadow, transform, filter, backdropFilter",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    TransitionDuration: "700ms",
  },
}));

export default useStyles;
