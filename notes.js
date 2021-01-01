const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);

  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title used"));
  }
};

const removeNote = (title) => {
  const note = loadNotes();
  const notesToKeep = note.filter((note) => note.title !== title);

  if (note.length > notesToKeep.length) {
    console.log(chalk.green.inverse("note removed"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const listnotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse("Notes :-"));
  notes.forEach((note) => console.log(chalk.green(`${note.title}`)));
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToBeRead = notes.find((note) => note.title === title);

  if (noteToBeRead) {
    console.log(
      chalk.green(`title :${noteToBeRead.title} & body :${noteToBeRead.body}`)
    );
  } else {
    console.log(chalk.red("Note not found"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listnotes: listnotes,
  readNote: readNote,
};
