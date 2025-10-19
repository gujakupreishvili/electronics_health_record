import Button from "@/components/button/button";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";

type Patient = {
  id: number;
  fullName: string;
  personalId: string;
  age: number;
  sex: string;
  phoneNumber: string;
  dateOfBirth?: string | Date;
  createdAt?: string | Date;
};

type PatientProps = {
  patient: Patient;
  onClick?: () => void;
};

export default function PatientComponent({ patient ,  onClick }: PatientProps) {
  return (
    <div
    onClick={onClick}
     className="flex flex-col border-[1px] border-gray-300 rounded-[6px] px-[15px] py-[20px] lg:w-[28%] w-[95%] hover:cursor-pointer hover:shadow-2xl duration-500">
      {/* Header */}
      <div className="flex items-center gap-[15px] mb-[12px]">
        <div className="w-[40px] h-[40px] rounded-[20px] bg-blue-100 flex items-center justify-center">
          <FaRegUser className="text-blue-600" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-[15px] font-bold uppercase">{patient.fullName}</h3>
          <p className="text-[12px] text-gray-600">{patient.personalId}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <p className="font-normal">
            ასაკი: <span className="font-semibold">{patient.age}</span>
          </p>
          <p className="font-normal">
            სქესი:{" "}
            <span className="font-semibold">
              {patient.sex === "male" ? "მამრობითი" : "მდედრობითი"}
            </span>
          </p>
        </div>
        <p className="font-normal">
          ტელეფონის ნომერი:{" "}
          <span className="font-semibold">{patient.phoneNumber}</span>
        </p>
      </div>

      <p className="font-normal mt-[10px]">ჩივილები:</p>
      <div className="border-[1px] border-gray-300 bg-amber-50 rounded-[6px] my-[10px] px-[10px]">
        <p>საბოლოო დიაგნოზი:</p>
        <p>დიაგნოზი</p>
      </div>

      <p className="font-normal">
        თარიღი:{" "}
        <span className="font-semibold">
          {patient.createdAt
            ? new Date(patient.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </p>

      <Button
        // icon={LuSparkles}
        text="დეტალები"
        className="flex items-center hover:bg-gray-200 duration-500 justify-center py-[10px] border-[1px] border-gray-300 rounded-[8px] px-[8px] mt-[10px] mb-[5px] gap-[8px]"
      />
    </div>
  );
}
