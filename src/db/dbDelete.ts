import { AppSchema } from "@/instant.schema";
import { db } from "@/lib/db";
import { InstaQLEntity } from "@instantdb/react";

type Patients = InstaQLEntity<AppSchema, "$patients">;
type PatientsHistory = InstaQLEntity<AppSchema, "$patientsHistory">;

export const deletePatient = (patient: Patients) => {
  db.transact(db.tx.$patients[patient.id].delete());
};

export const deletePatientHistoryItem = (patientHistory: PatientsHistory) => {
  db.transact(db.tx.$patientsHistory[patientHistory.id].delete());
};
