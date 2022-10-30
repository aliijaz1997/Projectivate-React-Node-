import { useRouter } from "next/router";
import { RenderFunction } from "~/web/common/utils/render-function";
import { withAuthAndTenant } from "~/web/common/utils/with-auth-and-tenant";
import { ProjectSettingsContainer } from "~/web/features/project-settings/settings.container";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";

function SettingsPage() {
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

        return <ProjectSettingsContainer project={projectDetails} />;
      }}
    </RenderFunction>
  ) : (
    <div>Loading...</div>
  );
}

export default withAuthAndTenant(SettingsPage);
