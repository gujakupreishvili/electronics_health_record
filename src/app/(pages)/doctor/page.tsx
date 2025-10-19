"use client";
import AddPatient from "@/components/addPatient/addPatient";
import Button from "@/components/button/button";
import Header from "@/components/header/header";
import Filter from "@/components/hideFilter/hideFilter";
import PatientComponent from "@/components/patientComponent/patientComponent";
import { RoleInstances } from "@/constants/roleEnum";
import { useDbRead } from "@/db";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

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

export default function DoctorContext() {
  const [addPatient, setAddPatient] = useState(false);
  const [userId, setUserId] = useState("");
  const [hideFilter, setHideFilter] = useState(false);
  const router = useRouter();
  const { result } = useDbRead({
    query: { patients: {} },
    roomNameSpace: RoleInstances.PATIENTS,
  });

  const filteredPatients = useMemo(() => {
    if (!Array.isArray(result)) return [];
    if (!userId) return result;
    return result.filter((patient: Patient) =>
      patient.personalId?.includes(userId.trim())
    );
  }, [result, userId]);

  const handleClick = (productId:string) => {
    router.push(`/moreAbout/${productId}`);
  };

  return (
    <>
      <Header variant="Logout" />
      <div className="flex flex-col px-[10px] md:px-[40px] pt-[30px] ">
        {/* Header Section */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-[18px] lg:text-[28px] font-bold">
            პაციენტთა ჩანაწერი
          </h1>
          <div className="flex items-center gap-[12px] justify-end">
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="outline-none border-[1px] border-gray-300 rounded-[5px] h-[48px] w-[90%] lg:w-[320px] px-[12px]"
              placeholder="პაციენტის პირადი ნომერი..."
            />
            <Button
              onClick={() => setAddPatient(!addPatient)}
              text="პაციენტის დამატება"
              icon={Plus}
              className="flex items-center bg-blue-600 p-[12px] rounded-[4px] gap-[4px] hover:rounded-[12px] duration-500 text-white"
              pTagStyle="hidden sm:block"
            />
          </div>
        </div>
        <Button
          onClick={() => setHideFilter(!hideFilter)}
          text="Hide Filters"
          className="border-[1px] w-[100px] h-[35px] borer-[1px] border-gray-300 text-[12px] rounded-[8px] font-semibold mt-[30px] "
        />
        {hideFilter &&
         <Filter />
          }

        {addPatient ? (
          <AddPatient setAddPatient={setAddPatient} />
        ) : (
          <div className="flex flex-wrap mt-[30px] items-center justify-center gap-[30px] mb-[40px]">
            {Array.isArray(filteredPatients) && filteredPatients.length > 0 ? (
              filteredPatients.map((item: Patient) => (
                <PatientComponent
                  onClick={() => handleClick(item.personalId)}
                  key={item.id}
                  patient={item}
                />
              ))
            ) : (
              <p>მონაცემები ვერ მოიძებნა</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
