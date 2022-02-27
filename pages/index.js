import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../helpers/db";

export default function Home() {
  const workouts = useLiveQuery(async () => {
    return await db.workouts.orderBy('createdAt', 'desc').toArray();
  });

  return <>Test</>;
}
