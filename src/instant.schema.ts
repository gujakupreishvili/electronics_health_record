// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    patients: i.entity({
      personalId: i.string().unique().indexed(),
      name: i.string(),
      lastName: i.string(),
      age: i.number(),
      sex: i.string(),
      height: i.number(),
      weight: i.number(),
      martialStatus: i.string(),
      phoneNumber: i.string(),
      dateOfBirth: i.date(),
    }),
    patientsHistory: i.entity({
      patientId: i.string().unique().indexed(),
      cardNumber: i.string().unique().indexed(),
      medicalCardCreationDate: i.date(),
      // Hospital Visit
      clinicHospitalName: i.string(),
      location: i.string(),
      responsibleDoctorFullName: i.string(),
      hospitalizationDateTime: i.date(),
      referralSource: i.string(), // "Emergency", "Outpatient", "Referral", etc.
      // Chief Complaints & Diagnosis
      chiefComplaints: i.string(),
      finalClinicalDiagnosisMain: i.string(),
      // Doctor's Notes (Optional)
      doctorNotes: i.json().optional(),
    }),
  },
  links: {
    $usersLinkedPrimaryUser: {
      forward: {
        on: "patients",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "patients",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
  },
  rooms: {
    patients: {
      presence: i.entity({}),
    },
    patientsHistory: {
      presence: i.entity({}),
    },
  },
});

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
