import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(
  (props: { openTaskGrid?: boolean; openCustomField?: boolean }) => ({
    taskGridButton: {
      bgcolor: props.openTaskGrid ? "primary.main" : "white",
      color: props.openTaskGrid ? "white" : "rgb(128,128,128)",
    },
    customFieldButton: {
      bgcolor: props.openCustomField ? "primary.main" : "white",
      color: props.openCustomField ? "white" : "rgb(128,128,128)",
    },
    settingsIcon: { bgcolor: "	rgb(242, 242, 242)", mr: "0.3rem" },
    settingsWrapper: {
      display: "flex",
      flexDirection: "column",
      width: "10rem",
      p: "0.5rem",
    },
    generalButton: { color: "rgb(128,128,128)" },
    taskGridWrapper: { maxHeight: "30rem" },
    customFieldListWrapper: { py: "1rem" },
    customFieldWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: "1rem",
    },
    customFieldNameWrapper: { display: "flex", flexDirection: "column" },
    customTextField: { py: "0.5rem" },
  })
);

export default useStyles;
