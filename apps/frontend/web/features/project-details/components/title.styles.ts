import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    mt: "2.5rem",
    mx: "1.25rem",
    gap: "0.5rem",
  },
  FaRegListAltIcon: {
    width: "1.25rem",
    height: "1.25rem",
    color: "rgb(75 85 99)",
  },
  titleTypography: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
    color: "rgb(75 85 99)",
  },
}));

export default useStyles;
