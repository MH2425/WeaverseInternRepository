const path = require('path');
const filepath = 'Users/hoang/project/index.js';

console.log("Base name: ", path.basename(filepath));
console.log("Dirname: ", path.dirname(filepath));
console.log("Extension: ", path.extname(filepath));
