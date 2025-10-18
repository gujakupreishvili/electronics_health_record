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
  try {
    if (!id) return;

    db.transact(db.tx.healthCard[id].delete());
  } catch (error) {
    console.error(error);
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    if (!id) return;

    db.transact(db.tx.doctors[id].delete());
  } catch (error) {
    console.error(error);
  }
};
