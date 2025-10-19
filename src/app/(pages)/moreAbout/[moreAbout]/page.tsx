"use client";

import { useDbRead, useGetDoctorByPersonalId } from "@/db";
import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/components/header/header";
import Button from "@/components/button/button";
import { LuSparkles } from "react-icons/lu";
import DynamicInputList from "@/components/dynamicInputList/dynamicInputList";
import { RoleInstances } from "@/constants/roleEnum";
import { HealthCardT } from "@/db/dbCreate";

import SymptomAnalyzer from "@/components/SymptomAnalyzer";
type Patient = {
  id: number;
  fullName: string;
  personalId: string;
  age: number;
  sex: string;
  phoneNumber: string;
  height?: number;
  weight?: number;
  createdAt?: string | Date;
  createdByDoctorId?: string;
  martialStatus?: string;
  dateOfBirth?: string | Date;
};

interface HealthCardWithIdT extends HealthCardT {
  id: string;
}

export default function MoreAbout() {
  const [checkAi, setCheckAi] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const params = useParams();
  const doctorId = params.moreAbout as string;

  const { result } = useGetDoctorByPersonalId(doctorId) as {
    result: Patient[];
  };

  const { result: fetchedData } = useDbRead({
    query: { healthCard: {} },
    roomNameSpace: RoleInstances.HEALTHCARD,
  });

  const userData =
    Array.isArray(fetchedData) &&
    fetchedData.filter(
      (item: HealthCardWithIdT) => item.patientId === doctorId
    );

  const onClick = (id: string) => {
    const pdfModalData =
      Array.isArray(fetchedData) &&
      fetchedData.filter((item: HealthCardWithIdT) => item.id === id);

    if (pdfModalData) {
      setIsModal(true);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col px-[20px]">
        <p className=" py-[20px] text-[22px] font-semibold">
          პაციენტის პროფილი
        </p>
        <div className="bg-gray-100 flex flex-col rounded-[8px] px-[30px] py-[30px]">
          {result && result.length > 0 ? (
            result.map((item) => (
              <div
                key={item.id}
                className="mb-4 grid grid-cols-2 gap-x-3 gap-y-2"
              >
                <p>
                  სახელი: <span>{item.fullName}</span>{" "}
                </p>
                <p>
                  პირადი ნომერი: <span>{item.personalId}</span>{" "}
                </p>
                <p>
                  ასაკი: <span> {item.age}</span>
                </p>
                <p>
                  სქესი: <span>{item.sex}</span>{" "}
                </p>
                <p>
                  ტელეფონი: <span> {item.phoneNumber}</span>
                </p>
                <p>
                  სიმაღლე: <span>{item.height}</span> სმ{" "}
                </p>
                <p>
                  წონა: <span>{item.weight}</span> კგ
                </p>
                {item.dateOfBirth && (
                  <p>
                    დაბადების თარიღი:{" "}
                    {new Date(item.dateOfBirth).toLocaleDateString("ka-GE")}
                  </p>
                )}
                {item.martialStatus && (
                  <p>ოჯახური მდგომარეობა: {item.martialStatus}</p>
                )}
              </div>
            ))
          ) : (
            <p>ინფორმაცია ვერ მოიძებნა</p>
          )}
          {/* პაციენტის ისტორია */}
          <h1 className="text-[22px] font-semibold mb-[0px] mt-[20px]">
            პაციენტის ისტორია
          </h1>

          <section className="flex flex-col mt-6 h-[260px] overflow-y-auto  mb-[20px]">
            {userData && userData.length > 0 ? (
              userData.map((item: HealthCardWithIdT) => (
                <div
                  onClick={() => onClick(item.id)}
                  key={item.id}
                  className={`mb-4 grid grid-cols-2 gap-x-3 gap-y-2 bg-gray-50 p-4 rounded-md shadow-sm pointer`}
                >
                  <p>
                    კლინიკის/საავადმყოფოს სახელი:{" "}
                    <span>{item.clinicHospitalName}</span>
                  </p>
                  <p>
                    პაციენტის ID: <span>{item.patientId}</span>
                  </p>
                  <p>
                    ადგილი: <span>{item.location}</span>
                  </p>
                  <p>
                    მიმღები ექიმი: <span>{item.responsibleDoctorFullName}</span>
                  </p>
                  <p>
                    ჰოსპიტალიზაციის თარიღი:{" "}
                    <span>
                      {new Date(
                        item.hospitalizationDateTime
                      ).toLocaleDateString("ka-GE")}
                    </span>
                  </p>
                  <p>
                    საბოლოო კლინიკური დიაგნოზი:{" "}
                    <span>{item.finalClinicalDiagnosisMain}</span>
                  </p>
                  {item.doctorNotes && item.doctorNotes.length > 0 && (
                    <p>
                      ექიმის შენიშვნები: <span>{item.doctorNotes}</span>
                    </p>
                  )}
                  {item.statusPraesense && (
                    <p>სტატუსის წარმოშობა: {item.statusPraesense}</p>
                  )}
                  {item.statusLocus && (
                    <p>სტატუსის ადგილმდებარეობა: {item.statusLocus}</p>
                  )}
                  {item.corsusMorbis && (
                    <p>მორბის მიმდინარეობა: {item.corsusMorbis}</p>
                  )}
                  {item.clinicDischarge && (
                    <p>კლინიკის გამოსვლა: {item.clinicDischarge}</p>
                  )}
                </div>
              ))
            ) : (
              <p>ისტორია ვერ მოიძებნა</p>
            )}
          </section>

          <DynamicInputList />
          <Button
            onClick={() => setCheckAi(true)}
            icon={LuSparkles}
            text="ხელოვნური ინტელექტი"
            className="flex items-center hover:bg-gray-300 duration-500 justify-center py-[10px] border-[1px] border-gray-200 hover:border-gray-300 bg-gray-200 rounded-[8px] px-[8px] mt-[10px] mb-[5px] gap-[8px]"
          />
          {checkAi && <SymptomAnalyzer />}
        </div>
      </div>
    </>
  );
}
