import Button from "@/components/button/button";
import Link from "next/link";

import React from "react";

export default function Header() {
  return (
    <div className="w-full px-[40px] border-b-[1px] border-gray-300 py-[20px] flex  justify-between  ">
      <div className="flex items-center  gap-[8px]">
        <div className="w-[30px] h-[30px] rounded-[10px] bg-blue-300 mr-[10px]"></div>
        <h1>HealthCare</h1>
      </div>
      <Link href ="/auth/signIn"
      >
      <Button
        className="w-[60px] h-[40px] bg-blue-400 rounded-[10px] text-[14px] text-white font-poppins font-normal"
        text="Sign in "
      />
      </Link>
    </div>
  );
}
