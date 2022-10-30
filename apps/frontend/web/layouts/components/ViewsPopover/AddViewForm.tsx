import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "~/web/store";
import { useCreateViewMutation } from "~/web/store/services/views.service";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export function AddViewForm({ projectId }: { projectId: string | undefined }) {
  const [viewName, setViewName] = React.useState("");

  const filters = useAppSelector((state) => state.views.currentView.filters);
  const groupings = useAppSelector(
    (state) => state.views.currentView.groupings
  );

  const [createView] = useCreateViewMutation();

  return (
    <Box sx={{ mx: "1rem", mt: "1rem" }}>
      <OutlinedInput
        value={viewName}
        placeholder="Add view"
        inputProps={{ "aria-label": "Add view" }}
        onChange={(e) => setViewName(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "black" },
              }}
              onClick={() => {
                if (projectId) {
                  createView({
                    projectId,
                    body: {
                      name: viewName,
                      filters,
                      groupings,
                    },
                  });

                  toast.success("Successfully Created View!");
                }
                setViewName("");
              }}
            >
              Add View
            </Button>
          </InputAdornment>
        }
      />
    </Box>
  );
}
