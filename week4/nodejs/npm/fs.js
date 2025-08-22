import fs from 'fs';

fs.writeFileSync('note.txt', 'this is a note');

const data = fs.readFileSync('note.txt', 'utf-8');
console.log("File contents: ", data);