"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@/components/button/button";
import * as Yup from "yup";
import { dbCreateHealthCard } from "@/db";

// ✅ Validation Schema
const validationSchema = Yup.object({
  patientId: Yup.string().required("აუცილებელია"),
  medicalCardCreationDate: Yup.string().nullable(),
  clinicHospitalName: Yup.string().nullable(),
  location: Yup.string().required("აუცილებელია"),
  responsibleDoctorFullName: Yup.string().required("აუცილებელია"),
  hospitalizationDateTime: Yup.string().required("აუცილებელია"),
  finalClinicalDiagnosisMain: Yup.string().required("აუცილებელია"),
  doctorNotes: Yup.string().required("აუცილებელია"),
  createdByDoctorId: Yup.string().required("აუცილებელია"),
  createdByHospitalId: Yup.string().required("აუცილებელია"),
});
type PatientFormValues = {
  patientId: string;
  medicalCardCreationDate: string; // ঐচ্ছिकი
  clinicHospitalName: string; // ঐচ্ছიკი
  location: string;
  responsibleDoctorFullName: string;
  hospitalizationDateTime: string;
  finalClinicalDiagnosisMain: string;
  doctorNotes: string; // მრავლობითი ტექსტური შენიშვნები
  createdByDoctorId: string;
  createdByHospitalId: string;
  statusPraesense?: string;
  statusLocus?: string;
  corsusMorbis?: string;
  clinicDischarge?: string;
};

// ✅ Initial values
const initialValues = {
  patientId: "",
  medicalCardCreationDate: "",
  clinicHospitalName: "",
  location: "",
  responsibleDoctorFullName: "",
  hospitalizationDateTime: "",
  finalClinicalDiagnosisMain: "",
  doctorNotes: "",
  createdByDoctorId: "",
  createdByHospitalId: "",
  statusPraesense: "",
  statusLocus: "",
  corsusMorbis: "",
  clinicDischarge: "",
};

const onSubmit = (
  values: PatientFormValues,
  { resetForm }: { resetForm: () => void }
) => {
  console.log(values, "dsadjhbasdjhbashd");
  dbCreateHealthCard(values);
  // resetForm();
};
export default function PatientForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className="p-8 border mb-[20px] border-gray-300 bg-gray-100 rounded-md space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            პაციენტის ინფორმაცია
          </h2>

          {/* patientId */}
          <div>
            <Field
              name="patientId"
              placeholder="პაციენტის ID"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="patientId"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
          {/* medicalCardCreationDate */}
          <div>
            <Field
              type="date"
              name="medicalCardCreationDate"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* clinicHospitalName */}
          <div>
            <Field
              name="clinicHospitalName"
              placeholder="კლინიკის / საავადმყოფოს სახელი"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* location */}
          <div>
            <Field
              name="location"
              placeholder="მდებარეობა"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* responsibleDoctorFullName */}
          <div>
            <Field
              name="responsibleDoctorFullName"
              placeholder="მიმღები ექიმის სრული სახელი"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="responsibleDoctorFullName"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* hospitalizationDateTime */}
          <div>
            <Field
              type="datetime-local"
              name="hospitalizationDateTime"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="hospitalizationDateTime"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* finalClinicalDiagnosisMain */}
          <div>
            <Field
              as="textarea"
              name="finalClinicalDiagnosisMain"
              placeholder="საბოლოო კლინიკური დიაგნოზი"
              className="border px-3 py-2 rounded-md w-full h-[80px] resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="finalClinicalDiagnosisMain"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* ✅ doctorNotes FieldArray */}
          <div className="border-t pt-4 mt-4">
            <Field
              as="textarea"
              name="doctorNotes"
              placeholder="ექიმის შენიშვნები"
              className="border px-3 py-2 rounded-md w-full h-[80px] resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="doctorNotes"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* createdByDoctorId */}
          <div>
            <Field
              name="createdByDoctorId"
              placeholder="შემქმნელი ექიმის ID"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="createdByDoctorId"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* createdByHospitalId */}
          <div>
            <Field
              name="createdByHospitalId"
              placeholder="საავადმყოფოს ID"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <ErrorMessage
              name="createdByHospitalId"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          {/* statusPraesense */}
          <div>
            <Field
              name="statusPraesense"
              placeholder="statusPraesense"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* statusLocus */}
          <div>
            <Field
              name="statusLocus"
              placeholder=" statusLocus"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* corsusMorbis */}
          <div>
            <Field
              name="corsusMorbis"
              placeholder=" corsusMorbis"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* clinicDischarge */}
          <div>
            <Field
              name="clinicDischarge"
              placeholder=" clinicDischarge"
              className="border px-3 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <Button
            text="შენახვა"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 duration-300"
          />
        </Form>
      )}
    </Formik>
  );
}
