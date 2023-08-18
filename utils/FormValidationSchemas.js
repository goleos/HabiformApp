import * as Yup from "yup";

export const habitFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required").trim("Invalid Name"),
});
