import { db } from "@/lib/db";
import { id } from "@instantdb/react";
import bcrypt from "bcryptjs";

type CreateUserT = {
  fullName: string;
  personalId: string;
  age: number;
  sex: string;
  height: number;
  weight: number;
  martialStatus: string;
  phoneNumber: string;
  dateOfBirth: string;
  createdByDoctorId: string;
  createdAt: string;
};

export const dbCreatePatient = async ({
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

export type HealthCardT = {
  patientId: string;
  medicalCardCreationDate: string;
  clinicHospitalName: string;
  location: string;
  responsibleDoctorFullName: string;
  hospitalizationDateTime: string;
  finalClinicalDiagnosisMain: string;
  doctorNotes: string;
  createdByDoctorId: string;
  createdByHospitalId: string;
  statusPraesense?: string;
  statusLocus?: string;
  corsusMorbis?: string;
  clinicDischarge?: string;
};

export const dbCreateHealthCard = (info: HealthCardT) => {
  const {
    patientId,
    medicalCardCreationDate,
    clinicHospitalName,
    location,
    responsibleDoctorFullName,
    hospitalizationDateTime,
    finalClinicalDiagnosisMain,
    doctorNotes,
    createdByDoctorId,
    createdByHospitalId,
  } = info;

  // Ensure required fields are present and default to empty string if undefined

  db.transact(db.tx.healthCard[id()].create(info));
};

type CreateDoctorT = {
  doctorId: string;
  fullName: string;
  specialty: string;
  email: string;
  password: string;
  phoneNumber: string;
  hospitalId: string;
  createdAt: string;
};

export const dbCreateDoctor = async (info: CreateDoctorT) => {
  try {
    const hashedPassword = await bcrypt.hash(info.password, 10);
    db.transact(
      db.tx.doctors[id()].create({ ...info, password: hashedPassword })
    );
  } catch (error) {
    console.error(error, "error when creating Doctor");
  }
};
