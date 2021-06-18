const fs = require("fs");
const zlip = require("zlib");

const readStream = fs.createReadStream("./readme4.txt");
const zlibStream = zlip.createGzip();
const writeStream = fs.createWriteStream("./readme4.txt.gz");
readStream.pipe(zlibStream).pipe(writeStream);
