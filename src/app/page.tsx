"use client";
import Header from "@/components/header/header";
import Main from "@/components/main/main";

import { db } from "@/lib/db";


export default function Home() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
