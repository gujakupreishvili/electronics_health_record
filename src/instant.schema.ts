// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react";

const _schema = i.schema({
  entities: {
    $patients: i.entity({
      personalId: i.string().unique().indexed(),
      name: i.string(),
      lastName: i.string(),
      phoneNumber: i.string(),
      sex: i.string(),
      dateOfBirth: i.date(),
      bloodType: i.string(),
      createdAt: i.date(),
    }),
    $patientsHistory: i.entity({
      email: i.string().unique().indexed().optional(),
      createdAt: i.date(),
    }),
  },
  links: {
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$patients",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade",
      },
      reverse: {
        on: "$patients",
        has: "many",
        label: "linkedGuestUsers",
      },
    },
  },
  rooms: {
    $patientsHistory: {
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
