import React, { useEffect, useState } from "react";
import { useTaskUpdateMutation } from "~/web/store/services/tasks.service";
import { toast } from "react-toastify";
import { ErrorResponse } from "~/web/common/types";
import moment, { Moment } from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import useStyles from "./showDate.styles";

interface SHowDateProps {
  dateStart: string;
  dateEnd: string;
  taskId: string;
  projectId: string;
}
export function ShowDate({
  dateStart,
  dateEnd,
  taskId,
  projectId,
}: SHowDateProps) {
  const [taskUpdate, { isLoading, isError, error }] = useTaskUpdateMutation();
  useEffect(() => {
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isError, error]);

  const [dueDate, setDueDate] = useState({
    dateStart: moment(dateStart),
    dateEnd: moment(dateEnd),
  });
  const handleFromDateChange = (date: Moment | null) => {
    if (date) {
      setDueDate((prevState) => ({
        ...prevState,
        dateStart: date,
      }));
    }
  };
  const handleToDateChange = (date: Moment | null) => {
    if (date) {
      setDueDate((prevState) => ({ ...prevState, dateEnd: date }));
    }
  };
  const styles = useStyles({});

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: "0.75rem", mx: "1.25rem" }}>
      <Typography sx={styles.dateTypography}>Date</Typography>
      <Box sx={{ p: "0.25rem", mt: "0.5rem" }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Box sx={{ fontWeight: 700, mb: "0.75rem" }}>Date From:</Box>

          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={dueDate.dateStart}
            onChange={(date) => handleFromDateChange(date)}
            onClose={() => {
              taskUpdate({
                projectId,
                body: { dateStart: dueDate.dateStart.toISOString() },
                taskId,
              });
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ p: "0.25rem", mt: "0.5rem" }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Box sx={{ fontWeight: 700, mb: "0.75rem" }}>Date To:</Box>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={dueDate.dateEnd}
            onChange={(date) => handleToDateChange(date)}
            onClose={() => {
              taskUpdate({
                projectId,
                body: { dateEnd: dueDate.dateEnd.toISOString() },
                taskId,
              });
            }}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
}
