import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap((props: { active: boolean }) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    mx: "2rem",
    my: "0.5rem",
    justifyContent: "space-between",
  },
  title: {
    cursor: "pointer",
    fontSize: "1.1rem",
    color: props.active ? "secondary.main" : "rgb(115, 115, 115)",
  },
}));

export default useStyles;
