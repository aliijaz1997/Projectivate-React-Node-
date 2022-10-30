import { Button, Box, Typography, TextField } from "@mui/material";
import { Popover } from "@mui/material";
import React from "react";
import { AddProjectField } from "~/web/features/project-settings/components/AddProjectField";
import useStyles from "./settingPopover.styles";

interface Props {
  customFieldNames: string[];
  projectId: string;
}
export function CustomFieldPopover({ customFieldNames, projectId }: Props) {
  const [anchorElCustomField, setAnchorElCustomField] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickCustomField = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElCustomField(event.currentTarget);
  };
  const handleCloseCustomField = () => {
    setAnchorElCustomField(null);
  };
  const openCustomField = Boolean(anchorElCustomField);
  const styles = useStyles({ openCustomField });
  return (
    <>
      <Button onClick={handleClickCustomField} sx={styles.customFieldButton}>
        Custom Field
      </Button>
      <Popover
        open={openCustomField}
        anchorEl={anchorElCustomField}
        onClose={handleCloseCustomField}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={styles.customFieldWrapper}>
          <Typography>Task Section</Typography>
          <Box sx={styles.customFieldNameWrapper}>
            {customFieldNames.map((fieldName, id) => {
              return (
                <TextField
                  sx={styles.customTextField}
                  key={id}
                  defaultValue={fieldName}
                  disabled={true}
                />
              );
            })}
          </Box>
          <AddProjectField projectId={projectId} />
        </Box>
      </Popover>
    </>
  );
}
