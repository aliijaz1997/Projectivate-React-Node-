import { SxProps } from "@mui/material";

export const createStyleMap =
  <T extends { [name: string]: SxProps }, R>(cfg: T | ((props: R) => T)) =>
  (props: R) => {
    if (typeof cfg === "function") {
      return cfg(props);
    }

    return cfg;
  };
