import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  signinMainContainer: {
    maxWidth: "40rem",
    marginX: "auto",
    border: "1px solid 	white",
    borderRadius: "1rem",
    boxSizing: "border-box",
    height: "100vh",
    bgcolor: "#fafafa",
  },
  signinProjectivateLogo: {
    marginTop: "1.5rem",
  },
  signinString: {
    fontSize: "1.2rem",
    wordBreak: "break-word",
    width: "20rem",
    fontWeight: "bold",
    marginTop: "0.6rem",
  },
  signinWith: {
    fontWeight: "600",
    marginY: "0.3rem",
  },
  signinWithButtons: {
    display: "flex",
    alignItems: "center",
  },
  signinButtonConatiner: {
    border: "1px solid 	rgb(204, 204, 204)",
    width: "50%",
    borderRadius: "0.4rem",
    marginRight: "0.4rem",
    height: "2.2rem",
  },
  signinWithButtonIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signinButton: { height: "2.1rem" },
  divider: {
    marginTop: "0.8rem",
    fontSize: "0.85rem",
    marginX: "1.5rem",
    color: "	rgb(115, 115, 115)",
  },
  forgetPasswordContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.6rem",
  },
  dividerNotMember: {
    marginTop: "0.8rem",
    fontSize: "1.2rem",
    color: "	rgb(115, 115, 115)",
  },
}));

export default useStyles;
