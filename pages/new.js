import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "../helpers/db";

export default function NewWorkout() {
  const router = useRouter();
  const [run, setRun] = useState([]);

  const routine = useLiveQuery(async () => {
    return await db.routines.where("id").equals(parseInt(router.query.routine, 10)).toArray();
  });

  const excercises = useLiveQuery(async () => {
    return await db.excercises.orderBy("createdAt", "desc").toArray();
  });

  useEffect(() => {
    if (!excercises) return;

    const excerisesInRoutine = excercises.filter((e) =>
      routine[0].excercises.split(",").includes(e.id.toString())
    );

    setRun(
      excerisesInRoutine.map((e) => ({
        id: e.id,
        name: e.name,
        sets: [],
      }))
    );
  }, [excercises, routine]);

  if (!routine || !excercises) {
    return <main>Loading...</main>;
  }
  const start = new Date();

  const addNewSet = (id) => {
    setRun(
      run.map((e) => {
        if (e.id === id) {
          e.sets.push({ reps: 0, weight: 0 });
        }
        return e;
      })
    );
  };

  const incrSet = (excerciseID, setID) => {
    setRun(
      run.map((e) => {
        if (e.id === excerciseID) {
          e.sets[setID].reps++;
        }
        return e;
      })
    );
  };

  const saveWorkout = async () => {
    await db.workouts.add({
      routineID: parseInt(routine[0].id, 10),
      startedAt: start,
      endedAt: new Date(),
      excercises: JSON.stringify(run),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await router.push("/");
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl">Excercise - {start.toDateString()}</h1>
      <div className="mt-12">
        {run.map((e) => (
          <div key={e.id}>
            <div className="text-xl font-bold mt-4">{e.name}</div>
            {e.sets.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <input type="number" placeholder="weight" />
                <div className="text-xl mx-2">sets {s.reps}</div>
                <button onClick={() => incrSet(e.id, i)} className="text-xl">
                  +
                </button>
              </div>
            ))}
            <div>
              <button
                onClick={() => addNewSet(e.id)}
                className="py-2 px-4 bg-blue-400 text-white"
              >
                add set +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={saveWorkout}
        className="w-full border px-2 py-4 bg-blue-400 text-white mt-12"
      >
        Save Workout
      </button>
    </main>
  );
}
