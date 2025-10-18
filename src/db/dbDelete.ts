import { db } from "@/lib/db";

export const dbDeletePatient = async (id: string) => {
  try {
    if (!id) return;

    await db.transact(db.tx.patients[id].delete());
  } catch (error) {
    console.error(error);
  }
};

export const dbDeletePatientHistoryItem = (id: string) => {
  try {
    if (!id) return;

    db.transact(db.tx.healthCard[id].delete());
  } catch (error) {
    console.error(error);
  }
};

export const dbDeleteDoctor = async (id: string) => {
  try {
    if (!id) return;

    db.transact(db.tx.doctors[id].delete());
  } catch (error) {
    console.error(error);
  }
};
