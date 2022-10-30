import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  forgetPasswordBackground: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(to top right, #ec4899, #ef4444, #facc15)",
  },
  forgetPasswordContainer: {
    bgcolor: "white",
    borderRadius: "0.5rem",
    width: { lg: "40%" },
    padding: "4rem",
  },

  forgetYourPassword: {
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
  },
  forgetPasswordTextField: {
    mt: "0.8rem",
  },
  forgetPasswordButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  sendmeInstructionButton: { color: "white", mt: "1.2rem" },
}));

export default useStyles;
