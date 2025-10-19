"use client";
import React from "react";
import { Formik, Form } from "formik";

import { AddPatientValidationSchema } from "@/app/utils/validation/addPatientValidationSchema";
import { X } from "lucide-react";
import Input from "@/components/input/input";
import { dbCreatePatient } from "@/db";
type AddPatientProps = {
  setAddPatient: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddPatient({ setAddPatient }: AddPatientProps) {
  const initialValues = {
    personalId: "",
    fullName: "",
    age: 0,
    sex: "",
    height: 0,
    weight: 0,
    martialStatus: "",
    phoneNumber: "",
    dateOfBirth: "",
    createdByDoctorId: "",
    createdAt: "",
  };
  

  const handleSubmit = (values: typeof initialValues) => {
    dbCreatePatient(values);
    setAddPatient(false)
  };


  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border-[1px] rounded-[4px] border-gray-200">
        <div className="p-6 space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={AddPatientValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors }) => (
              <Form className="space-y-6 relative">
                <h1 className="text-[18px] lg:text-[24px] font-semibold">
                  ახალი პაციენტის დამატება
                </h1>
                <X
                  onClick={() => setAddPatient(false)}
                  className="absolute lg:right-[20px] right-[0px] top-[5px] cursor-pointer"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="პირადი ნომერი*" name="personalId" />
                  <Input label="სრული სახელი*" name="fullName" />
                  <Input label="ასაკი*" name="age" type="number" />
                  <Input
                    label="სქესი*"
                    name="sex"
                    placeholder="აირჩიეთ სქესი"
                  />
                  <Input label="სიმაღლე (სმ)*" name="height" type="number" />
                  <Input label="წონა (კგ)*" name="weight" type="number" />
                  <Input
                    label="ოჯახური სტატუსი*"
                    name="martialStatus"
                    placeholder="აირჩიეთ სტატუსი"
                  />
                  <Input label="ტელეფონი*" name="phoneNumber" />
                  <Input
                    label="დაბადების თარიღი*"
                    name="dateOfBirth"
                    type="date"
                  />
                  <Input label="ექიმის ID*" name="createdByDoctorId" />
                  <Input
                    label="შექმნის თარიღი*"
                    name="createdAt"
                    type="date"
                  />
                </div>

                {Object.keys(errors).length > 0 && (
                  <p className="text-red-500 text-sm">
                    გთხოვთ შეავსოთ ყველა სავალდებულო ველი
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-[12px] rounded-[8px] hover:bg-blue-700 transition-colors"
                >
                  დამატება
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}