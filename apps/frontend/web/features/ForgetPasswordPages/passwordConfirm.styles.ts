import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  passwordConfirmationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: "4rem",
  },
  passwordConfirmationBorder: {
    width: "35rem",
    border: "1px solid 	rgb(230, 230, 230)",
    borderRadius: "0.4rem",
  },
  passwordConfirmationLogoContainer: {
    mt: "1.5rem",
    ml: "2rem",
  },
  passwordTextFieldContainer: {
    display: "flex",
    flexDirection: "column",
    mx: "1rem",
    mt: "1rem",
  },
  passwordCharacter: {
    mt: "1rem",
    ml: "1.2rem",
    fontSize: "1.1rem",
  },
  passwordChangeButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mt: "1rem",
    my: "1rem",
    mr: "1.1rem",
  },
  passwordChangeButton: {
    color: "white",
  },
}));

export default useStyles;
