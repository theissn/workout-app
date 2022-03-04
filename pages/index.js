import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { db } from "../helpers/db";

export default function Home() {
  const router = useRouter();

  const routines = useLiveQuery(async () => {
    return await db.routines.orderBy("createdAt", "desc").toArray();
  });

  const workouts = useLiveQuery(async () => {
    return await db.workouts.orderBy("startedAt", "desc").toArray();
  });

  if (!routines || !workouts) {
    return <main>Loading...</main>;
  }

  const startWorkout = (id) => {
    router.push({
      pathname: "/new",
      query: { routine: id },
    })
  }

  const getRoutineName = (id) => {
    return routines.find((r) => r.id === parseInt(id, 10))
      .name;
  };

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

      <h1 className="text-2xl mb-2 mt-6">Workouts</h1>
      <ul className="my-4 mx-4">
        {workouts.map((workout) => (
          <li className="list-decimal mx-2" key={workout.id}>
            {getRoutineName(workout.routineID)} workout on {workout.startedAt.toDateString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
