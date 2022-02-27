import Dexie from 'dexie';

export const db = new Dexie('myDatabase');


db.version(1).stores({
  routines: '++id, name, excercises, createdAt, updatedAt',
  workouts: '++id, routineID, startedAt, endedAt, createdAt, updatedAt',
  excercises: '++id, name, createdAt',
});
