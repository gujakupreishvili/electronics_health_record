import AddPatient from "@/components/addPatient/addPatient";
import Button from "@/components/button/button";
import PatientComponent from "@/components/patientComponent/patientComponent";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function DoctorContext() {
  const [addPatient ,setAddPatient] = useState(false)
  return (
    <div className="flex flex-col px-[10px] md:px-[40px] pt-[30px] ">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[18px] lg:text-[28px] font-bold">პაციენტთა ჩანაწერი</h1>
        <div className="flex items-center gap-[12px] justify-end">
          <input
            type="number"
            className="outline-none border-[1px] border-gray-300 rounded-[5px] h-[48px] w-[90%] lg:w-[320px] px-[12px]"
            placeholder="პაციენტის პირადი ნომერი..."
          />
          <Button
          onClick={()  => setAddPatient(!addPatient)}
            text="პაციენტის დამატება"
            icon={Plus}
            className="flex items-center bg-blue-600 p-[12px] rounded-[4px] gap-[4px] hover:rounded-[12px] duration-500 text-white"
            pTagStyle="hidden sm:block" // <-- აქ ხდება ტექსტის დამალვა პატარა ეკრანებზე
          />
        </div>
      </div>
      {addPatient ? <AddPatient setAddPatient ={setAddPatient} /> : (
      <div className="flex flex-wrap mt-[30px] items-center justify-center gap-[30px] mb-[40px]">
      <PatientComponent />
      <PatientComponent />
      <PatientComponent />
      <PatientComponent />
      <PatientComponent />
      <PatientComponent />
      </div>
      )}
    </div>
  );
}
