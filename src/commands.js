import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
  newNote,
  getAllNotes,
  findNotes,
  removeNote,
  removeAllNotes,
} from "./notes.js";
import { listAllNotes } from "./utils.js";

yargs(hideBin(process.argv))
  .scriptName("note")
  .command(
    "new <note>",
    "create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note you want to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(", ") : [];
      const note = await newNote(argv.note, tags);
      console.log("Note created:", note);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listAllNotes(notes);
    }
  )
  .command(
    "find <filter>",
    "get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        type: "string",
        description:
          "The search term to filter notes by, will be applied to note.content",
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listAllNotes(notes);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      console.log("Note removed:", id);
    }
  )
  .command(
    "clean",
    "remove all notes",
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log("All notes removed");
    }
  )
  .demandCommand(1)
  .parse();
