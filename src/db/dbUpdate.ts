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

export const updateHealthCard = (id: string, info: HealthCardT) => {
  db.transact(
    db.tx.healthCard[id].update({
      ...info,
    })
  );
};
