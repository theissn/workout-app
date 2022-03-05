import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(2).stores({
  routines: '++id, name, excercises, createdAt, updatedAt',
  workouts: '++id, routineID, startedAt, endedAt, excercises, createdAt, updatedAt',
  excercises: '++id, name, createdAt',
});
