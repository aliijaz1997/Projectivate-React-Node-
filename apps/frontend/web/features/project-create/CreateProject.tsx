import React, { FormEvent, useEffect, useState } from "react";
import { useProjectCreateMutation } from "~/store/services/projects.service";
import {
  FormTemplates,
  templates as allTemplates,
} from "./components/templates";
import { CustomForm } from "./components/CustomForm";
import { useForm } from "react-hook-form";

import router from "next/router";
import { Box, Button } from "@mui/material";
import { ProjectCreate } from "~/web/common/types";

interface Props {
  templateName: FormTemplates;
}

export function CreateProject({ templateName }: Props) {
  const [templates, setTemplates] = useState(allTemplates);
  const [projectCreate, { isSuccess, isLoading }] = useProjectCreateMutation();
  let { register, handleSubmit, control } = useForm<any>();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  if (!templates[templateName])
    return <Box>No Template with that name found</Box>;

  return (
    <Box sx={{ mx: "auto", p: "3rem" }}>
      <form
        onSubmit={handleSubmit((data) => {
          const name = data["Project Name"];
          delete data["Project Name"];

          projectCreate({
            name: name,
            additionalInformation: data,
          });
        })}
      >
        <CustomForm template={templates[templateName]} control={control} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ mt: "0.75rem", color: "white" }}
            type="submit"
            variant="contained"
          >
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
