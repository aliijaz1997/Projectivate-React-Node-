import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  listHeaderMainContainer: {
    display: "flex",
    alignItems: "center",
    padding: "1.25rem",
    margin: "1rem",
    backgroundColor: "rgb(243 244 246)",
  },
  listHeaderTasknameContainer: {
    width: "50%",
    border: "1px  solid black",
    bgcolor: "white",
    p: "0.4rem",
  },
  listHeaderFlexContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    overflowX: "auto",
    borderColor: "rgb(229 231 235)",
    backgroundColor: "white",
  },
}));

export default useStyles;
