import { db } from "@/lib/db";

type TRoomNameSpace = "$patientsHistory";

type readDataT = {
  roomNameSpace: TRoomNameSpace;
  query: Record<TRoomNameSpace, {}>;
};

export const readData = ({ roomNameSpace, query }: readDataT) => {
  const room = db.room(roomNameSpace);

  const { isLoading, error, data } = db.useQuery(query);
  const { peers } = db.rooms.usePresence(room);

  return {
    patientsHistory: data?.$patientsHistory ?? null,
    peers,
    isLoading,
    error: error?.message ?? null,
  };
};
