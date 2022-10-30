import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  inviteModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 4,
    minHeight: "17rem",
  },
  inviteHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderBottomWidth: "1px",
    borderColor: "rgb(209,213,219)",
    pb: "0.75rem",
    px: "2rem",
  },
  invitePeopleString: {
    fontSize: "1.5rem",
    lineHeight: "2rem",
    fontWeight: 500,
    ml: "0.5rem",
  },
  clearIcon: {
    color: "rgb(156,163,175)",
  },
  inviteForm: {
    px: "2.5rem",
    pt: "1.25rem",
  },
  inviteTextField: {
    mt: "1rem",
  },
  inviteButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    my: "1.7rem",
  },
  inviteSendButton: {
    color: "white",
  },
}));

export default useStyles;
