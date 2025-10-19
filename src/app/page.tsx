"use client";
import Header from "@/components/header/header";
import Main from "@/components/main/main";
import { dbCreatePatient } from "@/db";
import SymptomAnalyzer from "@/components/SymptomAnalyzer";

import { db } from "@/lib/db";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
