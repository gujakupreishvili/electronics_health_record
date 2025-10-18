import { db } from "@/lib/db";

type TRoomNameSpace = "healthCard" | "patients" | "doctors";

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
    roomNameSpace === "patients"
      ? { patients: query[roomNameSpace] }
      : roomNameSpace === "healthCard"
      ? { healthCard: query[roomNameSpace] }
      : roomNameSpace === "doctors"
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
