import { db } from "@/lib/db";

export const deletePatient = async (id: string) => {
  try {
    if (!id) return;
    await db.transact(db.tx.patients[id].delete());
  } catch (error) {
    console.error(error);
  }
};

export const deletePatientHistoryItem = (id: string) => {
  db.transact(db.tx.healthCard[id].delete());
};

export const deleteDoctor = async (id: string) => {
  db.transact(db.tx.doctors[id].delete());
};
