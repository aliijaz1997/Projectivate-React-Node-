import React from "react";

export interface FormTemplate {
  title: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type: string;
  title: string;
  required: ValidationRequired;
}

export interface ValidationRequired {
  value: boolean;
  message: string;
}

const constructionTemplateForm: FormTemplate = {
  title: "Construction Form",
  fields: [
    {
      name: "Project Name",
      type: "text",
      title: "Project Name",
      required: {
        value: true,
        message: "Project Name is required",
      },
    },
    {
      name: "Project Address 1",
      type: "text",
      title: "Project Address 1",
      required: {
        value: true,
        message: "Project Address 1 is required",
      },
    },
    {
      name: "Project Address 2",
      type: "text",
      title: "Project Address 2",
      required: {
        value: true,
        message: "Project Address 2 is required",
      },
    },
    {
      name: "City",
      type: "text",
      title: "City",
      required: {
        value: true,
        message: "City is required",
      },
    },
    {
      name: "Province/State",
      type: "text",
      title: "Province/State",
      required: {
        value: true,
        message: "Province/State is required",
      },
    },
    {
      name: "Country",
      type: "text",
      title: "Country",
      required: {
        value: true,
        message: "Country is required",
      },
    },
    {
      name: "Post Code",
      type: "text",
      title: "Post Code",
      required: {
        value: true,
        message: "Post Code is required",
      },
    },
    {
      name: "Client First Name",
      type: "text",
      title: "Client First Name",
      required: {
        value: true,
        message: "Client First Name is required",
      },
    },
    {
      name: "Client Last Name",
      type: "text",
      title: "Client Last Name",
      required: {
        value: true,
        message: "Client Last Name is required",
      },
    },
    {
      name: "Spouse First Name",
      type: "text",
      title: "Spouse First Name",
      required: {
        value: true,
        message: "Spouse First Name is required",
      },
    },
    {
      name: "Spouse Last Name",
      type: "text",
      title: "Spouse Last Name",
      required: {
        value: true,
        message: "Spouse Last Namee is required",
      },
    },
    {
      name: "Client Email",
      type: "text",
      title: "Client Email",
      required: {
        value: true,
        message: "Client Email is required",
      },
    },
    {
      name: "Client Phone",
      type: "text",
      title: "Client Phone",
      required: {
        value: true,
        message: "Client Phonee is required",
      },
    },
    {
      name: "Client Cell Phone",
      type: "text",
      title: "Client Cell Phone",
      required: {
        value: true,
        message: "Client Cell Phone is required",
      },
    },
  ],
};

const customTemplateForm: FormTemplate = {
  title: "Custom Form",
  fields: [
    {
      name: "Project Name",
      type: "text",
      title: "Project Name",
      required: {
        value: true,
        message: "Project Name is required",
      },
    },
  ],
};

export const templates = {
  custom: customTemplateForm,
  construction: constructionTemplateForm,
};

export type FormTemplates = keyof typeof templates;
