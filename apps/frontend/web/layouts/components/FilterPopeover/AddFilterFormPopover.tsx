import { Button } from "@mui/material";
import React from "react";
import Popover from "@mui/material/Popover";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ProjectCustomFields } from "~/web/common/types";

interface Props {
  customFields: ProjectCustomFields | undefined;
  handleOnFilterSelect: (field: string) => void;
}

export function AddFilterFormPopover({
  customFields,
  handleOnFilterSelect,
}: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    handleOnFilterSelect(event.target.value as string);

    handlePopoverClose();
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button onClick={handlePopoverOpen} sx={{ ml: "1.2rem" }}>
        Add Filter
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        sx={{
          visibility: "hidden",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="field-select">Field</InputLabel>
          <Select
            labelId="field-select"
            id="demo-simple-select"
            label="Field"
            onChange={handleChange}
            value={"none"}
            sx={{
              "& ": {},
            }}
            open={open}
          >
            <MenuItem value="none" disabled>
              None
            </MenuItem>
            {customFields &&
              Object.keys(customFields).map((field) => {
                return (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Popover>
    </>
  );
}
