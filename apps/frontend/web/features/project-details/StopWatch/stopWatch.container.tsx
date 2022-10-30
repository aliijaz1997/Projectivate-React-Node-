import { User } from "~/web/common/types";
import { useMemo } from "react";
import { TimeTrack } from "~/web/common/types/timeTrack";
import { useListTimeTrackQuery } from "~/web/store/services/timetrack.service";
import { StopWatch } from "./StopWatch";
import moment from "moment";
import { Box, CircularProgress } from "@mui/material";

interface Props {
  taskId: string;
}
export function StopWatchContainer({ taskId }: Props) {
  const { data: recordsWithUser } = useListTimeTrackQuery(taskId);

  const listTimeTrack: TimeTrack[] = useMemo(
    () => (recordsWithUser && recordsWithUser.timeRecords) ?? [],
    [recordsWithUser]
  );
  const users: User[] = useMemo(
    () => (recordsWithUser && recordsWithUser.users) ?? [],
    [recordsWithUser]
  );

  const currentRunningTimer = listTimeTrack.find(
    (time) => time.endDate === null
  );
  const offsetSeconds = moment
    .duration(
      moment(new Date().toISOString()).diff(
        moment(currentRunningTimer?.startDate)
      )
    )
    .asSeconds();
  const stopwatchOffset = new Date();

  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + offsetSeconds);

  const autoStartTimer =
    currentRunningTimer && !currentRunningTimer.endDate ? true : false;
  if (!recordsWithUser)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <StopWatch
      taskId={taskId}
      listTimeTrack={listTimeTrack}
      users={users}
      stopwatchOffset={stopwatchOffset}
      autoStartTimer={autoStartTimer}
    />
  );
}
