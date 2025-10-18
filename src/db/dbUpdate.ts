import { db } from "@/lib/db";

type PatientHistoryT = {
  email: string;
  createdAt: any;
};

export const updatePatientHistory = (id: string, info: PatientHistoryT) => {
  db.transact(
    db.tx.patientsHistory[id].update({
      ...info,
    })
  );
};
