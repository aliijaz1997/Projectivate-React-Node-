import React from "react";
import { FormTemplate, Field } from "./templates";
import { FieldValues, Controller, Control } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { ProjectCreate } from "~/web/common/types";

interface CustomFormTypes {
  template: FormTemplate;
  control: Control<any, object>;
}

export function CustomForm({ template, control }: CustomFormTypes) {
  const renderFields = (fields: Field[]) => {
    return fields.map((field) => {
      let { type, title, name, required } = field;

      switch (type) {
        case "text":
          return (
            <Box sx={{ my: "0.5rem" }} key={name}>
              <Controller
                name={name}
                control={control}
                defaultValue={""}
                rules={{ required }}
                key={name}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label={title}
                    variant="outlined"
                    type="text"
                    {...field}
                  />
                )}
              />
            </Box>
          );

        default:
          return (
            <div key={name}>
              <span>Invalid Field</span>
            </div>
          );
      }
    });
  };
  let { title, fields } = template;
  return (
    <>
      <Typography sx={{ fontWeight: 600, fontSize: "1.3rem" }}>
        {title}
      </Typography>
      <Box>{renderFields(fields)}</Box>
    </>
  );
}
