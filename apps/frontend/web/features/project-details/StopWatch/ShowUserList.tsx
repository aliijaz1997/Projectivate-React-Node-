import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { User } from "~/web/common/types";
import { TimeTrack } from "~/web/common/types/timeTrack";
import { useDeleteTimerMutation } from "~/web/store/services/timetrack.service";
import useStyles from "./showUserList.styles";

interface Props {
  user: User;
  listTimeTrack: TimeTrack[];
}
export function ShowUserList({ user, listTimeTrack }: Props) {
  const [showUserListTime, setShowUserListTime] = React.useState(false);
  const [deleteTimer] = useDeleteTimerMutation();

  const handleShowTime = (endDate: string, startDate: string) => {
    const duration = moment.duration(moment(endDate).diff(moment(startDate)));
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
  };
  const styles = useStyles({});
  const handleTotalTimeOfUser = (userId: string) => {
    if (!listTimeTrack) return null;
    const usersTimeTrack = listTimeTrack.filter((tr) => tr.userId === userId);
    const totalDurations = usersTimeTrack
      .filter((time) => time.endDate !== null)
      .map((time) =>
        moment
          .duration(moment(time.endDate).diff(moment(time.startDate)))
          .asMilliseconds()
      )
      .reduce((acc, curr) => acc + curr, 0);
    return moment.utc(totalDurations).format("HH:mm:ss");
  };
  return (
    <>
      <Box sx={styles.userListContainer}>
        <Typography
          onClick={() => setShowUserListTime(!showUserListTime)}
          sx={styles.userListTypography}
        >
          {user.displayName}
        </Typography>
        <Box component="span" sx={{ ml: "3rem" }}>
          {handleTotalTimeOfUser(user.id)}
        </Box>
      </Box>

      {showUserListTime &&
        listTimeTrack
          .filter((time) => time.endDate !== null)
          .map((time) => {
            return (
              time.userId === user.id && (
                <Box key={time.id} sx={styles.userListTime}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>
                      {handleShowTime(time.endDate, time.startDate)}
                    </Typography>
                    <Typography>
                      {moment(time.endDate).format("MMM DD")}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FaTrash
                      onClick={() => {
                        deleteTimer(time.id);
                      }}
                    />
                  </Box>
                </Box>
              )
            );
          })}
    </>
  );
}
