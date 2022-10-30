import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  ProjectCardCreateBorder: {
    border: "4px dashed rgb(96 165 250)",
    borderRadius: "1rem",
    height: "100%",
    bgcolor: "white",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    transitionProperty:
      "color, backgroundColor, borderColor, textDecoration-color, fill, stroke, opacity, boxShadow, transform, filter, backdropFilter",
    transitionDelay: "200ms",
    TransitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      transform: " translateY(0.5rem)",
    },
  },
  projectCardCreatIcon: {
    display: "flex",
    justifyContent: "center",
    my: "auto",
    cursor: "pointer",
    height: "100%",
  },
  projectCardIconContainer: {
    fontSize: " 3.75rem",
    lineHeight: 1,
    color: "white",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "1rem",
  },
  projectCardIcon: {
    fontSize: " 1.5rem",
    lineHeight: "2rem",
    margin: "auto",
  },
}));

export default useStyles;
