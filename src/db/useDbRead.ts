import { RoleInstances } from "@/constants/roleEnum";
import { db } from "@/lib/db";

type TRoomNameSpace =
  | RoleInstances.HEALTHCARD
  | RoleInstances.PATIENTS
  | RoleInstances.DOCTORS;

type readDataT<T extends TRoomNameSpace> = {
  roomNameSpace: T;
  query: Record<T, {}>;
};

export const useDbRead = <T extends TRoomNameSpace>({
  roomNameSpace,
  query,
}: readDataT<T>) => {
  const room = db.room(roomNameSpace);

  // Adjust query to match the expected shape for db.useQuery
  const queryParam =
    roomNameSpace === RoleInstances.PATIENTS
      ? { patients: query[roomNameSpace] }
      : roomNameSpace === RoleInstances.HEALTHCARD
      ? { healthCard: query[roomNameSpace] }
      : roomNameSpace === RoleInstances.DOCTORS
      ? { doctors: query[roomNameSpace] }
      : {};

  const { isLoading, error, data } = db.useQuery(queryParam);
  const { peers } = db.rooms.usePresence(room);

  const result =
    data && roomNameSpace in data
      ? (data as Record<string, unknown>)[roomNameSpace]
      : null;

  return {
    result,
    peers,
    isLoading,
    error: error?.message ?? null,
  };
};

export const useGetDoctorByPersonalId = (id: string) => {
  const { result } = useDbRead({
    query: { patients: { $: { where: { personalId: id } } } },
    roomNameSpace: RoleInstances.PATIENTS,
  });

  return { result };
};
