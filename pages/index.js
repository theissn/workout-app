import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { db } from "../helpers/db";

export default function Home() {
  const router = useRouter();

  const routines = useLiveQuery(async () => {
    return await db.routines.orderBy("createdAt", "desc").toArray();
  });

  if (!routines) {
    return <main>Loading...</main>;
  }

  const startWorkout = (id) => {
    router.push({
      pathname: "/new",
      query: { routine: id },
    })
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-2">Start new workout</h1>
      <div className="flex space-x-4">
        <select onChange={e => startWorkout(e.target.value)} className="w-full">
          <option selected disabled>Select a routine</option>
          {routines.map((routine) => (
            <option key={routine.id} value={routine.id}>{routine.name}</option>
          ))}
        </select>
      </div>
    </main>
  );
}
