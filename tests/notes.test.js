import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, findNotes, removeNote, removeAllNotes } =
  await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

// Test for: newNote()
test("newNote inserts data and returns it", async () => {
  const note = {
    id: Date.now(),
    content: "Test note",
    tags: ["test"],
  };
  insertDB.mockResolvedValue(note);

  const result = await newNote(note.content, note.tags);
  expect(result).toEqual(note);
});

// Test for: getAllNotes()
test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

// Test for: findNotes()
test("findNotes returns notes that match the filter", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];
  getDB.mockResolvedValue({ notes });

  const result = await findNotes("2");
  expect(result).toEqual([notes[1]]);
});

// Test for: removeNote()
test("removeNote does nothing if id is not found", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];
  saveDB.mockResolvedValue(notes);

  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});

// Test for: removeAllNotes()
test("removeAllNotes removes all notes", async () => {
  saveDB.mockResolvedValue({ notes: [] });

  const result = await removeAllNotes();
  expect(result).toEqual({ notes: [] });
});
