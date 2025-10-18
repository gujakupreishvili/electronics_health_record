import { db } from "@/lib/db";
import { id } from "@instantdb/react";

type CreateUserT = {
  role: "admin" | "patient" | "gov";
  fullName: string;
  personalId: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  martialStatus: string;
  phoneNumber: string;
  dateOfBirth: Date;
  createdByDoctorId: string;
  createdAt: Date;
};

export const dbCreatePatient = async ({
  role,
  fullName,
  personalId,
  age,
  sex,
  height,
  weight,
  martialStatus,
  phoneNumber,
  dateOfBirth,
  createdByDoctorId,
  createdAt,
}: CreateUserT) => {
  db.transact(
    db.tx.patients[id()].create({
      role,
      fullName,
      personalId,
      age,
      sex,
      height,
      weight,
      martialStatus,
      phoneNumber,
      dateOfBirth,
      createdByDoctorId,
      createdAt,
    })
  );
};

type HealthCardT = {
  patientId: string;
  cardNumber: string;
  medicalCardCreationDate?: Date;
  clinicHospitalName?: string;
  location: string;
  responsibleDoctorFullName: string;
  hospitalizationDateTime: Date;
  referralSource: string;
  chiefComplaints: string;
  finalClinicalDiagnosisMain: string;
  doctorNotes: string[];
};

export const dbCreateHealthCard = (info: HealthCardT) => {
  const {
    patientId,
    cardNumber,
    medicalCardCreationDate,
    clinicHospitalName,
    location,
    responsibleDoctorFullName,
    hospitalizationDateTime,
    referralSource,
    chiefComplaints,
    finalClinicalDiagnosisMain,
    doctorNotes,
  } = info;

  // Ensure required fields are present and default to empty string if undefined
  if (
    !patientId ||
    !cardNumber ||
    !medicalCardCreationDate ||
    !clinicHospitalName ||
    !location ||
    !responsibleDoctorFullName ||
    !hospitalizationDateTime ||
    !referralSource ||
    !chiefComplaints ||
    !finalClinicalDiagnosisMain
  ) {
    console.error("");
    return;
  }

  db.transact(
    db.tx.healthCard[id()].create({
      patientId: patientId,
      cardNumber: cardNumber,
      medicalCardCreationDate: medicalCardCreationDate,
      clinicHospitalName: clinicHospitalName,
      location: location,
      responsibleDoctorFullName: responsibleDoctorFullName,
      hospitalizationDateTime: hospitalizationDateTime,
      referralSource: referralSource,
      chiefComplaints: chiefComplaints,
      finalClinicalDiagnosisMain: finalClinicalDiagnosisMain,
      doctorNotes: doctorNotes ?? [],
    })
  );
};
