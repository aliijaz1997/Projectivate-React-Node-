import { createStyleMap } from "~/web/common/utils/create-style-map";

const useStyles = createStyleMap(() => ({
  instuctionSentBackground: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(to top right, #ec4899, #ef4444, #facc15)",
  },
  instuctionSentBorder: {
    bgcolor: "white",
    borderRadius: "0.5rem",
    width: { lg: "40%" },
    padding: "4rem",
  },

  instructionSentText: {
    textAlign: "center",
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
  },
  instructionSentString: { textAlign: "center", color: "rgb(107,114,128)" },
}));

export default useStyles;
