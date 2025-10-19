import { RoleInstances } from "@/constants/roleEnum";
import { AppSchema } from "@/instant.schema";
import { db } from "@/lib/db";
import { UpdateParams } from "@instantdb/react";

export const updateHealthCard = async (
  id: string,
  info: UpdateParams<AppSchema, RoleInstances.HEALTHCARD>
) => {
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

export const updatePatientInformation = async (
  id: string,
  info: UpdateParams<AppSchema, RoleInstances.PATIENTS>
) => {
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

export const updateDoctorInformation = async (
  id: string,
  info: UpdateParams<AppSchema, RoleInstances.DOCTORS>
) => {
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
