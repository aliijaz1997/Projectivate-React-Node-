import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  moreHorizIconButton: {
    borderRadius: "0.375rem",
    border: "1px solid rgb(209 213 219)",
    px: "0.4rem",
    py: "0rem",
    fontWeight: 500,
    color: "rgb(55 65 81)",
  },
}));

export default useStyles;
