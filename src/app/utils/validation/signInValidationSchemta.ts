import * as Yup from "yup";

export const SignInValidationSchema = Yup.object({
  email: Yup.string()
    .required("email is  required")
    .email("Invalid email format."),
  password: Yup.string().required("passowrd is  required").min(3),
});
