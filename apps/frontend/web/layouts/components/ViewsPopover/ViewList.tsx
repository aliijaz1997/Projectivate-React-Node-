import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useGetAllViewsQuery } from "~/web/store/services/views.service";
import { AddViewForm } from "./AddViewForm";
import { ViewListItem } from "./ViewListItem";

export function ViewList() {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { data: views } = useGetAllViewsQuery(projectId, {
    skip: !projectId,
  });

  const viewList = React.useMemo(() => {
    return views ?? [];
  }, [views]);

  return (
    <Box sx={{ width: "18rem", minHeight: "4.5rem" }}>
      <AddViewForm projectId={projectId} />
      {viewList.map((view) => {
        return <ViewListItem item={view} key={view.id} />;
      })}
    </Box>
  );
}
