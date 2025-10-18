import { db } from "@/lib/db";

type HealthCardT = {
  patientId?: string;
  cardNumber?: string;
  medicalCardCreationDate?: Date;
  clinicHospitalName?: string;
  location?: string;
  responsibleDoctorFullName?: string;
  hospitalizationDateTime?: Date;
  referralSource?: string;
  chiefComplaints?: string;
  finalClinicalDiagnosisMain?: string;
  doctorNotes?: string[];
};

export const updateHealthCard = async (id: string, info: HealthCardT) => {
  try {
    if (!id) return;
    await db.transact(
      db.tx.healthCard[id].update({
        ...info,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const updatePatientInformation = async (id: string, info: any) => {
  try {
    if (!id) return;
    await db.transact(
      db.tx.patients[id].update({
        ...info,
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateDoctorInformation = async (id: string, info: any) => {
  try {
    if (!id) return;
    await db.transact(
      db.tx.doctors[id].update({
        ...info,
      })
    );
  } catch (error) {
    console.error(error);
  }
};
