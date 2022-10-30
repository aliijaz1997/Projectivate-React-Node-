import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  newIssueModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    px: 4,
    pt: 3,
    overflowY: "auto",
    borderRadius: "0.2rem",
  },
  newIssueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    px: "0.3rem",
    borderBottom: "1px solid rgb(156 163 175)",
  },

  SelectField: {
    border: "1px dotted rgb(156 163 175)",
    borderRadius: "0.2rem",
    px: "0.25rem",
    height: "1.75rem",
    mt: "0.4rem",
  },
  InSelect: {
    border: "1px dotted rgb(156 163 175)",
    borderRadius: "0.5rem",
    px: "0.25rem",
    height: "1.75rem",
    ml: "0.5rem",
  },
  createTaskButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  createTaskButton: { my: "1rem", color: "white" },
}));

export default useStyles;
