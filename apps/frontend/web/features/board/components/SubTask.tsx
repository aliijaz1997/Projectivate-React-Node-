import React from "react";
import { Box, ListItem, Typography } from "@mui/material";
import moment from "moment";
import { Task } from "~/web/common/types";
import useStyles from "./subTask.styles";

interface Props {
  task: Task;
}
export function SubTask({ task }: Props) {
  const styles = useStyles({});
  return (
    <ListItem key={task.id}>
      <Box sx={styles.subTaskFlexContainer}>
        <Box sx={styles.subTaskPaddingContainer}>
          <Box sx={styles.secondaryFlexContainer}>
            <Typography sx={{}}>{task.title}</Typography>
            <Box component="span">
              <img
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  borderRadius: "10rem",
                }}
                src={
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-xyf6S7TyyHcIxoBN66TeSsBhmuJVUPp2EQ&usqp=CAU"
                }
                alt=""
              />
            </Box>
          </Box>
          <Typography sx={styles.timeTypography}>
            {moment(task.dateEnd).format("MMM DD")}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
}
