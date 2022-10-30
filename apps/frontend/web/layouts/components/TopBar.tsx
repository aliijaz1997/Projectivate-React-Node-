import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { InputBase } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { InviteMembers } from "~/web/layouts/components/inviteWithSearchMembers";
import { FilterPopover } from "./FilterPopeover/FilterPopover";
import { GroupingPopover } from "./GroupingPopover";
import { TaskGroupViewSwitch } from "./TaskGroupViewSwitch";
import { SearchPopover } from "./SearchPopover";
import { ViewsPopover } from "./ViewsPopover/ViewsPopover";
import { useAppSelector } from "~/web/store";
import { GENERIC_VIEW_CONSTANT } from "@projectivate/common";
import { SettingPopover } from "./SettingPopover/SettingPopover";
import { ProjectSettingsContainerPopOver } from "./SettingPopover/settingContainerPopover";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";
import NewIssue from "~/web/features/NewIssue/NewIssue";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
interface Props {
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;
export function TopBar({ handleDrawerToggle }: Props) {
  const [NewIssueOpen, setNewIssueOpen] = React.useState(false);
  const [dropDown, setDropDown] = React.useState(false);
  const router = useRouter();

  const projectId = router.query.projectId as string;
  const { data: project } = useProjectDetailsQuery(projectId);
  const currentViewName = useAppSelector(
    (state) => state.views.currentView.name
  );

  const isDefaultView = currentViewName === GENERIC_VIEW_CONSTANT;
  if (!project) return <div>No project found</div>;
  const paths = [
    { routePath: `/projects/${projectId}/overview`, routeName: "Overview" },
    { routePath: `/projects/${projectId}/planning`, routeName: "Planning" },
    { routePath: `/projects/${projectId}/list`, routeName: "List" },
    { routePath: `/projects/${projectId}/board`, routeName: "Board" },
    { routePath: `/projects/${projectId}/timeline`, routeName: "Timeline" },
    { routePath: `/projects/${projectId}/calendar`, routeName: "Calendar" },
    { routePath: `/projects/${projectId}/dashboard`, routeName: "Dashboard" },
  ];
  const newIssueModalClose = () => {
    setNewIssueOpen(false);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "white",
        boxShadow: "0px 0px 0px 0px",
      }}
    >
      <Toolbar
        sx={{
          mx: { md: "2rem" },
          bgcolor: "white",
          my: { md: "0.5rem" },
          boxShadow: "0.3rem 0.1rem 0.5rem 0.5rem rgb(230, 230, 230)",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <TaskGroupViewSwitch />
        </Box>

        <Box sx={{ marginLeft: "auto", mb: { xs: "0.5rem" } }}>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              justifyContent: "center",
              ml: { xs: "2.6rem" },
            }}
          >
            <TaskGroupViewSwitch />
          </Box>
          {isDefaultView && (
            <>
              <GroupingPopover />
              <FilterPopover />
            </>
          )}
          <ViewsPopover />
          <InviteMembers />
          <SearchPopover />
          <IconButton sx={{ bgcolor: "	rgb(242, 242, 242)", mr: "0.3rem" }}>
            <AddIcon />
          </IconButton>
          <ProjectSettingsContainerPopOver project={project} />
        </Box>
      </Toolbar>
      {projectId && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { md: "center" },
            mx: "2rem",
            mb: { xs: "1rem" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton sx={{}} onClick={() => setDropDown(!dropDown)}>
              {dropDown ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          {dropDown && (
            <>
              <List
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                {paths.map((path, index) => (
                  <ListItem button key={index} sx={{}}>
                    <Link href={path.routePath}>
                      <a
                        style={{
                          textDecoration: "none",
                          color: "	rgb(153, 153, 153)",
                        }}
                      >
                        <ListItemText
                          primary={path.routeName}
                          sx={{
                            // mx: "1rem",
                            color:
                              router.asPath === path.routePath
                                ? "secondary.main"
                                : "",
                            borderBottom:
                              router.asPath === path.routePath
                                ? "1px solid red"
                                : "",
                          }}
                        />
                      </a>
                    </Link>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={() => setNewIssueOpen(!NewIssueOpen)}
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: "secondary.main",
                    borderRadius: "10rem",
                    color: "white",
                  }}
                >
                  new issue
                </Button>
              </Box>
            </>
          )}
          <List
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {paths.map((path, index) => (
              <ListItem button key={index} sx={{}}>
                <Link href={path.routePath}>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "	rgb(153, 153, 153)",
                    }}
                  >
                    <ListItemText
                      primary={path.routeName}
                      sx={{
                        // mx: "1rem",
                        color:
                          router.asPath === path.routePath
                            ? "secondary.main"
                            : "",
                        borderBottom:
                          router.asPath === path.routePath
                            ? "1px solid red"
                            : "",
                      }}
                    />
                  </a>
                </Link>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setNewIssueOpen(!NewIssueOpen)}
              size="small"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "secondary.main",
                borderRadius: "10rem",
                color: "white",
              }}
            >
              new issue
            </Button>
          </Box>
          {NewIssueOpen && <NewIssue open onModalClose={newIssueModalClose} />}
        </Box>
      )}
    </AppBar>
  );
}
