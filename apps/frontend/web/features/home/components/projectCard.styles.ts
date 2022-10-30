import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  ProjectCardTransition: {
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
  projectCardBody: {
    display: "flex",
    bgcolor: "rgb(134 239 172)",
    height: "10rem",
    borderRadius: "1rem",
  },
  projectCardIcon: {
    fontSize: " 3.75rem",
    lineHeight: 1,
    color: "white",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "1rem",
  },
  projectName: {
    fontSize: "0.75rem",
    lineHeight: "1rem",
    my: "auto",
    mr: "1rem",
    color: "rgb(37 99 235)",
  },
}));

export default useStyles;
