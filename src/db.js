import fs from "fs/promises";

let DB_PATH = new URL("../db.json", import.meta.url).pathname;
if (process.platform === "win32") {
  DB_PATH = DB_PATH.substring(1);
}

export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (note) => {
  const db = await getDB();
  db.notes.push(note);
  await saveDB(db);
  return note;
};
