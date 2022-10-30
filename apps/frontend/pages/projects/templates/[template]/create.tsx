import { useRouter } from "next/router";
import templates from "pages/projects/templates";
import React from "react";
import { FormTemplates } from "~/web/features/project-create/components/templates";
import { CreateProject } from "~/web/features/project-create/CreateProject";

export default function Create() {
  const router = useRouter();
  const template = router.query.template as FormTemplates;

  return (
    <div>
      <CreateProject templateName={template} />
    </div>
  );
}
