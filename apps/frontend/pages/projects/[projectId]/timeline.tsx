import { useRouter } from "next/router";
import { RenderFunction } from "~/web/common/utils/render-function";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";
import { TimelinePage } from "~/web/features/timeline/TimelineContainer";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";
import "react-calendar-timeline/lib/Timeline.css";

function Timeline() {
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

        return <TimelinePage project={projectDetails} />;
      }}
    </RenderFunction>
  ) : (
    <div>No ProjectId</div>
  );
}

export default withAuthAndTenant(Timeline);
