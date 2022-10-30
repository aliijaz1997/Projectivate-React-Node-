import {
  Box,
  IconButton,
  Popover,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { RiStackLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "~/web/store";
import { openFieldSelectPopOver } from "~/web/store/slices/boardLayOutSlice";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";
import { setField1, setField2 } from "~/web/store/slices/views.slice";
import { useRouter } from "next/router";

const multiSelectPages = ["list", "board"];

export function GroupingPopover() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const projectId = router.query.projectId as string | undefined;

  const { data: project } = useProjectDetailsQuery(projectId as string, {
    skip: !projectId,
  });

  const isMultiSelectPage = React.useMemo(() => {
    return multiSelectPages.some((page) => router.asPath.includes(page));
  }, [router.asPath]);

  const popoverClose = useAppSelector(
    (state) => state.boardView.fieldSelectPopOver
  );
  const horizontalGroupName = useAppSelector(
    (state) => state.views.currentView.groupings.field1
  );

  const verticalGroupName = useAppSelector(
    (state) => state.views.currentView.groupings.field2
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleCloseSelectFieldPopOver = () => {
    dispatch(openFieldSelectPopOver());
    setAnchorEl(null);
  };

  const handleOpenSelectFieldPopOver = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(openFieldSelectPopOver());
    setAnchorEl(e.currentTarget);
  };

  const allCustomFieldNames = React.useMemo(
    () => Object.keys(project?.customFields ?? {}),
    [project?.customFields]
  );

  const onHorizontalGroupNameChange = (e: SelectChangeEvent) => {
    dispatch(setField1(e.target.value));

    // TODO
    // Replace this with views update
    // if (project?.id) {
    //   updateProjectViewPreference({
    //     projectId: project.id,
    //     viewName: "board",
    //     body: {
    //       horizontalField: e.target.value,
    //     },
    //   });
    // }
  };

  const onVerticalGroupNameChange = (e: SelectChangeEvent) => {
    dispatch(setField2(e.target.value));

    // TODO
    // Replace this with views update
    // if (project?.id) {
    //   updateProjectViewPreference({
    //     projectId: project.id,
    //     viewName: "board",
    //     body: {
    //       verticalField: e.target.value,
    //     },
    //   });
    // }
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton
        onClick={handleOpenSelectFieldPopOver}
        sx={{
          bgcolor: "primary.main",
          mr: "0.3rem",
          color: "white",
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
      >
        <RiStackLine />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        open={popoverClose}
        anchorEl={anchorEl}
        onClose={handleCloseSelectFieldPopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableRestoreFocus
      >
        {isMultiSelectPage ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              width: "100%",
              height: "13rem",
              mt: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  lineHeight: "1.75rem",
                  fontWeight: 500,
                  width: "11.5rem",
                }}
              >
                Group By Horizontal:
              </Typography>
              <Select
                sx={{ width: "7rem" }}
                onChange={onHorizontalGroupNameChange}
                value={horizontalGroupName}
              >
                {allCustomFieldNames.map((name) => {
                  if (name !== verticalGroupName)
                    return (
                      <MenuItem value={name} key={name}>
                        {name}
                      </MenuItem>
                    );
                })}
              </Select>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
                mx: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  lineHeight: "1.75rem",
                  fontWeight: 500,
                  width: "11.5rem",
                }}
              >
                Group By Vertical:
              </Typography>
              <Select
                sx={{ width: "7rem" }}
                onChange={onVerticalGroupNameChange}
                value={verticalGroupName}
              >
                {allCustomFieldNames.map((name) => {
                  return (
                    horizontalGroupName !== name && (
                      <MenuItem value={name} key={name}>
                        {name}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              width: "100%",
              height: "13rem",
              mt: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mx: "1rem",
              }}
            >
              <Typography
                sx={{
                  width: "11.5rem",
                  fontSize: "1.125rem",
                  lineHeight: "1.75rem",
                  fontWeight: 700,
                }}
              >
                Select
              </Typography>
              <Select
                sx={{ width: "7rem" }}
                onChange={onHorizontalGroupNameChange}
                value={horizontalGroupName}
              >
                {allCustomFieldNames.map((name) => {
                  return (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Box>
        )}
      </Popover>
    </>
  );
}
