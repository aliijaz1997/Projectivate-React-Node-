import React from "react";
import {
  Box,
  Button,
  Popover,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useInviteMutation } from "~/web/store/services/invite.service";
import { toast } from "react-toastify";
import { ErrorResponse, InviteForm } from "~/web/common/types";
import { useTenantId } from "~/web/common/hooks/useTenantId";
import PersonIcon from "@mui/icons-material/Person";
import { useTenantMembersQuery } from "~/web/store/services/tenants.service";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailIcon from "@mui/icons-material/Email";

export function InviteMembers() {
  const [openInvite, setOpenInvite] = React.useState(false);
  const [anchorElInvite, setAnchorElInvite] =
    React.useState<HTMLElement | null>(null);

  const handleOpenInvitePopOver = (e: React.MouseEvent<HTMLElement>) => {
    setOpenInvite(!openInvite);
    setAnchorElInvite(e.currentTarget);
  };
  const handleCloseInvitePopOver = () => {
    setOpenInvite(!openInvite);
    setAnchorElInvite(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenInvitePopOver}
        sx={{
          bgcolor: openInvite ? "primary.main" : "rgb(242, 242, 242)",
          mr: "0.3rem",
        }}
      >
        <AccountCircleOutlinedIcon
          sx={{ color: openInvite ? "white" : "inherit" }}
        />
      </IconButton>
      <Popover
        open={openInvite}
        anchorEl={anchorElInvite}
        onClose={handleCloseInvitePopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MembersInvite />
      </Popover>
    </>
  );
}

function MembersInvite() {
  const { register, handleSubmit, reset, control } = useForm<InviteForm>();

  const tenantId = useTenantId();
  const { data: members } = useTenantMembersQuery(tenantId!, {
    skip: !tenantId,
  });
  const [invite, { isLoading, error, isError, isSuccess, status }] =
    useInviteMutation();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("invite successfully");
    }
    if (isError && error && "data" in error) {
      toast.error((error.data as ErrorResponse).message);
    }
  }, [isSuccess, isError, error]);
  if (!members) return <Box>No members found</Box>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: "1.25rem",
        py: "1.25rem",
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          invite(data);
          reset();
        })}
      >
        <Box sx={{ bgcolor: "rgb(248,248,248)" }}>
          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="name@company.com"
                {...field}
              />
            )}
          />

          <Typography
            color="rgb(153, 153, 153)"
            variant="caption"
            display="block"
            gutterBottom
          >
            Invite People or share by name or email
          </Typography>
        </Box>
        <Button
          type="submit"
          sx={{ color: "white" }}
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<EmailIcon fontSize="small" />}
        >
          Invite
        </Button>
      </form>
      <Box
        sx={{
          px: "1.25rem",
          py: "1.25rem",
        }}
      >
        <Typography>{members.length} People</Typography>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              {members.map((member) => (
                <ListItem key={member.id} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={member.displayName} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
      </Box>
    </Box>
  );
}
