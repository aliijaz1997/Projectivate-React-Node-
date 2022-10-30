import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "~/web/store";
import { Condition } from "@projectivate/common";
import { useProjectDetailsQuery } from "~/web/store/services/projects.service";
import { useRouter } from "next/router";
import {
  addFilterField,
  removeField,
  updateField,
  updateOperation,
} from "~/web/store/slices/views.slice";
import { AddFilterFormPopover } from "./AddFilterFormPopover";
import { FilterRuleItem } from "./FilterRuleItem";

export function FilterRuleList() {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const { fields, op } = useAppSelector(
    (state) => state.views.currentView.filters
  );
  const { data: project } = useProjectDetailsQuery(projectId, {
    skip: !projectId,
  });

  const dispatch = useAppDispatch();

  const customFields = React.useMemo(() => {
    return project?.customFields;
  }, [project?.customFields]);

  return (
    <Box sx={{ minHeight: "30rem", width: "31rem" }}>
      <Typography
        sx={{
          fontSize: "1.5rem",
          color: "rgb(153, 153, 153)",
          ml: "1.2rem",
          mt: "0.8rem",
          mb: "0.2rem",
        }}
      >
        Active Filter
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",

          flexWrap: "wrap",
          mt: "0.5rem",
        }}
      >
        <Typography
          sx={{
            alignSelf: "center",
            fontSize: "1.6rem",
            fontWeight: 600,
            ml: "1.4rem",
          }}
        >
          Where
        </Typography>

        {fields.map((field, index) => {
          return (
            <FilterRuleItem
              customFields={customFields}
              key={field.field + index}
              op={op}
              index={index}
              filterRule={field}
              updateFilterRule={(updateData) => {
                dispatch(updateField({ field: updateData }));
              }}
              updateOp={(op) => {
                dispatch(updateOperation({ op }));
              }}
              onDelete={(index) => {
                dispatch(
                  removeField({
                    index,
                  })
                );
              }}
            />
          );
        })}
      </Box>
      <AddFilterFormPopover
        customFields={customFields}
        handleOnFilterSelect={(fieldName) => {
          dispatch(
            addFilterField({
              field: {
                field: fieldName,
                op: Condition.EQ,
                value: "",
              },
            })
          );
        }}
      />
    </Box>
  );
}
