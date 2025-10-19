// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    hospitals: i.entity({
      hospitalId: i.string().unique().indexed(),
      hospitalName: i.string().unique().indexed(),
      location: i.string(),
      city: i.string(),
      phoneNumber: i.string(),
      email: i.string(),
      createdAt: i.date(),
    }),
    doctors: i.entity({
      doctorId: i.string().unique().indexed(),
      fullName: i.string(),
      specialty: i.string(),
      email: i.string().unique().indexed(),
      password: i.string(),
      phoneNumber: i.string(),
      hospitalId: i.string().indexed(),
      createdAt: i.date(),
    }),
    patients: i.entity({
      personalId: i.string().unique().indexed(),
      fullName: i.string(),
      age: i.number(),
      sex: i.string(),
      height: i.number(),
      weight: i.number(),
      martialStatus: i.string(),
      phoneNumber: i.string(),
      dateOfBirth: i.date(),
      createdByDoctorId: i.string().indexed(),
      createdAt: i.date(),
    }),
    healthCard: i.entity({
      patientId: i.string().unique().indexed(),
      medicalCardCreationDate: i.string(),
      createdByDoctorId: i.string().indexed(),
      createdByHospitalId: i.string().indexed(),
      clinicHospitalName: i.string(),
      location: i.string(),
      responsibleDoctorFullName: i.string(),
      hospitalizationDateTime: i.string(),
      finalClinicalDiagnosisMain: i.string(),
      doctorNotes: i.string().optional(),
      statusPraesense: i.string().optional(),
      statusLocus: i.string().optional(),
      corsusMorbis: i.string().optional(),
      clinicDischarge: i.string().optional(),
    }),
  },
  links: {
    hospitalDoctors: {
      forward: {
        on: "hospitals",
        has: "many",
        label: "doctors",
      },
      reverse: {
        on: "doctors",
        has: "one",
        label: "hospital",
      },
    },
    doctorPatients: {
      forward: {
        on: "doctors",
        has: "many",
        label: "patients",
      },
      reverse: {
        on: "patients",
        has: "one",
        label: "createdByDoctor",
      },
    },
    patientHealthCard: {
      forward: {
        on: "patients",
        has: "one",
        label: "healthCard",
        onDelete: "cascade",
      },
      reverse: {
        on: "healthCard",
        has: "one",
        label: "patient",
      },
    },
  },
  rooms: {
    patients: {
      presence: i.entity({}),
    },
    healthCard: {
      presence: i.entity({}),
    },
    hospitals: {
      presence: i.entity({}),
    },
    doctors: {
      presence: i.entity({}),
    },
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
