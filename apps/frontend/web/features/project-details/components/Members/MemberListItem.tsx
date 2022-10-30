import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { Member } from "~/web/common/types";
import { useAssigneeDeleteFromTaskMutation } from "~/web/store/services/tasks.service";
import { ListItem, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import useStyles from "./memberListItem.styles";

interface MemberItemProps {
  member: Member;
  taskId: string;
}

function MemberItem({ member, taskId }: MemberItemProps) {
  const [assigneeDeleteFromTask] = useAssigneeDeleteFromTaskMutation();
  const styles = useStyles({});
  return (
    <ListItem sx={styles.memberListItems}>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Avatar src={member.image} alt={member.displayName} />
        <Typography sx={{ alignSelf: "center" }}>
          {member.displayName}
        </Typography>
      </Box>
      <Button
        size="small"
        sx={styles.windowCloseButton}
        onClick={() => {
          assigneeDeleteFromTask({ taskId, assigneeId: member.id });
        }}
      >
        <FaWindowClose style={styles.windowCloseIcon} />
      </Button>
    </ListItem>
  );
}

export default MemberItem;
