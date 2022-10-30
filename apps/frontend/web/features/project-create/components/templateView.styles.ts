import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  templateViewFlexContainer: {
    display: "flex",
    m: "3rem",
  },
  constructionMainContainer: {
    borderRadius: "1rem",
    height: "7rem",
    width: "9rem",
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
    bgcolor: " rgb(134 239 172)",
  },
  consturctionAndCustomContainer: {
    display: "flex",
    justifyContent: "center",
    my: "auto",
    cursor: "pointer",
    height: "100%",
  },
  consturctionAndCustomTypography: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
    color: "white",
    margin: "auto",
  },
  customMainContainer: {
    borderRadius: "1rem",
    height: "7rem",
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
    bgcolor: " rgb(134 239 172)",
    width: "9rem",
    ml: "1rem",
  },
}));

export default useStyles;
