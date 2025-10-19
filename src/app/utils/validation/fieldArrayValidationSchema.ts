import * as Yup from "yup";

export const FieldArrayValidationSchema = Yup.object({
  diagnoses: Yup.array()
    .of(
      Yup.object({
        name: Yup.string()
          .required("დიაგნოზის დასახელება აუცილებელია")
          .min(2, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო"),
        description: Yup.string()
          .required("დიაგნოზის აღწერა აუცილებელია")
          .min(5, "აღწერა უნდა იყოს მინიმუმ 5 სიმბოლო"),
      })
    )
    .min(1, "მინიმუმ ერთი დიაგნოზი უნდა არსებობდეს")
    .required("დიაგნოზების ინფორმაცია აუცილებელია"),
});