import * as Yup from "yup";

export const AddPatientValidationSchema = Yup.object({
  personalId: Yup.string()
    .matches(/^\d{11}$/, "პირადი ნომერი უნდა შეიცავდეს 11 ციფრს")
    .required("პირადი ნომერი სავალდებულოა"),
  fullName: Yup.string().required("პაციენტის სრული სახელი სავალდებულოა"),
  age: Yup.number()
    .typeError("ასაკი უნდა იყოს რიცხვი")
    .min(0, "ასაკი არ შეიძლება იყოს უარყოფითი")
    .required("პაციენტის ასაკი სავალდებულოა"),
  sex: Yup.string().required("აირჩიეთ პაციენტის სქესი"),
  height: Yup.number()
    .typeError("სიმაღლე უნდა იყოს რიცხვი")
    .positive("სიმაღლე უნდა იყოს დადებითი")
    .required("სიმაღლე სავალდებულოა"),
  weight: Yup.number()
    .typeError("წონა უნდა იყოს რიცხვი")
    .positive("წონა უნდა იყოს დადებითი")
    .required("წონა სავალდებულოა"),
  martialStatus: Yup.string().required("ქორწინების სტატუსი სავალდებულოა"),
  phoneNumber: Yup.string()
    .matches(/^(\+?\d{9,15})$/, "შეიყვანეთ სწორი ტელეფონის ნომერი")
    .required("ტელეფონის ნომერი სავალდებულოა"),
  dateOfBirth: Yup.date()
    .nullable()
    .typeError("შეიყვანეთ სწორი დაბადების თარიღი")
    .required("დაბადების თარიღი სავალდებულოა"),
  createdByDoctorId: Yup.string().matches(/^\d{11}$/, "პირადი ნომერი უნდა შეიცავდეს 11 ციფრს").required("ექიმის ID სავალდებულოა"),
  createdAt: Yup.date()
    .nullable()
    .typeError("შეიყვანეთ სწორი შექმნის თარიღი")
    .required("შექმნის თარიღი სავალდებულოა"),
});
