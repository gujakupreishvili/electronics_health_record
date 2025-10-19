import * as Yup from "yup";

export const FilterUserValidationSchema = Yup.object({
  userId: Yup.string()
});
