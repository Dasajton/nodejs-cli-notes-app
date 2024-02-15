export const listAllNotes = (notes) => {
  notes.forEach((note) => {
    console.log("\n");
    console.log(`ID: ${note.id}`);
    console.log(`Content: ${note.content}`);
    console.log(`Tags: ${note.tags}`);
    console.log("\n");
  });
};
