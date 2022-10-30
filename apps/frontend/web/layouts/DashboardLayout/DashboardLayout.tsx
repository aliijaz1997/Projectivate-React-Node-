import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { GiStairsGoal } from "react-icons/gi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineInsertChart, MdOutlineMoveToInbox } from "react-icons/md";
import { RiHomeLine } from "react-icons/ri";
import { VscFiles } from "react-icons/vsc";
import { Invite } from "~/web/features/Invite/Invite";
import { SideBar } from "../components/SideBar";
import { TopBar } from "../components/TopBar";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddIcon from "@mui/icons-material/Add";
import projectivate from "../../../public/projectivate.png";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import NewIssue from "~/web/features/NewIssue/NewIssue";
import { useProjectListQuery } from "~/web/store/services/projects.service";
import { retry } from "@reduxjs/toolkit/dist/query";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { AiOutlineProject } from "react-icons/ai";
import useStyles from "./dashBoardLayout.styles";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}
const membersImage = [
  {
    src: "https://images.unsplash.com/photo-1517461743639-4982607f3cad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=144&h=144&q=80",
    alt: "your image",
  },
  {
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=100&q=80",
    alt: "your image",
  },
];
const label = { inputProps: { "aria-label": "Switch demo" } };

export function DashboardLayout(props: Props) {
  const { window } = props;

  const [NewIssueOpen, setNewIssueOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [inviteOpen, setInviteOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const newIssueModalClose = () => {
    setNewIssueOpen(false);
  };
  const inviteModalClose = () => {
    setInviteOpen(false);
  };

  const router = useRouter();
  const projectId = router.query.projectId as string;
  const {
    isError,
    isLoading,
    isSuccess,
    data: projects,
  } = useProjectListQuery();

  const sideMenuItems = [
    { iconname: <RiHomeLine />, name: "Home", href: "/" },
    // { iconname: <HiOutlineShieldCheck />, name: "My Tasks", href: "/my-tasks" },
    // { iconname: <MdOutlineMoveToInbox />, name: "Inbox", href: "/reporting" },
  ];

  const sideMenuTags = [
    "Bug",
    "Feature Request",
    "Marketing",
    "v2.0",
    "Enhencement",
    "Design",
  ];
  const styles = useStyles({});
  const drawer = (
    <Box sx={styles.sidebarMainContainer}>
      <Toolbar sx={styles.sidebarFlexContainer}>
        <Box sx={styles.sidebarLogoContainer}>
          <Image
            height="40"
            width="110"
            src={projectivate}
            alt="projectivatelogo"
          />
          <IconButton
            sx={styles.chevronLeftIconButton}
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <List sx={{ width: "100%", mt: "1.5rem" }}>
          {sideMenuItems.map((item, index) => (
            <ListItem button key={index} sx={{ py: "0.25rem", px: "0.5rem" }}>
              <Link href={item.href}>
                <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "	rgb(153, 153, 153)",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "0rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.iconname}
                  </ListItemIcon>
                  <ListItemText sx={{ ml: "0.7rem" }} primary={item.name} />
                </a>
              </Link>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "2rem", width: "100%" }}>
          <Typography
            sx={{
              ml: "0.5rem",
              fontSize: "1.2rem",
              fontWeight: 600,
              mt: "0.7rem",
            }}
          >
            Projects
          </Typography>
          <List>
            {projects?.map((project) => {
              return (
                <ListItem
                  button
                  key={project.id}
                  sx={{ py: "0rem", px: "0.5rem" }}
                >
                  <Link href={`/projects/${project.id}/board`}>
                    <a
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "	rgb(153, 153, 153)",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "0rem",
                          fontSize: "1.2rem",
                        }}
                      >
                        <AiOutlineProject />
                      </ListItemIcon>
                      <ListItemText
                        sx={{ ml: "0.7rem" }}
                        primary={project.name}
                      />
                    </a>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Toolbar>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: "0.8rem",
          mt: "1.4rem",
        }}
      >
        <Stack sx={{ ml: "0.5rem" }} direction="row" spacing={0.5}>
          {membersImage.map((data, id) => {
            return (
              <Avatar
                sx={{ height: "1.8rem", width: "1.8rem" }}
                key={id}
                alt={data.alt}
                src={data.src}
              />
            );
          })}
        </Stack>
        <Box
          sx={{
            ml: "0.7rem",
            display: "flex",
            alignItems: "center",
            fontSize: "0.75rem",
            lineHeight: "1.25rem",
            fontWeight: 500,
          }}
        >
          <IconButton
            onClick={() => setInviteOpen(true)}
            sx={{
              height: "1.2rem",
              width: "1.2rem",
              border: "1px dotted rgb(153, 153, 153)",
            }}
          >
            <AddIcon sx={{ color: "	rgb(153, 153, 153)" }} />
          </IconButton>
          <Typography sx={{ ml: "0.25rem", color: "	rgb(153, 153, 153)" }}>
            Invite people
          </Typography>
        </Box>
        {inviteOpen && <Invite open onModalClose={inviteModalClose} />}
      </Box>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <SideBar
        drawer={drawer}
        container={container}
        open={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {projectId && <TopBar handleDrawerToggle={handleDrawerToggle} />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          overflowX: "auto",
        }}
      >
        {projectId && <Toolbar />}
        {projectId && <Toolbar />}

        {props.children}
      </Box>
    </Box>
  );
}
