# NodeJS CLI Notes-App

### This is a simple notes cli application that you can run on your local machine

***You need to have node installed on your computer for being able to use that tool.***

## How it works

- Clone the repo
- Go into the repo folder
- type in **npm install** to install the necessary packages
- type in **npm link** to create a symbolic "note" cli command
- Use the tool

## Commands

### `note new <note>`

Create a new note.

### Options

- `-t, --tags <tags>`: Tags to add to the note.

### Example

note new "This is a new note" --tags "work, project"

### `note all`

Get all notes.

### Example

note all

### `note find <filter>`

Get notes that match the provided filter.

### Example

note find "project"


### `note remove <id>`

Remove a note by its ID.

### Example

note remove 1708015285345

### `note clean`

Remove all notes.

### Example

note clean


## Options

- `--help`: Show help.
- `--version`: Show version number.

- `-t, --tags <tags>`: Tags to add to the note.
