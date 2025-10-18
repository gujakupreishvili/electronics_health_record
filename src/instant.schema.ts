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
    healthCard: i.entity({
      patientId: i.string().unique().indexed(),
      cardNumber: i.string().unique().indexed(),
      medicalCardCreationDate: i.date(),
      clinicHospitalName: i.string(),
      location: i.string(),
      responsibleDoctorFullName: i.string(),
      hospitalizationDateTime: i.date(),
      referralSource: i.string(), //saidan shemoiyvanes pacienti,emergencydan quchidan tu sidan
      //chivilebi da diagnozi
      chiefComplaints: i.string(),
      finalClinicalDiagnosisMain: i.string(),
      // eqimis notebi
      doctorNotes: i.json().optional(),
    }),

    hospitals: i.entity({
      hospitalId: i.string().unique().indexed(),
      hospitalName: i.string().unique().indexed(),
      location: i.string(), // sruli misamarti
      city: i.string(), // qalaqi
      phoneNumber: i.string(),
      email: i.string(),
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
    healthCard: {
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
