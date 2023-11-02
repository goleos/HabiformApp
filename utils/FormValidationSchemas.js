import * as Yup from "yup";

export const habitFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required").trim("Invalid Name").max(30, "A habit name cannot be longer than 30 characters"),
  triggerEventID: Yup.number().required('You need to link a trigger to this habit')
});

export const triggerFormValidationSchema = Yup.object({
  name: Yup.string()
      .required("Name is required")
      .trim("Invalid name")
      .max(20, "Name can have at most 20 characters"),
});
