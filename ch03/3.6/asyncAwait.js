const fs = require("fs").promises;

async function main() {
    let data = await fs.readFile("./readme2.txt");
    console.log("1번", data.toString());
    data = await fs.readFile("./readme2.txt");
    console.log("2번", data.toString());
    data = await fs.readFile("./readme2.txt");
    console.log("3번", data.toString());
    data = await fs.readFile("./readme2.txt");
    console.log("4번", data.toString());
}

console.log("시작");
main();
console.log("끝");
