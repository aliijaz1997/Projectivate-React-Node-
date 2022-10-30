import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";
import { Detail } from "~/web/features/project-details/Detail";

function TaskDetailPage() {
  const router = useRouter();
  const { taskId, projectId } = router.query;
  return (
    <Modal
      open={true}
      onClose={() => {
        router.push(`/projects/${projectId}/board`);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          height: "45rem",
          overflowY: "auto",
        }}
      >
        <Detail taskId={taskId as string} />
      </Box>
    </Modal>
  );
}

export default withAuthAndTenant(TaskDetailPage);
