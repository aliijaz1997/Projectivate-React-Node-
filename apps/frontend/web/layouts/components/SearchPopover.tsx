import {
  IconButton,
  InputBase,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "react-use";
import { useAppDispatch, useAppSelector } from "~/web/store";
import { updateSearch } from "~/web/store/slices/views.slice";
import SearchIcon from "@mui/icons-material/Search";

export function SearchPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const search = useAppSelector(
    (state) => state.views.currentView.filters.search
  );

  const [localSearch, setLocalSearch] = React.useState("");

  React.useEffect(() => {
    setLocalSearch(search);
    // Only running this on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();

  const [, cancel] = useDebounce(
    () => {
      dispatch(
        updateSearch({
          search: localSearch,
        })
      );
    },
    2000,
    [localSearch]
  );

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          bgcolor: search || open ? "primary.main" : "rgb(242, 242, 242)",
          mr: "0.3rem",
          color: search || open ? "white" : "",
          "&:hover": {
            bgcolor: search && "primary.main",
          },
        }}
      >
        <FiSearch />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "0.125rem 0.25rem",
            display: "flex",
            alignItems: "center",
            width: 300,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Name"
            inputProps={{ "aria-label": "search name" }}
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
            }}
          />
          <IconButton type="submit" sx={{ p: "0.625rem" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Popover>
    </>
  );
}
