import React from "react";
import moment from "moment";
import { Log } from "~/web/common/types";
import { useLogItemListQuery } from "~/web/store/services/taskLog.service";
import { Box, ListItem, Typography } from "@mui/material";
import useStyles from "./logItem.styles";

interface Props {
  taskLog: Log;
}

export function LogItem({ taskLog }: Props) {
  const { data: taskLogItems } = useLogItemListQuery(taskLog.id);
  const styles = useStyles({});
  function displayHourMinuteOrSeconds(value1: number) {
    const value = value1 * 60;
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value - hours * 3600) / 60);
    let seconds = Math.floor(value - hours * 3600 - minutes * 60);
    if (value < 60) {
      return `${seconds} seconds`;
    } else if (value >= 60) {
      return `${minutes} minutes`;
    } else {
      return `${hours} hour`;
    }
  }

  if (!taskLogItems) return <Box>No Items found</Box>;
  return (
    <>
      <ListItem sx={{ mt: "0.75rem" }}>
        <Box sx={styles.taskLogItemsContainer}>
          {taskLogItems.map((logItem) => {
            return (
              <Box key={logItem.id} sx={{ display: "flex" }}>
                <Typography sx={styles.logItemFieldTypography}>
                  {logItem.field}:
                </Typography>
                <Typography sx={styles.logItemFieldItemTypography}>
                  {logItem.fieldItem}
                </Typography>
              </Box>
            );
          })}
          <Box sx={{ dispaly: "flex" }}>
            <Typography sx={styles.timeDurationTypography}>
              Time Duration:
            </Typography>
            <Typography sx={styles.taskLogTime}>
              {displayHourMinuteOrSeconds(taskLog.time)}
            </Typography>
          </Box>
          <Box sx={styles.dateStartDateEnd}>
            <Box sx={styles.dateStart}>
              Start Date:
              <time dateTime="2019-09-14">
                {moment(new Date(taskLog.dateEnd)).format("MMM D")}
              </time>
            </Box>
            <Box sx={styles.dateEnd}>
              End Date:
              <time dateTime="2019-09-14">
                {moment(new Date(taskLog.dateStart)).format("MMM D")}
              </time>
            </Box>
          </Box>
        </Box>
      </ListItem>
    </>
  );
}
