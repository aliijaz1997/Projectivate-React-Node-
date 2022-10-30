import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  newIssueModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    minHeight: "28rem",
    overflowY: "auto",
  },
  newIssueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: "0.75rem",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    fontWeight: 500,
    borderBottom: "1px solid rgb(156 163 175)",
  },
  forInDate: {
    display: "flex",
    alignItems: "center",
    mt: "1rem",
  },
  for: {
    display: "flex",
    alignItems: "center",
    border: "1px dotted rgb(156 163 175)",
    borderRadius: "0.25rem",
    px: "0.25rem",
    ml: "0.5rem",
  },
  forSelect: {
    border: "1px dotted rgb(156 163 175)",
    borderRadius: "0.5rem",
    px: "0.25rem",
    height: "1.75rem",
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
  createTaskButton: { my: "1.25rem", mr: "0.25rem", color: "white" },
}));

export default useStyles;
