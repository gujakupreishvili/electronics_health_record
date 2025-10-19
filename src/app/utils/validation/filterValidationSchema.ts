import * as Yup from "yup";

export const FilterValidationShcema = Yup.object({
  password: Yup.string().required("passowrd is  required").min(3),
});
