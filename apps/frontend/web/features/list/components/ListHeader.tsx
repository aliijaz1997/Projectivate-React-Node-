import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa";
import useStyles from "./listHeader.styles";

export function ListHeader() {
  const listHeader = [
    {
      listName: "Assignee",
    },
    {
      listName: "Date",
    },
    {
      listName: "Priority",
    },
    {
      listName: "Status",
    },
  ];
  const styles = useStyles({});
  return (
    <Box sx={styles.listHeaderMainContainer}>
      <Box sx={styles.listHeaderTasknameContainer}>
        <Typography>Task name</Typography>
      </Box>
      <Box sx={styles.listHeaderFlexContainer}>
        {listHeader.map((data, id) => {
          return (
            <Box key={id} sx={{ border: "1px solid black" }}>
              <Button sx={{ width: "10rem", color: "black" }}>
                {data.listName}
              </Button>
            </Box>
          );
        })}

        <Button sx={{ color: "black" }}>
          <FaPlus />
        </Button>
      </Box>
    </Box>
  );
}
