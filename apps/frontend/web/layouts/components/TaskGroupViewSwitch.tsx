import { Typography } from "@mui/material";
import React from "react";
import Switch from "@mui/material/Switch";
import { useAppDispatch } from "~/web/store";
import { changeView } from "~/web/store/slices/boardLayOutSlice";

export function TaskGroupViewSwitch() {
  const dispatch = useAppDispatch();

  const handleChangeView = () => {
    dispatch(changeView());
  };

  return (
    <>
      <Typography component="span" sx={{ color: "black" }}>
        Group View
      </Typography>
      <Switch onChange={handleChangeView} defaultChecked color="primary" />
      <Typography component="span" sx={{ color: "black", mr: "3.5rem" }}>
        Task View
      </Typography>
    </>
  );
}
