import { db } from "@/lib/db";

export const deletePatient = (id: string) => {
  db.transact(db.tx.patients[id].delete());
};

export const deletePatientHistoryItem = (id: string) => {
  db.transact(db.tx.healthCard[id].delete());
};
