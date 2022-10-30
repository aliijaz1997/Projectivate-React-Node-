import moment, { Moment } from "moment";
import React, { ReactElement, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  SprintCreate,
  SprintCreateForm,
  SprintSpan,
} from "~/web/common/types/sprint";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Box, TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import useStyles from "./planingTopbar.styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  onSprintCreate: (data: SprintCreate) => void;
  buttonDisabled: boolean;
}

export function PlanningTopbar({
  onSprintCreate,
  buttonDisabled,
}: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, reset, control } =
    useForm<SprintCreateForm>();
  const [startDate, setStartDate] = useState<Moment | null>(moment(new Date()));

  const handleOnModalClose = () => {
    reset();
    setOpen(false);
  };
  const styles = useStyles({});

  return (
    <Box sx={styles.createSprintButtonFlexContainer}>
      <Button
        size="small"
        onClick={() => setOpen(true)}
        disabled={buttonDisabled}
      >
        Create Sprint
      </Button>
      <Modal onClose={handleOnModalClose} open={open}>
        <Box sx={styles.planingTopbarModal}>
          <form
            onSubmit={handleSubmit(
              ({ customField, majorTargets, minorTargets, sprintSpan }) => {
                onSprintCreate({
                  customField,
                  majorTargets,
                  minorTargets,
                  sprintSpan,
                  startDate:
                    startDate?.toISOString() ??
                    moment(new Date()).toISOString(),
                });
                handleOnModalClose();
              }
            )}
          >
            <Box sx={styles.textFieldMainContainer}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <label style={{ marginBottom: "0.5rem" }}>
                  <Box component="span">Start Date</Box>
                </label>
                <DatePicker
                  renderInput={(params) => <TextField {...params} />}
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </LocalizationProvider>
              <FormControl fullWidth sx={{ mt: "0.7rem" }}>
                <InputLabel id="sprintSpan">Sprint Span</InputLabel>
                <Select
                  labelId="sprintSpan"
                  label=" Sprint Span"
                  id="sprintSpan"
                  inputProps={{ "aria-label": "Without label" }}
                  {...register("sprintSpan", {
                    required: true,
                  })}
                >
                  {Object.values(SprintSpan).map((value) => {
                    return (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Controller
                name="majorTargets"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Major Targets"
                    sx={styles.textFieldVerticalSpacing}
                    {...field}
                  />
                )}
              />

              <Controller
                name="minorTargets"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Minor Targets"
                    sx={styles.textFieldVerticalSpacing}
                    {...field}
                  />
                )}
              />

              <Controller
                name="customField"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Custom Field"
                    sx={styles.textFieldVerticalSpacing}
                    {...field}
                  />
                )}
              />

              <Box sx={styles.createButtonContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: "white" }}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
