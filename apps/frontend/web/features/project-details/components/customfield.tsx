import React from "react";
import { useState } from "react";
import { FaCheck, FaCircleNotch } from "react-icons/fa";

import { CardButton } from "../components/CardButton";
import {
  useAddCustomFieldItemToProjectMutation,
  useAddFieldItemToTaskMutation,
  useListProjectCustomFieldItemQuery,
  useRemoveFieldItemToTaskMutation,
} from "~/web/store/services/customfield.service";
import {
  Box,
  Typography,
  Button,
  ListItem,
  TextField,
  MenuItem,
  Menu,
} from "@mui/material";
import { useTaskDetailsQuery } from "~/web/store/services/tasks.service";

export interface Props {
  title: string;
  projectId: string;
  taskId: string;
}

function CustomField({ title, projectId, taskId }: Props) {
  const [page, setPage] = useState(1);
  const goNextPage = () => {
    setPage((page) => page + 1);
  };
  const goPrevPage = () => {
    setPage((page) => page - 1);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        sx={{ mt: "0.3rem", color: "white" }}
        fullWidth
        onClick={handleClick}
        startIcon={<FaCircleNotch />}
        variant="contained"
      >
        {title}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        tabIndex={1}
      >
        <MenuItem
          sx={{
            p: "0.5rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: "2px",
            mb: "0.25rem",
          }}
        >
          {page == 1 && (
            <Typography sx={{ textAlign: "center" }}>{title}</Typography>
          )}
          {page == 2 && (
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              onClick={goPrevPage}
            >
              <Typography sx={{ textAlign: "center", width: "66.666667%" }}>
                {title}
              </Typography>
            </Box>
          )}
        </MenuItem>
        {page == 1 && (
          <MenuItem
            sx={{
              p: "0.75rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ShowFieldItem
              goNextPage={goNextPage}
              projectId={projectId}
              title={title}
              taskId={taskId}
            />
          </MenuItem>
        )}
        {page === 2 && (
          <MenuItem
            sx={{
              p: "0.75rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AddFieldItemForm
              goNextPage={goNextPage}
              projectId={projectId}
              goPrevPage={goPrevPage}
              titleOfField={title}
            />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

interface ShowFieldItemProp {
  projectId: string;
  title: string;
  taskId: string;
  goNextPage: () => void;
}
function ShowFieldItem({
  projectId,
  title,
  taskId,
  goNextPage,
}: ShowFieldItemProp) {
  const { data: fieldItems } = useListProjectCustomFieldItemQuery({
    projectId,
    field: title,
  });

  const { data: task } = useTaskDetailsQuery(taskId);
  const taskFieldItem: string[] = React.useMemo(() => {
    return (task && (task.customFields[title] as string[])) ?? [];
  }, [task, title]);

  const [assignFieldItemToTask] = useAddFieldItemToTaskMutation();
  const [removeFieldItemFromTask] = useRemoveFieldItemToTaskMutation();
  const addOrRemoveFieldItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.target.checked) {
      assignFieldItemToTask({
        projectId,
        field: title,
        fieldItemId: id,
        taskId,
      });
    } else {
      removeFieldItemFromTask({
        field: title,
        fieldItemId: id,
        taskId,
        projectId,
      });
    }
  };
  const handleCreateNewFieldItem = (e: React.FormEvent) => {
    e.preventDefault();
    goNextPage();
  };
  if (!fieldItems) return <Box>No field items found</Box>;
  if (!task) return <Box>No field items found</Box>;
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {fieldItems.map((fieldItem) => {
          const isInTask = taskFieldItem.some((tf) => tf === fieldItem.id);
          return (
            <Button
              size="small"
              variant="contained"
              sx={{
                mt: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={fieldItem.id}
            >
              {fieldItem.name}
              <input
                defaultChecked={isInTask}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  addOrRemoveFieldItem(e, fieldItem.id)
                }
                type="checkbox"
                name="checked"
                id="checked"
              />
            </Button>
          );
        })}
      </Box>
      <Button
        variant="contained"
        onClick={handleCreateNewFieldItem}
        sx={{
          marginTop: "0.5rem",
        }}
      >
        Create
      </Button>
    </Box>
  );
}

interface AddFieldFormProps {
  projectId: string;
  titleOfField: string;
  goNextPage: () => void;
  goPrevPage: () => void;
}

function AddFieldItemForm({
  goNextPage,
  goPrevPage,
  projectId,
  titleOfField,
}: AddFieldFormProps) {
  const [tagColors, setTagColors] = useState([
    { name: "accent" },
    { name: "primary" },
    { name: "secondary" },
    { name: "error" },
    { name: "warning" },
  ]);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const handleColor = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const colorName = e.currentTarget.name;
    setColor(colorName);
  };

  const [addCustomFieldItemToProject] =
    useAddCustomFieldItemToProjectMutation();

  const handleFieldItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomFieldItemToProject({
      projectId,
      name: title,
      field: titleOfField,
      color,
    });
    goPrevPage();
  };
  return (
    <Box>
      <TextField
        label="Title"
        variant="outlined"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
        value={title}
      />
      <Typography>Color</Typography>
      <Box sx={{ display: "flex", gap: "0.25rem", mt: "0.25rem" }}>
        {tagColors.map((item) => (
          <Button
            className="flex-1"
            sx={{}}
            name={item.name}
            onClick={handleColor}
            key={item.name}
          >
            {item.name === color && <FaCheck />}
          </Button>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="contained" onClick={handleFieldItemSubmit}>
          Create
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            goPrevPage();
          }}
        >
          Previous
        </Button>
      </Box>
    </Box>
  );
}

export default CustomField;
