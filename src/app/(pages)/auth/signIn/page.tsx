"use client";
import React, { useState } from "react";
import ChoseRole from "@/components/choseRole/choseRole";
import { Building2, Shield, Stethoscope } from "lucide-react";
import Header from "@/components/header/header";
import { Form, Formik, FormikHelpers } from "formik";
import { SignInValidationSchema } from "@/app/utils/validation/signInValidationSchemta";
import axios from "axios";
import Input from "@/components/input/input";

type SignInValues = {
  email: string;
  password: string;
};

const initialValues: SignInValues = {
  email: "",
  password: "",
};

export default function Auth() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (
    values: SignInValues,
    { setErrors }: FormikHelpers<SignInValues>
  ) => {
    if (!selectedRole) {
      setServerError("გთხოვთ აირჩიოთ თქვენი როლი.");
      return;
    }

    try {
      const payload = {
        ...values,
        role: selectedRole,
      };

      // const res = await axios.post("/api/login", payload);
      console.log(values,"values")
      console.log("რეგისტრაცია წარმატებით:", payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
        setServerError("დაფიქსირდა შეცდომა. სცადეთ თავიდან.");
      } else {
        setServerError("უცნობი შეცდომა მოხდა.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-blue-50 flex items-center justify-center">
        <div
          className="
          flex flex-col md:flex-row 
          items-center justify-between 
          h-auto md:h-screen 
          w-full px-[5%] py-[40px] 
          gap-[40px]
          max-w-[1440px] mx-auto
        "
        >
          {/* Roles Section */}
          <div className="flex flex-col gap-[20px] w-full md:w-[45%]">
            <p className="text-[14px] font-bold pb-[10px]">
              აირჩიეთ თქვენი როლი:{" "}
            </p>

            <ChoseRole
              industry="სახელმწიფო"
              icon={Shield}
              onClick={() => setSelectedRole("სახელმწიფო")}
              className={`flex gap-[12px] w-full border-[2px] rounded-[8px] p-[10px] items-center h-[60px] cursor-pointer transition-all duration-300 
              ${
                selectedRole === "სახელმწიფო"
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-200 hover:border-blue-200"
              }`}
              iconStyle="text-blue-500 text-[18px]"
            />

            <ChoseRole
              industry="კლინიკა"
              icon={Building2}
              onClick={() => setSelectedRole("კლინიკა")}
              className={`flex gap-[12px] w-full border-[2px] rounded-[8px] p-[10px] items-center h-[60px] cursor-pointer transition-all duration-300 
              ${
                selectedRole === "კლინიკა"
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-200 hover:border-blue-200"
              }`}
              iconStyle="text-blue-500 text-[18px]"
            />

            <ChoseRole
              industry="ექიმი"
              icon={Stethoscope}
              onClick={() => setSelectedRole("ექიმი")}
              className={`flex gap-[12px] w-full border-[2px] rounded-[8px] p-[10px] items-center h-[60px] cursor-pointer transition-all duration-300 
              ${
                selectedRole === "ექიმი"
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-200 hover:border-blue-200"
              }`}
              iconStyle="text-blue-500 text-[18px]"
            />
          </div>

          {/* Form Section */}
          <Formik
            initialValues={initialValues}
            validationSchema={SignInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form
                className="
            flex flex-col gap-[12px] 
            w-full md:w-[45%] 
            border border-gray-200 rounded-[8px] p-[20px]
            shadow-sm bg-white
          "
              >
                <h1 className="text-xl font-bold">ავტორიზაცია</h1>
                <p className="text-gray-600 text-sm">
                  შეიყვანეთ თქვენი მონაცემები
                </p>

                <Input
                  label="ელფოსტა"
                  name="email"
                  type="email"
                  placeholder="Email"
                />

                <Input
                  label="პაროლი"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}

                {serverError && (
                  <p className="text-red-500 text-sm font-poppins">
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold py-[10px] rounded-[6px] hover:bg-blue-600 transition-colors"
                >
                  ავტორიზაცია
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
