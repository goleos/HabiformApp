import * as Yup from "yup";

export const habitFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required").trim("Invalid Name"),
  triggerEventID: Yup.number().required('You need to link a trigger to this habit')
});
