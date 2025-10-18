import { db } from "@/lib/db";

type PatientHistoryT = {
  patientId: string;
  cardNumber: string;
  medicalCardCreationDate: Date;
  clinicHospitalName: string;
  location: string;
  responsibleDoctorFullName: string;
  hospitalizationDateTime: Date;
  referralSource: string;
  chiefComplaints: string;
  finalClinicalDiagnosisMain: string;
  doctorNotes: string[];
};

export const updatePatientHistory = (id: string, info: PatientHistoryT) => {
  db.transact(
    db.tx.healthCard[id].update({
      ...info,
    })
  );
};
