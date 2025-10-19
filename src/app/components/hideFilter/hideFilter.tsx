"use client";
import { FilterValidationShcema } from '@/app/utils/validation/filterValidationSchema';
import { Formik, Form, Field } from 'formik';
import React from 'react';

export default function Filter() {
  type FilterValues = {
    age: string;
    sex: string;
    hospitalizationDate: string;
    clinicName: string;
    responsibleDoctor: string;
    maritalStatus: string;
    region: string;
    city: string;
    finalDiagnosis: string;
    pathologicalFinding: string;
    imagingFinding: string;
    alcoholUse: string;
    allergyStatus: string;
    hereditaryDiseases: string;
    surgicalIntervention: string;
    postoperativeMedication: string;
  };

  const initialValues: FilterValues = {
    age: "",
    sex: "",
    hospitalizationDate: "",
    clinicName: "",
    responsibleDoctor: "",
    maritalStatus: "",
    region: "",
    city: "",
    finalDiagnosis: "",
    pathologicalFinding: "",
    imagingFinding: "",
    alcoholUse: "",
    allergyStatus: "",
    hereditaryDiseases: "",
    surgicalIntervention: "",
    postoperativeMedication: "",
  };

  const handleSubmit = (values: FilterValues) => {
    console.log("Applied Filters:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FilterValidationShcema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <Form className="border-[1px] border-gray-300 rounded-[6px] px-[15px] py-[20px] mt-[20px] mb-[20px] space-y-4">
          <p className="font-semibold">ფილტრები</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div>
              <label className="font-semibold">ასაკი</label>
              <Field type="text" name="age" placeholder="ასაკი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">სქესი</label>
              <Field as="select" name="sex" className="w-full border px-2 py-2 rounded border-gray-300">
                <option value="">ყველა</option>
                <option value="male">მამრობითი</option>
                <option value="female">მდედრობითი</option>
              </Field>
            </div>
            <div>
              <label className="font-semibold">ჰოსპიტალიზაციის თარიღი</label>
              <Field type="date" name="hospitalizationDate" placeholder="თარიღი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">კლინიკა/ჰოსპიტალი</label>
              <Field type="text" name="clinicName" placeholder="კლინიკის სახელი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>

            {/* Row 2 */}
            <div>
              <label className="font-semibold">პასუხისმგებელი ექიმი</label>
              <Field type="text" name="responsibleDoctor" placeholder="ექიმის სახელი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">ოჯახური მდგომარეობა</label>
              <Field as="select" name="maritalStatus" className="w-full border px-2 py-2 rounded border-gray-300">
                <option value="">ყველა</option>
                <option value="single">მოუღლელია</option>
                <option value="married">გათხოვილი/დაქორწინებული</option>
              </Field>
            </div>
            <div>
              <label className="font-semibold">რეგიონი</label>
              <Field type="text" name="region" placeholder="რეგიონი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">ქალაქი</label>
              <Field type="text" name="city" placeholder="ქალაქი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>

            {/* Row 3 */}
            <div>
              <label className="font-semibold">საბოლოო კლინიკური დიაგნოზი</label>
              <Field type="text" name="finalDiagnosis" placeholder="დიაგნოზი" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">პათოლოგიური მონაცემი</label>
              <Field type="text" name="pathologicalFinding" placeholder="პათოლოგიური" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">გამოკვლევის შედეგები (Imaging)</label>
              <Field type="text" name="imagingFinding" placeholder="გამოკვლევა" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">ალკოჰოლის მოხმარება</label>
              <Field as="select" name="alcoholUse" className="w-full border px-2 py-2 rounded border-gray-300">
                <option value="">ყველა</option>
                <option value="yes">კი</option>
                <option value="no">არა</option>
              </Field>
            </div>

            {/* Row 4 */}
            <div>
              <label className="font-semibold">ალერგიის სტატუსი</label>
              <Field type="text" name="allergyStatus" placeholder="ყველა" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">მემკვიდრეობითი დაავადებები</label>
              <Field type="text" name="hereditaryDiseases" placeholder="ყველა" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">სასაშლელი ოპერაცია</label>
              <Field type="text" name="surgicalIntervention" placeholder="ყველა" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
            <div>
              <label className="font-semibold">ოპერაციის შემდგომი მედიკამენტები</label>
              <Field type="text" name="postoperativeMedication" placeholder="ყველა" className="w-full border px-2 py-2 rounded border-gray-300" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              ფილტრები გამოიყენე
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => resetForm()}
            >
              ფილტრები გასუფთავება
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
