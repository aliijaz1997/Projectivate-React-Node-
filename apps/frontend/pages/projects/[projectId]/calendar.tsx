import { useRouter } from "next/router";
import React from "react";
import { RenderFunction } from "~/web/common/utils/render-function";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";
import FullCalender from "~/web/features/calender/FullCalender";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";

function CalendarPage() {
  const router = useRouter();

  const projectId = router.query.projectId as string;
  return projectId ? (
    <RenderFunction>
      {function _() {
        const {
          isError,
          data: projectDetails,
          isLoading,
        } = useProjectDetailsQuery(projectId);

        if (isError) return <div>Some error ocurred</div>;
        if (isLoading) return <div>Loading</div>;
        if (!projectDetails) return <div>Projects Not found</div>;

        return <FullCalender project={projectDetails} />;
      }}
    </RenderFunction>
  ) : (
    <div>No ProjectId</div>
  );
}
export default withAuthAndTenant(CalendarPage);
