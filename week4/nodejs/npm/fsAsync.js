import { writeFile, readFile } from 'fs';

// Write to a file (async)
writeFile('noteAsync.txt', 'This was written asynchronously.', (err) => {
  if (err) return console.error("Write error:", err);

  // Read file after writing
  readFile('noteAsync.txt', 'utf-8', (err, data) => {
    if (err) return console.error("Read error:", err);
    console.log("Async read:", data);
  });
});