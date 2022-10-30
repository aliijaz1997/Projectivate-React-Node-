import { useEffect } from "react";
import { DropResult } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import {
  CustomFieldItem,
  ErrorResponse,
  Project,
  CustomFieldItemAddForm,
} from "~/web/common/types";
import {
  useAddCustomFieldItemToProjectMutation,
  useUpdateProjectCustomFieldItemMutation,
} from "~/web/store/services/customfield.service";

import { ProjectSettings } from "./settings";

interface Props {
  project: Project;
}

export function ProjectSettingsContainer({ project }: Props) {
  const [
    addCustomFieldItemToProject,
    {
      isError: isAddCustomFieldItemError,
      error: addCustomFieldItemError,
      isSuccess: isAddCustomFieldItemSuccess,
      isLoading: isAddCustomFieldItemLoading,
    },
  ] = useAddCustomFieldItemToProjectMutation();

  const [
    updateProjectCustomFieldItem,
    {
      isError: isUpdateProjectCustomFieldItemError,
      error: updateProjectCustomFieldItemError,
      isSuccess: isUpdateProjectCustomFieldItemSuccess,
      isLoading: isUpdateProjectCustomFieldItemLoading,
    },
  ] = useUpdateProjectCustomFieldItemMutation();

  useEffect(() => {
    if (
      isAddCustomFieldItemError &&
      addCustomFieldItemError &&
      "data" in addCustomFieldItemError
    ) {
      toast.error((addCustomFieldItemError.data as ErrorResponse).message);
    }
  }, [addCustomFieldItemError, isAddCustomFieldItemError]);

  useEffect(() => {
    if (isUpdateProjectCustomFieldItemSuccess) {
      toast.success("Successfully Updated");
    }
  }, [isUpdateProjectCustomFieldItemSuccess]);
  useEffect(() => {
    if (
      updateProjectCustomFieldItemError &&
      "data" in updateProjectCustomFieldItemError
    ) {
      toast.error(
        (updateProjectCustomFieldItemError.data as ErrorResponse).message
      );
    }
  }, [updateProjectCustomFieldItemError]);

  const onCustomFieldDragEnd = async (
    customFieldName: string,
    result: DropResult
  ) => {
    if (!result.destination) return;

    const draggableCustomFieldId = result.draggableId;
    const destinationPosition = result.destination?.index;
    const droppableCustomField = project.customFields[
      customFieldName
    ].fieldItems.filter((item) => item.position === destinationPosition);
    const sourcePosition = result.source.index;

    await updateProjectCustomFieldItem({
      field: customFieldName,
      projectId: project.id,
      fieldItemId: droppableCustomField[0].id,
      body: { position: sourcePosition },
    });
    await updateProjectCustomFieldItem({
      field: customFieldName,
      projectId: project.id,
      fieldItemId: draggableCustomFieldId,
      body: { position: destinationPosition },
    });
  };

  const onCustomFieldAdd = (field: string, data: CustomFieldItemAddForm) => {
    addCustomFieldItemToProject({
      name: data.name,
      field,
      projectId: project.id,
    });
  };

  const onCustomFieldUpdate = (
    customFieldName: string,
    customFieldItemId: string,
    data: Partial<CustomFieldItem>
  ) => {
    updateProjectCustomFieldItem({
      body: data,
      fieldItemId: customFieldItemId,
      projectId: project.id,
      field: customFieldName,
    });
  };

  return (
    <ProjectSettings
      projectId={project.id}
      customFields={project.customFields}
      onCustomFieldUpdate={onCustomFieldUpdate}
      onCustomFieldAdd={onCustomFieldAdd}
      onCustomFieldDragEnd={onCustomFieldDragEnd}
      updateProjectCustomFieldItemError={updateProjectCustomFieldItemError}
    />
  );
}
