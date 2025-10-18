import schema from "@/instant.schema";
import { db } from "@/lib/db";
import { InstaQLEntity } from "@instantdb/react";


export const deletePatient = (id: string) => {
  db.transact(db.tx.patients[id].delete());
};

export const deletePatientHistoryItem = (id: string) => {
  db.transact(db.tx.patientsHistory[id].delete());
};
