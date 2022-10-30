import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  tenantCreateBackground: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(to right, #ec4899, #ef4444, #facc15)",
  },
  tenantCreateContainer: {
    bgcolor: "white",
    borderRadius: "0.5rem",
    width: { xs: "50%", lg: "25%" },
    p: "3rem",
  },

  tenantTextField: {
    mt: "0.5rem",
  },
  tenantCreateButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    pt: "1rem",
  },
}));

export default useStyles;
