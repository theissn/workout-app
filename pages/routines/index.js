import { useLiveQuery } from "dexie-react-hooks";
import Fab from "../../components/fab";
import { db } from "../../helpers/db";

export default function Excercises() {
  const routines = useLiveQuery(async () => {
    return await db.routines.orderBy("updatedAt", "desc").toArray();
  });

  const excercises = useLiveQuery(async () => {
    return await db.excercises.orderBy("createdAt", "desc").toArray();
  });

  const getExcerciseName = (id) => {
    return excercises.find((excercise) => excercise.id === parseInt(id, 10))
      .name;
  };

  const deleteRoutine = async (id) => {
    await db.routines.where("id").equals(parseInt(id, 10)).delete();
  };

  if (!routines || !excercises) {
    return <main>Loading...</main>;
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Excercises</h1>
      <table className="table-auto">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th>Excercises</th>
          </tr>
        </thead>
        <tbody>
          {routines.map((routine) => (
            <tr key={routine.id}>
              <td className="py-4 pr-4">{routine.name}</td>
              <td className="py-4 pr-4">
                {routine.excercises.split(",").map((excercise) => (
                  <div key={excercise}>{getExcerciseName(excercise)}</div>
                ))}
              </td>
              <td>
                <button onClick={() => deleteRoutine(routine.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fixed bottom-20 right-4">
        <Fab path="/routines/new" />
      </div>
    </main>
  );
}
