import { Alert, Box, CircularProgress, TextField } from "@mui/material";
import Downshift from "downshift";
import React, { useEffect } from "react";
import { useTenantId } from "~/web/common/hooks/useTenantId";
import { useAddAssigneeToTaskMutation } from "~/web/store/services/tasks.service";
import { useTenantMembersQuery } from "~/web/store/services/tenants.service";

interface MembersListContainerProps {
  taskId: string;
  assigneeId?: string | null;
}
export function MembersListContainer({
  taskId,
  assigneeId,
}: MembersListContainerProps) {
  const tenantId = useTenantId();
  const {
    data: members,
    isLoading,
    isError,
  } = useTenantMembersQuery(tenantId!, {
    skip: !tenantId,
  });
  const [addAssigneeToTask] = useAddAssigneeToTaskMutation();

  if (!members) return <div>No members found</div>;
  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  if (isError) return <Alert severity="error">Error occurred</Alert>;

  return assigneeId ? null : (
    <Downshift itemToString={(item) => (item ? item.value : "")}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        openMenu,
        closeMenu,
      }) => (
        <div style={{ marginLeft: "2rem", marginTop: "0.75rem" }}>
          <Box sx={{ width: "17.7rem" }}>
            <TextField
              fullWidth
              onFocus={() => openMenu()}
              onBlur={() => closeMenu()}
              variant="outlined"
              label="Find members"
              {...getInputProps()}
            />
          </Box>
          <ul {...getMenuProps()}>
            {isOpen
              ? members.map((member, index) => (
                  <li
                    key={member.displayName}
                    {...getItemProps({
                      key: member.displayName,
                      index,
                      item: member,
                      style: {
                        height: "2.375rem",
                        backgroundColor:
                          highlightedIndex === index
                            ? "rgb(229 231 235)"
                            : "white",
                        fontWeight: selectedItem === member ? "bold" : "normal",
                        padding: ".5rem",
                        borderRadius: ".3125rem",
                        width: "15.2rem",
                      },
                    })}
                    onClick={async () => {
                      await addAssigneeToTask({
                        assigneeId: member.id,
                        taskId,
                      });
                      closeMenu();
                    }}
                  >
                    {member.displayName}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}
