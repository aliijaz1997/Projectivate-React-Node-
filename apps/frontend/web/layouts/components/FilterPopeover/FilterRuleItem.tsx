import { Box, Button, Typography } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Condition, FilterRule, Operation } from "@projectivate/common";
import { ProjectCustomFields } from "~/web/common/types";

interface Props {
  op: Operation;
  index: number;
  filterRule: FilterRule;
  updateFilterRule: (
    field: FilterRule & {
      index: number;
    }
  ) => void;
  updateOp: (op: Operation) => void;
  customFields: ProjectCustomFields | undefined;
  onDelete: (index: number) => void;
}

export function FilterRuleItem({
  index,
  filterRule,
  op,
  updateOp,
  updateFilterRule,
  customFields,
  onDelete,
}: Props) {
  const handleOpChange = (event: SelectChangeEvent) => {
    updateOp(event.target.value as Operation);
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    updateFilterRule({
      ...filterRule,
      op: event.target.value as Condition,
      index,
    });
  };

  const handleFieldChange = (event: SelectChangeEvent) => {
    updateFilterRule({
      ...filterRule,
      field: event.target.value,
      value: "",
      index,
    });
  };

  const handleValueChange = (event: SelectChangeEvent) => {
    updateFilterRule({
      ...filterRule,
      value: event.target.value,
      index,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: "0.6rem",
        ml: "1rem",
      }}
    >
      {/* Dont show if its the first item */}
      {index !== 0 && (
        <Box
          sx={{
            minWidth: 99,
            ml: "",
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Op</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={op}
              label="Op"
              onChange={handleOpChange}
              // Disable any item rendered after first
              disabled={index > 1}
            >
              {Object.entries(Operation).map(([opKey, opValue]) => {
                return (
                  <MenuItem key={opKey} value={opKey}>
                    {opValue}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box
        sx={{
          minWidth: 110,
          ml: index === 0 ? ".3rem" : "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="field-name-select">Field Name</InputLabel>
          <Select
            labelId="field-name-select"
            id="field-name-select"
            value={filterRule.field}
            label="Field"
            onChange={handleFieldChange}
          >
            {customFields &&
              Object.keys(customFields).map((field) => {
                return (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          minWidth: 50,
          ml: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Condition</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterRule.op}
            label="Condition"
            onChange={handleConditionChange}
          >
            {Object.entries(Condition).map(([conditionKey, conditionValue]) => {
              return (
                <MenuItem key={conditionKey} value={conditionValue}>
                  {conditionValue}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          minWidth: 105,
          ml: "0.5rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Value</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterRule.value}
            label="value"
            onChange={handleValueChange}
          >
            {customFields &&
            customFields?.[filterRule.field]?.fieldItems?.length > 0 ? (
              customFields[filterRule.field].fieldItems.map((fieldItem) => {
                return (
                  <MenuItem key={fieldItem.id} value={fieldItem.id}>
                    {fieldItem.name}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="none" disabled>
                Nothing Available
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={() => onDelete(index)}>X</Button>
    </Box>
  );
}
