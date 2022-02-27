import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../../helpers/db";

export default function New() {
  const [routine, setRoutine] = useState([]);
  const [name, setName] = useState(null);
  const [addToRoutine, setAddToRoutine] = useState(null);
  const [newExcercise, setNewExcecise] = useState(null);
  const [delExcercise, setDelExcecise] = useState(null);

  const router = useRouter();

  const excercises = useLiveQuery(async () => {
    return await db.excercises.orderBy("createdAt", "desc").toArray();
  });

  if (!excercises) {
    return <main>Loading...</main>;
  }

  const addExcersiseToRoutine = async () => {
    if (!addToRoutine) {
      alert("Please select an excercise to add to the routine.");
      return;
    }

    setRoutine([...routine, addToRoutine]);
    setAddToRoutine(null);
  };

  const addExcersise = async () => {
    if (!newExcercise) {
      alert("Please enter an excercise name");
      return;
    }

    const excercise = await db.excercises.add({
      name: newExcercise,
      createdAt: new Date(),
    });
  };

  const destroyExcersise = async () => {
    if (!delExcercise) {
      alert("Please select an excercise to delete");
      return;
    }

    await db.excercises.where("id").equals(parseInt(delExcercise, 10)).delete();
  };

  const getExcerciseName = (id) => {
    return excercises.find((excercise) => excercise.id === parseInt(id, 10))
      .name;
  };

  const saveRoutine = async () => {
    await db.routines.add({
      name: name,
      excercises: routine.join(","),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await router.push('/routines');
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">Create new routine</h1>
      <input type="text" className="form-input w-full" placeholder="Name" onChange={e => setName(e.target.value)} />

      <ul className="my-4 mx-4">
        {routine.map((excercise) => (
          <li className="list-decimal mx-2" key={excercise}>
            {getExcerciseName(excercise)}
          </li>
        ))}
      </ul>

      <button
        onClick={saveRoutine}
        className="w-full border px-2 py-4 bg-blue-400 text-white"
      >
        Save Routine
      </button>

      <h2 className="text-xl mt-6 mb-2">Add to routine</h2>
      <div className="flex space-x-4">
        <select
          onChange={(e) => setAddToRoutine(e.target.value)}
          className="w-full"
        >
          <option disabled selected>
            Select an excercise
          </option>
          {excercises.map((excercise) => (
            <option key={excercise.id} value={excercise.id}>
              {excercise.name}
            </option>
          ))}
          {excercises.length === 0 && (
            <option disabled selected>
              No excercises
            </option>
          )}
        </select>
        <button onClick={addExcersiseToRoutine}>
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <h2 className="text-xl mt-6 mb-2">Add new excercise</h2>
      <div className="flex space-x-4">
        <input
          type="text"
          className="w-full"
          onChange={(e) => setNewExcecise(e.target.value)}
        />
        <button onClick={addExcersise}>
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
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <h2 className="text-xl mt-6 mb-2">Remove excercise</h2>
      <div className="flex space-x-4">
        <select
          onChange={(e) => setDelExcecise(e.target.value)}
          className="w-full"
        >
          {excercises.length === 0 ? (
            <option disabled selected>
              No excercises
            </option>
          ) : (
            <option disabled selected>
              Select an excercise
            </option>
          )}
          {excercises.map((excercise) => (
            <option key={excercise.id} value={excercise.id}>
              {excercise.name}
            </option>
          ))}
        </select>

        <button onClick={destroyExcersise}>
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
      </div>
    </main>
  );
}
