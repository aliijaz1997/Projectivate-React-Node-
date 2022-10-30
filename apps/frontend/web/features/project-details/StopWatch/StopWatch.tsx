import moment from "moment";
import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  FaAngleDown,
  FaAngleLeft,
  FaAngleRight,
  FaEdit,
  FaPlay,
  FaStopCircle,
  FaTrash,
} from "react-icons/fa";
import { useStopwatch } from "react-timer-hook";
import {
  useCreateTimerMutation,
  useStartTimerMutation,
  useStopTimerMutation,
} from "~/web/store/services/timetrack.service";

import { TimeTrack } from "~/web/common/types/timeTrack";
import { User } from "~/web/common/types";
import { ShowUserList } from "./ShowUserList";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import { Box, TextField, Button, Typography } from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useStyles from "./stopWatch.styles";

export interface Props {
  taskId: string;
  listTimeTrack: TimeTrack[];
  users: User[];
  autoStartTimer: boolean;
  stopwatchOffset: Date | undefined;
}

export function StopWatch({
  taskId,
  listTimeTrack,
  users,
  autoStartTimer,
  stopwatchOffset,
}: Props) {
  const [show, setShow] = useState(false);
  const [showRange, setShowRange] = useState(false);
  const [showListOfTime, setShowListOfTime] = useState(true);
  const [manualTime, showManualTime] = useState(false);
  const [isTextError, setIsTextError] = useState(false);
  const [manualTimeInput, setManualTimeInput] = useState("");
  const [textError, setTextError] = useState("");

  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();
  const [createTimer] = useCreateTimerMutation();

  const { seconds, minutes, hours, days, isRunning, start, reset } =
    useStopwatch({
      autoStart: autoStartTimer,

      offsetTimestamp: stopwatchOffset,
    });

  const [dueDate, setDueDate] = useState({
    dateStart: null,
    dateEnd: null,
  });
  const handleFromDateChange = (date: null) => {
    setDueDate((prevState) => ({ ...prevState, dateStart: date }));
  };
  const handleToDateChange = (date: null) => {
    setDueDate((prevState) => ({ ...prevState, dateEnd: date }));
  };

  const handleStartTimer = () => {
    start();
    startTimer({ body: { startTime: new Date().toISOString() }, taskId });
  };

  const handleStopTimer = () => {
    reset(new Date(), false);
    stopTimer({ body: { endTime: new Date().toISOString() }, taskId });
  };

  const handleTotalTime = () => {
    if (!listTimeTrack) return;
    const totalDurations = listTimeTrack
      .filter((time) => time.endDate !== null)
      .map((time) =>
        moment
          .duration(moment(time.endDate).diff(moment(time.startDate)))
          .asMilliseconds()
      )
      .reduce((acc, curr) => acc + curr, 0);
    return moment.utc(totalDurations).format("HH:mm:ss");
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualTimeInput(e.target.value);
  };

  const handleSubmitTime = (e: FormEvent) => {
    e.preventDefault();
    if (
      !manualTimeInput.match(/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/)
    ) {
      setTextError("Please enter the correct format");
      setIsTextError(true);
      return;
    }
    const time: string[] = manualTimeInput.split(":");
    const h = parseInt(time[0]);
    const m = parseInt(time[1]);
    const s = parseInt(time[2]);
    const endManualTime = moment(new Date())
      .add(h, "h")
      .add(m, "m")
      .add(s, "s")
      .toISOString();

    createTimer({
      taskId,
      body: {
        startTime: new Date().toISOString(),
        endTime: endManualTime,
      },
    });
    setIsTextError(false);
    setTextError("");
    showManualTime(false);
    setShowListOfTime(true);
  };
  const styles = useStyles({});
  return (
    <>
      <Box sx={styles.timeTrackedContainer}>
        <Box
          component="span"
          sx={{ color: "white", fontWeight: 600, pt: "0.25rem" }}
        >
          Time Tracked
        </Box>
        <Box>
          <Box component="span" sx={styles.pauseAndPlayButtonContainer}>
            <Button>
              {!isRunning ? (
                <FaPlay onClick={handleStartTimer} style={{ color: "white" }} />
              ) : (
                <FaStopCircle
                  onClick={handleStopTimer}
                  style={{ color: "white" }}
                />
              )}
            </Button>
            <Box component="span" sx={{ color: "white" }}>
              <Box component="span">{days}</Box>:
              <Box component="span">{hours}</Box>:
              <Box component="span">{minutes}</Box>:
              <Box component="span">{seconds}</Box>
            </Box>

            {show ? (
              <Button>
                <FaAngleDown
                  style={{ color: "white" }}
                  onClick={() => setShow(!show)}
                />
              </Button>
            ) : (
              <Button>
                <FaAngleRight
                  style={{ color: "white" }}
                  onClick={() => setShow(!show)}
                />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {show && (
        <Box sx={{ mt: "0.5rem" }}>
          <Box sx={styles.totalTime}>
            <Typography>{handleTotalTime()}</Typography>
          </Box>
          <Box sx={styles.listOfTimeManualRange}>
            <Button
              size="small"
              onClick={() => {
                setShowListOfTime(!showListOfTime);
                setShowRange(false);
                showManualTime(false);
              }}
            >
              List of time
            </Button>
            <Button
              size="small"
              onClick={() => {
                showManualTime(!manualTime);
                setShowListOfTime(false);
                setShowRange(false);
              }}
            >
              Manual
            </Button>
            <Button
              size="small"
              onClick={() => {
                setShowRange(!showRange);
                setShowListOfTime(false);
                showManualTime(false);
              }}
            >
              Add Range
            </Button>
          </Box>
          {showRange && (
            <Box sx={styles.showRangeContainer}>
              <Box sx={{ mt: "1rem" }}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTo"
                    value={dueDate.dateStart}
                    onChange={handleFromDateChange}
                  />
                </LocalizationProvider>
                <Box sx={{ mt: "1rem" }}>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTo"
                      value={dueDate.dateEnd}
                      onChange={handleToDateChange}
                    />
                  </LocalizationProvider>
                </Box>
                <Button
                  sx={{ mt: "0.5rem" }}
                  disabled={!dueDate.dateStart || !dueDate.dateEnd}
                  type="button"
                  size="small"
                  onClick={() => {
                    createTimer({
                      taskId,
                      body: {
                        startTime: dueDate.dateStart!,
                        endTime: dueDate?.dateEnd!,
                      },
                    });
                    setShowRange(false);
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}

          {showListOfTime && (
            <List sx={styles.showListTime}>
              {users.map((user) => {
                return (
                  <ListItem key={user.id}>
                    <ShowUserList listTimeTrack={listTimeTrack} user={user} />
                  </ListItem>
                );
              })}
            </List>
          )}
          {manualTime && (
            <Box>
              <form onSubmit={handleSubmitTime}>
                <TextField
                  label="HH:MM:SS"
                  variant="outlined"
                  type="text"
                  helperText={textError}
                  error={isTextError}
                  onChange={handleManualInputChange}
                />
                <Button disabled={manualTimeInput === ""} type="submit">
                  Submit
                </Button>
              </form>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
