"use client";
import DoctorContext from "@/components/doctorContext/doctorContext";
import Header from "@/components/header/header";
import Main from "@/components/main/main";

import { db } from "@/lib/db";


export default function Home() {
  return (
    <>
      <Header />
      {/* <db.SignedIn>
        <DoctorContext />
      </db.SignedIn>
      <db.SignedOut>
        <Main />
      </db.SignedOut> */}
      <DoctorContext />
    </>
  );
}
