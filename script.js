// * means everything and any kind and fs is file system
// this is backend code so browser will not run it

// import * as fs from 'node:fs';
const fs = require(`node:fs`) //this is the same import, different syntax

// THIS IS SYNC

try {
  const data = fs.readFileSync('file.json', 'utf8');
  const jsonData = JSON.parse 
  console.log(data);
} catch (err) {
  console.error('Error reading the file:', err);
}

// THIS IS ASYNC

fs.readFile('file.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  console.log(data);

  try {
    const jsonData = JSON.parse(data)
    console.log(jsonData)
  } catch (parseErr) {
    console.err(`Error at parsing the data`, parseErr)
  }
});