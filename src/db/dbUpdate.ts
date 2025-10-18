import { db } from "@/lib/db";
import { id } from "@instantdb/react";

type PatientHistoryT = {
  email: string;
  createdAt: Date;
};

export const updatePatientHistory = (info: PatientHistoryT) => {
  db.transact(
    db.tx.$patientsHistory[id()].update({
      ...info,
    })
  );
};
