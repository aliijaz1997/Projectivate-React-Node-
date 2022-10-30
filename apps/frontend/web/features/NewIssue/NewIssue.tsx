import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaTimes, FaUser } from "react-icons/fa";
import { useTenantId } from "~/web/common/hooks/useTenantId";
import { ErrorResponse, TaskCreate } from "~/web/common/types";
import { useTaskCreateMutation } from "~/web/store/services/tasks.service";
import { useTenantMembersQuery } from "~/web/store/services/tenants.service";
import { toast } from "react-toastify";
import { useListProjectCustomFieldQuery } from "~/web/store/services/customfield.service";
import moment, { Moment } from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/lab";
import {
  Alert,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import useStyles from "./newIssue.styles";
import CloseIcon from "@mui/icons-material/Close";

interface OpenModalProps {
  open: boolean;
  onModalClose: () => void;
}

type TaskCreateForm = TaskCreate & { categoryId: string };

export default function NewIssue({ onModalClose, open }: OpenModalProps) {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const [dateStart, setDateStart] = useState<Moment | null>(moment(new Date()));
  const [dateEnd, setDateEnd] = useState<Moment | null>(moment(new Date()));

  const {
    isError,
    isLoading,
    data: customFields,
  } = useListProjectCustomFieldQuery(projectId, {
    skip: !projectId,
  });

  const projectCategories = useMemo(
    () => customFields?.category.fieldItems ?? [],
    [customFields?.category.fieldItems]
  );

  const [
    taskCreate,
    { isError: isTaskCreateError, isSuccess: isTaskCreateSuccess, error },
  ] = useTaskCreateMutation();

  useEffect(() => {
    if (isTaskCreateSuccess) {
      onModalClose();
    }
    if (isTaskCreateError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isTaskCreateError, error, isTaskCreateSuccess, onModalClose]);

  const {
    isError: IsErrorTenants,
    isLoading: IsLoadingTenants,
    data: tenantUsers,
  } = useTenantMembersQuery(useTenantId() as string);

  const { handleSubmit, register, control } = useForm<TaskCreateForm>();
  const styles = useStyles({});

  if (isLoading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  if (IsLoadingTenants)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (IsErrorTenants) return <Alert severity="error">Error occurred</Alert>;
  if (isError) return <Alert severity="error">Error occurred</Alert>;

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={styles.newIssueModal}>
        <Box sx={styles.newIssueHeader}>
          <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
            New Task
          </Typography>
          <IconButton
            sx={{
              color: "rgb(107 114 128)",
              "&:hover": {
                background: "transparent",
              },
            }}
            size="small"
            onClick={onModalClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: "0.3rem" }}>
          <form
            onSubmit={handleSubmit((data) => {
              taskCreate({
                title: data.title,
                dateStart: dateStart?.toISOString() ?? new Date().toISOString(),
                dateEnd: dateEnd?.toISOString() ?? new Date().toISOString(),
                description: data.description,
                projectId,
                customFields: { category: data.categoryId },
                position: 1,
                assigneeId: data.assigneeId,
              });
            })}
          >
            <Controller
              name="title"
              control={control}
              defaultValue={""}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Task Name"
                  variant="outlined"
                  {...field}
                  sx={{ mt: "1rem" }}
                />
              )}
            />

            <Typography sx={{ fontWeight: 700, mt: "0.4rem" }}>For</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Select
                {...register("assigneeId")}
                sx={styles.SelectField}
                fullWidth
              >
                {tenantUsers &&
                  tenantUsers.map((tenantUser) => {
                    return (
                      <MenuItem key={tenantUser.id} value={tenantUser.id}>
                        {tenantUser.displayName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Box>
            <Typography sx={{ fontWeight: 700, mt: "0.4rem" }}>In</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "35.7rem" }}>
                <Select
                  {...register("categoryId")}
                  fullWidth
                  sx={styles.SelectField}
                >
                  {projectCategories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box>
            </Box>

            <LocalizationProvider dateAdapter={DateAdapter}>
              <Typography sx={{ fontWeight: 700, mt: "0.4rem" }}>
                Date From:
              </Typography>
              <DatePicker
                renderInput={(params) => (
                  <TextField fullWidth {...params} sx={{ mt: "0.4rem" }} />
                )}
                value={dateStart}
                onChange={(date) => setDateStart(date)}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Typography sx={{ fontWeight: 700, mt: "0.4rem" }}>
                Date To:
              </Typography>

              <DatePicker
                renderInput={(params) => (
                  <TextField fullWidth {...params} sx={{ mt: "0.4rem" }} />
                )}
                value={dateEnd}
                onChange={setDateEnd}
              />
            </LocalizationProvider>

            <Box sx={{ mt: "1rem", mx: "auto" }}>
              <Controller
                name="description"
                control={control}
                defaultValue={""}
                render={({ field }) => (
                  <TextareaAutosize
                    minRows={4}
                    placeholder="Description"
                    style={{
                      width: "100%",
                      border: "1px solid rgb(156 163 175)",
                    }}
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={styles.createTaskButtonContainer}>
              <Button
                variant="contained"
                type="submit"
                sx={styles.createTaskButton}
                size="small"
              >
                Create Task
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
