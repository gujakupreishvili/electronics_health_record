"use client";
import Header from "@/components/header/header";
import Main from "@/components/main/main";
import { updateHealthCard } from "@/db/dbUpdate";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}
