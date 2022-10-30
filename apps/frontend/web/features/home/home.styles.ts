import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  homeProjectContainer: {
    mx: "auto",
    p: "3rem",
  },
  homeProjectList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  homeProjectCreate: {
    width: "9rem",
    height: "10rem",
  },
}));

export default useStyles;
