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
                {routine.excercises
                  .split(",")
                  .map((excercise) => <span key={excercise}>{getExcerciseName(excercise)}, </span>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fixed bottom-20 right-4">
        <Fab />
      </div>
    </main>
  );
}
